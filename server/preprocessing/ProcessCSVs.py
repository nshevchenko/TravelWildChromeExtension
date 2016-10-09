
# coding: utf-8

# In[17]:

import pandas as pd
from glob import glob
import os


# In[18]:

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


# In[19]:

def write_countries(col, prefix=''):
    df = pd.concat([pd.read_csv(csvfile) for csvfile in glob("csvs/*.csv")])
    countries = filter(pd.notnull, df[col].unique())
    grouped = df.groupby(col)
    dirname = prefix + '/' + col
    
    if not os.path.exists(dirname):
        os.makedirs(dirname)
    
    print(countries)
    for country in countries:
        country_group = grouped.get_group(country)
        fpath =  dirname + '/' + country + '.h5'
        print(fpath)
        tax_grouped = country_group.groupby('Taxon')
        topten = pd.concat(take_top_n(tax_grouped, 10))
        topten.to_hdf(fpath, country)
        
write_countries('Importer', prefix='../api')


# In[21]:

#Test out the data
data = pd.read_hdf('../api/Importer/CZ.h5', 'CZ')
data

