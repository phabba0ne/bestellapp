export class Dish {
  static idCounter = 0;

  constructor({ name, desc, price, imgSrc }) {
    this.id = Dish.idCounter++;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imgSrc = imgSrc;
    this.amountInCart = 0;
  }
}

export class Dishes {
  constructor() {
    this.alldishes = [];
  }

  addDish(data) {
    const dish = new Dish(data);
    this.alldishes.push(dish);
    return dish;
  }

  getAllDishes() {
    return [...this.alldishes];
  }
}