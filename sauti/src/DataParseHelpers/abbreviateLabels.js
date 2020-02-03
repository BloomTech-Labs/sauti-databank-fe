//This function is invoked when filtering by certain categories where the keys may be too long for Nivo to display
const abbreviateLabels = (dataStructure, indexBy) => {
    let replaceValues = {
      //Agencies
      "Ministry of Agriculture Animal Industry & Fisheries (MAAIF)": "MAAIF",
      "Kenya Revenue Authority (KRA)": "KRA",
      "COMESA Trade Information Desk Office (TIDO)": "TIDO",
      "Uganda National Bureau of Standards (UNBS)": "UNBS",
      "PORT Health": "PORT Health",
      "Kenya Plant Health Inspectorate Service (KEPHIS)": "KEPHIS",
      "Uganda Revenue Authority (URA)": "URA",
      "Kenya Bureau of Standards (KEBS)": "KEBS",
      "National Biosafety Authority (NBA)": "NBA",
      "Kenya National Chamber of Commerce & Industry (KNCCI)": "KNCCI",
      "Clearing Agent": "Clearing Agent",
      "Uganda Police Dpts": "UPD",
      //Documents
      "Import Permit": "Import Permit",
      "Valid Invoice": "Valid Invoice",
      "Simplified Certificate Of Origin (SCOO)": "SCOO",
      "National ID Card/Passport": "Passport/ID",
      "Yellow Fever Card": "YF Card",
      "Certificate of Origin": "Cert of Origin",
      "Phytosanitary Certificate": "Phyto Cert",
      "Import Entry Declaration Form (SAD)": "SAD",
      "Fumigation Certificate": "Fumigation Cert",
      "Bill of Lading": "Bill of Lading",
      //Procedure Commodity
      "Clothes and Shoes (New)": "Clothes/Shoes (New)",
      "Clothes and Shoes (Used)": "Clothes/Shoes (Used)",
      //
      OutsideEAC: "Outside EAC"
    };
    dataStructure.forEach(obj => {
      let longValue = obj[`${indexBy}`];
      if (replaceValues[`${longValue}`]) {
        obj[`${indexBy}`] = replaceValues[`${longValue}`];
      }
    });
  
    return dataStructure;
};

export default abbreviateLabels