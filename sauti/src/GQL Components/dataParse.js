const dataParse = (indexBy, data, crossFilter) => {
    const keys = getIndex(data, indexBy)
    // setItem(data, keys, "education", "gender")

    return setCrossedItems(data, keys, crossFilter, indexBy)
}

const getIndex = (data, indexBy) => {
    // Shrinks objects to one single key:value pair specified by the indexBy
    const cleanedArr = data.map(item => item = { [`${indexBy}`]: item[`${indexBy}`] })

    // Reduces down to a set of the possible key:value pairs
    const reducedArr = [...new Set(cleanedArr.map(JSON.stringify))].map(JSON.parse)

    return reducedArr;
    // [{gender: male}, {gender: female}, {gender: null},]
}

const setCrossedItems = (data, keys, crossFilter, indexBy, withoutNulls = true) => {
    const keysArr = [];
    let crossFilterKeysArr = [];

    const crossFilterKeys = getIndex(data, crossFilter);

    // Puts each value from key:value pair into an array
    // ['Female', 'Male', null]
    keys.forEach(obj => keysArr.push(Object.values(obj)[0]));
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
                return keys[index] = {...keys[index], ["No Response"]: [`${Object.values(obj)[0]}`][0] } 
            } else {
                return keys[index] = {...keys[index], [`${Object.keys(obj)[0]}`]: [`${Object.values(obj)[0]}`][0] } 
            }
        })
    })

    // Replaces "null" values with "No Response"
    keys.forEach(obj => obj[`${indexBy}`] === null && (obj[`${indexBy}`] = "No Response"));
    crossFilterKeysArr = crossFilterKeysArr.map(key => key === null ? "No Response" : key);

    if(withoutNulls === true) {
    crossFilterWithoutNulls(keys, crossFilterKeysArr, indexBy)
    }

    crossFilterKeysArr = crossFilterKeysArr.sort()

    console.log('keys', keys)
    console.log('crossfilter', crossFilterKeysArr)

    return { keys, crossFilterKeysArr, indexBy };
};

const crossFilterWithoutNulls = (keys, crossFilterKeysArr, indexBy) => {
    
    crossFilterKeysArr = crossFilterKeysArr.filter(item => item !== "No Response")

    keys.forEach((obj, index) => {
      delete obj["No Response"]

      if (Object.values(obj).includes("No Response")){
          keys.splice(index, 1)
      }
    })

    return { keys, crossFilterKeysArr, indexBy }
}

const setItem = (data, keys, indexBy) => {
    const arr = [];

    // Puts each value from key:value pair into an array
    // ['Female', 'Male', null]
    keys.forEach(obj => arr.push(Object.values(obj)[0]))

    // For each object in the array, 
    arr.forEach((key, index) => {
        // Gets every trader at the index where it equals the value in the arr
       const filtered = data.filter(trader => trader[`${indexBy}`] === key).length

       keys[index] = {
            ...keys[index],
            [`${arr[index]}`]: filtered
        }
    })
    return keys;
};

export default dataParse