const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()

const url = 'https://www.theguardian.com/uk'

axios(url)
    .then(function(response) {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []
        $('.dcr-16c50tn', html).each(function(){
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            articles.push({
                title,
                url
            })
        })
        console.log(articles)
    })
    .catch(function(error){   
        console.log(error)
    })

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))