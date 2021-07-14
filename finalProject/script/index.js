import { Food } from "./food.js";
import { Ingredient} from "./ingredient.js";

let foods = [];
let unsoldFoods=[];
let ingredients=[];
if(localStorage.getItem('foodList')){
    foods = JSON.parse(localStorage.getItem('foodList'));     
    for (let i=0; i<foods.length;i++){
        if(foods[i].Sold = false){
            unsoldFoods.push(foods[i]);
        }
    }
    displayFood(unsoldFoods);
}

//To display the food available for sale
function displayFood(unsoldFoodArray){
    let selection = document.querySelector("section");
    selection.innerHTML = "";
    let foodPost = "";
    unsoldFoodArray.forEach((fooditem)=>{
        foodPost = foodPost + fooditem.Title + "<br>" 
            fooditem.Category + "<br>" + 
            fooditem.Description;
        fooditem.Ingredient.forEach((ingredientItem) =>{
            let i = 1;
            foodPost = foodPost + "Ingredient #" + i + " " + ingredientItem.Name + " serving: " + ingredientItem.Serving + "<br>";
            i++;
        })
        selection.innerHTML +=
            `<div class="foodSelection" data-id="${fooditem.TimeId}">
                ${foodPost}<br>
                <span>Purchase This</span>
                <input type="checkbox" date-id="${fooditem.TimeId}" name = "purchase">
            </div>`;
        foodPost = ""; 
    })
}

//Actions performed when clicking the sell your food button
document.querySelector("button").addEventListener("touchend", () => {
  let title = document.querySelector("#title").value;
  let description = document.querySelector("#description").value;
  const rbs = document.querySelectorAll('input[name="food_category"]');
  let selectedCategory;
  let radios = document.getElementsByName("food-category");
  for (let i = 0; i < radios.length; i++) {
      if(radios[i].checked){
          selectedCategory = radios[i].value;
          break;
      }
  }
  if(title == "" || description == "" || typeof selectedCategory === "undefined" || ingredients === []){
      alert("Title, food category, ingredient and descriptions are required");
  } else {
  let food = new Food(title, selectedCategory, ingredients, description, "../finalProject/images/food.jpg");
  ingredients = [];
  foods.push(food);
  console.log(foods);
  localStorage.setItem("foodList", JSON.stringify(foods));
  unsoldFoods = [];
  for (let i=0; i<foods.length;i++){
      if(foods[i].Sold == false){
          unsoldFoods.push(foods[i]);
      }
  }
  document.querySelector("#title").value = "";
  document.querySelector("#ingredient").value = "";
  document.querySelector("#description").value = "";
  for (let i = 0; i < radios.length; i++) {
    if(radios[i].checked){
        radios[i].checked = false;
        break;
    }
}
//Clear all the input textbox values
let textboxes = document.querySelectorAll('input[type="text"]');
for(let i = 0; i<textboxes.length;i++){
    console.log(textboxes[i].value);
    textboxes[i].value = "";
}

if (textboxes.length>3){
    do{
        document.querySelectorAll('input[type="text"]')[3].remove();
    }
    while(document.querySelectorAll('input[type="text"]')[3]);
}

//Removing all delete ingredient buttons after submitting the food to sell
// if(document.querySelectorall('input[data-id=""]').length>0){
//     do{
//         document.querySelectorall('input[type="button"][value="Delete Ingredient"]')[0].remove();
//     }
//     while(document.querySelectorall('input[type="button"][value="Delete Ingredient"]')[0]);
// }
// let delete_ingredient_buttons = document.querySelectorall('input[type="button"][class="ingredient_delete_button"]');
// console.log(delete_ingredient_buttons);

  displayFood(unsoldFoods);
}});

//Actions performed after clicking the add ingredient button
document.querySelector("#ingredient_added_button").addEventListener("touchend", () => {
    let added_ingredient = document.querySelector("#ingredient").value;
    let added_serving = document.querySelector("#serving").value;
    if(added_ingredient == "" || added_serving == ""){
        alert("Ingredient and serving are both required")
    }else {
    let ingredient = new Ingredient(added_ingredient, added_serving);
    document.querySelector(".ingredient_div").innerHTML +=
        `<input type="text" name="ingredient" class="added_ingredient" value="${added_ingredient}" maxlength="6" size="6" data-id="${ingredient.TimeId}" readonly>
        <input type="text" name="serving" class="added_serving" value="${added_serving}" maxlength="6" size="6" data-id="${ingredient.TimeId}" readonly>
        <input type="button" value="Delete Ingredient" name="delete" class="ingredient_delete_button" data-id="${ingredient.TimeId}"<br>`;
        document.querySelector("#ingredient").value = "";
    document.querySelector("#serving").value = "";
    ingredients.push(ingredient);
    console.log(ingredients);}

//Actions performed after hitting the delete ingredient button
let delete_ingredient_buttons = document.querySelectorAll('.ingredient_delete_button');
console.log(delete_ingredient_buttons);
delete_ingredient_buttons.forEach(
    delete_ingredient_button => {
        delete_ingredient_button.addEventListener('touchend', (e) => {
            let selectedId = e.target.dataset.id;
            console.log(selectedId);
            for(let i = 0; i<ingredients.length;i++){
                let selectedIngredient = ingredients.find(ingredient => ingredient.TimeId === parseInt(selectedId));
                if(selectedIngredient){
                    console.log(selectedIngredient);
                }
            }

            // selectedTodo.Completed = !selectedTodo.Completed;

            // localStorage.setItem('toDoList', JSON.stringify(toDoList));
            // let countNotCompleted = 0;
            // toDoList.forEach(
            //     (toDoListItem) => {
            //         if (toDoListItem.Completed == false){
            //             countNotCompleted += 1;
            //         }
            //     }
            // )
        });
    });
})

//Fetch API to reference to external API
const params={
    api_key: 'TYiTH5rSuMu3C72sXI27po6nP1gAdP0YQcqghQI0',
    query:'egg',
    dataType: ["Survey (FNDDS)"],
    pagesize: 5,
}

const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${params.query}&pageSize=${params.pagesize}&dataType=${params.dataType}&api_key=${params.api_key}`;
fetch(api_url)
  .then(response => response.json())
  .then(data => console.log(data));