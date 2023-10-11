// programmatical-scraper (extract info from inside by program click)

import puppeteer from 'puppeteer'


async function getProductData() {
    let browser
    try {
        browser = await puppeteer.launch({
            executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
        })
        const page = await browser.newPage()
         
        // set viewport
        await page.setViewport({
            width: 1080,
            height:768,
        })

        // Navigation timeout (30 sec - 2 min)

        page.setDefaultNavigationTimeout(2*60*100)


        // Navigation to url

        await page.goto('https://react-shop-netlify-my-first-app.netlify.app/')

        // Click on link to products page

        await page.click("a[href='/products']")

        // wait for next page button to appear
        // in my example i dont need it
        // await page.waitForSelector('.next-page')

        // Creating array for data

        const productsData = []

        const productElements = await page.$$('main>div>div>div>section:nth-child(2)>div>article')

        productElements.forEach(async (el, index) => {
            const title = await el.$eval('h5', el => el.textContent)
            const price = await el.$eval('p', el => el.textContent)
            
            productsData.push({
                title,
                price
            })
            
            
            if (index === productElements.length - 1) {
                console.log(productsData)
            await browser?.close()
        }
        
    })
    } catch (error) {
        console.log(error)
    } finally {
       
    }

}

getProductData()