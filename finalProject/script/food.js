export class Food{
    constructor(title, category, ingredient, description, picture){
        this.TimeId = Date.now();
        this.Title = title;
        this.Ingredient = ingredient;
        this.Description = description;
        this.Sold = false;
        this.Category = category;
        this.Picture = picture;
    }
}