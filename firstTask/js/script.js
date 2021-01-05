// todoList = [
//     {
//         title: 'first title',
//         type: 't1',
//         description: 'first description',
//         status: false
//     },
//     {
//         title: 'second title',
//         type: 't3',
//         description: 'second description',
//         status: false
//     },
// ],
//window.localStorage.setItem('todoList', JSON.stringify(todoList));
let taskKeys = ['title', 'type', 'description'],
    types = ['t1', 't2', 't3', 't4'],
    btnShow = document.querySelector('#showHide'),
    form = document.querySelector("#addTask"),
    dataSec = document.querySelector('#dataSection');
todoList = JSON.parse(window.localStorage.getItem('todoList')) || []; // save empty array if it is not exist
temp = "";
types.forEach(add=>{
    temp += `<option value="${add}">${add}</option>`
})
document.querySelector('select').innerHTML += temp;

//disply process
addElement = function (elementType, elementInnerText, parent, property = null, propertyValue = null) {
    element = document.createElement(elementType);
    element.innerHTML = elementInnerText;
    parent.appendChild(element);
    if (property) {
        element[property] = propertyValue;
    }
}

appendSingleTask = function(elementIndex){
    let flag;
    div = document.createElement('div');
    addElement('span', elementIndex, div, 'className', 'd-none');
    taskKeys.forEach(key => {
        addElement('span', todoList[elementIndex][key], div);
    });
    addElement('i', '', div, 'className', 'fas fa-trash btn text-white');
    addElement('i', '', div, 'className', 'fas fa-pencil-alt btn text-white');
    div.className = 'task';
    if (todoList[elementIndex].status == true) {
        div.classList.add('bg-dark');
    }
    dataSec.appendChild(div);
}

showTasks = function (flag = false) { // flag will be false at the first time calling showTasks else will be true
    if (todoList.length != 0) { // if their is data display
        if (flag) {
            // append only the last task
            appendSingleTask(todoList.length - 1);
        } else {
            // show all tasks
            dataSec.innerHTML = '';
            todoList.forEach((task, i) => {
                appendSingleTask(i);
            });
        }
        // } else {
        // dataSec.innerHTML = '<h1>No Data Found</h1>';
    }
}

btnShow.addEventListener('click', function (e) {
    this.textContent == "Add Task"? this.textContent="Hide Form":this.textContent="Add Task";
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

//delete and edit processes
dataSec.addEventListener('click', function (e) {
    let element = e.target;
    let parentDiv = element.parentElement;
    let index = +parentDiv.firstChild.innerHTML; // access first hidden span that contain its id
    if (element.className.includes('trash')) {
        dataSec.removeChild(parentDiv);
        todoList.splice(index, 1);
    } else if (element.className.includes('pencil')) {
        todoList[index].status = ! todoList[index].status;
    }
    window.localStorage.setItem('todoList', JSON.stringify(todoList));
    showTasks();
})

