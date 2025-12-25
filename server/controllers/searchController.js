const axios = require('axios')
const SearchResult = require('../models/SearchResult')
require('dotenv').config()


const isLatest =(date) => {
    const oneDay = 24*60*60*1000
    const currDate = new Date()
    return (currDate - date) < oneDay
}

exports.searchKeyword =async (req, res) => {
    try{
        const {query} =req.params
        const keyword = query.toLowerCase().replace(/\s+/g, '').trim()

        let cacheResult =await SearchResult.findOne({keyword})
        if(cacheResult && isLatest(cacheResult.lastUpdated)){
            return res.status(200).json({
                message: "Success (Cached)",
                data: cacheResult
            })
        }

        //Wikipedia Data
        const wiki =axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${keyword}`, {
            headers: { 'User-Agent': 'keyword-search-app' }
        })

        //Reddit Data
        const reddit =axios.get(`https://www.reddit.com/search.json?q=${keyword}&limit=5`, { headers: { 'User-Agent': 'keyword-search-app' } })

        //News Data
        const news =axios.get(`https://newsapi.org/v2/everything?q=${keyword}&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`)

        //Products Data
        const products = axios.get('https://real-time-amazon-data.p.rapidapi.com/search', {
            params: {
                query: keyword,
                page: '1',
                country: 'US'
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
            }
        });

        const [wikiRes, redditRes, newsRes, productsRes] =await Promise.allSettled([wiki, reddit, news, products])

        const wikiData =wikiRes.status ==='fulfilled' ? {
            title: wikiRes.value.data.title,
            summary: wikiRes.value.data.extract,
            url : wikiRes.value.data.content_urls?.desktop?.page || ''

        } :null

        const redditData = redditRes.status ==='fulfilled' ? redditRes.value.data.data.children.map(item=> ({
            title: item.data.title,
            url: `https://www.reddit.com${item.data.permalink}`,
            score : item.data.ups
        })) :[]

        const newsData =newsRes.status ==='fulfilled' ? newsRes.value.data.articles.map(article => ({
            title: article.title,
            link: article.url,
            source: article.source.name,
            image : article.urlToImage
        })) :[]

        let productData = [];
        if (productsRes.status === 'fulfilled') {
            const data =productsRes.value.data;
            if (data.data && data.data.products) {
                productData =data.data.products.slice(0, 5).map(item => ({
                    title: item.product_title,
                    link: item.product_url,
                    price: item.product_price,
                    image: item.product_photo
                }));
            }
        }

        const finalResult =await SearchResult.findOneAndUpdate(
            {keyword},
            {
                keyword,
                wikiData,
                redditData,
                newsData,
                productData,
                lastUpdated: Date.now()
            },
            {new: true, upsert: true}
        )

        res.status(200).json({
            message: "Success",
            data: finalResult
        })


    }
    catch(err){
        console.error("Error in searching Keyword :", err)
        res.status(500).json(
            {
                message: "Internal Server Error"
            }
        )
    }
}