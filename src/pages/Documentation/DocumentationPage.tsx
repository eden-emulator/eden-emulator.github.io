const RedirectDocs = () => {
  if (typeof window !== 'undefined') {
    window.location.replace('https://git.eden-emu.dev/eden-emu/eden/src/branch/master/docs/user/README.md')
  }
  return null
}

export default RedirectDocs
