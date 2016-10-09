#Server API

- This provides CITE data between 2014 - 2015 on animals
- This excludes trades made for the purpose of reintroduction to wildlife
- Document [here](https://trade.cites.org/cites_trade_guidelines/en-CITES_Trade_Database_Guide.pdf) describes how to interpret data.
- CSVs had to be manually DLd from the CITE website because they provide quite poor access. 
- So the preprocessing script will create storage files for the top ten most traded animals for each country from those csvs.
