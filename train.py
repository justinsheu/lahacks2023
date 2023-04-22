import cohere
from cohere.responses.classify import Example
co = cohere.Client('M9NVwFKa1Z9bmPECJ8t5ifykSuEk43GjkQ1nxap0')
examples=[
    Example("Investor says Apple stock is 'high-quality' and 'reliable'", "buy"), 
    Example("Apple's market cap falls under $2 trillion as sell-off continues", "sell"), 
    Example("Alphabet shares fall 7%% following Google's A.I. event", "sell"), 
    Example("Microsoft's $13 billion bet on OpenAI carries huge potential along with plenty of uncertainty", "neutral"),
    Example("Amazon stock hit hardest after tech earnings bonanza", "sell"),
    Example("CNBC Investing Club 'A tough stock not to own.' Wall Street endorses Club name Nvidia, as it dominates AI", "buy"),
    Example("Metaverse could drive up profits — but most businesses may not be ready to invest yet", "neutral"),
    Example("Meta shares could rise nearly 20%% ahead of an ad market recovery, KeyBanc says", "buy"),
    Example("Jim Cramer cheers Alphabet’s stock split, expects more retail investors to buy shares", "buy"),
    Example("Wall Street sees big growth prospects for Amazon. But first it needs to get its house in order", "neutral"),
]

inputs=[
  "Alphabet shares dip on report Samsung phones may switch to Microsoft Bing search",
  "Apple’s long-term positives outweigh rare earnings miss, Morgan Stanley says",
  "AMD shares fall more than 13%% on weak outlook, dragging other chipmakers down",
  "Tart cherry juice is a key ingredient in TikTok’s ‘Sleepy Girl Mocktail’—but can it actually improve your sleep?"
]

response = co.classify(
  model='large',
  inputs=inputs,
  examples=examples,
)

print(response.classifications)
