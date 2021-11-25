// NPM dependencies
const express = require('express')
const router = express.Router()

const password = process.env.PASSWORD

// Clear all data in session
router.post('/clear-data', function (req, res) {
    req.session.data = {}
    res.render('prototype-admin/clear-data-success')
})

// Render password page with a returnURL to redirect people to where they came from
router.get('/password', function (req, res) {
    const returnURL = req.query.returnURL || "/"
    res.render('prototype-admin/password', {returnURL})
})

// Check authentication password
router.post('/password', function (req, res) {
    const submittedPassword = req.body.password
    const returnURL = req.body.returnURL

    if (submittedPassword == password){
        req.session.authenticated = true
        res.redirect(returnURL)
    } else {
        res.redirect('/prototype-admin/password?error=wrong-password&returnURL=' + returnURL)
    }
})

module.exports = router