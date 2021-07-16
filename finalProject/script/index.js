import { Food } from "./food.js";
import { Ingredient } from "./ingredient.js";
import { Nutrients } from "./nutrient.js";

let foods = [];
let unsoldFoods = [];
let ingredients = [];
if (localStorage.getItem("foodList")) {
  foods = JSON.parse(localStorage.getItem("foodList"));
  for (let i = 0; i < foods.length; i++) {
    if ((foods[i].Sold == false)) {
      unsoldFoods.push(foods[i]);
    }
  }
  console.log(unsoldFoods);
  displayFood(unsoldFoods);
}

//To display the food available for sale
function displayFood(unsoldFoodArray) {
  let selection = document.querySelector("section");
  selection.innerHTML = "";
  let foodPost = "";
  let foodNumber = 0;
  unsoldFoodArray.forEach((fooditem) => {
    foodNumber++;
    console.log(fooditem.Description);
    console.log(fooditem.Category);
    foodPost =
      "Food #" +
      foodNumber +
      "<br>" +
      fooditem.Title +
      "<br>" +
      fooditem.Category +
      "<br>" +
      fooditem.Description;
    let i = 1;
    fooditem.Ingredient.forEach((ingredientItem) => {
      foodPost =
        foodPost +
        "Ingredient #" +
        i +
        " " +
        ingredientItem.Name +
        " serving: " +
        ingredientItem.Serving +
        "<br>";
      i++;
    });
    selection.innerHTML += `<div class="foodSelection" data-id="${fooditem.TimeId}">
                ${foodPost}<br>
                <span>Purchase This</span>
                <input type="checkbox" date-id="${fooditem.TimeId}" name = "purchase"><br>
                <input type="button" data-id="${fooditem.TimeId}" name = "show_nutrients" value = "Amount of protein contained">
            </div>`;
    foodPost = "";
  });
}

//Actions performed when clicking the sell your food button
document.querySelector("button").addEventListener("touchend", () => {
  let title = document.querySelector("#title").value;
  let description = document.querySelector("#description").value;
  const rbs = document.querySelectorAll('input[name="food_category"]');
  let selectedCategory;
  let radios = document.getElementsByName("food-category");
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      selectedCategory = radios[i].value;
      break;
    }
  }
  if (
    title == "" ||
    description == "" ||
    typeof selectedCategory === "undefined" ||
    ingredients.length < 1
  ) {
    alert("Title, food category, ingredient and descriptions are required");
  } else {
    let food = new Food(
      title,
      selectedCategory,
      ingredients,
      description,
      "../finalProject/images/food.jpg"
    );
    ingredients = [];
    foods.push(food);
    console.log(foods);
    localStorage.setItem("foodList", JSON.stringify(foods));
    unsoldFoods = [];
    for (let i = 0; i < foods.length; i++) {
      if (foods[i].Sold == false) {
        unsoldFoods.push(foods[i]);
      }
    }
    document.querySelector("#title").value = "";
    document.querySelector("#ingredient").value = "";
    document.querySelector("#description").value = "";
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        radios[i].checked = false;
        break;
      }
    }
    //Clear all the input textbox values
    let textboxes = document.querySelectorAll('input[type="text"]');
    for (let i = 0; i < textboxes.length; i++) {
      console.log(textboxes[i].value);
      textboxes[i].value = "";
    }

    // Removing all input tag with a dataset id after submitting the food to sell
    document.querySelectorAll("input").forEach((inputItem) => {
      if (inputItem.dataset.id) {
        inputItem.remove();
      }
    });

    displayFood(unsoldFoods);

    document
      .querySelectorAll('input[name="show_nutrients"]')
      .forEach((showNutrientButton) => {
        showNutrientButton.addEventListener("touchend", (e) => {
          let selectedId_nutrient = e.target.dataset.id;
          for (let i = 0; i < unsoldFoods.length; i++) {
            //targetedFood_nutrient is the food we want to get the nutrient for
            let targetedFood_nutrient = unsoldFoods.find(
              (ingredient) =>
                ingredient.TimeId === parseInt(selectedId_nutrient)
            );
            console.log(targetedFood_nutrient);
            displayNutrients(extractNutrientValue(targetedFood_nutrient));
          }
        });
      });
  }
});

