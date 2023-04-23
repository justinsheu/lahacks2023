from dotenv import load_dotenv
import cohere, sys, json, os
from tqdm import tqdm
from cohere.responses.classify import Example
from collections import defaultdict
load_dotenv()
co = cohere.Client(os.getenv('API_KEY'))
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

   
    inputs = [input for input in node_inputs if input][:96]
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

    output = {}
    for y in result:
        if (result[y] < 0):
            output[y] = {
                "decision": "sell",
                "articles": result2[y]
            }
        elif (result[y] == 0):
            output[y] = {
                "decision": "neutral",
                "articles": result2[y]
            }
        else:
            output[y] = {
                "decision": "buy",
                "articles": result2[y]
            }
    return output


if __name__ == '__main__':
    inputs = json.load(sys.stdin)
    output = main(inputs)
    json.dump(output, sys.stdout)
