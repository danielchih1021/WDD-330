export class Ingredient{
    constructor(name, serving){
        this.TimeId = Date.now();
        this.Name = name;
        this.Serving = serving;
    }
}