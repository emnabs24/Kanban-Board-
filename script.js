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