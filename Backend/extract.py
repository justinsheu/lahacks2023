import cohere, sys, json
from tqdm import tqdm
from cohere.responses.classify import Example
from collections import defaultdict
co = cohere.Client('M9NVwFKa1Z9bmPECJ8t5ifykSuEk43GjkQ1nxap0')
class cohereExtractor():
    def __init__(self, examples, example_labels, labels, task_desciption, example_prompt):
        self.examples = examples
        self.example_labels = example_labels
        self.labels = labels
        self.task_desciption = task_desciption
        self.example_prompt = example_prompt

    def make_prompt(self, example):
        examples = self.examples + [example]
        labels = self.example_labels + [""]
        return (self.task_desciption +
                "\n---\n".join( [examples[i] + "\n" +
                                self.example_prompt + 
                                 labels[i] for i in range(len(examples))]))

    def extract(self, example):
      extraction = co.generate(
          model='xlarge',
          prompt=self.make_prompt(example),
          max_tokens=10,
          temperature=0.1,
          stop_sequences=["\n"])
      return(extraction.generations[0].text[:-1])
    
def main(node_inputs):
    company_examples = [
    ("Alphabet", "Alphabet shares fall 7%% following Google's A.I. event"),
    ("Apple", "Apple's market cap falls under $2 trillion as sell-off continues"),
    ("Meta", "Meta shares could rise nearly 20%% ahead of an ad market recovery, KeyBanc says"),
    ("Amazon", "Amazon stock hit hardest after tech earnings bonanza"),
    ("AMD", "AMD shares fall more than 13%% on weak outlook, dragging other chipmakers down"),
    ("Microsoft", "Microsoft's $13 billion bet on OpenAI carries huge potential along with plenty of uncertainty"),
    ("none", "Is it a bull market or a bear market? Stocks churning in same spot for weeks frustrates investors"),
    #("none", "Activists gather for Earth Day, urge action to avoid ‘dystopian’ future"),
    ("Virgin Orbit", "Here’s what led Virgin Orbit to bankruptcy"),
    ("Berkshire Hathaway", "Berkshire Hathaway’s utility company is about to hit a major renewable energy milestone"),
    ("Palantir", "Data company Palantir to help Ukraine prosecute alleged Russian war crimes"),
    ("Procter & Gamble", "Procter & Gamble beats on earnings. Here’s what the experts have to say"),
    ("none", "What to watch for in the markets in the week ahead: Monster tech earnings, then sell in May?"),
    ("Google", "Google’s 80-acre San Jose mega-campus is on hold as company reckons with economic slowdown")
    ]
    cohereCompanyExtractor = cohereExtractor([e[1] for e in company_examples], 
                                        [e[0] for e in company_examples], [],
                                        "", 
                                        "extract the company from the post:")

    examples=[
        Example("Investor says Apple stock is 'high-quality' and 'reliable'", "1"), 
        Example("Apple's market cap falls under $2 trillion as sell-off continues", "-1"), 
        Example("Alphabet shares fall 7%% following Google's A.I. event", "-1"), 
        Example("Microsoft's $13 billion bet on OpenAI carries huge potential along with plenty of uncertainty", "0"),
        Example("Amazon stock hit hardest after tech earnings bonanza", "-1"),
        Example("CNBC Investing Club 'A tough stock not to own.' Wall Street endorses Club name Nvidia, as it dominates AI", "1"),
        Example("Metaverse could drive up profits — but most businesses may not be ready to invest yet", "0"),
        Example("Meta shares could rise nearly 20%% ahead of an ad market recovery, KeyBanc says", "1"),
        Example("Jim Cramer cheers Alphabet’s stock split, expects more retail investors to buy shares", "1"),
        Example("Wall Street sees big growth prospects for Amazon. But first it needs to get its house in order", "0"),
    ]

    # inputs=[
    # "Alphabet shares dip on report Samsung phones may switch to Microsoft Bing search",
    # "Apple’s long-term positives outweigh rare earnings miss, Morgan Stanley says",
    # "AMD shares fall more than 13%% on weak outlook, dragging other chipmakers down",
    # #"Tart cherry juice is a key ingredient in TikTok’s ‘Sleepy Girl Mocktail’—but can it actually improve your sleep?",
    # "A recession is coming, and stock markets won’t come through it unscathed, strategist says",
    # #"Activists gather for Earth Day, urge action to avoid ‘dystopian’ future",
    # "Microsoft's $13 billion bet on OpenAI carries huge potential along with plenty of uncertainty"
    # ]

    # inputs = ['Berlin airport cancels all departures on Monday due to strike', 'Germany, Poland and others are pushing for new sanctions on Russia’s nuclear energy', 'Germany shuts down last nuclear power plants, leaving some scientists aghast', 'Volkswagen reveals the ID.7, new flagship EV with more than 300 miles of range', 'Germany’s energy crisis is ’more or less solved, Bundesbank’s Nagel says', 'A ‘Big Short’ investor sees financial disaster brewing in housing markets', 'These are the countries that will be ‘most hit’ if oil prices reach $100', 'Europe’s relationship with China reaches critical juncture after Xi-Putin meeting', 'German and British tanks arrive in Ukraine; Russia fires supersonic missiles off Japan’s coast', 'Parents who raise healthy eaters never use these 4 phrases when their kids are young, says dietitian', 'MIT neuroscientist: The No. 1 thing that sets people with ‘excellent memory’ apart from everyone else', 'How much money you’d have if you invested $1,000 in the S&P 500 a decade ago', 'I spent 10 years studying what makes us happy in life—here’s the No. 1 thing I overlooked the entire time', '31-year-old makes $105,000 a month in passive income from her side hustle: ‘I work just 2 hours a day’']
    inputs = [input for input in node_inputs if input][:5]
    # f = open("test.txt", "w")
    # f.write(str(inputs))
    # f.close()
    response = co.classify(
    model='large',
    inputs=inputs,
    examples=examples,
    )
    result = {}
    result2 = {}
    result2 = defaultdict(lambda:[], result2)
    result = defaultdict(lambda:0, result)
    for i, x in enumerate(response.classifications):
        extracted_text = cohereCompanyExtractor.extract(inputs[i])
        if (extracted_text != "none"):
            result[extracted_text]+=int(x.prediction)
            result2[extracted_text].append(inputs[i])

    # print("These are our recommendations for which stocks you should buy and sell.")
    # print("In addition, we have provided articles from CNBC for why we think this.")
    # print()
    output = {}
    for y in result:
        if (result[y] < 0):
            output[y] = {
                "decision": "sell",
                "articles": result2[y]
            }
            # print("Sell " + y)
        elif (result[y] == 0):
            output[y] = {
                "decision": "neutral",
                "articles": result2[y]
            }
            # print("Neutral about " + y)
        else:
            output[y] = {
                "decision": "buy",
                "articles": result2[y]
            }
            # print("Buy " + y)
        # print()
        # print("Articles for more information: ")
        # for x in result2[y]:
        #     print(x)
        # print()
        return output


if __name__ == '__main__':
    inputs = json.load(sys.stdin)
    output = main(inputs)
    json.dump(output, sys.stdout)
