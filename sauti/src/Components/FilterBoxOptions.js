export const FilterBoxOptions = {
'default': [
    {label: "Gender", value: {type: "gender", query: "Users"}},
    {label: "Education Level", value: {type: "education", query: "Users"}},
    {label: "Border Crossing Frequency", value: {type: "crossing_freq", query: "Users"}},
    {label: "Age", value: {type: "age", query: "Users"}},
    {label: "Country of Residence", value: {type: "country_of_residence", query: "Users"}},
    {label: "Primary Income", value: {type: "primary_income", query: "Users"}},
    {label: "Language", value: {type: "language", query: "Users"}},
    {label: "Produce", value: {type: "produce", query: "Users"}},
    {label: "Most Requested Procedures Commodities", value: {type: "request_type", query: "Sessions", arg: 'procedurecommodity'}},
    {label: "Most Requested Procedure Commodity Categories", value: {type: "request_type", query: "Sessions", arg: 'procedurecommoditycat'}},
    {label: "Requested Procedures for Destination (Imports to:)", value: {type: "request_type", query: "Sessions", arg: 'proceduredest'}},
    {label: "Most Requested Document Information for Procedures", value: {type: "request_type", query: "Sessions", arg: 'procedurerequireddocument'}},
    {label: "Most Requested Agency Information for Procedures", value: {type: "request_type", query: "Sessions", arg: 'procedurerelevantagency'}},
    {label: "Origin of Traders' Goods", value: {type: "request_type", query: "Sessions", arg: 'procedureorigin'}},
    {label: "Final Destination Country", value: {type: "request_type", query: "Sessions", arg: 'commoditycountry'}},
    {label: "Final Destination Market", value: {type: "request_type", query: "Sessions", arg: 'commoditymarket'}},
    {label: "Top Commodity", value: {type: "request_type", query: "Sessions", arg: 'commodityproduct'}},
    {label: "Top Commodity Categories", value: {type: "request_type", query: "Sessions", arg: 'commoditycat'}},
    {label: "Exchange Rate Direction", value: {type: "request_type", query: "Sessions", arg: 'exchangedirection'}}
    ],
'filtered': [
    {label: "Gender", value: {type: "gender", query: "Users"}},
    {label: "Education Level", value: {type: "education", query: "Users"}},
    {label: "Border Crossing Frequency", value: {type: "crossing_freq", query: "Users"}},
    {label: "Age", value: {type: "age", query: "Users"}},
    {label: "Country of Residence", value: {type: "country_of_residence", query: "Users"}},
    {label: "Primary Income", value: {type: "primary_income", query: "Users"}},
    {label: "Language", value: {type: "language", query: "Users"}},
    {label: "Produce", value: {type: "produce", query: "Users"}},
    ]
};

