const puppeteer = require('puppeteer');

// console.log(puppeteer);

(async () => {

const browser = await puppeteer.launch({headless:true});

const page = await browser.newPage();
await page.goto('http://books.toscrape.com/');
// await page.click("#over_item_3");
await page.click("#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img");

const result = await  page.evaluate( () => {
    const prix =  document.querySelector('#content_inner > article > div.row > div.col-sm-6.product_main > h1').innerText;
    return prix;
}) ;

// await page.screenshot({ path:'./screen.png'});

await browser.close();
console.log(result);
 

})();