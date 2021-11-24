// NPM dependencies
const express = require('express')
const router = express.Router()

const password = process.env.PASSWORD

// Clear all data in session
router.post('/clear-data', function (req, res) {
    req.session.data = {}
    res.render('prototype-admin/clear-data-success')
})

// Check authentication password
router.post('/password', function (req, res) {
    const submittedPassword = req.body.password

    if (submittedPassword == password){
        req.session.authenticated = true
        res.redirect('/')
    } else {
        res.redirect('/prototype-admin/password?error=wrong-password')
    }
})

module.exports = router