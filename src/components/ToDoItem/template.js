const template = document.createElement('template');

const style = `
<style>
  @import "./src/components/ToDoItem/todoitem.css";
</style>
`;

template.innerHTML = `
${style}
<div id="todo-item-container">
  <input type="checkbox" />
  <span id="todo-text">  </span>
  <button> Remove </button>
</div>
`;

export default template;