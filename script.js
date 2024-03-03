// Retrieve tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let activityTable = document.getElementById('activityBody');

// Display tasks
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.description}</span>
            <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Add new task
function addTask() {
    const input = document.getElementById('taskInput');
    const description = input.value.trim();
    if (description !== '') {
        tasks.push({ description, completed: false });
        input.value = '';
        displayTasks();
        saveTasks();
        logActivity('Added', description);
    }
}

// Toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
    saveTasks();
    const action = tasks[index].completed ? 'Completed' : 'Marked as incomplete';
    logActivity(action, tasks[index].description);
}

// Delete task
function deleteTask(index) {
    const deletedTask = tasks.splice(index, 1)[0];
    displayTasks();
    saveTasks();
    logActivity('Deleted', deletedTask.description);
}

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Log task activity
function logActivity(action, description) {
    const now = new Date();
    const dateString = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newRow = `<tr><td>${dateString}</td><td>${action}</td><td>${description}</td></tr>`;
    activityTable.innerHTML += newRow;
}

// Display tasks on page load
displayTasks();
