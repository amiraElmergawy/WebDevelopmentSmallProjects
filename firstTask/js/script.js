let taskKeys = ['title', 'type', 'description'],
    todoList = [
        {
            title: 'first title',
            type: 't1',
            description: 'first description',
            status: false
        },
        {
            title: 'second title',
            type: 't3',
            description: 'second description',
            status: false
        },
    ],
    btnShow = document.querySelector('#showHide'),
    form = document.querySelector("#addTask"),
    dataSec = document.querySelector('#dataSection');
window.localStorage.setItem('todoList', JSON.stringify(todoList));

addElement = function (elementType, elementInnerText, parent, property = null, propertyValue = null) {
    element = document.createElement(elementType);
    element.innerHTML = elementInnerText;
    parent.appendChild(element);
    if (property) {
        element[property] = propertyValue;
    }
}

//disply process
showTasks = function (flag = false) { // flag will be false at the first time calling showTasks else will be true
    // console.log(JSON.parse(window.localStorage.getItem('todoList')));
    todoList = JSON.parse(window.localStorage.getItem('todoList'));
    if (todoList.length != 0) { // if their is data display
        if (flag) {
            // append only the last task
            div = document.createElement('div');
            addElement('span', todoList.length - 1, div, 'className', 'd-none');
            taskKeys.forEach(key => {
                addElement('span', todoList[todoList.length - 1][key], div);
            });
            addElement('i', '', div, 'className', 'fas fa-trash btn text-white');
            addElement('i', '', div, 'className', 'fas fa-pencil-alt btn text-white');
            div.className = 'task';
            dataSec.appendChild(div);
        } else {
            // show all tasks
            dataSec.innerHTML = '';
            todoList.forEach((task, i) => {
                div = document.createElement('div');
                addElement('span', i, div, 'className', 'd-none');
                taskKeys.forEach(key => {
                    addElement('span', task[key], div);
                });
                addElement('i', '', div, 'className', 'fas fa-trash btn text-white');
                addElement('i', '', div, 'className', 'fas fa-pencil-alt btn text-white');
                div.className = 'task';
                dataSec.appendChild(div);
            });
        }
    } else {
        dataSec.innerHTML = '<h1>No Data Found</h1>'
    }
}

btnShow.addEventListener('click', function (e) {
    document.querySelector('#formSection').classList.toggle('d-none');
});

//addition process
form.addEventListener('submit', function (e) {
    e.preventDefault();
    let data = e.target.elements;
    let task = {};
    taskKeys.forEach(element => {
        task[element] = data[element].value;
    });
    task.status = false;
    todoList.push(task);
    window.localStorage.setItem('todoList', JSON.stringify(todoList));
    form.reset();
    console.table(todoList);
    showTasks(true);
});

showTasks();

//deletion process
// console.log(allDeletionNodes);
// document.querySelectorAll('.fa-trash').forEach(item => {
//     item.addEventListener('click', function (e) {
//         let deletionDiv = e.target.parentElement;
//         let index = +deletionDiv.firstChild.innerHTML;
//         // console.log(deletionDiv.parentElement);
//         deletionDiv.parentElement.removeChild(deletionDiv);
//         // console.log(deletionDiv.parentElement);
//         // allDeletionNodes.splice(index, 1);
//         todoList.splice(index, 1);
//         window.localStorage.setItem('todoList', JSON.stringify(todoList));
//         console.log(document.querySelectorAll('.fa-trash'));
//         showTasks(false);
//     })
// })


// let allDeletionNodes = document.querySelectorAll('.fa-trash'); // save all divs that can be deleted
// dataSec.addEventListener('click', function (e) {
//     console.log('el event 7sl');
//     console.log(dataSec.contains);
//     console.log(dataSec.innerHTML);
//     console.log(e.target.parentElement)
//     allDeletionNodes.forEach((div, index) => {
//         console.log('mn dakhl el 7adth elaul');
//         if (div == e.target.parentElement) {
//             console.log('mn dakhl el 7adth');
//             dataSec.removeChild(div);
//             todoList.splice(index, 1);
//             window.localStorage.setItem('todoList', JSON.stringify(todoList));
//             showTasks(false);
//         }
//     })
// })

// document.getElementsByClassName('.fa-trash').addEventListener('click', function (e) {
//     let index = +e.target.parentElement.firstChild.innerHTML;
//     todoList.splice(index, 1);
//     window.localStorage.setItem('todoList', JSON.stringify(todoList));
//     showTasks(false);
// })

dataSec.addEventListener('click', function (e) {
    let deletionDiv = e.target.parentElement;
    let index = +deletionDiv.firstChild.innerHTML; // access first hidden span that contain its id
    dataSec.removeChild(deletionDiv);
    todoList.splice(index, 1);
    window.localStorage.setItem('todoList', JSON.stringify(todoList));
    showTasks(false);
})


//editting process
document.querySelector('.fa-pencil-alt').addEventListener('click', function (e) {
    e.target.parentElement.classList.toggle('bg-dark')
})