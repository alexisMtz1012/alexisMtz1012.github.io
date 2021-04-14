class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `&copy; 2021
      Alexis Martínez Enríquez.`;
  }
}
customElements.define(
  "mi-footer", MiFooter);