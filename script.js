let tasks = [];

document.getElementById('add-task').addEventListener('click', function() {
    const taskInput = document.getElementById('task-input');
    const frequencySelect = document.getElementById('frequency');
    const dueDateInput = document.getElementById('due-date');
    
    const taskText = taskInput.value.trim();
    const frequency = frequencySelect.value;
    const dueDate = dueDateInput.value;

    if (taskText !== '' && (frequency !== 'daily' || dueDate !== '')) {
        const task = {
            text: taskText,
            frequency: frequency,
            dueDate: dueDate,
            completed: false
        };
        
        tasks.push(task);

        displayTasks();
        
        taskInput.value = '';
        dueDateInput.value = '';
    } else {
        alert('Please enter a task and a due time/date.');
    }
});

document.getElementById('frequency').addEventListener('change', function() {
    const dueDateInput = document.getElementById('due-date');
    if (this.value === 'daily') {
        dueDateInput.type = 'time'; 
        dueDateInput.value = getCurrentTime(); 
    } else {
        dueDateInput.type = 'datetime-local'; 
        dueDateInput.value = ''; 
    }
});

function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}
function updateClock() {
    const clock = document.getElementById('clock');
    clock.textContent = `Current Time: ${getCurrentTime()}`;
}
function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; 

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        
        const completeButton = document.createElement('button');
        completeButton.textContent = '✓';
        completeButton.className = 'complete-btn';
        completeButton.onclick = function() {
            task.completed = !task.completed;
            displayTasks(); 
        };

        const displayDate = task.frequency === 'daily' 
            ? `Time: ${new Date(task.dueDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}` 
            : `Due: ${new Date(task.dueDate).toLocaleString()}`;
        
        li.textContent = `${task.text} (${task.frequency}) - ${displayDate}`;
        if (task.completed) {
            li.classList.add('completed');
        }

        li.prepend(completeButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function() {
            editTask(index);
        };
        
        li.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            tasks.splice(index, 1);
            displayTasks();
        };

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}
function editTask(index) {
    const task = tasks[index];
    document.getElementById('task-input').value = task.text;
    document.getElementById('frequency').value = task.frequency;
    document.getElementById('due-date').value = task.dueDate;

    const addTaskButton = document.getElementById('add-task');
    addTaskButton.textContent = 'Update Task';
    
    addTaskButton.onclick = function() {
        const updatedText = document.getElementById('task-input').value.trim();
        const updatedFrequency = document.getElementById('frequency').value;
        const updatedDueDate = document.getElementById('due-date').value;

        if (updatedText !== '' && (updatedFrequency !== 'daily' || updatedDueDate !== '')) {
            task.text = updatedText;
            task.frequency = updatedFrequency;
            task.dueDate = updatedDueDate;
            addTaskButton.textContent = 'Add Task';
            addTaskButton.onclick = function() {
                const taskInput = document.getElementById('task-input');
                const frequencySelect = document.getElementById('frequency');
                const dueDateInput = document.getElementById('due-date');
                
                const taskText = taskInput.value.trim();
                const frequency = frequencySelect.value;
                const dueDate = dueDateInput.value;

                if (taskText !== '' && (frequency !== 'daily' || dueDate !== '')) {
                    const task = {
                        text: taskText,
                        frequency: frequency,
                        dueDate: dueDate,
                        completed: false
                    };
                    
                    tasks.push(task);

                    displayTasks();
                    
                    taskInput.value = '';
                    dueDateInput.value = '';
                } else {
                    alert('Please enter a task and a due time/date.');
                }
            };
            displayTasks();
        } else {
            alert('Please enter a task and a due time/date.');
        }
    };
}
function checkExpiredTasks() {
    const now = new Date();
    tasks.forEach((task, index) => {
        if (!task.completed && new Date(task.dueDate) < now) {
            alert(`Reminder: The task "${task.text}" is overdue!`);
            tasks.splice(index, 1);
            displayTasks();
        }
    });
}
setInterval(() => {
    updateClock();
    checkExpiredTasks();
}, 60000);
updateClock();
