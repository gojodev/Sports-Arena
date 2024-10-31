const factors = {
    'sedentary': 1.2,
    'lightly active ': 1.375,
    'moderately active': 1.55,
    'very active': 1.725,
    'extra active': 1.9,
}

let description = 'gojodev';
const result = factors[description] * 10;

console.log(result)