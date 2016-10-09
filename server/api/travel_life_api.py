import cherrypy
import json
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

def conv_frame(frame):
    return {
        'Name' : 'TBA',
        'Taxon' : list(frame.Taxon.unique()),
        'Quantity' : frame['Importer reported quantity'].sum(),
        'Terms' : list(frame.Term.unique()),
        'Purpose' : list(map(lambda p: PURPOSE_CODES[p], frame.Purpose.unique()))
    }

def process_data(topten):
    return list(map(lambda group: conv_frame(topten.get_group(group)), topten.groups))

def _get_imported(country):
    topten = pd.read_hdf(str(ROOT_DIR / (country +'.h5')), country)
    taxgroups = topten.groupby('Taxon')
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
cherrypy.server.socket_port = 8080
cherrypy.quickstart(TravelLifeAPI(), '/')
