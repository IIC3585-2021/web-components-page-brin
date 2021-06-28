/* TODO:
    - completar funcion remove para que eliminte las tasks
    - añadir callback a boton add, y que añada una nueva task
    - agregar css
 */

import template from "./template.js"


export default class ToDoItem extends HTMLElement {
  static get observedAttributes() {
    return ['text'];
  }

  constructor() {
    super();

    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this.active = true;

    // store the elements
    this.checkbox = this.shadowRoot.querySelector("input");
    this.removeButton = this.shadowRoot.querySelector("button");
    this.textSpan = this.shadowRoot.querySelector("#todo-text");

    // set initial values
    this.textSpan.innerText = this.text;
  }

  connectedCallback() {
    this.checkbox.addEventListener('click', (event) => {
      this.active = !this.active;

      if (this.active) {
        this.textSpan.classList.remove('inactive');
      } else {
        this.textSpan.classList.add('inactive');
      }
    });

    this.removeButton.addEventListener('click', (event) => {
      this.dispatchEvent(new CustomEvent('onRemove', { detail: this.index }));
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case 'text':
          this.text = newValue;
          this.textSpan.innerText = this.text;
          break;
      }
    }
  }

  get text() {
    return this.getAttribute('text');
  }

  get index() {
    return this.getAttribute('index');
  }

  set text(newVal) {
    this.setAttribute('text', newVal);
  }

  set index(newVal) {
    this.setAttribute('index', newVal);
  }
}

window.customElements.define('todo-item', ToDoItem);