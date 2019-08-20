declare module 'a-table' {
  export default class aTable {
    constructor(el: HTMLElement, config: {})
    afterEntered(): void
    afterRendered(): void
    getTable(): string
  }
}
