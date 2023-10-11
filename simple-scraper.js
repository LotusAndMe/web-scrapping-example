import * as cheerio from 'cheerio'

async function getProductData(){
    const response = await fetch('https://ecommerce-next-shopify-lyart.vercel.app/')

    const text = await response.text()

    // Loading all body to $
    const $ = cheerio.load(text)
    
    // console.log($('div:nth-child(2)>a'))
    // console.log($('div:nth-child(1)>a').find('h3').text())
    
    const productData = []
    
    // Loop over each product
    $('main>div:nth-child(1)>a').each((index, element) => {
        // get product title and price
        const title = $(element).find('h3>span').text()
        const price = $(element).find('div>span').text()

        productData.push({
            title,
            price,
        })
    })
    console.log(productData)
}

getProductData()