const mockData = [
    {gender: "Male", procedurecommodity: "Maize,Maize"},
    {gender: "Female", procedurecommodity: "Beans"},
    {gender: "Female", procedurecommodity: "Maize,Maize,Maize,Beans,Dylan"},
    {gender: "Male", procedurecommodity: "Maize"},
    {gender: null, procedurecommodity:"Maize,Bananas"},
]

const messedUpData = [
    {gender: "Female,Male,What,Are,You,Doing", procedurecommodity: "Maize,Maize,Maize,Beans,Dylan"},
    {gender: "Female", procedurecommodity: "Maize,s,Dylan"},
    {gender: "Male", procedurecommodity: "Maize,Ma,Beans,Dylan"},
    {gender: "Female,Male,Doing", procedurecommodity: "Maizeze,Beans,Dylan"},
    {gender: "Female,Male,Doing", procedurecommodity: "Maizez"},
]

function removeMultiple(data) {
    let keys = Object.keys(data[0])
    // [gender, procedurecommodity]
    let tempData = data.map(item => item)
    keys.forEach(key => {
        tempData.map(obj => {
            if(obj[key] && obj[key].includes(",")){
                let split = obj[key].split(',')
                obj[key] = split[0]
                split.splice(1).forEach(value => {
                    data.push({[key]: value})
                })  
            }           
        })
    })
    // console.log('removeMultiple Ran Bro', data)
    return tempData
}



export default removeMultiple
