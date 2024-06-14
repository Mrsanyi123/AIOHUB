document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.querySelector('.todo-input');
    const todoButton = document.querySelector('.todo-button');
    const todoList = document.querySelector('.todo-list');

    todoButton.addEventListener('click', (event) => {
        event.preventDefault();

        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        todoDiv.innerHTML = `
            <li class="todo-item">${todoInput.value}</li>
            <button class="complete-btn"><i class="fas fa-check"></i></button>
            <button class="trash-btn"><i class="fas fa-trash"></i></button>
        `;
        todoList.appendChild(todoDiv);
        todoInput.value = '';
    });

    todoList.addEventListener('click', (event) => {
        const item = event.target;

        if (item.classList.contains('trash-btn')) {
            const todo = item.parentElement;
            todo.classList.add('deleted');
            setTimeout(() => {
                todo.remove();
            }, 500); // Add delay for CSS animation effect (optional)
        }

        if (item.classList.contains('complete-btn')) {
            const todo = item.parentElement;
            todo.classList.toggle('completed');
        }
    });
});
