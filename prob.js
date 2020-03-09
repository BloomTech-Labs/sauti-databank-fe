const name = "exchangedirection";
let arr = [
  "TSH->KES",
  "TZS->KES",
  "UGX->KES",
  "RWF->KES",
  "KES->UGX",
  "KES->RWF",
  "KES->TZS",
  "KES->USD",
  "USD->KES",
  "RWF->CDF",
  "RWF->UGX",
  "USD->RWF",
  "TZS->RWF",
  "RWF->USD",
  "UGX->RWF",
  "RWF->TZS",
  "CDF->RWF",
  "UGX->USD",
  "TZS->UGX",
  "UGX->TZS",
  "USD->UGX",
  "BIF->RWF",
  "RWF->BIF",
  "USD->TZS",
  "TZS->USD"
];

const objectify = (key, array) => {
  const arr = [];
  console.dir(array, { maxArrayLength: null });
  array.forEach(cv => arr.push({ [key]: cv }));
  return arr;
};

console.dir(objectify(name, arr.sort()), { maxArrayLength: null });
