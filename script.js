// 1. Dynamically Create Form Elements
const inputForm = document.getElementById("nutritionForm");

// 2. Handle Form Submission
inputForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(inputForm);

    const age = parseInt(formData.get("age"));
    const gender = formData.get("gender");
    const height = parseInt(formData.get("height"));
    const weight = parseFloat(formData.get("weight"));
    const activityLevel = formData.get("activityLevel");
    const waist = parseFloat(formData.get("waist"));

    // 3. BMI Calculation
    const bmi = calculateBMI(weight, height);

    // 4. Determine Body Status & Nutritional Needs
    const bodyStatus = determineBodyStatus(bmi);
    const nutritionNeeds = getNutritionRecommendations(age, gender, bodyStatus, activityLevel);

    // 5. Display Results
    displayResults(bmi, bodyStatus, nutritionNeeds);
});

// BMI Calculation
function calculateBMI(weight, height) {
    height = height / 100; // convert height to meters
    return (weight / (height * height)).toFixed(1);
}

// Determine Body Status
function determineBodyStatus(bmi) {
    if (bmi < 18.5) return "underweight";
    else if (bmi >= 18.5 && bmi < 24.9) return "normal";
    else if (bmi >= 25 && bmi < 29.9) return "overweight";
    else return "obese";
}

// Get Nutrition Recommendations
function getNutritionRecommendations(age, gender, bodyStatus, activityLevel) {
    let calorieIntake;
    let protein, carbohydrates, fiber, vitaminA, vitaminD, iron, folate, zinc, calcium;

    // Define nutritional needs based on age, gender, body status, and activity level
    if (gender === "male") {
        if (activityLevel === "sedentary") calorieIntake = 2000;
        else if (activityLevel === "lightly_active") calorieIntake = 2200;
        else if (activityLevel === "moderately_active") calorieIntake = 2500;
        else if (activityLevel === "very_active") calorieIntake = 2800;
    } else {
        if (activityLevel === "sedentary") calorieIntake = 1800;
        else if (activityLevel === "lightly_active") calorieIntake = 2000;
        else if (activityLevel === "moderately_active") calorieIntake = 2200;
        else if (activityLevel === "very_active") calorieIntake = 2400;
    }

    // Sample nutritional advice
    if (bodyStatus === "underweight") {
        protein = "50-60g";
        carbohydrates = "200-250g";
        fiber = "20-30g";
        vitaminA = "500-700μg";
        vitaminD = "10-15μg";
        iron = "10-15mg";
        folate = "400-600μg";
        zinc = "12-15mg";
        calcium = "1000-1200mg";
    } else if (bodyStatus === "normal") {
        protein = "40-50g";
        carbohydrates = "150-200g";
        fiber = "25-35g";
        vitaminA = "400-600μg";
        vitaminD = "5-10μg";
        iron = "8-12mg";
        folate = "300-500μg";
        zinc = "10-12mg";
        calcium = "800-1000mg";
    } else if (bodyStatus === "overweight") {
        protein = "30-40g";
        carbohydrates = "100-150g";
        fiber = "30-40g";
        vitaminA = "300-500μg";
        vitaminD = "5-10μg";
        iron = "6-10mg";
        folate = "200-400μg";
        zinc = "8-10mg";
        calcium = "600-800mg";
    } else if (bodyStatus === "obese") {
        protein = "20-30g";
        carbohydrates = "50-100g";
        fiber = "35-45g";
        vitaminA = "200-400μg";
        vitaminD = "5-10μg";
        iron = "4-8mg";
        folate = "200-300μg";
        zinc = "6-8mg";
        calcium = "500-700mg";
    }

    return {
        calorieIntake: calorieIntake,
        bodyStatus: bodyStatus,
        nutritionAdvice: {
            protein: protein,
            carbohydrates: carbohydrates,
            fiber: fiber,
            vitaminA: vitaminA,
            vitaminD: vitaminD,
            iron: iron,
            folate: folate,
            zinc: zinc,
            calcium: calcium
        },
        exerciseAdvice: getExerciseAdvice(bodyStatus),
        mealPlan: getMealPlan(bodyStatus)
    };
}

function getExerciseAdvice(bodyStatus) {
    // Example exercise advice based on body status
    switch (bodyStatus) {
        case "underweight":
            return "Light exercises such as yoga and walking.";
        case "normal":
            return "Regular exercises such as jogging and swimming.";
        case "overweight":
            return "Moderate exercises such as brisk walking and cycling.";
        case "obese":
            return "Low-impact exercises such as water aerobics and stationary cycling.";
        default:
            return "";
    }
}

