const mockData = [
    {gender: "Male", procedurecommodity: "Maize,Maize", procedurecommoditycat:"Vegetables"},
    {gender: "Female", procedurecommodity: "Beans"},
    {gender: "Female", procedurecommodity: "Maize,Maize,Maize,Beans,Dylan"},
    {gender: "Male", procedurecommodity: "Maize"},
    {gender: null, procedurecommodity:"Maize,Bananas"},
    {procedurecommoditycat: "Vegetables,Legumes,Grains", gender: "Male,Female"}
]

const removeMultiples = data => {
    let keys = Object.keys(data[0])
    // [gender, procedurecommodity]
    keys.forEach(key => {
        data.map(obj => {
            if(obj[key] && obj[key].includes(",")){
                let split = obj[key].split(',')
                obj[key] = split[0]
                split.splice(1).forEach(value => {
                    data.push({[key]: value})
                })
                
            }           
        })
    })
    return data
}

export default removeMultiples