const yargs = require('yargs');
let fs = require('fs');
// const { argv } = require('process');
// const { number } = require('yargs');
let customers = [{
    accNumber: 1,
    name: 'hmada',
    balance: 50
}];
let createFileData = (fileName, data = null) => {
    if (data) fs.writeFileSync(fileName, JSON.stringify(data));
    else fs.writeFileSync(fileName, '[]');
}
let readFileData = (fileName) => {
    let data = [];
    try {
        data = JSON.parse(fs.readFileSync(fileName, { encoding: "utf8" })); // decode output to string then to json obj (array)
        if (data.length == 0) throw new Error('file is empty');
        if (!Array.isArray(data)) throw new Error('file content is not an array')
    } catch (e) {
        createFileData(fileName);
        //console.log(e.message)
    }
    return data;
}
let checkAccNumberValidity = (number) => {
    // return customer object or false if not found
    let customers = readFileData('test.json');
    let cond = customers.find((cus) => {
        return cus.accNumber == number
    });
    if (cond) {
        //console.log(cond);
        return cond;
    } return false; // not found
}
// customers = readFileData('test.json');
let UpdateFileData = (fileName, UpdatedCustomer) => {
    let data = readFileData(fileName); // all file data as an array
    data.forEach((cus) => {
        if (cus.accNumber == UpdatedCustomer.accNumber) { // update customer balance
            cus.balance = UpdatedCustomer.balance;
        }
    })
    createFileData(fileName, data);
    console.log('the process is done successfully');
}
yargs.command({
    command: 'addCostomer',
    describe: 'add costomer yarg',
    builder: {
        name: {
            demandOption: true, // name is required
            describe: 'customer name',
            type: 'string'
        },
        balance: {
            demandOption: true,
            describe: 'customer balance',
            type: 'number'
        },
        accNumber: {
            // demandOption: true, // not required as we can add cus. accNumber auto.
            describe: 'customer account number',
            type: 'number'
        }
    },
    handler: (argv) => {
        // console.log(argv);
        if (argv.accNumber) {
            if (checkAccNumberValidity(+argv.accNumber)) { // account number already exist
                console.log('can\'t add this customer since this account number already exist');
            } else {
                customers = readFileData('test.json');
                customers.push({
                    accNumber: +argv.accNumber,
                    name: argv.name,
                    balance: argv.balance
                })
                createFileData('test.json', customers);
                console.log('the process is done successfully');
            }
        } else { // accNumber not enterd
            customers = readFileData('test.json');
            customers.push({
                accNumber: customers.length+1, // as we begin from 1 ==> we can check before adding this number too ^_^
                name: argv.name,
                balance: argv.balance
            })
            createFileData('test.json', customers);
            console.log('the process is done successfully');
        }
    }
});
yargs.command({
    command: 'showAllCustomers',
    describe: 'show all customers yarg',
    handler: () => {
        customers = readFileData('test.json');
        if (customers.length != 0) { //file is not empty
            console.table(customers);
        } else {
            console.log('no data found');
        }
    }
})
yargs.command({
    command: 'addBalance',
    describe: 'add balance to customer by using his account number',
    builder: {
        accNumber: {
            demandOption: true,
            describe: 'cus. account number',
            type: 'number'
        },
        balance: {
            demandOption: true,
            describe: 'balance that will added to customer current balance',
            type: 'number'
        }
    },
    handler: (argv) => {
        let cus = checkAccNumberValidity(argv.accNumber);
        if (cus) { // account number exist
            if (isNaN(argv.balance)) {
                console.log('please, add a valid balance');
            } else {
                cus.balance += argv.balance;
                UpdateFileData('test.json', cus);
            }
        } else {
            console.log('can\'t add this balance since this account number not found');
        }
    }
});
yargs.command({
    command: 'withdrawBalance',
    describe: 'withdraw balance from customer by using his account number',
    builder: {
        accNumber: {
            demandOption: true,
            describe: 'cus. account number',
            type: 'number'
        },
        balance: {
            demandOption: true,
            describe: 'balance that will taken from customer current balance',
            type: 'number'
        }
    },
    handler: (argv) => {
        let cus = checkAccNumberValidity(argv.accNumber);
        if (cus) { // account number exist
            if (isNaN(argv.balance)) {
                console.log('please, add a valid balance');
            } else {
                let currentBalance = cus.balance;
                if (currentBalance < argv.balance) {
                    console.log(`enterd balance greater than your current, your current balance is ${currentBalance}`)
                } else {
                    cus.balance -= argv.balance;
                    UpdateFileData('test.json', cus);
                }
            }
        } else {
            console.log('can\'t withdraw this balance since this account number not found');
        }
    }
});
yargs.argv;