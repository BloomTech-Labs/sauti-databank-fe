export const FilterBoxOptions = {
  // group these by the table(see pick of lance screenshare)
  /*
  some of these are selled differerntly than the versions below
  Key Demographics
    Primary Language
    Country of Residence
    Gender
    Education
    Age
    Cross-Border Trade as Primary Source of Income
    Border Crossing Frequency
    Primary Border Crossing

  Information Demand
    Most Requested Procedures for Commodities
    Most Requested Procedures for Commodity Categories
    Requested Procedures for Destination (Imports to:)
    Most Requested Document Information for Procedures
    Most Requested Agency Information for Procedures
   Business Behaviour
    Final Destination Country
    Final Destination Market
    Top Commodity Categories
    Top Commodities
    Exchange Rate Direction

  */
  //  {
  //   label:
  // }
  // putting any other keys in here will result in an input confliction so much use the default key for the remaining

  superCategories: [
    {
      label: "Key Demographics",
      options: [
        {
          label: "Gender"
        },
        {
          label: "Education Level"
        },
        {
          label: "Border Crossing Frequency"
        },
        {
          label: "Age"
        },
        {
          label: "Country of Residence"
        },
        {
          label: "Primary Income"
        },
        {
          label: "Language"
        },
        {
          label: "Produce"
        }
      ]
    },
    {
      label: "Information Demand",
      options: [
        {
          label: "Most Requested Procedure Commodities"
        },
        {
          label: "Most Requested Procedure Commodity Categories"
        },
        {
          label: "Requested Procedures for Destination (Imports to:)"
        },
        {
          label: "Most Requested Document Information for Procedures"
        },
        {
          label: "Most Requested Agency Information for Procedures"
        }
      ]
    },
    {
      label: "Business Behaviour",
      options: [
        {
          label: "Origin of Traders' Goods"
        },
        {
          label: "Final Destination Country"
        },
        {
          label: "Final Destination Market"
        },
        {
          label: "Top Commodities"
        },
        {
          label: "Top Commodity Categories"
        },
        {
          label: "Exchange Rate Direction"
        }
      ]
    }
  ],
  default: {
    Gender: {
      value: { type: "gender", query: "Users" },
      subLabels: ["Male", "Female"]
    },
    "Education Level": { value: { type: "education", query: "Users" } },
    "Border Crossing Frequency": {
      value: { type: "crossing_freq", query: "Users" }
    },
    Age: { value: { type: "age", query: "Users" } },
    "Country of Residence": {
      value: { type: "country_of_residence", query: "Users" }
    },
    "Primary Income": {
      value: { type: "primary_income", query: "Users" }
    },
    Language: { value: { type: "language", query: "Users" } },
    Produce: { value: { type: "produce", query: "Users" } },
    "Most Requested Procedure Commodities": {
      value: { type: "procedurecommodity", query: "Sessions" }
    },
    "Most Requested Procedure Commodity Categories": {
      value: { type: "procedurecommoditycat", query: "Sessions" }
    },
    "Requested Procedures for Destination (Imports to:)": {
      value: { type: "proceduredest", query: "Sessions" }
    },
    "Most Requested Document Information for Procedures": {
      value: { type: "procedurerequireddocument", query: "Sessions" }
    },
    "Most Requested Agency Information for Procedures": {
      value: { type: "procedurerelevantagency", query: "Sessions" }
    },
    "Origin of Traders' Goods": {
      value: { type: "procedureorigin", query: "Sessions" }
    },
    "Final Destination Country": {
      value: { type: "commoditycountry", query: "Sessions" }
    },
    "Final Destination Market": {
      value: { type: "commoditymarket", query: "Sessions" }
    },
    "Top Commodities": {
      value: { type: "commodityproduct", query: "Sessions" }
    },
    "Top Commodity Categories": {
      value: { type: "commoditycat", query: "Sessions" }
    },
    "Exchange Rate Direction": {
      value: { type: "exchangedirection", query: "Sessions" }
    }
  },
  filtered: [
    { label: "Gender", value: { type: "gender", query: "Users" } },
    { label: "Education Level", value: { type: "education", query: "Users" } },
    {
      label: "Border Crossing Frequency",
      value: { type: "crossing_freq", query: "Users" }
    },
    { label: "Age", value: { type: "age", query: "Users" } },
    {
      label: "Country of Residence",
      value: { type: "country_of_residence", query: "Users" }
    },
    {
      label: "Primary Income",
      value: { type: "primary_income", query: "Users" }
    },
    { label: "Language", value: { type: "language", query: "Users" } },
    { label: "Produce", value: { type: "produce", query: "Users" } }
  ]
};
