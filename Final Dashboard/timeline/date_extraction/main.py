# F&B Sector

import spacy
import requests
import re
import IPython

from spacy.util import minibatch, compounding
from spacy.training import Example
from spacy.lang.en import English
from spacy.language import Language

from daterangeparser import parse

import csv
import json
import os
import random

# check cwd
# print(os.path.abspath(os.getcwd()))

# load JSON files for F&B ONLY
with open('../scrapped_json_old/food_retail.json', 'r') as f:
  data = json.load(f)

# load trained model
nlp_model = spacy.load('test_model')

# output csv timeline
with open('../timeline_csvs/timeline_food_retail.csv', mode='w', newline='') as file:
  writer = csv.writer(file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    
  for i in range(1, len(raw_data)):
    sentence = raw_data[i]['answer']
    doc = nlp_model(sentence)
    flag1 = False 
    flag2 = False

    for entity in doc.ents:
      if entity.label_ == 'DATE_S':
        date_s = entity.text
        flag1 = True
            
      if entity.label_ == 'EVENT':
        event = entity.text
        flag2 = True

    if flag1 and flag2:
      # print(date_s)
      # print(event)
      writer.writerow([date_s, event.capitalize()])