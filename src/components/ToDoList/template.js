const template = document.createElement('template');

const style = `
<style>
  @import "./src/components/ToDoList/todolist.css";
</style>
`;

template.innerHTML = `
${style}
<div id="todo-container">
  <h1 id="title"></h1>
  <ul>
  </ul>
  <div id="input-container">
    <span id="input-text"></span>
    <input type="text" />
    <button id="add-task-button">Add</button>
  </div>
</div>
`;

export default template;