function extractNutrientValue(targetedFood) {
  //Fetch API to reference to external API
  const params = {
    api_key: "TYiTH5rSuMu3C72sXI27po6nP1gAdP0YQcqghQI0",
    query: "rice",
    dataType: ["Survey (FNDDS)"],
    pagesize: 5,
  };

  targetedFood.Ingredient.forEach((eachIngredient)=>{
    params.query = eachIngredient.Name;
    console.log(params.query);
  })

  const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${params.query}&pageSize=${params.pagesize}&dataType=${params.dataType}&api_key=${params.api_key}`;
  fetch(api_url)
    .then((response) => response.json())
    .then((data) => console.log(data));

}

function displayNutrients(nutrientArrary){

}

function displayIngredient(ingredientList) {
  let ingredientDiv = document.querySelector(".ingredient_div");
  ingredientDiv.innerHTML = '';
  
  ingredientList.forEach((ingredientUnit) => {
    ingredientDiv.innerHTML += `<div data-id="${ingredientUnit.TimeId}">
            <input type="text" name = "ingredient_added" value="${ingredientUnit.Name}" maxlength="6" size="6" data-id="${ingredientUnit.TimeId}">
            <input type="text" name = "serving_added" value="${ingredientUnit.Serving}" maxlength="6" size="6" data-id="${ingredientUnit.TimeId}">
            <input type="button" value="Update" class="ingredient_update_button" data-id="${ingredientUnit.TimeId}">
            <input type="button" value="Delete" class="ingredient_delete_button" data-id="${ingredientUnit.TimeId}"><br>
        </div>`;
  });
}

//Actions performed after clicking the add ingredient button
document
  .querySelector("#ingredient_added_button")
  .addEventListener("touchend", () => {
    console.log('Add button clicked');
    let added_ingredient = document.querySelector("#ingredient").value;
    let added_serving = document.querySelector("#serving").value;
    console.log(added_ingredient);
    console.log(added_serving);
    if (added_ingredient == "" || added_serving == "") {
      alert("Ingredient and serving are both required");
    } else {
      let ingredient = new Ingredient(added_ingredient, added_serving);
      document.querySelector("#serving").value = "";
      document.querySelector("#ingredient").value = "";
      ingredients.push(ingredient);
      console.log(ingredients);
      displayIngredient(ingredients);
    }

    //Actions performed after hitting the update ingredient button
    let edit_ingredient_buttons = document.querySelectorAll(
      ".ingredient_update_button"
    );
    edit_ingredient_buttons.forEach((edit_ingredient_button) => {
      edit_ingredient_button.addEventListener("touchend", (e) => {
        let seletedEditId = e.target.dataset.id;
        console.log(seletedEditId);
        // for (let i = 0; i < ingredients.length; i++) {
          let selectedIngredient_edit = ingredients.find(
            (ingredient) => ingredient.TimeId === parseInt(seletedEditId)
          );
          console.log(selectedIngredient_edit);
          let selected_index = ingredients.indexOf(selectedIngredient_edit);
          console.log(selected_index);
          let editedIngredient = document.querySelector(
            `input[data-id="${seletedEditId}"][name="ingredient_added"]`
          );
          ingredients[selected_index].Name = editedIngredient.value;
          let editedServing = document.querySelector(
            `input[data-id="${seletedEditId}"][name="serving_added"]`
            //data-id instead
          );
          ingredients[selected_index].Serving = editedServing.value;
          console.log(ingredients[selected_index]);
        // }
        alert(
          "Ingredient: " +
            editedIngredient.value +
            " and serving: " +
            editedServing.value +
            " have been updated"
        );
        console.log(ingredients);
      });
    });

    //Actions performed after hitting the delete ingredient button
    let delete_ingredient_buttons = document.querySelectorAll(
      ".ingredient_delete_button"
    );
    delete_ingredient_buttons.forEach((delete_ingredient_button) => {
      delete_ingredient_button.addEventListener("touchend", (e) => {
        let selectedId = e.target.dataset.id;
        console.log(selectedId);
        let selectedIngredient;
        for (let i = 0; i < ingredients.length; i++) {
          selectedIngredient = ingredients.find(
            (ingredient) => ingredient.TimeId === parseInt(selectedId)
          );
        }
        console.log(selectedIngredient);
        let selectedIndex = ingredients.indexOf(selectedIngredient);
        console.log(selectedIndex);
        ingredients.splice(selectedIndex,1);
        console.log(ingredients);
        deleteInputBoxes(selectedId);
      });
    });
  });

function deleteInputBoxes(selectedTimeId){
  let inputsToDelete = document.querySelectorAll(`[data-id="${selectedTimeId}"]`);
  console.log(inputsToDelete);
  inputsToDelete.forEach((inputToDelete) =>{
    inputToDelete.remove();
  });
  alert("Ingredient has been deleted");
}