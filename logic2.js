// 1 - Import de puppeteer
const puppeteer = require('puppeteer')

/*
// 2 - Récupération des URLs de toutes les pages à visiter
- waitFor("body"): met le script en pause le temps que la page se charge
- document.querySelectorAll(selector): renvoie tous les noeuds qui vérifient le selecteur
- [...document.querySelectorAll(selector)]: caste les réponses en tableau
- Array.map(link => link.href): récupère les attributs href de tous les liens
*/
nbpage = 0;
const getAllUrl = async browser => {
  const page = await browser.newPage()
  await page.goto('https://www.logic-immo.com/location-immobilier-essonne-91,paris-75,hauts-de-seine-92,116_1,100_1,117_1/options/groupprptypesids=1,2,6,7,12')
  await page.waitFor('body')
  const result = await page.evaluate(() =>
    [...document.querySelectorAll('div.offer-details > div.offer-details-wrapper > div.offer-details-caracteristik > a')].map(link => link.href),
  )

  nbpage = await page.evaluate( ()=> {
      let nbp = document.querySelector('#js-content > section.offer-pagination-wrapper > div > div > div > div > div.numbers > span.btn.btn-maincolor').innerText;
  return {nbp}
    })
  console.log(result);
  
  return result
}

// 3 - Récupération du prix et du tarif d'un livre à partir d'une url (voir exo #2)
let nb = 0;
const getDataFromUrl = async (browser, url) => {
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitFor('body')
nb++;
  return page.evaluate(() => {
     
         title = document.querySelector('div.leftSide > h2 > div') != null ? document.querySelector('div.leftSide > h2 > div').innerText : "";
         price = document.querySelector('div.rightSide > div > div') != null ? document.querySelector('div.rightSide > div > div').innerText : "";
      
      
    
    return { title, price }
  })
}

/*
// 4 - Fonction principale : instanciation d'un navigateur et renvoi des résultats
- urlList.map(url => getDataFromUrl(browser, url)):
appelle la fonction getDataFromUrl sur chaque URL de `urlList` et renvoi un tableau

- await Promise.all(promesse1, promesse2, promesse3):
bloque de programme tant que toutes les promesses ne sont pas résolues
*/
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
    console.log(nbpage)
  })
  .catch(e => console.log(`error: ${e}`))