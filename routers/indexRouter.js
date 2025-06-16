const { Router } = require('express')
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

const messages = [
    {text: 'Hello there!', user: 'Jack', added: formatDate(new Date())},
    {text: 'Meow!', user: 'Nina', added: formatDate(new Date())}
]

router.get('/', (req, res) => {
    res.render('index', { messages: messages })
})

router.get('/new', (req, res) => {
    res.render('form')
})

module.exports = router