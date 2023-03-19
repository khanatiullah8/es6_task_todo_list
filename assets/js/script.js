const todoForm = document.todoForm;
const todoInput = todoForm.todoInput;
const todoAdd = document.querySelector(".add-btn");
const todoUpdate = document.querySelector(".update-btn");
const todoLists = document.querySelector(".todo__lists");
const todoDeleteAll = document.querySelector(".todo__delete--all");
const todoActiveCount = document.querySelector(".todo__active--count");

const checkLocal = JSON.parse(localStorage.getItem("todo"));
let todoArr = (checkLocal != null) ? checkLocal : [];

// deleteTodo()
const deleteTodo = () => {
  const deleteBtn = document.querySelectorAll(".todo__lists--delete");

  deleteBtn.forEach((del) => {
    del.addEventListener("click", () => {
      const dataIndex = del.dataset.idx;
      todoAdd.classList.remove("hide");
      todoUpdate.classList.remove("active");

      todoArr.splice(dataIndex, 1);
      localStorage.setItem("todo", JSON.stringify(todoArr));

      showTodo();
    });
  });
};

// deleteAllTodo()
const deleteAllTodo = () => {
  todoDeleteAll.addEventListener("click", () => {
    todoArr.splice(0, todoArr.length);
    localStorage.setItem("todo", JSON.stringify(todoArr));
    todoAdd.classList.remove("active");
    todoAdd.classList.remove("hide");
    todoUpdate.classList.remove("active");
    showTodo();
  });
}

// editTodo()
const editTodo = () => {
  const editBtn = document.querySelectorAll(".todo__lists--edit");
  const todoText = document.querySelectorAll(".todo__lists--text");

  editBtn.forEach((edit, index) => {
    edit.addEventListener("click", () => {
      const dataEdit = edit.dataset.edit;
      todoInput.value = todoText[index].innerText;
      todoInput.focus();
      todoAdd.classList.add("hide");
      todoUpdate.classList.add("active");
      todoUpdate.setAttribute('data-index', dataEdit);
    });
  });
};

// updateTodo()
const updateTodo = () => {
  const editIndex = todoUpdate.dataset.index;
  todoArr.splice(editIndex, 1, todoInput.value);
  localStorage.setItem("todo", JSON.stringify(todoArr));
  showTodo();
  todoAdd.classList.remove("hide");
  todoAdd.classList.remove("active");
  todoUpdate.classList.remove("active");
  todoUpdate.setAttribute('data-index', '');
}

// event on todo update button
todoUpdate.addEventListener('click', ()=> {
  updateTodo();
})

// showTodo()
const showTodo = () => {
  const getLocalTodo = JSON.parse(localStorage.getItem("todo"));

  if (getLocalTodo != null) {
    let li = "";

    getLocalTodo.forEach((value, idx) => {
      li += `
          <li class="todo__lists--item">
            <div>
              <span class="todo__lists--count">${idx+1}.</span>
              <span class="todo__lists--text">${value}</span>
            </div>
            <div>
              <span class="todo__lists--edit" data-edit=${idx}>edit</span>
              <span class="todo__lists--delete" data-idx=${idx}>delete</span>
            </div>
          </li>
        `;
    });
    todoLists.innerHTML = li;
    todoInput.value = '';
    todoDeleteAll.classList.remove('active');
    todoActiveCount.innerHTML = 0;

    if (todoLists.children.length != 0) {
      deleteTodo();
      editTodo();
      todoDeleteAll.classList.add('active');
      todoActiveCount.innerHTML = todoLists.children.length;
      deleteAllTodo();
    }
  }
};

// initial call -- showTodo()
showTodo();

// addTodo()
const addTodo = () => {
  const inputValue = todoInput.value.trim();
  if (inputValue != "") {
    todoArr.unshift(inputValue);
    localStorage.setItem("todo", JSON.stringify(todoArr));
    todoAdd.classList.remove("active");
    showTodo();
  }
}

// add button Event -- Add todo list
todoAdd.addEventListener("click", () => {
  addTodo();
});

// input event -- if input is empty, than "Add button" will not work
todoInput.addEventListener("keyup", () => {
  if (todoInput.value.trim() != "") {
    todoAdd.classList.add("active");
  } else {
    todoAdd.classList.remove("active");
  }
});

// input event -- add/update todo list if Enter is pressed
todoInput.addEventListener("keypress", (e) => {
  if(e.code == 'Enter') {
    if(!todoAdd.classList.contains('hide')) {
      addTodo();
    } else if(todoUpdate.classList.contains('active')) {
      updateTodo();
    }
  }
});

// form event - prevent default behaviour 
todoForm.addEventListener('submit', (e)=> {
  e.preventDefault();
})