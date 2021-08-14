import csv
from datetime import datetime

# with open('../../timeline_csvs/timeline_food.csv') as csv_data:
# with open('../../timeline_csvs/timeline_hotel.csv') as csv_data:
with open('../../timeline_csvs/timeline_retail.csv') as csv_data:
    reader = csv.reader(csv_data, delimiter=',')

    # sort csv with date
    days_sorted = sorted(reader, key=lambda day: datetime.strptime(day[0], "%d %B %Y"), reverse=True)
    print(days_sorted)
    csv_data.close() 
