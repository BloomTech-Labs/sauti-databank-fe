import graphLabels from './graphLabels'

const dataParse = (indexBy, data, crossFilter) => {
    const dataStructure = graphLabels[`${indexBy}`].structure
    // setItem(data, keys, "education", "gender")
    if(crossFilter !== ""){
    return setCrossedItems(data, dataStructure, crossFilter, indexBy)
    } else {
    return setItem(data, dataStructure, indexBy)
    }
}


// THESE NEED TO BE IN CORRECT ORDER OR FUNCTION WILL NOT WORK
// NEED TO FIND A WAY TO GET THEM INTO A SPECIFIC ORDER
const getIndex = (data, indexBy) => {
    // Shrinks objects to one single key:value pair specified by the indexBy
    const cleanedArr = data.map(item => item = { [`${indexBy}`]: item[`${indexBy}`] })

    // Reduces down to a set of the possible key:value pairs
    const reducedArr = [...new Set(cleanedArr.map(JSON.stringify))].map(JSON.parse)

    return reducedArr;
    // [{gender: male}, {gender: female}, {gender: null},]
}

const setCrossedItems = (data, dataStructure, crossFilter, indexBy) => {
    const keysArr = [];
    let crossFilterKeysArr = [];

    const crossFilterKeys = getIndex(data, crossFilter);

    // Puts each value from key:value pair into an array
    // ['Female', 'Male', null]
    dataStructure.forEach(obj => keysArr.push(Object.values(obj)[0]));
    crossFilterKeys.forEach(obj => { crossFilterKeysArr.push(Object.values(obj)[0])});

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
            if ([`${Object.keys(obj)[0]}`][0] === "null") {
                return dataStructure[index] = {...dataStructure[index], ["No Response"]: [`${Object.values(obj)[0]}`][0] } 
            } else {
                return dataStructure[index] = {...dataStructure[index], [`${Object.keys(obj)[0]}`]: [`${Object.values(obj)[0]}`][0] } 
            }
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

    console.log('keys', dataStructure)
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
        console.log('key for loop', key)
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
    
    return { dataStructure, arr, indexBy} ;
}

export default dataParse