from tqdm import tqdm
import spacy
from spacy.tokens import DocBin
import generateTrainData

#loads training data from generateTrainData
training_data = generateTrainData.generateTrainData()


nlp = spacy.blank('de') # load a new spacy model
db = DocBin() # create a DocBin object

for text, annot in tqdm(training_data): # data in previous format
    doc = nlp.make_doc(text) # create doc object from text
    ents = []
    for start, end, label in annot["entities"]: # add character indexes
        span = doc.char_span(start, end, label=label, alignment_mode="contract")
        if span is None:
            print("Skipping entity")
        else:
            ents.append(span)
    doc.ents = ents # label the text with the ents
    db.add(doc)

db.to_disk("./train.spacy") # save the docbin object