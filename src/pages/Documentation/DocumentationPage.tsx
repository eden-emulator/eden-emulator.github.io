import { memo, useEffect } from 'react'

function DocumentationPage() {
  useEffect(() => {
    window.location.replace('https://git.eden-emu.dev/eden-emu/eden/src/branch/master/docs/user/README.md')
  }, [])

  return null
}

export default memo(DocumentationPage)
