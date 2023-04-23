const express = require("express");
const { Builder, Browser, By, Key } = require("selenium-webdriver");
const cohere = require('cohere-ai');
cohere.init('dpcQoAzIp0OpqgluGhHWFgBFPy1TQJZlurvYT2WH')

const app = express();
const port = 8080;
var cors = require('cors');
app.use(cors());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/getrecs/:area/:asset/:timeframe", (req, res) => {
  getArticles(req.params.area, req.params.timeframe).then(
    result => {
      getRecommendations(result, res);
    }
  )
})

async function getRecommendations(articles, res) {
  const { spawn } = require("child_process");

  const python = spawn('python', ["extract.py"]);
  let buffers = "";

  python.stdout.on('data', (chunk) => {console.log("test"); buffers += chunk.toString()});
  python.stdout.on('end', () => {
      console.log(buffers)
      const result = JSON.parse(buffers);
      res.send(result);
  });

  console.log(JSON.stringify(articles.map(article => article[0])))

  python.stdin.write(JSON.stringify(articles.map(article => article[0])));
  python.stdin.end()
}

async function getArticles(area, timeframe) {
  area = area == "usa" ? "" : area;
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  let targetDate = new Date();
  switch (timeframe) {
    case "month":
      targetDate.setMonth(targetDate.getMonth() - 1);
      break;
    case "week":
      targetDate.setDate(targetDate.getDate() - 7);
  }
  await driver.get(`https://www.cnbc.com/${area}/`);
  let articles = await driver.findElements(By.xpath("//a[contains(@href, 'https://www.cnbc.com/2023')]"));
  let articleTitles = [];
  for (const article of articles) {
    const url = await article.getAttribute('href');
    const urlYear = parseInt(url.split("/").slice(-4));
    const urlMonth = parseInt(url.split("/").slice(-3)) - 1;
    const urlDay = parseInt(url.split("/").slice(-2));
    const urlDate = new Date(urlYear, urlMonth, urlDay);
    if (urlDate >= targetDate) {
      articleTitles.push([await article.getText(), url, urlDate.toDateString()]);
    }
  }
  await driver.close();
  console.log(articleTitles);
  return articleTitles;
}
