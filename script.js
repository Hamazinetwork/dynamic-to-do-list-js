// Run the script after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Get and trim the input value
        const taskText = taskInput.value.trim();

        // Check if the input is empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create a new <li> element for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Assign an onclick event to remove the task
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Append the remove button to the li, and li to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";
    }

    // Add event listener to button click
    addButton.addEventListener('click', addTask);

    // Add event listener to input for Enter key
    taskInput.addEventListener('keypress', function (event) {
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