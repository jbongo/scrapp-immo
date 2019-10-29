const puppeteer = require('puppeteer')


const getAllUrl = async browser => {
  const page = await browser.newPage()

await page.goto('https://www.seloger.com/list.htm?projects=2,5&types=1,2&natures=1,2,4&places=[{ci:930005}]&price=NaN/90000&enterprise=0&qsVersion=1.0')
  await page.waitFor('body')
  const result = await page.evaluate(() =>
    [...document.querySelectorAll(' div.Card__ContentZone-sc-7insep-3.ihomVp > a')].map(link => link.href),
  )
  
  return result
}



const getDataFromUrl = async (browser, url) => {
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitFor('body')

  return page.evaluate(() => {
     
         title = document.querySelector('#form-unique-abt > div.c-wrap-main.annonce-resume.annonce-detail-carousel > div.detail__resume.report > div.col2 > div.resume > div:nth-child(1) > div:nth-child(1) > h2') != null ? document.querySelector('#form-unique-abt > div.c-wrap-main.annonce-resume.annonce-detail-carousel > div.detail__resume.report > div.col2 > div.resume > div:nth-child(1) > div:nth-child(1) > h2').innerText : "";
         price = document.querySelector('#price') != null ? document.querySelector('#price').innerText : "";
      
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

// 5 - Appel la fonction `scrap()`, affichage les résulats et catch les erreurs
scrap()
  .then(value => {
    console.log(value)
  })
  .catch(e => console.log(`error: ${e}`))