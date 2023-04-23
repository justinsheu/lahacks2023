const express = require("express");
const { Builder, Browser, By, Key } = require("selenium-webdriver");
const cohere = require('cohere-ai');
cohere.init('dpcQoAzIp0OpqgluGhHWFgBFPy1TQJZlurvYT2WH')

const app = express();
const port = 8080;
var cors = require('cors');
app.use(cors());

// const countries = [
//   "USA",
//   "Canada",
//   "China",
//   "United-Kingdom",
//   "India",
//   "Russia",
//   "Taiwan",
//   "Singapore",
//   "Japan",
//   "Germany"
// ]

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/getrecs/:area/:asset/:timeframe", (req, res) => { //add in asset parameter later?
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

// function getClassifications() {

//   const examples = [
//       { text: "Investor says Apple stock is 'high-quality' and 'reliable'", label: "buy" },
//       { text: "Apple's market cap falls under $2 trillion as sell-off continues", label: "sell" },
//       { text: "Apple's market cap falls under $2 trillion as sell-off continues", label: "sell" },
//       { text: "Alphabet shares fall 7%% following Google's A.I. event", label: "sell" },
//       { text: "Microsoft's $13 billion bet on OpenAI carries huge potential along with plenty of uncertainty", label: "neutral" },
//       { text: "Amazon stock hit hardest after tech earnings bonanza", label: "sell" },
//       { text: "CNBC Investing Club 'A tough stock not to own.' Wall Street endorses Club name Nvidia, as it dominates AI", label: "buy" },
//       { text: "Metaverse could drive up profits — but most businesses may not be ready to invest yet", label: "neutral" },
//       { text: "Meta shares could rise nearly 20%% ahead of an ad market recovery, KeyBanc says", label: "buy" },
//       { text: "Jim Cramer cheers Alphabet’s stock split, expects more retail investors to buy shares", label: "buy" },
//       { text: "Wall Street sees big growth prospects for Amazon. But first it needs to get its house in order", label: "neutral" },
//   ]

//   const inputs = [
//     "Alphabet shares dip on report Samsung phones may switch to Microsoft Bing search",
//     "Apple’s long-term positives outweigh rare earnings miss, Morgan Stanley says",
//     "AMD shares fall more than 13%% on weak outlook, dragging other chipmakers down",
//     "Tart cherry juice is a key ingredient in TikTok’s ‘Sleepy Girl Mocktail’—but can it actually improve your sleep?"
//   ];

//   (async () => {
//     const response = await cohere.classify({
//       inputs: inputs,
//       examples: examples,
//     });
//     console.log(response.body.classifications);
//   })();

// }