import removeMultiple from '../Components/removeMultiple'
import 'jest'
import 'jest-extended'

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

describe('removeMultiples Function', () => {
    testt('Does it return array without duplicates?', async() => {
        const response = await removeMultiple(messedUpData)
    
        expect(response.dataStructure).toBeArray()
        expect(response.dataStructure).not().toContain(/Maize,Maize,Maize/gi)
    });
})
