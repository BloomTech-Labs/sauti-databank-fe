const name = "procedurecommoditycat";
const arr = [
  "Cereals",
  "Vegetables",
  "Fruits",
  "Tubers",
  "Legumes ",
  "Pulses",
  "Clothing & Shoes",
  "Legumes",
  "Poultry",
  "Livestock & Livestock Products",
  "Timber",
  "Cosmetics",
  "Fish Products",
  " Bees and Their Products"
];

const objectify = (key, array) => {
  const arr = [];
  console.log(array);
  array.forEach(cv => arr.push({ [key]: cv }));
  return arr;
};

console.log(objectify(name, arr.sort()));
