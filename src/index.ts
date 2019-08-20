import aTable from 'a-table'
import { init, FieldExtensionSDK } from 'contentful-ui-extensions-sdk'

class Table {
  private table: aTable

  constructor(private readonly el: HTMLElement, private readonly sdk: FieldExtensionSDK) {
    this.table = new aTable(el, {})
    this.table.afterEntered = this.onChange.bind(this)
    this.table.afterRendered = this.onChange.bind(this)

    this.onChange()
    this.subscribe()
  }

  private onChange() {
    if (!this.sdk) {
      return
    }

    this.sdk.field.setValue(this.table.getTable())
  }

  private subscribe() {
    this.sdk.field.onValueChanged((next: any) => {
      if (!next) {
        return
      }

      if (confirm('Table is changed by external event. reload ?')) {
        location.reload()
      }
    })
  }
}

init(_sdk => {
  const sdk = _sdk as FieldExtensionSDK
  sdk.window.startAutoResizer()

  const el = document.getElementById('root')
  if (el) {
    new Table(el, sdk)
  }
})
