const express = require('express')
const router = express.Router()
const axios = require('axios')

const token = {

}


let body = {
    itemType: "application/vnd.lime.document-select+json",
    items: []
}

let items = []


router.get('/repoTakenetCSharp', async (req, res) => {

    try {
        let response = await axios.get("https://api.github.com/orgs/takenet/repos?per_page=100", {
            headers: {
                'Authorization': `Basic ${token}`
            }
        })

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



        //Criando o carousel
        filterLanguage.forEach((item, i) => {
            body.items.push({
                header:
                {
                    "type": "application/vnd.lime.media-link+json",
                    "value":
                    {
                        "title": `Título:${item.full_name} `,
                        "text": `Subtítulo:${item.description} `,
                        "type": "image/jpg",
                        "uri": `${item.owner.avatar_url}`
                    }
                },
                options:
                    [
                        {
                            label:
                            {
                                "type": "text/plain",
                                "value": "First option"
                            }
                        },
                        {
                            label:
                            {
                                "type": "text/plain",
                                "value": "Second option"
                            }
                        }
                    ]
            })
        })

        res.json(body)

    } catch (err) {
        res.json({ error: "" + err })
    }
})


router.get('/cards', (req, res) => {
    res.json(body)
})






module.exports = router