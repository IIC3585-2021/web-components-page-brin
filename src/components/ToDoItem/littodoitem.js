import {LitElement, html, css} from 'https://unpkg.com/lit-element/lit-element.js?module';

class LitToDoItem extends LitElement {
  static get styles() {
    return css`
      #todo-item-container {
        display: flex;
        padding: 0.3rem 0rem;
        font-family: 'Helvetica Neue', sans-serif;
        font-size: 16px;
        align-items: center;
      }

      #todo-text {
        flex-grow: 1;
      }

      .inactive {
        text-decoration: line-through solid black;
        color: grey;
      }

      input {
        margin-right: 10px;
      }

      button {
        background-color: #d3d3d3; /* Green */
        border: none;
        color: black;
        padding: 5px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
      }
    `;
  }
  render(){
    return html`
    <div id="todo-item-container">
      <input type="checkbox" @click="${this.toggleActive}"/>
      <span id="todo-text"> ${this.text}</span>
      <button @click="${this.removeTask}"> Remove </button>
    </div>
    `;
  }

  toggleActive(e) {
    if (this.active) {
        this.shadowRoot.querySelector("#todo-text").classList.remove('inactive');
      } else {
        this.shadowRoot.querySelector("#todo-text").classList.add('inactive');
      }
    this.active = !this.active;
  }

  removeTask(e) {
    let event = new CustomEvent('onRemove', {
      detail: this.index
    });
    this.dispatchEvent(event);
  }

  constructor() {
    super();
    this.text = "Lit test todo item";
    this.isActive = true;
    this.index = 0;
  }

  static get properties(){
    return{
      text: {type:String},
      index: {type:Number}
    };
  }
}

customElements.define('lit-todo-item', LitToDoItem);