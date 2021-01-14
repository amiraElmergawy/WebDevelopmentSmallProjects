const request = require('request')

const getData = (callback)=>{
    const url = `https://jsonplaceholder.typicode.com/todos`
    request({ url, json:true }, (error, response )=>{
        if(error) {
            callback('el code 8lt', undefined)
        }
        else{
            callback(undefined, response.body)
        }
    })
}

module.exports = getData