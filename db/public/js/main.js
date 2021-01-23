btnShow = document.querySelector('#showHide')
updateBtns = document.querySelectorAll('#update')
deleteBtns = document.querySelectorAll('#delete')
form = document.querySelector('#form')
function showFlashMessage(element) {
    var event = new CustomEvent('showFlashMessage');
    element.dispatchEvent(event);
}

//   var flashMessages = document.getElementsByClassName('js-flash-message');

// document.getElementById('addForm').addEventListener('submit', (e)=>{

// })

btnShow.addEventListener('click', (e) => {
    e.target.textContent == 'Add Customer' ?
        e.target.textContent = 'Hide Form' : e.target.textContent = 'Add Customer'
    form.classList.toggle('d-none')
})
let checkUpdateAvailability = function () {
    // check if there is another raw is editable
    try {
        const editBtn = document.querySelectorAll('#edit') // may throw error if their is no doc. with this id
        console.log(editBtn)
        if (editBtn.length != 0) {
            return false
        }
        return true
    } catch (e) {
        console.log(e)
        return true // there is no editable rows
    }
}
updateBtns.forEach((element, index) => {
    element.addEventListener('click', function (e) {
        // make table raw editable (only td-name and td-balance)
        // change btns area to contain only updata btn
        if (checkUpdateAvailability()) {
            console.log(this)
            const customerId = this.value
            console.log(customerId)
            const customerTableRow = this.parentElement.parentElement // contains all customer data
            customerTableRow.getElementsByTagName('td')[1].setAttribute('contenteditable', 'true') // make td-name editable
            customerTableRow.getElementsByTagName('td')[2].setAttribute('contenteditable', 'true') // make td-balance editable
            let btnsArea = document.querySelectorAll('#buttons')
            btnsArea[index].innerHTML = '<button class="btn btn-success" id="edit" value="{{this._id}}" >Update</button>'
            // console.log(customerTableRow.getElementsByTagName('td')[2].textContent)
            // console.log(customerTableRow.firstChild.textContent) // will be empty if its data is dynamic
            document.getElementById('edit').addEventListener('click', function (e) {
                const newName = customerTableRow.getElementsByTagName('td')[1].textContent
                console.log(newName)
                const newBalance = Number(customerTableRow.getElementsByTagName('td')[2].textContent)
                console.log(newBalance)
                // id: customerId,
                var customer = {
                    name: newName,
                    balance: newBalance
                }
                fetch(`/customers/${customerId}`, {
                    method: 'put',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(customer)
                }).then(_ => {
                    location.reload();
                })
                // btnsArea[index].innerHTML = '<button class="btn btn-success" id="update" value="customerId" title="Edit customer"><i class="fas fa-pencil-alt"></i></button> <button class="btn btn-danger" id="delete" value="customerId"><i class="fas fa-trash"></i></button>'
            })
        }
        else //show first flash message avilable in your page
            console.log('can\'t edit this row')
        // showFlashMessage(flashMessages[0]);


    })
});

deleteBtns.forEach((element, index) => {
    element.addEventListener('click', function (e) {
        const customerId = this.value
        console.log(customerId)
        fetch(`/customers/${customerId}`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' }
        }).then(_ => {
            location.reload();
        })
    })
})