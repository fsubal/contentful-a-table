import '@contentful/forma-36-react-components/dist/styles.css'

import React from 'react'
import { render } from 'react-dom'
import { init, FieldExtensionSDK } from 'contentful-ui-extensions-sdk'

interface Props {
  sdk: FieldExtensionSDK
}

export function App({ sdk }: Props) {
  const [value, setValue] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value != null) {
        sdk.field.setValue(value)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [sdk, value])

  useSDKSetup(sdk, setValue)

  return <>hello</>
}

init(sdk => {
  render(<App sdk={sdk as FieldExtensionSDK} />, document.getElementById('root'))
})

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
if (module.hot) {
  module.hot.accept()
}
