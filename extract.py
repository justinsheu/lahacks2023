import cohere
from tqdm import tqdm
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
results = []
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
print(results)