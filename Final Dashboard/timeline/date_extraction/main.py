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
with open('../assets/scrapped_data_json_old/food_retail.json', 'r') as f:
  data = json.load(f)

for i in data:
    data[1]['answer']
 
    
# print(type(data))
# print(data[0]['answer'])