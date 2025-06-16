const express = require('express')
const path = require('path')
const app = express()

const PORT = 8080

const indexRouter = require('./routers/indexRouter')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

app.listen(PORT, () => {
    console.log(`Connected via ${PORT}!`)
})