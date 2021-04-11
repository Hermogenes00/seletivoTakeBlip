const express = require('express')
const router = express.Router()
const axios = require('axios')

const token = {

}

let itemCard = {
    header: {
        type: "application/vnd.lime.media-link+json",
        value: {
            title: "Title",
            text: "This is a first item",
            type: "image/jpeg",
            uri: "http://www.isharearena.com/wp-content/uploads/2012/12/wallpaper-281049.jpg"
        }
    },
    options: [
        {
            label: {
                type: "application/vnd.lime.web-link+json",
                value: {
                    title: "Link",
                    uri: "http://www.adoteumgatinho.org.br/"
                }
            }
        },
        {
            label: {
                type: "text/plain",
                value: "Text 1"
            },
            value: {
                type: "application/json",
                value: {
                    key1: "value1",
                    key2: 2
                }
            }
        }
    ]
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

            items.push({
                header: {
                    type: "application/vnd.lime.media-link+json",
                    value: {
                        title: `Título: ${item.full_name}`,
                        text: `Subtítulo: ${item.description}`,
                        type: "image/jpeg",
                        uri: `${item.owner.avatar_url}`
                    }
                },
                options: [
                    {
                        label: {
                            type: "application/vnd.lime.web-link+json",
                            value: {
                                title: "Link",
                                uri: "http://www.adoteumgatinho.org.br/"
                            }
                        }
                    },
                    {
                        label: {
                            type: "text/plain",
                            value: "Text 1"
                        },
                        value: {
                            type: "application/json",
                            value: {
                                key1: "value1",
                                key2: 2
                            }
                        }
                    }
                ]
            }
            )
        })


        let fullCarousel = {
            id: "" + Date.now(),
            type: "application/vnd.lime.collection+json",
            to: "128271320123982@messenger.gw.msging.net",
            content: {
                itemType: "application/vnd.lime.document-select+json",
                items
            }
        }


        res.json(fullCarousel)

    } catch (err) {
        res.json({ error: "" + err })
    }
})

/**
 * router.get('/cards', (req, res) => {
    res.json(obj)
})
 */





module.exports = router