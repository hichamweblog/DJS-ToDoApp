const dateEl = document.querySelector('.date');
const addTaskEl = document.querySelector('.add-task-input');
const addTaskBtnEl = document.querySelector('.add-task-btn');
const taskListEl = document.querySelector('.tasks');
const searchEl = document.querySelector('.search-input');
const searchBtnEl = document.querySelector('.search-btn');
const clearTasksBtnEl = document.querySelector('.clear-tasks-btn');
const totalTasksEl = document.querySelector('.total-tasks-text');
const tasksChildren = taskListEl.children;

addTaskBtnEl.addEventListener('click', handleAddTask);
clearTasksBtnEl.addEventListener('click', handleClearAllTasks);
taskListEl.addEventListener('click', handleTasksList);
searchEl.addEventListener('input', handleSearch);
handleDate(dateEl)

function handleAddTask(e) {
	e.preventDefault();
	const taskName = addTaskEl.value.trim();
	if (taskName) {
		const liEl = createTaskElement(taskName);
		taskListEl.append(liEl);
		addTaskEl.value = '';
		updateTaskCounter();
	}
}

function createTaskElement(taskName) {
	const liEl = document.createElement('li');
	liEl.classList.add('task');
	liEl.innerHTML = `
        <span class="task-name">${taskName}</span>
        <span>
            <span class="edit material-symbols-outlined">edit</span>
            <button class="task-delete-btn">
                <span class="delete-icon material-symbols-outlined">delete</span>
            </button>
        </span>
    `;
	return liEl;
}

function handleClearAllTasks() {
	Array.from(tasksChildren).forEach((task) => {
		task.remove();
	});
	updateTaskCounter();
}

function handleTasksList(e) {
	const parentElement = e.target.closest('.task');
	if (e.target.classList.contains('delete-icon')) {
		parentElement.remove();
		updateTaskCounter();
	}
	if (e.target.classList.contains('edit')) {
		parentElement.children[0].setAttribute('contenteditable', 'true');
	}
}

function handleSearch() {
	const searchValue = searchEl.value.trim().toLowerCase();
	Array.from(tasksChildren).forEach((task) => {
		const taskName = task.children[0].innerText.toLowerCase();
		const match = taskName.includes(searchValue);
		task.classList.toggle('hide', !match);
		task.classList.toggle('show', match);
	});
}

function updateTaskCounter() {
	totalTasksEl.innerHTML = `You have <span class="total-tasks-number">${tasksChildren.length}</span> tasks pending.`;
}
function handleDate(place) {
	const date = new Date().toLocaleDateString()
	place.innerText = date
}