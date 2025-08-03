// Wait until the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // 1. Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // 2. Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // remove spaces

        // Validate input
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create <li> element for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Remove task on click
        removeBtn.onclick = function() {
            taskList.removeChild(li);
        };

        // Append button to li, then li to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";
    }

    // 3. Add event listener to button
    addButton.addEventListener('click', addTask);

    // 4. Allow pressing Enter to add a task
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});


 function loadTasks() {
                const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                storedTasks.forEach(taskText => addTask(taskText, false)); 
            }

            // Add task to the list and optionally save to localStorage
            function addTask(taskText = null, save = true) {
                // If no taskText was passed (user input), use input value
                if (!taskText) taskText = taskInput.value.trim();

                if (taskText === "") {
                    alert("Please enter a task!");
                    return;
                }

                // Create list item
                const li = document.createElement('li');
                li.textContent = taskText;

                // Create remove button
                const removeButton = document.createElement('button');
                removeButton.textContent = "Remove";
                removeButton.className = 'remove-btn';

                // Remove task from DOM & Local Storage
                removeButton.onclick = function () {
                    taskList.removeChild(li);
                    removeTaskFromStorage(taskText);
                };

                // Append button and li to the list
                li.appendChild(removeButton);
                taskList.appendChild(li);

                // Save to Local Storage if needed
                if (save) {
                    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                    storedTasks.push(taskText);
                    localStorage.setItem('tasks', JSON.stringify(storedTasks));
                }

                // Clear the input field
                taskInput.value = "";
            }

            // Remove task from localStorage
            function removeTaskFromStorage(taskText) {
                let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                storedTasks = storedTasks.filter(task => task !== taskText);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }

            // Event listeners
            addButton.addEventListener('click', () => addTask());
            taskInput.addEventListener('keypress', event => {
                if (event.key === 'Enter') addTask();
            });

            // Load tasks on page load
            loadTasks();
        ;