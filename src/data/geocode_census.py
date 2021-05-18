'''
Take donor file and use the census geocoder to geocode it with lat and lng
usage:
python geocode_census.py 'donors_for_mapping_1.csv'
'''

import censusgeocode as cg
import datetime
import argparse, sys
import pandas as pd
import numpy as np

def census_geocode(row,i):
    g = ()
    try:
        g = cg.address(street=str(row['street']), city=str(row['city']), state=str(row['state']), zipcode=str(row['zip']))
    except:
        g = ()
    finally:
        if len(g) > 0:
            data = g[0]
            row['lat'] = data['coordinates']['y']
            row['lng'] = data['coordinates']['x']
    if i % 1000 == 0:
        print(i)
    return row

def run_geocode(in_file):
    df = pd.read_csv(in_file, index_col=0)
    df = df.apply(lambda row: census_geocode(row, row.name), axis=1)
    df.to_csv(in_file.split(".")[-2]+'_geocoded.csv')

def finish():
    print('Finished')

if __name__ == '__main__':
    parser = argparse.ArgumentParser(prog='geocode_census')
    parser.add_argument('in_file', help='file to geocode')
    args=parser.parse_args()
    start = datetime.datetime.now()
    run_geocode(args.in_file)
    diff = datetime.datetime.now() - start
    print(f'Finished in {diff.seconds/60} minutes')
    finish()
