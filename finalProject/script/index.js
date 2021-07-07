import { Food } from "./food.js";

let foods = [];
let unsoldFoods=[];
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
function displayFood(unsoldFoods){
    let selection = document.querySelector("section");
    console.log(selection);
    selection.value = "";
    foods.forEach((foodItem) => {
        selection.innerHTML += 
        `<div class="food">
            ${foodItem.Title}<br>
            ${foodItem.Category}<br>
            ${foodItem.Ingredient}<br>
            ${foodItem.Description}<br>
        </div>` 
    });
}

//Actions performed when clicking the sell your food button
document.querySelector("button").addEventListener("touchend", () => {
  let title = document.querySelector("#title").value;
  let ingredient = document.querySelector("#ingredient").value;
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
  let food = new Food(title, selectedCategory, ingredient, description, "../finalProject/images/food.jpg");
  foods.push(food);
  console.log(foods);
  localStorage.setItem("foodList", JSON.stringify(foods));
  unsoldFoods = [];
  for (let i=0; i<foods.length;i++){
      if(foods[i].Sold = false){
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
  displayFood(unsoldFoods);
});

document.querySelector("#ingredient_added_button").addEventListener("touchend", () => {
    let added_ingredient = document.querySelector("#ingredient").value;
    document.querySelector(".ingredient_div").innerHTML +=
        `<input type="text name="ingredient" class="added_ingredient" value="${added_ingredient}"><br>`;
        document.querySelector("#ingredient").value = "";
    
})

//Fetch API to reference to external API
const params={
    api_key: 'TYiTH5rSuMu3C72sXI27po6nP1gAdP0YQcqghQI0',
    query:'cheddar cheese',
    dataType: ["Survey (FNDDS)"],
    pagesize: 5,
}

const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${params.query}&pageSize=${params.pagesize}&dataType=${params.dataType}&api_key=${params.api_key}`;
fetch(api_url)
  .then(response => response.json())
  .then(data => console.log(data));