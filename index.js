// {
//     id:
//     name:
//     description:
//     select:
// }

const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
let maxIndex = Number(localStorage.getItem('maxIndex')) || 0;

todoList.forEach(it => {
    const list = document.getElementById('list');
    const content = document.createElement('li');
    content.innerHTML = getTemplate(it.name, it.description, it.select, it.id);
    list.appendChild(content);
});

function updateLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
    localStorage.setItem('maxIndex', maxIndex);
}

function getTemplate(name, description, select, index) {
    return `
        <div id="element-list-${index}" class="add_list_block">
            <span class="style_list_element">${name}</span>
            <span class="style_list_element">${description}</span>                
            <span>${select}</span>
        </div>

        <div class="header_flex"></div>
        
        <button class="complite" id="complite_btn" onclick="onCompliteClick(${index})">Complite</button>
        <button class="delete" id="delete_btn" onclick="onDeleteClick(${index})">&#215;</button>
    `;
}

function onAddClick() {
    const nameField = document.getElementById('name');
    const name = nameField.value;

    if (name.length === 0) {
        nameField.style.borderColor = 'red';
    } else {
        nameField.style.borderColor = 'gray';

        const description = document.getElementById('description').value
        const select = document.getElementById('select').value
        const list = document.getElementById('list');

        todoList.push({
            id: maxIndex,
            name,
            description,
            select
        });

        const content = document.createElement('li');
        content.innerHTML = getTemplate(name, description, select, maxIndex);
        list.appendChild(content);

        maxIndex++;

        updateLocalStorage();
    }
};

function onDeleteClick(id) {
    const indexToDelete = todoList.findIndex(it => it.id === id);
    todoList.splice(indexToDelete, 1);

    const list = document.getElementById('list');
    const element = list.childNodes[indexToDelete + 1];
    list.removeChild(element);

    updateLocalStorage();
}

function onEvenClick() {
    const list = document.getElementById('list');
    for (let i = 0; i < list.childNodes.length; i++) {
        if ((i + 1) % 2 === 0) {
            list.childNodes[i + 1].style.backgroundColor = '#2E8B57';
        }
    }
}

function onOddClick() {
    const list = document.getElementById('list');
    for (let i = 0; i < list.childNodes.length; i++) {
        if ((i + 1) % 2 !== 0) {
            list.childNodes[i + 1].style.backgroundColor = '#FFFACD';
        }
    }
}

function onDeleteLastClick() {
    const list = document.getElementById('list');
    todoList.splice(todoList.length - 1, 1);
    const element = list.childNodes[list.childNodes.length - 1];
    list.removeChild(element);

    updateLocalStorage();
}

function onCompliteClick(id) {
    const findIndex2 = function (element) {
        return element.id === id;
    }

    const indexToComplite = todoList.findIndex(findIndex2);
    const tmp = todoList.splice(indexToComplite, 1)[0];
    todoList.push(tmp);

    const list = document.getElementById('list');
    const element = list.childNodes[indexToComplite + 1];
    document.getElementById(`element-list-${id}`).style['text-decoration'] = 'line-through';

    list.removeChild(element);
    list.appendChild(element);

    updateLocalStorage();
}

function onNewTaskClick() {
    const addBlock = document.getElementById('add_block');
    addBlock.style.display = 'flex';
}