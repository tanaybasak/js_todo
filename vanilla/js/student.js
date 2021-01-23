class Todo {
  constructor() {
    this.todoItems = todoItems;
    this.ulElement = document.getElementById("todo_list");
    this.addElement = document.getElementById("addTodo");
    this.emptyTodo = this.createElement("h2");
    this.emptyTodo.innerHTML = 'Please add Todo\'s';
    this.emptyTodo.setAttribute('class','emptyTodo text_center');
  }

  createElement = (item) => {
    return document.createElement(item);
  };

  listTodos = () => {
    this.ulElement.innerHTML = "";
    if(this.todoItems.length < 1) {
      this.ulElement.appendChild(this.emptyTodo);
      return;
    }
    for (let i in this.todoItems) {
      const liElement = this.createElement("li");
      const deleteElement = this.createElement("button");
      const checkBoxElement = this.createElement("input");
      const spanELement = this.createElement("span");

      // list element
      spanELement.setAttribute("class", "listText");
      spanELement.innerHTML = this.todoItems[i].task;
      spanELement.index = i;
      liElement.appendChild(spanELement);
      liElement.setAttribute("class", "card listItem");

      //checkbox element
      checkBoxElement.type = "checkbox";
      checkBoxElement.setAttribute("class", "list_checkbox");
      checkBoxElement.index = i;
      checkBoxElement.addEventListener("click", this.onCheckboxSelect);

      if (this.todoItems[i].completed) {
        checkBoxElement.checked = true;
        spanELement.style.textDecoration = "line-through";
      } else {
        spanELement.style.textDecoration = "none";
      }

      //delete element
      deleteElement.innerHTML = "Delete";
      deleteElement.setAttribute("class", "deleteTodo");
      deleteElement.index = i;
      deleteElement.addEventListener("click", this.deleteTodo);

      // append child
      liElement.appendChild(checkBoxElement);
      this.ulElement.appendChild(liElement);
      liElement.appendChild(deleteElement);

    }
  };

  addTodo = () => {
    this.todoItems.push({ task: this.addElement.value, completed: false });
    this.listTodos();
    this.addElement.value = "";
  };

  onCheckboxSelect = (e) => {
    const checkedElem = document.getElementsByClassName("listText")[
      e.target.index
    ];
    if (e.target.checked) {
      this.todoItems[e.target.index].completed = true;
      checkedElem.style.textDecoration = "line-through";
    } else {
      checkedElem.style.textDecoration = "none";
    }
  };

  deleteTodo = (e) => {
    this.todoItems.splice(e.target.index, 1);
    this.listTodos();
  };
}

const todoItems = [
  { task: "Hit the Gym", completed: false },
  { task: "Pay bills", completed: false },
  { task: "Meet George", completed: false },
  { task: "Buy eggs", completed: false },
  { task: "Read a book", completed: false },
  { task: "Organize Office", completed: false },
];

const todos = new Todo(todoItems);

todos.listTodos();
