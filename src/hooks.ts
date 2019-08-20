import { useRef, useEffect, useMemo, useCallback } from 'react'
import { FieldExtensionSDK } from 'contentful-ui-extensions-sdk'

export const useSDKSetup = (sdk: FieldExtensionSDK, setValue: (value: any) => void) => {
  const detach = useMemo<Function>(
    () =>
      sdk.field.onValueChanged((next: any) => {
        if (next) {
          setValue(next)
        }
      }),
    [setValue, converter]
  )

  useEffect(() => {
    sdk.window.startAutoResizer()

    return () => {
      if (detach) {
        detach()
      }
    }
  }, [])
}
