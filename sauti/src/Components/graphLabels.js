const dataOrder ={
    "education": {
        labels: ['No formal education', 'Primary', 'Secondary', 'University/College'],
        structure: [
            {"education": "No formal education"}, 
            {"education": "Primary"}, 
            {"education": "Secondary"}, 
            {"education": "University/College"}
        ]
    },
    "gender": {
        labels: ['Male', 'Female'],
        structure: [
            {"gender": "Male"}, 
            {"gender": "Female"}
        ]
    },
    "crossing_freq": {
        labels: ['Never', 'Daily', 'Weekly', 'Monthly'],
        structure: [
            {"crossing_freq": "Never"}, 
            {"crossing_freq": "Daily"}, 
            {"crossing_freq": "Weekly"}, 
            {"crossing_freq": "Monthly"}, 
        ]
    },
    "age": {
        labels: ['10-20', '20-30', '30-40', '40-50', '50-60', '60-70'],
        structure: [
            {"age": "10-20"}, 
            {"age": "20-30"}, 
            {"age": "30-40"}, 
            {"age": "40-50"}, 
            {"age": "50-60"}, 
            {"age": "60-70"}, 
        ]
    },
    "country_of_residence": {
        labels: ['KEN', 'UGA', 'RWA'],
        structure: [
            {"country_of_residence": "KEN"}, 
            {"country_of_residence": "UGA"}, 
            {"country_of_residence": "RWA"}, 
        ]
    },
    "primary_income": {
        labels: ['Yes', 'No'],
        structure: [
            {"primary_income": "Yes"}, 
            {"primary_income": "No"}, 
        ]
    },
    "language": {
        labels: ['English', 'Swahili', 'Luganda', 'Kinyarwanda', 'Lukiga'],
        structure: [
            {"language": "English"}, 
            {"language": "Swahili"}, 
            {"language": "Luganda"}, 
            {"language": "Kinyarwanda"}, 
            {"language": "Lukiga"}, 
        ]
    },
    "produce": {
        labels: ['Yes', 'No'],
        structure: [
            {"produce": "Yes"}, 
            {"produce": "No"}, 
        ]
    },
}


export default dataOrder