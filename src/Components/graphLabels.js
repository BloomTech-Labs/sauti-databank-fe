const dataOrder = {
  education: {
    labels: [
      "University/College",
      "Secondary",
      "Primary",
      "No formal education"
    ],
    structure: [
      { education: "No formal education" },
      { education: "Primary" },
      { education: "Secondary" },
      { education: "University/College" }
    ]
  },
  gender: {
    labels: ["Female", "Male"],
    structure: [{ gender: "Male" }, { gender: "Female" }]
  },
  crossing_freq: {
    labels: ["Monthly", "Weekly", "Daily", "Never"],
    structure: [
      { crossing_freq: "Never" },
      { crossing_freq: "Daily" },
      { crossing_freq: "Weekly" },
      { crossing_freq: "Monthly" }
    ]
  },
  age: {
    labels: ["60-70", "50-60", "40-50", "30-40", "20-30", "10-20"],
    structure: [
      { age: "10-20" },
      { age: "20-30" },
      { age: "30-40" },
      { age: "40-50" },
      { age: "50-60" },
      { age: "60-70" }
    ]
  },
  country_of_residence: {
    labels: ["RWA", "UGA", "KEN", "TZA"],
    structure: [
      { country_of_residence: "KEN" },
      { country_of_residence: "UGA" },
      { country_of_residence: "RWA" },
      { country_of_residence: "TZA" }
    ]
  },
  primary_income: {
    labels: ["No", "Yes"],
    structure: [{ primary_income: "Yes" }, { primary_income: "No" }]
  },
  language: {
    labels: ["Lukiga", "Kinyarwanda", "Luganda", "Swahili", "English"],
    structure: [
      { language: "English" },
      { language: "Swahili" },
      { language: "Luganda" },
      { language: "Kinyarwanda" },
      { language: "Lukiga" }
    ]
  },
  produce: {
    labels: ["No", "Yes"],
    structure: [{ produce: "Yes" }, { produce: "No" }]
  }
  // procedurecommodity: {
  //   labels: ["No", "yes"],
  //   structure: { procedurecommodity: "No", procedurecommodity: "Yes" }
  // }
};

export default dataOrder;
