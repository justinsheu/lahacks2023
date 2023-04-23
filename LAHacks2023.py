#Cohere Company Challenge
import cohere
from cohere.responses.classify import Example

co = cohere.Client('pCHgkdVYESt27OP1EygwbUJO184QuKQPT56Krdtx')

examples=[
  Example("Elon Musk had a rough week across his empire — Tesla, Twitter and SpaceX", "Company"
),
  Example("TikTok’s ‘Sleepy Girl Mocktail’: Can tart cherry juice actually improve your sleep?", "Company"),
  Example("Is it a bull market or a bear market? Stocks churning in same spot for weeks frustrates investors", "Not Company"),
  Example("Activists gather for Earth Day, urge action to avoid ‘dystopian’ future", "Not Company"),
  Example("Supreme Court will rule against Biden’s student loan forgiveness plan, legal experts predict", "Not Company"),
  Example("Data company Palantir to help Ukraine prosecute alleged Russian war crimes", "Company"),
  Example("New ETF makes a big bet on cleaning up the environment", "Not Company"),
  Example("ChatGPT and generative A.I. are already changing the way we book trips and travel", "Company"),
  Example("Berkshire Hathaway’s utility company is about to hit a major renewable energy milestone", "Company"),
  Example("Google’s 80-acre San Jose mega-campus is on hold as company reckons with economic slowdown", "Company"),
  Example("Stocks end Friday’s session little changed, Dow snaps 4-week win streak", "Not Company"),
  # Example("Rescue of foreign citizens, diplomats expected, Sudan army says", "Not Company"),
  # Example("Here’s what led Virgin Orbit to bankruptcy", "Company"), 
  Example("A recession is coming, and stock markets won’t come through it unscathed, strategist says", "Not Company"),
  Example("Parents who raise healthy eaters never use these 4 phrases when their kids are young, says dietitian", "Not Company"),
  Example("This couple spent $48,000 to transition their Portland, Oregon, home to ‘net zero’", "Not Company"),
  Example("Alphabet CEO Sundar Pichai’s compensation topped $200 million in 2022", "Company"),
  Example("What is stock lending and is it safe?", "Not Company"),
  Example("Procter & Gamble beats on earnings. Here’s what the experts have to say", "Company"),
  Example("What to watch for in the markets in the week ahead: Monster tech earnings, then sell in May?", "Not Company")

]

inputs=[
  "Rescue of foreign citizens, diplomats expected, Sudan army says",
  "Here’s what led Virgin Orbit to bankruptcy",
]

response = co.classify(
  inputs=inputs,
  examples=examples,
)

print(response.classifications)

output = []
for i, classifications in enumerate(response.classifications):
    if classifications.prediction == "Company" and classifications.confidence >= 0.5:
        output.append(inputs[i])
    elif classifications.prediction == "Not Company" and classifications.confidence <= 0.5:
        output.append(inputs[i])

print(output)