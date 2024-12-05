
function bmr(gender, weight, height, age) {
    var weight = Number(weight) * 2.205
    var height = Number(height) / 2.54
    var age = Number(age)

    const male_result = Math.round((66 + (6.3 * weight) + (12.9 * height) - (6.8 * age)) * 100) / 100
    const female_result = Math.round((655 + (4.3 * weight) + (4.7 * height) - (6.8 * age)) * 100) / 100

    const final_result = gender == 'male' ? male_result : female_result;

    return final_result
}

// console.log(bmr('male', '75', '200','20'))

function dailyCalories(bmr, description) {
    const factors = {
        'sedentary': 1.2,
        'lightly active': 1.375,
        'moderately active': 1.55,
        'very active': 1.725,
        'extra active': 1.9,
    }

    const result = factors[description]
    if (result != undefined) {
        bmr = Number(bmr) * result;
        return bmr
    }
    else {
        return 'Description not recognised'
    }
}

console.log(dailyCalories(1987.61, "lightly active"))