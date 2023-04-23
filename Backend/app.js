const express = require("express");

const cohere = require('cohere-ai');
cohere.init('dpcQoAzIp0OpqgluGhHWFgBFPy1TQJZlurvYT2WH')

const examples = [
    { text: "Investor says Apple stock is 'high-quality' and 'reliable'", label: "buy" },
    { text: "Apple's market cap falls under $2 trillion as sell-off continues", label: "sell" },
    { text: "Apple's market cap falls under $2 trillion as sell-off continues", label: "sell" },
    { text: "Alphabet shares fall 7%% following Google's A.I. event", label: "sell" },
    { text: "Microsoft's $13 billion bet on OpenAI carries huge potential along with plenty of uncertainty", label: "neutral" },
    { text: "Amazon stock hit hardest after tech earnings bonanza", label: "sell" },
    { text: "CNBC Investing Club 'A tough stock not to own.' Wall Street endorses Club name Nvidia, as it dominates AI", label: "buy" },
    { text: "Metaverse could drive up profits — but most businesses may not be ready to invest yet", label: "neutral" },
    { text: "Meta shares could rise nearly 20%% ahead of an ad market recovery, KeyBanc says", label: "buy" },
    { text: "Jim Cramer cheers Alphabet’s stock split, expects more retail investors to buy shares", label: "buy" },
    { text: "Wall Street sees big growth prospects for Amazon. But first it needs to get its house in order", label: "neutral" },
]

const inputs = [
  "Alphabet shares dip on report Samsung phones may switch to Microsoft Bing search",
  "Apple’s long-term positives outweigh rare earnings miss, Morgan Stanley says",
  "AMD shares fall more than 13%% on weak outlook, dragging other chipmakers down",
  "Tart cherry juice is a key ingredient in TikTok’s ‘Sleepy Girl Mocktail’—but can it actually improve your sleep?"
];

(async () => {
  const response = await cohere.classify({
    inputs: inputs,
    examples: examples,
  });
  console.log(response.body.classifications);
})();