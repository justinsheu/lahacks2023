import cohere
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
company_examples = [
("Alphabet", "Alphabet shares fall 7%% following Google's A.I. event"),
("Apple", "Apple's market cap falls under $2 trillion as sell-off continues"),
("Meta", "Meta shares could rise nearly 20%% ahead of an ad market recovery, KeyBanc says"),
("Amazon", "Amazon stock hit hardest after tech earnings bonanza"),
("AMD", "AMD shares fall more than 13%% on weak outlook, dragging other chipmakers down"),
("Microsoft", "Microsoft's $13 billion bet on OpenAI carries huge potential along with plenty of uncertainty"),
]
cohereCompanyExtractor = cohereExtractor([e[1] for e in company_examples], 
                                       [e[0] for e in company_examples], [],
                                       "", 
                                       "extract the company from the post:")
'''results = []
companies_list = [
    "Alphabet CEO Sundar Pichai’s compensation topped $200 million in 2022",
    "Procter & Gamble beats on earnings. Here’s what the experts have to say",
    "TikTok’s ‘Sleepy Girl Mocktail’: Can tart cherry juice actually improve your sleep?",
    "Data company Palantir to help Ukraine prosecute alleged Russian war crimes",
    "Apple beat out by Microsoft because of ChatGPT",
]
for text in tqdm(companies_list):
    try:
        extracted_text = cohereCompanyExtractor.extract(text)
        results.append(extracted_text)
        print(extracted_text)
    except Exception as e:
        print('ERROR: ', e)
print(results)'''

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

inputs=[
  "Alphabet shares dip on report Samsung phones may switch to Microsoft Bing search",
  "Apple’s long-term positives outweigh rare earnings miss, Morgan Stanley says",
  "AMD shares fall more than 13%% on weak outlook, dragging other chipmakers down",
  "Tart cherry juice is a key ingredient in TikTok’s ‘Sleepy Girl Mocktail’—but can it actually improve your sleep?",
  "Investor says Apple stock is 'high-quality' and 'reliable'"
]

response = co.classify(
  model='large',
  inputs=inputs,
  examples=examples,
)
result = {}
result = defaultdict(lambda:0, result)
for i, x in enumerate(response.classifications):
    extracted_text = cohereCompanyExtractor.extract(inputs[i])
    result[extracted_text]+=int(x.prediction)
#print(result)

for y in result:
    if (result[y] < 0):
        print("Sell " + y)
    elif (result[y] == 0):
        print("Neutral about " + y)
    else:
        print("Buy " + y)


