// #region Dish

// a single dish
class Dish {
  // static counter
  static idCounter = 0;
  amountInCart = 0;

  // every dish object created ...
  constructor({ name, desc, price, imgSrc, amountInCart }) {
    // contains an unambiguous identifier
    this.id = Dish.idCounter++;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imgSrc = imgSrc;
    this.amountInCart = amountInCart;
  }
}
// #endregion Dish

// #region Dishes
class Dishes {
  alldishes = [];

  addDish(dishData) {
    const dish = new Dish(dishData);
    this.alldishes.push(dish);
    return dish;
  }

  getAllDishes() {
    //shallow copy - prevents manipulation of original object
    return [...this.alldishes];
  }
}
// #endregion Dishes

// #region dishesManager

//create object for changing dish data
const dishesManager = new Dishes();

dishesManager.addDish({
  name: "Pizza Rustica",
  desc: "Klassische Kombination aus Tomatensauce, Speck und frischen Champignons.",
  price: 8.5,
  imgSrc: "assets/img/pizza/pizza_01.jpg",
});

dishesManager.addDish({
  name: "Pizza Diavola",
  desc: "Würzige Pizza mit scharfer Salami, Chili, Tomaten und Mozzarella.",
  price: 9.9,
  imgSrc: "assets/img/pizza/pizza_02.jpg",
});

dishesManager.addDish({
  name: "Pizza Salame",
  desc: "Pizza mit Salami, Tomaten und Mozzarella.",
  price: 10.5,
  imgSrc: "assets/img/pizza/pizza_03.jpg",
});

dishesManager.addDish({
  name: "Insalata Flavio",
  desc: "Beilagensalat des Hauses mit einem Hauch Olivenöl – klassisch italienisch.",
  price: 6.9,
  imgSrc: "assets/img/salad/salad_01.jpg",
});

dishesManager.addDish({
  name: "Insalata Mista",
  desc: "Gemischter Salat mit Paprika, Gurken, Radieschen, Zwiebeln und Essig-Öl-Dressing.",
  price: 9.9,
  imgSrc: "assets/img/salad/salad_02.jpg",
});

dishesManager.addDish({
  name: "Insalata Pane",
  desc: "Gemischter Salat mit kross gerösteten Brotstückchen, und Cherry-Tomaten.",
  price: 10.5,
  imgSrc: "assets/img/salad/salad_03.jpg",
});

dishesManager.addDish({
  name: "Spaghetti al Pomodoro",
  desc: "Spaghetti mit hausgemachter Tomatensauce aus sonnengereiften San-Marzano-Tomaten.",
  price: 11.8,
  imgSrc: "assets/img/pasta/pasta_01.jpg",
});

dishesManager.addDish({
  name: "Pasta Flavio",
  desc: "Spaghetti mit frischem Gemüse der Saison und Kalbfleisch in einer leichten Tomatensauce.",
  price: 16.9,
  imgSrc: "assets/img/pasta/pasta_02.jpg",
});

dishesManager.addDish({
  name: "Spaghetti Frutti di Mare",
  desc: "Spaghettinest mit Garnelen und Tintenfisch – maritimer Genuss auf italienisch.",
  price: 18.9,
  imgSrc: "assets/img/pasta/pasta_03.jpg",
});

// #endregion dishesManager

// #region initialization

// makes sure everything is there before I use it, waits for DOMready event ...
document.addEventListener("DOMContentLoaded", function () {
  const allDishes = dishesManager.getAllDishes();
  // ... then renders all dishes
  renderDishes(allDishes);
});

// #endregion initialization

// #region rendering

function renderDishes(allDishes) {
  const dishesRef = document.getElementById("renderDishes");
  //delete previous content
  dishesRef.innerHTML = "";

  for (let i = 0; i < allDishes.length; i++) {
    //calls template function
    dishesRef.innerHTML += getDishTemplate(allDishes[i]);
  }

  const dishContainers = document.querySelectorAll(".dishContainer");
  for (let i = 0; i < dishContainers.length; i++) {
    //converts string to number (for access to index or id)
    const id = parseInt(dishContainers[i].dataset.id);
    dishContainers[i].addEventListener("click", () => cart.add(allDishes[id]));
  }
}
//#endregion rendering

// #region Cart

class Cart {
  constructor() {
    this.items = [];
  }

  // adds dish to cart or incrementally increases amount in cart
  add(dish) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === dish.id) {
        this.items[i].amountInCart++;
        return this.render();
      }
    }
    dish.amountInCart = 1;
    this.items.push(dish);
    this.render();
  }

  // removes dish from cart or incrementally decreases amount in cart
  remove(dish) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === dish.id) {
        this.items[i].amountInCart--;
        if (this.items[i].amountInCart <= 0) this.items.splice(i, 1);
        break;
      }
    }
    this.render();
  }

  total() {
    let sum = 0;
    for (let i = 0; i < this.items.length; i++) {
      sum += this.items[i].price * this.items[i].amountInCart;
    }
    return sum.toLocaleString("de-DE");
  }

  render() {
    const cartRef = document.getElementById("cartItems");
    cartRef.innerHTML = "";

    for (let i = 0; i < this.items.length; i++) {
      cartRef.innerHTML += getCartItemTemplate(this.items[i]);
    }

    renderCartTotal(this.total());

    // Attach events after rendering
    const itemWrappers = document.querySelectorAll(".itemWrapper");
    for (let i = 0; i < itemWrappers.length; i++) {
      const wrapper = itemWrappers[i];
      const dishId = parseInt(wrapper.dataset.id);
      const dish = allDishes[dishId];

      const addBtn = wrapper.querySelector(".addBtn");
      const removeBtn = wrapper.querySelector(".removeBtn");

      if (addBtn) addBtn.addEventListener("click", () => this.add(dish));
      if (removeBtn)
        removeBtn.addEventListener("click", () => this.remove(dish));
    }
  }
}
// #endregion Cart

//# region instantiation

const allDishes = dishesManager.getAllDishes();
// after allDishes is defined
const cart = new Cart();

//# endregion instantiation

function renderCartTotal(cartTotal) {
  const cartTotalRef = document.getElementById("cartTotal");
  if (cartTotalRef) {
    cartTotalRef.textContent = cartTotal + " €";
  }
}


// class cart

// TODO next: prevent cart overflow when many dishes in container

// class restaurant

// TODO: show restaurant name, stars, desc, information (deliveryPrice) statically

// TODO: order button which deletes cart and triggers a prompt telling that a test order is on its way

// TODO: delete whole order positions from cart 

// TODO: cart should not stick to the bottom when reached and it should appear as a row at the bottom then

//TODO: responsive to a width of 320px without vertical scroll bars, dNone cart at that point and, e.g., show a button that calls an overlay cart with same functionality

// optional TODO: show meal slider linking to sections pizza, pasta, etc. separated from images

