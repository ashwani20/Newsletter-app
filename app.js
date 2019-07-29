const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(__dirname))

app.post('/', function(req, res) {
    console.log('Posting from routeasa')
    var data = {
        members: [{
            email_address: req.body.inputEmail,
            status: 'subscribed',
            merge_fields: {
                FNAME: req.body.inputFname,
                LNAME: req.body.inputLname
            }
        }]
    }
    var jsonData = JSON.stringify(data)


    var options = {
        url: 'https://us3.api.mailchimp.com/3.0/lists/42b4d5fe14',
        method: 'POST',
        headers: {
            'Authorization': 'ashwani20 73ae270ac2006a6dc32320a2a3746e9c-us3'
        },
        body: jsonData
    }

    request(options, function(error, response, body) {
        if (error) {
            res.sendFile(__dirname + '/failure.html')
        }
        console.log(res.statusCode)
        if (res.statusCode === 200) {
            res.sendFile(__dirname + '/success.html')
        } else {
            res.sendFile(__dirname + '/failure.html')
        }
    })
})

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/signup.html')
})

app.post('/failure', function(req, res) {
    res.redirect('/')
})

app.listen(process.env.PORT || 3000, function(req, res) {
    console.log('Server started at port 3000')
})

// 73ae270ac2006a6dc32320a2a3746e9c-us3
// 73ae270ac2006a6dc32320a2a3746e9c-us3
// 42b4d5fe14