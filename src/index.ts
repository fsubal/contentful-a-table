import aTable from 'a-table'
import { init, FieldExtensionSDK } from 'contentful-ui-extensions-sdk'

/**
 * HACK: sandbox iframe なので window.alert すると意図しない挙動になる
 */
window.alert = console.log
window.confirm = (message: string) => {
  console.log(message)
  return true
}

const config = {
  lang: 'ja',
  selector: {
    option: [{ label: '.hidden クラスをつける', value: 'hidden' }]
  }
}

class Table {
  private table = new aTable(this.el, config)

  constructor(private readonly el: HTMLElement, private readonly sdk: FieldExtensionSDK) {
    this.table.afterEntered = this.onChange.bind(this)
    this.table.afterRendered = this.onChange.bind(this)
    this.onChange()
  }

  private onChange() {
    if (!this.sdk) {
      return
    }

    this.sdk.field.setValue(this.table.getTable())
  }
}

init(_sdk => {
  const sdk = _sdk as FieldExtensionSDK
  sdk.window.startAutoResizer()

  const el = document.getElementById('root')
  if (!el) {
    return
  }

  const html = parseInitialValue(sdk)
  if (html) {
    el.innerHTML = html
  }

  new Table(el, sdk)
})

const defaultTemplate = `
<tr>
  <th>head1</th>
  <th>head2</th>
</tr>
<tr>
  <td>body1</td>
  <td>body2</td>
</tr>
`

const parseInitialValue = (sdk: FieldExtensionSDK) => {
  const raw = sdk.field.getValue()
  const domparser = new DOMParser()
  const html = domparser.parseFromString(raw, 'text/html')
  const table = html.querySelector('table')

  return table ? table.innerHTML : defaultTemplate
}
