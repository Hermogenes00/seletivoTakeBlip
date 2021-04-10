const express = require('express')
const router = express.Router()
const axios = require('axios')


router.get('/repoTakenetCSharp', async (req, res) => {
    //https://api.github.com/users/takenet/repos
    try {
        let response = await axios.get("https://api.github.com/users/takenet/repos")

        //Pego todos os repositórios referente a conta takenet
        let repositories = response.data

        //Filtro a linguagem, organizando pelo mais antigo, e pego os 5 items [0,5]
        //Desta forma está ordenado de forma crescente, através da propriedade "created_at"
        let filterLanguage = repositories.filter(obj => {
            if (obj.language != "undefined") {
                return obj.language == "C#"
            }
        }).sort((a, b) => {

            let dateA = new Date(a.created_at);
            let dateB = new Date(b.created_at);

            return dateA.getTime() - dateB.getTime()
        }).splice(0, 5)

        res.json(filterLanguage)

    } catch (err) {
        res.json({ error: "" + err })
    }
})



module.exports = router