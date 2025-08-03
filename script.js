const modal = document.querySelector(".confirm-modal");
const columnsContainer = document.querySelector(".columns");
const columns = columnsContainer.querySelectorAll(".column");
let currentTask = null;

const tasksElements = (content) => {
  const task = document.createElement("div");
  task.classList.add("task");
  task.innerHTML = `
        <div class="task-content">${content}</div>
    `;
  return task;
};

const taskInput = (text) => {
  const input = document.createElement("input");
  input.type = "text";
  input.classList.add("task-input");
  input.value = text;
  return input;
};

columnsContainer.addEventListener("click", (event) => {
  if (event.target.closest("button[data-add]")) {
    handleAdd(event);
  } else if (event.target.closest("button[data-edit]")) {
    handleEdit(event);
  } else if (event.target.closest("button[data-delete]")) {
    handleDelete(event);
  }
});

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
  task.addEventListener("dragstart", handleDragStart);
  task.addEventListener("dragend", handleDragEnd);
  return task;
};

const handleDragStart = (event) => {
  requestAnimationFrame(() => event.target.classList.add("dragging"));
};

const handleDragEnd = (event) => {
  event.target.classList.remove("dragging");
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

const handleDragOver = (event) =>{
  event.preventDefault();
  const draggedTask = document.querySelector('.dragging');
  const target = event.target.closest('.task, .tasks');;
  if(target === '' || target ===draggedTask)return;
  if(target.classList.contains('tasks')){
    target.appendChild(draggedTask)
  }
}

tasksElements = columnsContainer.querySelector('.tasks');
for(const taskEl of tasksElements){
  taskEl.addEventListener('dragover', handleDragOver);
  taskEl.addEventListener('drop', handleDrop);
}

const handleAdd = (event) => {
  const taskEl = event.target.closest(".column").lastElementChild;
  const input = createTaskInput();
  taskEl.appendChild(input);
  input.focus();
};

const handleBlur = (event) => {
  const input = event.target;
  const content = input.innerText.trim() || "Untitled";
  const task = createTask(content);
  input.replaceWith(task);
};

const handleEdit = (event) => {
  const task = event.target.closest(".task");
  const input = createTaskInput(task.innerText);
  task.replaceWith(input);
  input.focus();
};

const handleDelete = (event) => {
  currentTask = event.target.closest(".task");
  modal.querySelector(".preview").innerText = currentTask.innerText.substring(
    0,
    100
  );
  modal.showModal();
};

modal.querySelector("#confirm").addEventListener("click", () => {
  if (currentTask) {
    currentTask.remove();
    currentTask = null;
  }
  modal.close();
});

modal.querySelector("#cancel").addEventListener("click", () => modal.close());

let tasks = [
  ["Watch football", "Practice Coding", "Take Some Break"],
  ["Take a Walk", "Watch youtube videos", "Gist with my friends"],
  ["Play Golf", "Go to Church", "Play Basketball"],
];

tasks.forEach((col, i) => {
  for (let item of col) {
    columns[i].querySelector(".tasks").appendChild(createTask(item));
  }
});

const updateTaskCount = (column) => {
  const tasks = column.querySelector(".tasks").children;
  const taskCount = tasks.length;
  column.querySelector(".count").dataset.tasks = taskCount;
};

const observeTaskChange = () => {
  for (const column of columns) {
    const observeChanges = new MutationObserver(() => updateTaskCount(column));
    observeChanges.observe(column.querySelector(".tasks"), { childList: true });
  }
};
observeTaskChange();
