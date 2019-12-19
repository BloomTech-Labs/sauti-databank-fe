import graphLabels from './graphLabels'

const dataParse = (indexBy, data, crossFilter) => {
    let dataStructure;
    if (indexBy === "request_type") {
        dataStructure = getIndex(data, indexBy)
        console.log('beginning data structure', dataStructure)
        return getMostRequested(data, dataStructure, indexBy)
    } else {
        dataStructure = graphLabels[`${indexBy}`].structure;

        if(crossFilter !== ""){
            return setCrossedItems(data, dataStructure, crossFilter, indexBy)
            } else {
            return setItem(data, dataStructure, indexBy)
            }
    }
    

    // setItem(data, keys, "education", "gender")
    
}


// THESE NEED TO BE IN CORRECT ORDER OR FUNCTION WILL NOT WORK
// NEED TO FIND A WAY TO GET THEM INTO A SPECIFIC ORDER
const getIndex = (data, indexBy) => {
    // Shrinks objects to one single key:value pair specified by the indexBy
    const cleanedArr = data.map(item => item = { [`request_value`]: item[`request_value`] })
   
    // Reduces down to a set of the possible key:value pairs
    const reducedArr = [...new Set(cleanedArr.map(JSON.stringify))].map(JSON.parse)

    return reducedArr;
    // [{gender: male}, {gender: female}, {gender: null},]
}

const setCrossedItems = (data, dataStructure, crossFilter, indexBy) => {
    const keysArr = [];
    let crossFilterKeysArr = [];

    const crossFilterKeys = graphLabels[`${crossFilter}`].structure;


    // Puts each value from key:value pair into an array
    // ['Female', 'Male', null]
    dataStructure.forEach(obj => keysArr.push(Object.values(obj)[0]));
    crossFilterKeys.forEach(obj => Object.values(obj)[0] !== null && crossFilterKeysArr.push(Object.values(obj)[0]));

    // For each object in the array, 
    keysArr.forEach((key, index) => {
        // Gets every trader at the index where it equals the value in the keysArr
        const filtered = data.filter(trader => trader[`${indexBy}`] === key)
        
        // Gets every trader at the crossFilter where it equals the value in the crossFilterKeysArr
        // Then pushes into crossFilteredData
        const crossFilteredData = [];
        crossFilterKeysArr.forEach((key, index) => {
            const crossFiltered = filtered.filter(trader => trader[`${crossFilter}`] === key)
            crossFilteredData.push({ [`${key}`]: crossFiltered.length })
        })

        // Builds the object that will be sent to the graph component
        crossFilteredData.forEach(obj => {
                return dataStructure[index] = {...dataStructure[index], [`${Object.keys(obj)[0]}`]: [`${Object.values(obj)[0]}`][0] } 
        })
    })

    // Replaces "null" values with "No Response"
    // keys.forEach(obj => obj[`${indexBy}`] === null && (obj[`${indexBy}`] = "No Response"));
    // crossFilterKeysArr = crossFilterKeysArr.map(key => key === null ? "No Response" : key);
    // keys.forEach(obj => {
    //     obj[`${indexBy}`] === null && (obj[`${indexBy}`] = "No Response")   ////////////////////////NEED TO REMOVE NULL RESPONSES
    //     if(obj[null]){
    //     obj["No Response"] = obj[null]
    //     delete obj[null] 
    //     }
    // });

    console.log('dataStructure', dataStructure)
    console.log('crossfilter', crossFilterKeysArr)

    return { dataStructure, crossFilterKeysArr, indexBy };
};

// const crossFilterWithoutNulls = (keys, crossFilterKeysArr, indexBy) => {
    
//     crossFilterKeysArr = crossFilterKeysArr.filter(item => item !== "No Response")

//     keys.forEach((obj, index) => {
//       delete obj[null]
//     return { keys, crossFilterKeysArr, indexBy }
// }

const setItem = (data, dataStructure, indexBy) => {
    let arr = [];

    // Puts each value from key:value pair into an array
    // ['Female', 'Male', null]
    dataStructure.forEach(obj => arr.push(Object.values(obj)[0]))
    
    // For each object in the array, 
    arr.forEach((key, index) => {
        // Gets every trader at the index where it equals the value in the arr
       const filtered = data.filter(trader => trader[`${indexBy}`] === key).length

       dataStructure[index] = {
            ...dataStructure[index],
            [`${arr[index]}`]: filtered
        }
    })

    // keys.forEach(obj => {
    //     obj[`${indexBy}`] === null && (obj[`${indexBy}`] = "No Response")
    //     if(obj[null]){
    //     obj["No Response"] = obj[null]
    //     delete obj[null] 
    //     }
    // });
    

    // arr = arr.map(item => item === null ? "No Response" : item);
    
    return { dataStructure, keys: graphLabels[`${indexBy}`].labels, indexBy}
}

const getMostRequested = (data, dataStructure, indexBy) => {
    let arr = [];

    // Puts each value from key:value pair into an array
    // ['Female', 'Male', null]
    dataStructure.forEach(obj => arr.push(Object.values(obj)[0]))
    
    // For each object in the array, 
    arr.forEach((key, index) => {
        // Gets every trader at the index where it equals the value in the arr
       const filtered = data.filter(value => value[`request_value`] === key).length

       dataStructure[index] = {
            ...dataStructure[index],
            [`${arr[index]}`]: filtered
        }
    })

    dataStructure = dataStructure.sort((a, b) => (Object.values(a)[1] > Object.values(b)[1]) ? -1 : 1).splice(0, 5);

    const keys = dataStructure.map(obj => obj.request_value);
    


    console.log('keys', keys)
    console.log("dataparse", dataStructure)
    return { dataStructure, keys, indexBy} ;
}

export default dataParse