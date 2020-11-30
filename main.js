// Todo class
class Todo {
    constructor(listItem) {
        this.listItem = listItem;
    }
}

// UI class
class UI {
    static displayTodoList() {

        const items = Store.getTodoItems();
        items.forEach((item) => UI.addItemToList(item));
    }

    // add item
    static addItemToList(item) {
        const list = document.querySelector('#todo-list');
        const ul = document.createElement('ul');

        ul.innerHTML = 
        `<li><span>${item.listItem}</span><a href = "#" class = "btn btn-danger btn-sm delete ">X</a></li>`;
        list.appendChild(ul);
    }

    // delete item
    static deleteItem(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.remove();
        }
    }

    // mark item
    static markItem(element) {
        if (!element.classList.contains('marked')) {
            element.classList.add('marked');
        } else {
            element.classList.remove('marked');
        }
    }

    // show alert message
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#todo-form');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    // clear fields after submit
    static clearFields() {
        document.querySelector('#list-item').value = '';
    }
}

// Local storage class
class Store {
    static getTodoItems() {
        let items;
        if (localStorage.getItem('items') === null) {
            items = [];
        } else {
            items = JSON.parse(localStorage.getItem('items'));
        }
        return items;
    }

    static addTodoItem(item) {
        const items = Store.getTodoItems();
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
    }

    static removeTodoItem(todoitem) {
        const items = Store.getTodoItems();
        items.forEach((item, index) => {
            if (item.listItem === todoitem) {
                items.splice(index, 1);
            }
        });
        localStorage.setItem('items', JSON.stringify(items));
    }
}

// Event to display todo list items
document.addEventListener('DOMContentLoaded', UI.displayTodoList());

// Event to add todo list item
document.querySelector('#todo-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const listItem = document.querySelector('#list-item').value;

    if (listItem === '') {
        UI.showAlert('Please enter To-Do item', 'danger');
    } else {
        const item = new Todo(listItem);
        UI.addItemToList(item);
        Store.addTodoItem(item)
        UI.showAlert('To-Do item added!', 'success')
        UI.clearFields();
    }
    
});

// Event to remove todo list item
document.querySelector('#todo-list').addEventListener('click', (e) => {
    UI.deleteItem(e.target);
    // console.log(e.target.previousElementSibling.textContent)
    Store.removeTodoItem(e.target.previousElementSibling.textContent);
    UI.showAlert('To-Do item removed!', 'success');
});

// Event to mark todo list item
document.querySelector('#todo-list').addEventListener('click', (e) => {
    UI.markItem(e.target);
});