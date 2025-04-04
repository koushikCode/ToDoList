document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');
    
    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    
    // Render todos
    function renderTodos() {
        todoList.innerHTML = '';
        
        todos.forEach((todo, index) => {
            const todoItem = document.createElement('li');
            todoItem.classList.add('todo-item');
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('todo-checkbox');
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => toggleTodo(index));
            
            const todoText = document.createElement('span');
            todoText.classList.add('todo-text');
            if (todo.completed) {
                todoText.classList.add('completed');
            }
            todoText.textContent = todo.text;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteTodo(index));
            
            todoItem.appendChild(checkbox);
            todoItem.appendChild(todoText);
            todoItem.appendChild(deleteBtn);
            
            todoList.appendChild(todoItem);
        });
        
        // Save to localStorage
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    // Add todo
    function addTodo() {
        const todoText = todoInput.value.trim();
        
        if (todoText !== '') {
            todos.push({
                text: todoText,
                completed: false
            });
            
            todoInput.value = '';
            renderTodos();
        }
    }
    
    // Toggle todo completion status
    function toggleTodo(index) {
        todos[index].completed = !todos[index].completed;
        renderTodos();
    }
    
    // Delete todo
    function deleteTodo(index) {
        todos.splice(index, 1);
        renderTodos();
    }
    
    // Event listeners
    addButton.addEventListener('click', addTodo);
    
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    // Initial render
    renderTodos();
}); 