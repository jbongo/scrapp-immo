const puppeteer = require('puppeteer');

// console.log(puppeteer);

(async () => {

const browser = await puppeteer.launch({headless:false});

const page = await browser.newPage();
await page.goto('https://www.logic-immo.com/detail-vente-a10a1440-f4ed-4d86-7ed1-62689fc7f97d.htm');
// await page.click("#over_item_3");
// await page.click("#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img");


const result = await  page.evaluate( () => {
    let type =  document.querySelector('div.leftSide > h2 > div').innerText;
    let superficie =  document.querySelector('div.leftSide > h2 > span:nth-child(2)').innerText;
    let piece =  document.querySelector('div.leftSide > h2 > span:nth-child(3)').innerText;
    let prix =  document.querySelector('div.rightSide > div > div').innerText;
    return {type,superficie,piece,prix};
}) ;

// await page.screenshot({ path:'./screen.png'});

await browser.close();
console.log(result);
 

})();