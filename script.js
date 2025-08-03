var taskInput = document.getElementById("task-input")
var addButton = document.getElementById("add-task-btn")
var taskList = document.getElementById("task-list")
 document.addEventListener('DOMContentLoaded', () => {
            

            // Function to add a new task
            function addTask() {
                const taskText = taskInput.value.trim(); // Get the input value

                // Alert if the input is empty
                if (taskText === "") {
                    alert("Please enter a task!");
                    return;
                }

                // Create a new list item
                const li = document.createElement('li');
                li.textContent = taskText;

                // Create a remove button
                const removeButton = document.createElement('button');
                removeButton.textContent = "Remove";
                removeButton.className = 'remove-btn';

                // When remove button is clicked, remove the list item
                removeButton.onclick = function () {
                    taskList.removeChild(li);
                };

                // Append the remove button to the list item
                li.appendChild(removeButton);

                // Add the list item to the task list
                taskList.appendChild(li);

                // Clear the input field
                taskInput.value = "";
            }

            // Event listener for button click
            addButton.addEventListener('click', addTask);

            // Event listener for pressing Enter key
            taskInput.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    addTask();
                }
            });

            // Optional: Call addTask on page load if needed
            // addTask(); // Uncomment if you want to auto-add a task on load
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