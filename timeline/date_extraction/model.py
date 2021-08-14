# Code References on using blank models in spaCy
# Machine Learning Plus - https://www.machinelearningplus.com/nlp/training-custom-ner-model-in-spacy/

import spacy
import requests
import re
import IPython

from spacy.util import minibatch, compounding
from spacy.training import Example
from spacy.lang.en import English
from spacy.language import Language

from daterangeparser import parse

import json
import os
import random

# get cwd
# print(os.path.abspath(os.getcwd()))

# create new empty model
nlp = spacy.blank('en')
nlp.vocab.vectors.name = 'raw_text_training'  

# add NER pipeline
ner = nlp.create_pipe('ner')    
nlp.add_pipe('ner', last=True)

nlp.get_pipe("ner").add_label('DATE_S')
nlp.get_pipe("ner").add_label('DATE_E')
nlp.get_pipe("ner").add_label('EVENT')
# nlp.get_pipe("ner").add_label('TITLE')

# Training Data (20)
DATA = [
  (u"From 1 July 2020, businesses that falls under the Marine & Offshore and Process sectors will be required to submit details of the employees, workers. This submission of manpower details is required to facilitate information updates for the AccessCode on the SGWorkPass app, including the approval to work and the requirement for regular swabbing.", {'entities': [ (5,16,'DATE_S'), (18,149,'EVENT')] }),
  (u"There is no need to edit the manpower declaration in other reference number. From 24 May 2021, you will only need to declare your onsite manpower under the MP.", {'entities': [ (82,93,'DATE_S'), (95, 159, 'EVENT')] }),
  (u"F&B establishments are allowed to continue food service operations, with the exception of establishments with Pubs, Bars, Nightclubs, Discos and Karaoke SFA license categories or SSIC codes starting with 5613, and nightlife operators that were allowed to pivot to F&B operations as listed at operations suspended from 16 July through 30 July.", {'entities': [ (318,325,'DATE_S'), (334,341, 'DATE_E'), (0, 278, 'EVENT')] }),
  (u"Beauty services and or activities that require customers to remove their masks must cease from 22 July through 18 August 2021. These include beauty services and or activities offered at retail outlets.", {'entities': [ (95,102,'DATE_S'), (111,125,'DATE_E'), (0, 89, 'EVENT')] }),
  (u"In addition, all dine in F&B establishments are to comply to the mandatory Fast and Easy Testing FET regime for outlet employees, with the measures stipulated in this document last updated on 30 June 2021. With effect from 15 July 2021 onwards, all dine in F&B establishments must also comply with the mandatory requirements set out in this updated notice. last updated on 28 July 2021", {'entities': [ (192,204,'DATE_S'), (13, 128, 'EVENT') ] }),
  (u"In addition, all dine in F&B establishments are to comply to the mandatory Fast and Easy Testing FET regime for outlet employees, with the measures stipulated in this document last updated on 30 June 2021. With effect from 15 July 2021 onwards, all dine in F&B establishments must also comply with the mandatory requirements set out in this updated notice. last updated on 28 July 2021", {'entities': [ (223,235,'DATE_S'), (245, 332, 'EVENT') ] }),
  (u"From 19 August 2021, all F&B establishments no longer need to conduct temperature screening given the high levels of vaccine coverage and increased surveillance measures such as FET.", {'entities': [ (5,19,'DATE_S'), (21, 182, 'EVENT') ] }),
  (u"Entertainment at F&B establishments  e.g. live entertainment, recorded music, and videos TV screening  remain prohibited.", {'entities': [] }),
  (u"From 10 August 2021, F&B establishments are permitted to seat dine in groups of up to 5 persons.", {'entities': [ (5,19,'DATE_S'), (21, 96, 'EVENT') ] }),
  (u"The Multi-Ministry Taskforce  MTF  has announced a calibrated path for resumption of more economic and social activities under Phase 2  Heightened Alert  from 10 August 2021.", {'entities': [ (159,173,'DATE_S'), (0, 152, 'EVENT') ] }),
  (u"From 1 October 2021, a  vaccinate or regular test  regime will be introduced for individuals working in personal care services. These employees are to be fully vaccinated or have to undergo regular testing. ", {'entities': [ (5,19,'DATE_S'), (21, 127, 'EVENT') ] }),
  (u"From 19 August 2021, if the COVID 19 situation remains under control, the occupancy limit will be increased to one person per 10 sqm of GFA.", {'entities': [ (5,19,'DATE_S'), (21, 140, 'EVENT') ] }),
  (u"From 19 August 2021, all malls, large standalone stores, supermarkets and retail establishments providing personal care and beauty services no longer need to conduct temperature screening given the high levels of vaccine coverage and increased surveillance measures such as FET.", {'entities': [ (5,19,'DATE_S'), (21, 278, 'EVENT') ] }),
  (u"From 21 July 2021, TT only SE and SafeEntry Gateway  SEGW  check in requirements have been re introduced at supermarkets that are fully within malls and buildings covered by SafeEntry and have the same operating hours.", {'entities': [ (5,17,'DATE_S'), (19, 218, 'EVENT') ] }),
  (u"From 10 August 2021, services and activities in higher risk settings, which require masks to be removed, are allowed to resume in groups of up to 5 persons only if all the customers i, are vaccinated, or ii, are a recovered patient, or iii have a valid negative COVID-19 test result covering the duration of service/activity. These include personal care services ,e.g. facial treatments, make up services and saunas,, Food & Beverage ,F&B, dine in and indoor high intensity mask off sports.", {'entities': [ (5,19,'DATE_S'), (21, 325, 'EVENT') ] }),
  (u"From 19 August 2021, these establishments no longer need to conduct temperature screening. However, they can continue with the checks for visible symptoms for customers.", {'entities': [ (5,19,'DATE_S'), (21, 90, 'EVENT') ] }),
  (u"From 10 August 2021, F&B establishments28 are permitted to seat dine-in groups of up to 5 persons, only if all the diners i) are vaccinated, or ii) are a recovered patient, or iii) have a valid negative COVID-19 test result covering the duration of dine-in. ", {'entities': [ (5,19,'DATE_S'), (21,257, 'EVENT') ] }),
  (u"From 1 October 2021, a “vaccinate or regular test” regime will be introduced for individuals working in sectors that interact with customers in higher-risk mask-off settings, including F&B. These employees are to be fully vaccinated or have to undergo regular testing.", {'entities': [ (5,19,'DATE_S'), (21, 189, 'EVENT') ] }),
  (u"From 10 August 2021, F&B establishments are permitted to seat dine-in groups of up to 5 persons.", {'entities': [ (5,19,'DATE_S'), (21, 96, 'EVENT') ] }),
  (u"As of 5 August 2021, 67% of the population have completed their full vaccination regimen under the national vaccination programme and 78% have received at least one dose. Vaccination reduces the risk of infection and serious disease when infected with COVID-19. ", {'entities': [ (6,19,'DATE_S'), (21, 170, 'EVENT') ] }),
  (u"Beauty services and or activities that require customers to remove their masks must cease from 22 July through 18 August 2021. These include beauty services and or activities offered at retail outlets.", {'entities': [ (95,102,'DATE_S'), (111,125,'DATE_E'), (0, 89, 'EVENT')] })
]

for _, annotations in DATA:
  for ent in annotations.get("entities"):
    ner.add_label(ent[2])

optimizer = nlp.begin_training()

# Training for 30 iterations
for i in range(30):
  
  # shuufling examples before every iteration
  random.shuffle(DATA)
  losses = {}
    
  # batch up the examples
  batches = minibatch(DATA, size=compounding(4.0, 32.0, 1.001))

  for batch in batches:
    texts, annotations = zip(*batch)
                
    example = []
    
    # Update the model with iterating each text
    for i in range(len(texts)):
      doc = nlp.make_doc(texts[i])
      example.append(Example.from_dict(doc, annotations[i]))
                
      # Update the model
      nlp.update(example, drop=0.5, losses=losses)

# upload trained model in directory
nlp.to_disk("test_model")