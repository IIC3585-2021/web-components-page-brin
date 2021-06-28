import template from "./template.js"


export default class ToDoList extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'prompt', 'items'];
  }

  constructor() {
    super();

    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this.titleText = this.shadowRoot.querySelector('#title');
    this.inputText = this.shadowRoot.querySelector('#input-text');
    this.itemsContainer = this.shadowRoot.querySelector('ul');
    this.newTask = this.shadowRoot.querySelector('input[type="text"]');
    this.addButton = this.shadowRoot.querySelector('#add-task-button');

    // set initial values
    this.titleText.innerText = this.title;
    this.inputText.innerText = this.prompt;

    // populate initial list
    // this.render();
    this.items.forEach((item, index) => {
      const newItem = this.createItem(item, index);
      this.itemsContainer.appendChild(newItem);
    })
  }

  connectedCallback() {
    this.addButton.addEventListener('click', this.add);
  }

  // arrow function so it inherits the this. Otherwise
  // bind(this) could be used
  remove = (e) => {
    // update items
    const oldItems = this.items;
    oldItems.splice(e.detail, 1);
    this.items = oldItems;

    // this.render()
    // remove the element from the dom
    const elem = this.shadowRoot.querySelector(`todo-item[index="${e.detail}"]`);
    this.itemsContainer.removeChild(elem);

    // re index all elements past the removed one
    const elems = this.shadowRoot.querySelectorAll(`todo-item[index]`);
    elems.forEach(elem => {
      const ind = +elem.getAttribute('index');
      if (ind > +e.detail) {
        elem.setAttribute('index', `${ind - 1}`);
      }
    });
  }

  add = () => {
    // get the text from the input
    const text = this.newTask.value;
    if (text === '') {
      return;
    }
    this.newTask.value = '';

    const oldItems = this.items
    const index = oldItems.push(text) - 1;
    this.items = oldItems;

    // this.render();
    const newItem = this.createItem(text, index);
    this.itemsContainer.appendChild(newItem);
  }

  createItem(text, index) {
    const item = document.createElement('todo-item');
    item.setAttribute('text', text);
    item.setAttribute('index', index)
    item.addEventListener('onRemove', this.remove);
    return item;
  }

  render() {
    // remove dated contents
    this.itemsContainer.innerHTML = '';

    this.items.forEach((item, index) => {
      const newItem = this.createItem(item, index);
      this.itemsContainer.appendChild(newItem);
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case 'title':
          this.title = newValue;
          this.titleText.innerText = this.title;
          break;
        case 'prompt':
          this.prompt = newValue;
          this.inputText.innerText = this.prompt;
          break;
        case 'items':
          this.items = newValue;
          break;
      }
    }
  }

  get title() {
    return this.getAttribute('title');
  }

  get prompt() {
    return this.getAttribute('prompt');
  }
  
  get items() {
    return JSON.parse(this.getAttribute('items').replaceAll("'", '"'));
  }

  set title(newVal) {
    this.setAttribute('title', newVal);
  }

  set prompt(newVal) {
    this.setAttribute('prompt', newVal);
  }

  set items(newVal) {
    if (typeof(newVal) === "object") {
      this.setAttribute('items', JSON.stringify(newVal));
    } else if (typeof(newVal) === "string") {
      this.setAttribute('items', newVal)
    }
  }
}

window.customElements.define('todo-list', ToDoList);