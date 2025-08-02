const modal = document.querySelector(".confirm-modal");
const columnsContainer = document.querySelector(".columns");
const columns = columnsContainer.querySelectorAll(".column");

const tasksElaments = (content) => {
    const task = document.createElement("div");
    task.classList.add("task");
    task.innerHTML = `
        <div class="task-content">${content}</div>
    `;
        return task;
    }

    const taskInput = (text) => {
        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("task-input");
        input.value = text;
        return input;
    }

    columnsContainer.addEventListener('click', (event) =>{
        if(event.target.closest('button[data-add]')) {
            handleAdd(event)
        }
    })

    const createTask = (content) => {
  const task = document.createElement("div");
  task.className = "task";
  task.draggable = "true";
  task.innerHTML = `<div>${content}</div>
                <menu>
                <button data-edit=""><i class="bi bi-pencil-square"></i></button>
                <button data-delete><i class="bi bi-trash"></i></button>
              </menu>
`;
  return task;
};

    const createTaskInput = (text = "") => {
  const input = document.createElement("div");
  input.className = "task-input";
  input.contentEditable = true;
  input.dataset.placeHolder = "Task name";
  input.innerText = text;
  input.addEventListener("blur", handleBlur);
  return input;
};

    const handleAdd = (event) => {
    const taskEl = event.target.closest('.column').lastElementChild;
    const input = createTaskInput();
    taskEl.appendChild(input)
    input.focus()
    }

    const handleBlur = (event) => {
        const input = event.target;
        const content = input.innerText.trim() || 'Untitled';
        const task = createTask(content);
        input.replaceWith(task);
    }

    