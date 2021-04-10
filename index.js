const express = require('express')
const app = express()
const takenet = require('./api/takenet')

app.use('/',takenet)



app.listen(8095,()=>{
    console.log('Rodando na porta 8095')
})