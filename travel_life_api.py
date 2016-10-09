import cherrypy
import json
import pandas as pd
from pathlib import Path

ROOT_DIR = Path('/Users/filipt/Scratch/zoohack/CITES')

def pop_max(group_by_taxon, used_names):
    maxgroup = ['', pd.DataFrame()]

    for group_name in group_by_taxon.groups:
        grp = group_by_taxon.get_group(group_name)
        
        if (len(grp) > len(maxgroup[1])) and (group_name not in used_names):
            maxgroup[1] = grp
            maxgroup[0] = group_name
    
    return maxgroup

def take_top_n(gb, n):
    res = []
    used_names = []
    
    for i in range(n):
        result = pop_max(gb, used_names)
        res.append(result[1])
        used_names.append(result[0])    
        
    return res

def conv_frame(frame):
    return {
        'Name' : 'TBA',
        'Taxon' : list(frame.Taxon.unique()),
        'Quantity' : frame['Importer reported quantity'].sum(),
        'Terms' : list(frame.Term.unique()),
        'Purpose' : list(frame.Purpose.unique())
    }


def process_data(topten):
    return list(map(conv_frame, topten))

def _get_imported(country):
    country_data = pd.read_hdf(str(ROOT_DIR / 'Importer' / (country +'.h5')), country)
    grouped = country_data.groupby('Taxon')
    topten = take_top_n(grouped, 10)
    res_data = process_data(topten)
    return res_data

    
class TravelLifeAPI(object):

    @cherrypy.expose
    def index(self):
        return json.dumps({'endpoints' : {
                            '/cites' : 'Trade of Endangered animals by country',
                            '/protected_areas' : 'Protected Areas in country',
                            '/red_list' : 'Threatened animals in a country'
        }})

    @cherrypy.expose
    def country_data(self, country):
        res = {}
        imported_data = _get_imported(country)
        return json.dumps(imported_data)


cherrypy.server.socket_host = '127.0.0.1'
cherrypy.server.socket_port = 80
cherrypy.quickstart(TravelLifeAPI(), '/')

