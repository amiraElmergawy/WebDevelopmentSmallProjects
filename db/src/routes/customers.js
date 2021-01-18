const express = require('express')
const customerModel = require('../models/customers')
const router = new express.Router()

router.get('/', async (req, res) => {
    try {
        allData = await customerModel.find({})
        data = {
            status: 1,
            message: 'all data retriverd',
            data: allData
        }
        res.render('index',data)
    }
    catch (e) {
        res.status(500).send({
            status: 0,
            message: 'data retreving error',
            data: e
        })
    }
})


router.post('/addCustomer', async (req, res) => {
    const customer = new customerModel(req.body)
    try {
        await customer.save()
        res.status(200).send('<div class="alert alert-success" role="alert">data inserted succefully</div> <a href="/" class="btn btn-primary">Home</a>')
        // res.send({
        //     status: 1,
        //     message: 'successfuly',
        //     data: customer
        // })
    }
    catch (e) {
        res.status(500).send('<div class="alert alert-danger" role="alert">data inserting failed</div> <a href="/" class="btn btn-primary">Home</a>')
        // res.send({
        //     status: 0,
        //     message: 'data inserting error',
        //     data: e
        // })
    }
})


router.get('/customers/:customerid', async (req, res) => {
    customerid = req.params.customerid
    try {
        customerData = await customerModel.findById(customerid)
        if (!customerData) return res.send({
            status: 2,
            message: 'not found',
            data: ''
        })
        res.status(200).send({
            status: 1,
            message: 'customer data retriverd',
            data: customerData

        })
    }
    catch (e) {
        res.status(500).send({
            status: 0,
            message: 'data retrive error',
            data: e
        })
    }

})

router.put('/customers/:customerid', async (req, res) => {
    avlUpdates = ["name", "balance"]
    const keys = Object.keys(req.body) // check if the objects key enterd is available to be updates
    const flag = keys.every((k) => avlUpdates.includes(k))
    if (!flag) return res.send({
        status: 0,
        message: "invalid update keys",
        data: ""
    })
    try {
        const customer = await customerModel.findByIdAndUpdate(
            req.params.customerid,
            req.body,
            { runValidators: true }
        )
        if (!customer) return res.send({
            status: 2,
            message: 'customer not found',
            data: ''
        })
        res.status(200).send('<div class="alert alert-success" role="alert">data updated succefully</div> <a href="/" class="btn btn-primary">Home</a>')
        //     {
        //     status: 1,
        //     message: "updated",
        //     data: customer
        // })
    }
    catch (e) {
        res.status(500).send('<div class="alert alert-danger" role="alert">data editing failed</div> <a href="/" class="btn btn-primary">Home</a>')
        //     {
        //     status: 0,
        //     message: 'error in edit',
        //     data: ''
        // })
    }
})

router.delete('/customers/:customerid', async (req, res) => {
    try {
        const customer = await customerModel.findByIdAndDelete(req.params.customerid)
        if (!customer) return res.send({
            status: 2,
            message: 'customer not found'
        })
        res.status(200).send({
            status: 1,
            message: "deleted"
        })
    }
    catch (e) {
        res.status(500).send({
            status: 0,
            message: 'error in delete'
        })
    }
})

module.exports = router