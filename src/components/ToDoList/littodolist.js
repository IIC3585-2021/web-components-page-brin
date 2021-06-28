import {LitElement, html, css} from 'https://unpkg.com/lit-element/lit-element.js?module';

class LitToDoList extends LitElement {
  static get styles() {
    return css`
      #todo-container {
        box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        padding: 20px;
        font-family: 'Helvetica Neue', sans-serif;
        max-width: 1080px;
        margin: 10px auto;
        font-size: 16px;
        line-height: 24px;
        text-align: justify;
        text-justify: inter-word;
      }

      #title {
        margin: 0 auto;
        text-align: center;
      }

      #input-container {
        display: flex;
        font-family: 'Helvetica Neue', sans-serif; 
        font-size: 16px;
        align-items: center;
      }

      #input-text {
        flex-grow: 1;
      }

      input {
        border: none;
        border-bottom: 1px solid black;
      }

      #add-task-button {
        margin-left: 1rem;
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
    if (typeof(this.items) == "string") {
      console.log("ASDSADASsaf");
      this.items = JSON.parse(this.items);
    }
    return html`
    <div id="todo-container">
      <h1 id="title">${this.title}</h1>
      <ul>
        ${this.items.map(
          (item, index) =>
            html`
              <lit-todo-item @onRemove="${this.removeTask}" text=${item} index=${index}></lit-todo-item>
            `
        )}
      </ul>
      <div id="input-container">
        <span id="input-text">${this.prompt}</span>
        <input type="text" .value=${this.inputvalue} @change=${this.inputvalueChanged} />
        <button @click="${this.addTask}">Add</button>
      </div>
    </div>
    `;
  }

  inputvalueChanged(e) {
    this.inputvalue = e.target.value;
    this.requestUpdate();
  }

  addTask() {
    if (this.inputvalue !== '') {
      this.items.push(this.inputvalue);
      this.inputvalue = '';
      this.requestUpdate();
    };
  }

  removeTask(e) {
    delete this.items[e.detail];
    this.requestUpdate();
  }

  constructor() {
    super();
    this.title = "Lit test todo item";
    this.prompt = "ADD VALUE";
    this.inputvalue = '';
    this.items = ['123', 'asd'];
  }

  static get properties(){
    return{
      title: {type:String},
      prompt: {type:String},
      items: {type:Array}
    };
  }
}

customElements.define('lit-todo-list', LitToDoList);