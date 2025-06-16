const { Router } = require('express')
const Message = require('../models/message')
const router = Router()

function formatDate(date) {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    return `${day}-${month}-${year} ${hours}:${minutes}`
}

router.get('/', async (req, res) => {
    try {
        const rawMessages = await Message.find().sort({ added: -1 })
        const messages = rawMessages.map(m => ({
            ...m._doc,
            added: formatDate(m.added)
        }))
        res.render('index', {  messages })
    }
    catch (err) {
        res.status(500).send('Error fetching messages!')
    }
})

router.get('/new', (req, res) => {
    res.render('form')
})

router.post('/new', async (req, res) => {
    const { userinpp, msginpp } = req.body

    try {
        await Message.create({ user: userinpp, text: msginpp})
        res.redirect('/')
    }
    catch (err) {
        res.status(500).send('Error saving message!')
    }
})

module.exports = router