function getMealPlan(bodyStatus) {
    // Example meal plan based on body status (simplified)
    if (bodyStatus === "underweight") {
        return {
            breakfast: "40 ml fruit juice, 1/4 cup oats porridge with 1 T honey, 1/2 cup full cream milk",
            midMorningSnack: "1/2 cup yoghurt, 1/2 mashed, ripe banana",
            lunch: "1 boiled egg, 1/2 - 1 slice whole wheat bread with 1 t polyunsaturated margarine, 1/2 grated apple, 1/2 cup full cream milk",
            midAfternoonSnack: "15 g sweet milk or Gouda cheese, 1/2 slice whole wheat bread with 1 t polyunsaturated margarine, 40 ml fruit juice",
            supper: "30 g cooked, mincemeat, mashed potato 2 T, cooked butternut 1 T, 1/4 cup custard",
            bedTimeSnack: "1/4 cup full cream milk with Ovaltine"
        };
    } else if (bodyStatus === "normal") {
        return {
            breakfast: "30 ml fruit juice, 1/4 cup oats porridge with 1 T honey, 1/2 cup skim milk",
            midMorningSnack: "1/2 cup yoghurt, 1 apple",
            lunch: "1 boiled egg, 1 slice whole wheat bread with 1 t polyunsaturated margarine, 1/2 grated carrot, 1/2 cup skim milk",
            midAfternoonSnack: "10 g sweet milk or Gouda cheese, 1 slice whole wheat bread with 1 t polyunsaturated margarine, 30 ml fruit juice",
            supper: "20 g cooked, mincemeat, mashed potato 2 T, cooked butternut 1 T, 1/4 cup low-fat custard",
            bedTimeSnack: "1/4 cup skim milk with Ovaltine"
        };
    } else if (bodyStatus === "overweight") {
        return {
            breakfast: "20 ml fruit juice, 1/4 cup oats porridge with no honey, 1/2 cup skim milk",
            midMorningSnack: "1/2 cup low-fat yoghurt, 1 orange",
            lunch: "1 boiled egg white, 1 slice whole wheat bread with no margarine, 1/2 grated cucumber, 1/2 cup skim milk",
            midAfternoonSnack: "5 g sweet milk or Gouda cheese, 1 slice whole wheat bread with no margarine, 20 ml fruit juice",
            supper: "10 g cooked, lean mincemeat, mashed potato 2 T, cooked butternut 1/2 T, 1/4 cup low-fat custard",
            bedTimeSnack: "1/4 cup skim milk with no Ovaltine"
        };
    } else if (bodyStatus === "obese") {
        return {
            breakfast: "10 ml fruit juice, 1/4 cup oats porridge with no honey, 1/2 cup skim milk",
            midMorningSnack: "1/2 cup low-fat yoghurt, 1 small pear",
            lunch: "1 boiled egg white, 1 slice whole wheat bread with no margarine, 1/2 grated zucchini, 1/2 cup skim milk",
            midAfternoonSnack: "5 g low-fat cheese, 1 slice whole wheat bread with no margarine, 10 ml fruit juice",
            supper: "10 g cooked, lean mincemeat, mashed potato 2 T, cooked butternut 1/4 T, 1/4 cup low-fat custard",
            bedTimeSnack: "1/4 cup skim milk with no Ovaltine"
        };
    }
}

// Display Results
function displayResults(bmi, bodyStatus, nutritionNeeds) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <h2>Your Results</h2>
        <p><strong>BMI:</strong> ${bmi}</p>
        <p class="${bodyStatus}"><strong>Body Status:</strong> ${bodyStatus}</p>
        <h3>Nutrition Advice</h3>
        <p>Calories: ${nutritionNeeds.calorieIntake} Kcal</p>
        <p>Protein: ${nutritionNeeds.nutritionAdvice.protein}</p>
        <p>Carbohydrates: ${nutritionNeeds.nutritionAdvice.carbohydrates}</p>
        <p>Fiber: ${nutritionNeeds.nutritionAdvice.fiber}</p>
        <p>Vitamin A: ${nutritionNeeds.nutritionAdvice.vitaminA}</p>
        <p>Vitamin D: ${nutritionNeeds.nutritionAdvice.vitaminD}</p>
        <p>Iron: ${nutritionNeeds.nutritionAdvice.iron}</p>
        <p>Folate: ${nutritionNeeds.nutritionAdvice.folate}</p>
        <p>Zinc: ${nutritionNeeds.nutritionAdvice.zinc}</p>
        <p>Calcium: ${nutritionNeeds.nutritionAdvice.calcium}</p>
        <h3>Exercise Advice</h3>
        <p>${nutritionNeeds.exerciseAdvice}</p>
        <h3>Meal Plan</h3>
        <p><strong>Breakfast:</strong> ${nutritionNeeds.mealPlan.breakfast}</p>
        <p><strong>Mid-morning Snack:</strong> ${nutritionNeeds.mealPlan.midMorningSnack}</p>
        <p><strong>Lunch:</strong> ${nutritionNeeds.mealPlan.lunch}</p>
        <p><strong>Mid-afternoon Snack:</strong> ${nutritionNeeds.mealPlan.midAfternoonSnack}</p>
        <p><strong>Supper:</strong> ${nutritionNeeds.mealPlan.supper}</p>
        <p><strong>Bed-time Snack:</strong> ${nutritionNeeds.mealPlan.bedTimeSnack}</p>
    `;
}