
const puppeteer = require('puppeteer')


nbpage = 0;
const getAllUrl = async browser => {
  const page = await browser.newPage()
  await page.goto('https://www.bienici.com/recherche/achat/france')
  await page.waitFor('body')
  const result = await page.evaluate(() =>
    [...document.querySelectorAll('div.photo > a')].map(link => link.href),
  )

 
  console.log(result);
  
  return result
}

// 3 - Récupération 
let nb = 0;
const getDataFromUrl = async (browser, url) => {
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitFor('body')
nb++;
  return page.evaluate(() => {
     
         title = document.querySelector('div.detail__resume.report > div.col2 > div.resume > div:nth-child(1) > div:nth-child(1) > h2') != null ? document.querySelector('div.titleInside > h1').innerText : "";
         price = document.querySelector('div.titleInside > div.titleInsideTable > div.titleFirstBloc > div > div > div > span') != null ? document.querySelector('div.titleInside > div.titleInsideTable > div.titleFirstBloc > div > div > div > span').innerText : "";
      
      
    
    return { title, price }
  })
}


const scrap = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const urlList = await getAllUrl(browser)
  const results = await Promise.all(
    urlList.map(url => getDataFromUrl(browser, url)),
  )
//   browser.close()
  return results
}

scrap()
  .then(value => {
    console.log(value)
  })
  .catch(e => console.log(`error: ${e}`))