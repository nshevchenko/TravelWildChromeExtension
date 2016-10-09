import cherrypy
import json
import requests
import pandas as pd

from pathlib import Path

ROOT_DIR = Path('./Importer')

PURPOSE_CODES = {
    'B' : 'Breeding in captivity or artificial propagation',
    'E' : 'Educational',
    'G' : 'Botanical garden',
    'H' : 'Hunting trophy',
    'L' : 'Law enforcement / judicial / forensic',
    'M' : 'Medical (including biomedical research)',
    'P' : 'Personal',
    'Q' : 'Circus or travelling exhibition',
    'S' : 'Scientific',
    'T' : 'Commercial',
    'Z' : 'Zoo'
}

SOURCE_CODES = {
    'C' : 'Captive-bred animals',
    'F' : 'Born in captivity',
    'I' : 'Confiscations/Seizures',
    'R' : 'Ranched',
    'W' : 'Wild',
}

def get_vernacular(taxon):
    root = 'http://api.gbif.org/v1/species/search'
    args = {'q': taxon, 'limit':5}

    res = requests.get(root, params=args)
    data = json.loads(res.text)
    vernacular = ''
 
    items = data['results']

    for item in items:
        vkey = 'vernacularNames'

        if vkey in item.keys():

            for vname in item[vkey]:

               if vname['language'] in ['', 'eng']:
                    return vname['vernacularName']
 
    return vernacular

def conv_frame(frame):

    taxon = frame.Taxon.iloc[0]

    return {
        'Taxon' : taxon,
        'Quantity' : frame['Importer reported quantity'].sum(),
        'Terms' : list(frame.Term.unique()),
        'Purpose' : list(map(lambda p: PURPOSE_CODES[p], frame.Purpose.unique())),
        'Source' :  list(map(lambda p: SOURCE_CODES[p], frame.Source.unique())),
    }

def process_data(topten):
    info = list(map(lambda group: conv_frame(topten.get_group(group)), topten.groups))
    topfive = sorted(info, key=lambda i: i['Quantity'])[5:]

    for item in topfive:
        item['Name'] = get_vernacular(item['Taxon'])

    return topfive

def _get_imported(country):
    topten = pd.read_hdf(str(ROOT_DIR / (country +'.h5')), country)
    taxgroups = topten.groupby('Taxon').head(5).groupby('Taxon')
    res_data = process_data(taxgroups)
    return res_data

    
class TravelLifeAPI(object):

    @cherrypy.expose
    def index(self):
        return json.dumps({'endpoints' : {
                                '/' : 'See this message',
                                '/country_data' : 'Provides info about the 10 most traded endangered species in the country',
                                }
                         })

    @cherrypy.expose
    def country_data(self, country):
        res = {}
        imported_data = _get_imported(country)
        return json.dumps(imported_data)


cherrypy.server.socket_host = '0.0.0.0'
cherrypy.server.socket_port = 80
cherrypy.quickstart(TravelLifeAPI(), '/')
