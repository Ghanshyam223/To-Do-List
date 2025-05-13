
window.onload = function () {
  loadTasks();
};

function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (task === "") return;

  createTaskElement(task);
  saveTask(task);
  input.value = "";
}

function createTaskElement(task, isCompleted = false) {
  const li = document.createElement("li");
  if (isCompleted) li.classList.add("completed");

  li.textContent = task;

  // Toggle complete
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateTasks();
  });

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.onclick = () => {
    li.remove();
    updateTasks();
  };

  li.appendChild(delBtn);
  document.getElementById("taskList").appendChild(li);
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ task, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTasks() {
  const listItems = document.querySelectorAll("#taskList li");
  const tasks = [];
  listItems.forEach((li) => {
    const text = li.childNodes[0].textContent;
    const completed = li.classList.contains("completed");
    tasks.push({ task: text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(({ task, completed }) => createTaskElement(task, completed));
}
