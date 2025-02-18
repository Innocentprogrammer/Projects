document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("tasks");
  const taskInput = document.getElementById("task-input");
  const addTaskButton = document.getElementById("add-task");

  let tasks = [];

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.setAttribute("draggable", true);
      li.innerHTML = `
                <div class="task-content ${task.completed ? "completed" : ""}">
                    ${task.description}
                </div>
                <div class="task-actions">
                    <button onclick="editTask(${index})"><img src="pen.webp" style="width:20px; background-color:transparent; height:20px;"/></button>
                    <button onclick="deleteTask(${index})"><img src="bin.png" style="width:20px; background-color:transparent; height:20px;"/></button>
                    <button onclick="toggleCompletion(${index})">${
        task.completed ? "Undo" : "Complete"
      }</button>
                </div>
            `;
      li.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", index);
      });
      taskList.appendChild(li);
    });
  }

  function addTask() {
    const newTask = { description: taskInput.value, completed: false };
    tasks.push(newTask);
    taskInput.value = "";
    renderTasks();
  }

  window.editTask = function (index) {
    const task = tasks[index];
    const newDescription = prompt("Edit task:", task.description);
    if (newDescription !== null) {
      task.description = newDescription;
      renderTasks();
    }
  };

  window.deleteTask = function (index) {
    tasks.splice(index, 1);
    renderTasks();
  };

  window.toggleCompletion = function (index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  };

  addTaskButton.addEventListener("click", addTask);

  // Drag and Drop for prioritizing
  taskList.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  taskList.addEventListener("drop", (e) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const targetIndex = Array.from(taskList.children).indexOf(e.target);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const [removed] = tasks.splice(draggedIndex, 1);
      tasks.splice(targetIndex, 0, removed);
      renderTasks();
    }
  });
});
