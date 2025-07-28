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
    this.loadDefaults();
  }

  addDish(dishData) {
    const dish = new Dish(dishData);
    this.alldishes.push(dish);
    return dish;
  }

  getDishById(id) {
    return this.alldishes.find((d) => d.id === id);
  }

  getAllDishes() {
    return [...this.alldishes];
  }

  loadDefaults() {
    this.addDish({
      name: "Pizza Rustica",
      desc: "Klassische Kombination aus Tomatensauce, Speck und frischen Champignons.",
      price: 8.59,
      imgSrc: "assets/img/pizza/pizza_01.jpg",
    });
    this.addDish({
      name: "Pizza Diavola",
      desc: "Würzige Pizza mit scharfer Salami, Chili, Tomaten und Mozzarella.",
      price: 9.95,
      imgSrc: "assets/img/pizza/pizza_02.jpg",
    });
    this.addDish({
      name: "Pizza Salame",
      desc: "Pizza mit Salami, Tomaten und Mozzarella - beliebt bei jung und alt.",
      price: 10.57,
      imgSrc: "assets/img/pizza/pizza_03.jpg",
    });
    this.addDish({
      name: "Insalata Flavio",
      desc: "Beilagensalat des Hauses mit einem Hauch Olivenöl – klassisch italienisch.",
      price: 6.95,
      imgSrc: "assets/img/salad/salad_01.jpg",
    });
    this.addDish({
      name: "Insalata Mista",
      desc: "Gemischter Salat mit Paprika, Gurken, Radieschen, Zwiebeln und Essig-Öl-Dressing.",
      price: 9.97,
      imgSrc: "assets/img/salad/salad_02.jpg",
    });
    this.addDish({
      name: "Insalata Pane",
      desc: "Gemischter Salat mit kross gerösteten Brotstückchen, und Cherry-Tomaten.",
      price: 10.55,
      imgSrc: "assets/img/salad/salad_03.jpg",
    });
    this.addDish({
      name: "Spaghetti al Pomodoro",
      desc: "Spaghetti mit hausgemachter Tomatensauce aus sonnengereiften San-Marzano-Tomaten.",
      price: 11.89,
      imgSrc: "assets/img/pasta/pasta_01.jpg",
    });
    this.addDish({
      name: "Pasta Flavio",
      desc: "Spaghetti mit frischem Gemüse der Saison und Kalbfleisch in einer leichten Tomatensauce.",
      price: 16.95,
      imgSrc: "assets/img/pasta/pasta_02.jpg",
    });
    this.addDish({
      name: "Spaghetti Frutti di Mare",
      desc: "Spaghettinest mit Garnelen und Tintenfisch – maritimer Genuss auf italienisch.",
      price: 18.95,
      imgSrc: "assets/img/pasta/pasta_03.jpg",
    });
  }
}