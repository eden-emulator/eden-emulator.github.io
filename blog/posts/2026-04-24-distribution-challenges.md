---
title: "Distribution Challenges"
slug: "distribution-challenges"
description: "Distribution is hard"
author: "crueter"
date: "2026-04-24"
tags: ["announcement", "news", "infrastructure"]
draft: false
---

This past month has been a serious challenge for distribution of Eden. We've been faced with nothing but constant issues, DMCAs, server overload, emergency maintenance, caches, etc, etc. This is most of the reason why our current release has stayed stale for so long. As such, this blog post will serve as an incident report, documenting all that's happened over the past month, how we're mitigating it, and how it'll affect you.

## On Actions

For some background on why any of this is necessary...

Traditionally, projects will simply host themselves on GitHub and use the built-in GitHub Actions they get for free (or pay up to get extra runners and features). GitHub Actions is... less than reliable, nor particularly fast, but it's free (or cheap), and convenient.

However, this is rather significantly complicated for us, notably due to us not using GitHub to host our source code (primarily because of DMCA risk). We have to jump through some hoops for Actions to be available to us; to spare the internal implementation details, the high-level overview is essentially:

- Webhook triggers when pull requests are made/updated, or the master branch is updated
- The [fj2ghook](https://git.crueter.xyz/crueter/fj2ghook) service transforms these webhook events into payloads suitable for consumption by GitHub Actions
- A [workflow repository](https://github.com/Eden-CI/Workflow) receives this event and begins an Actions run
- The payload sent by fj2ghook is [parsed](https://github.com/Eden-CI/Workflow/blob/master/.ci/forgejo.sh#L34-L235) for build identification and release usage
- The Actions runners build Eden for multiple platforms
- Once all platforms are built, artifacts are dispatched to some external release host

All of the steps are (generally) well-formed, and haven't caused us any issues, *except for* the final step, which has consistently been a *huge* headache for a long time now.

Now that you're caught up, let's go over mitigations!

## DMCA #1

On February 12, 2026, Nintendo submitted a [DMCA notice](https://github.com/github/dmca/blob/master/2026/02/2026-02-12-nintendo.md) targeting our primary release distribution repository (`eden-emulator/Releases`).

Of all the issues we've had with distribution, this was the least of our concerns. In the coming months, we had already prepared for this--all stable releases had already been synced, and future releases were already set up to be released to Forgejo anyways. While bandwidth and storage were initially concerns, the stable releases contained few and small enough artifacts that this ended up not being an issue (*for now*).

## DMCA #2

On March 27, 2026, Nintendo submitted a [DMCA notice](https://github.com/github/dmca/blob/master/2026/03/2026-03-27-nintendo.md) targeting three of our repositories:

- Eden-CI/Nightly
- Eden-CI/Master
- Eden-CI/PR

Nightly was, of course, used for nightly builds. PR and Master were primarily used by testers and developers to test new changes, bisect issues and regressions, and gather community feedback on significant new features/bug fixes before releasing it to the masses. It should go without saying that this was *absolutely critical* for our development process. It can not be emphasized enough that losing these repositories would be a **significant** hindrance to development.

### Nightly

Nightlies are small and few enough that using the same Forgejo distribution method was perfectly viable, and not a major issue with respect to storage or bandwidth (yet).

### PR/Master

PR and Master builds are a completely different story. Since these builds are created so frequently, we simply lack enough storage on the Forgejo server to store any significant number of these. As such, we really had no backup plans in place to deal with this if DMCA time ever came. Once it did come, however, we had to act fast...

A friend of mine introduced me to [Backblaze](https://www.backblaze.com/), which serves our purpose perfectly--lots of data served to lots of users, with an S3-compatible API that makes uploading relatively trivial. Serving PR/Master builds directly from Backblaze's servers proved to be very effective, and we utilized Forgejo's external assets feature to aggregate artifacts (though realistically this was unnecessary, as users could just click the gigantic buttons that take you to the download anyways). We still do this today, as it's extremely cost-effective and simple to deal with.

## Tomodachi Life

*Huh, I wonder what happened around April 17th... a new game released, perhaps?*

![cloudflare traffic skyrockets on April 17-18](/blog/images/cloudflare-traffic-2026-04-24.png)

On April 16th, 2026, *Tomodachi Life: Living the Dream* was released to the masses and immediately sold a ton of copies--about as much as Legends: Z-A did during its first week--so, of course, a TON of users immediately flocked to see if it could be emulated (no it can't, use your brain. Be patient, submit patches, or donate). Now, what does lots of users downloading lots of big files mean for us? **A lot of bandwidth usage**. So much, in fact, that for the better part of April 16-17, our server was completely inaccessible. Some fun statistics:

- Our server has a 2TB total data limit for 24 hours before its connection speed is throttled. Normally, we hover between 200-800GB. In 4 hours, we hit 2.5TB and were throttled for the rest of the day
- The rate of requests nearly tripled
- The average CPU usage on the Forgejo server is 10x higher than it was before
- The server uptime in the 24 hours following Tomodachi Life's release was 15%

Alongside the sheer bandwidth usage, much of this was caused by the huge number of new users opening up Eden and immediately causing the update checker to fire. The update checker sends a request to the API each time you boot up, meaning every user generates an API request every time they open the app.

As it turns out, when you have infinity users opening the app to play their new Mii game, there's a lot of pressure on the web server! At the peak, there were well over 50,000 requests per second that reached the origin server. How that poor VPS handled it, I have no idea.

### The (Ephemeral) Fix

Simply put, this was a huge problem and had to be fixed immediately. The server was put into emergency maintenance, and the following mitigations were applied:

- All downloaded assets were aggressively cached through Cloudflare's CDN
- All API responses were conservatively cached through Cloudflare's CDN
- All standard browser requests were forced to solve an interactive challenge
- All automated traffic was halted

Sparing the inner implementation details and consequences, this worked, and server traffic was generally restored for the time being. Obviously, the latter two were temporary, as the web server recovered from the gigantic queue of requests that it was several hours behind on.

Caching, however, appeared to be permanently necessary, as request volume continued to soar throughout the day (and still sits far above our usual baseline). Unfortunately though, aggressively caching lots of non-HTML content in Cloudflare is notoriously flaky, and indeed, we've seen some issues where nightly builds are unavailable to download due to spontaneous cache drops. So, what do?

### Backblaze, Again

The seemingly permanent solution to this problem is the same as how PR/Master builds were solved--distribute builds through Backblaze. Since we already had the Backblaze infrastructure in place, doing this was pretty trivial (for the most part). Migrating *old* releases to Backblaze will take some time, but it's not a huge issue and can be automated with relative ease.

One small issue: Backblaze charges for egress ($0.01/GB of bandwidth) once your traffic exceeds 3x your current storage usage. With so many users, that's going to burn a gaping hole in my already empty wallet... luckily, [Cloudflare saves the day](https://www.backblaze.com/blog/backblaze-and-cloudflare-partner-to-provide-free-data-transfer/)! Cloudflare and Backblaze, through the Bandwidth Alliance, allow Cloudflare's CDN to cache and serve the content while it's actually stored in Backblaze, which dramatically reduces egress costs and can improve download speeds. Thus, we *finally* found the ideal solution of cheap, large storage that didn't involve smoking a poor VPS or its bandwidth limit.

To prevent download URLs from being way too long, we also set up transform rules that would allow for short, sensible, human-readable URLs that are easier to memorize (our horrific artifact naming notwithstanding). For example, `stable.eden-emu.dev/v0.2.0-rc2/<ARTIFACT>` will bring you to a v0.2.0-rc2 stable artifact, rather than having to type out or copy a long S3 bucket URL that's impossible to memorize.

### The API, though

Though distributing assets was the majority of the issue, the sheer volume of API requests is still a big issue on its own. As I type this, the web server is actively struggling to keep up with API requests, because there are just so many. Users have been reporting significant update checker delays as well.

To solve this, we can utilize the existing Backblaze backing store and create a "fake" API, where only the necessities used by the update checker are published. As an example, see <https://stable.eden-emu.dev/v0.2.0-rc2/release.json>: only the tag, title, and changelog are included, and **never have to touch the origin web server**!

These changes will be applied in the April 24th Nightly and beyond, and 0.2.0-rc3 and beyond.

## What about me?

With all these changes in place, how does this affect you?

Well, ideally not much (yet). Releases will still be available on Forgejo, and you can continue to use the API at-will (just don't spam it please, I pay for this out of pocket). How this will change is unknown right now, but there'll be another blog post explaining it.

## So, what's next?

To say that we're in a good position would be utterly naive beyond comprehension. As a Nintendo Switch emulator with a gigantic bounty on our foreheads, we are never truly safe from DMCA, and there's only so much we can do. We are *always* looking for ways to improve our situation: financials, DMCA safety, and server pressure.

### Financials

Thus far, almost all server and domain costs have been paid out-of-pocket, though recently donation funds have been used to cover future costs. You are **always** welcome and encouraged to donate to improve our situation! You may do so through any of these methods:

- [Liberapay](<https://liberapay.com/crueter>)
- PayPal (`eden@eden-emu.dev`)
- Bitcoin (`bc1pknzdackezf6s5nxqwn6hx940a7e0k3lk7ggpczp9u4jn4a25lnyqrgvdxx`)

With the increase in distribution and its methods, costs have been rising significantly as of late. Again, you are encouraged to donate to help us keep this alive!

### DMCA Safety

The most immediate threat is our Actions workflow. Since it's hosted on GitHub, it is similarly endangered as the CI repositories and our old Releases repository. However, we really don't have any viable alternatives that don't break the bank:

- **Have someone else host CI**
  - No
- **Use Blacksmith or some other third-party runner**
  - Most of these don't support Forgejo actions, but if any do, please let us know.
- **Buy a Threadripper, a Neoverse, and a Mac Mini**
  - Unironically the best option, but still has issues:
    - To get a similar level of concurrency as GitHub Actions, we would need to spend well over $8000
    - Where does all the bandwidth come from? Not my home network, because 600Mbps up/down isn't enough
    - Incredibly difficult to maintain
    - Electric bill $$$$$$
- **Buy a bunch of Ryzen Mini PCs, an Ampere board, and a Mac Mini**
  - See before, but maybe cheaper if eBay is kind to us on any given day
- **Use Codeberg's runners**
  - Highly unlikely they would let us, and even so, they're notoriously hostile towards emulators.
- **Use Freedesktop's runners**
  - See before, though they seem to be somewhat friendlier to emulators

Please let us know of any alternatives that may actually work in the future.

### Server Pressure

Most of the pressure will be mitigated with our current measures, but in the future, the releases pages may be moved to separate, static, auto-generated pages containing changelogs and links to every release, rather than using Forgejo and eating up precious server resources. No plans exist for this at the time.
