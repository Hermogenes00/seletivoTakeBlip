const express = require('express')
const app = express()
const takenet = require('./api/takenet')
require('dotenv').config()

app.use('/', takenet)

app.get('/', (req, res) => {
    res.json({})
})

app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
    console.log(`Rodando na porta ${process.env.PORT || 3000}`)
})