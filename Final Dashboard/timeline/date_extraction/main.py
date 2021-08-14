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
import fileinput

# check cwd
# print(os.path.abspath(os.getcwd()))

# loop all json n directory
# myPath = '../scrapped_json_latest'   
# myFiles=os.listdir(myPath)

# load JSON files for F&B ONLY
# with open('C:/Users/penny/Desktop/LIT/scrapped_json_latest/retail/retail_1.json', 'r',encoding="utf-8") as f:
with open('C:/Users/penny/Desktop/LIT/scrapped_json_latest/retail/retail_3.json', 'r',encoding="utf-8") as f:
  raw_data = json.load(f)

# with open('../../timeline_csvs/timeline_food.csv', mode='w', newline='') as file:
# with open('../../timeline_csvs/timeline_hotel.csv', mode='w', newline='') as file:
with open('../../timeline_csvs/timeline_retail.csv', mode='w', newline='') as file:

    writer = csv.writer(file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        
    for i in range(1, len(raw_data)):
    
        # read other types of scrapped data
        if 'answer' in raw_data[0]:
            sentence = raw_data[i]['answer']
        else:
            sentence = raw_data[i]['text']

        # print(sentence)
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
            if event[0] in string.punctuation:
                event = event[1:]
            writer.writerow([date_s, event.capitalize()])
    file.close() 
