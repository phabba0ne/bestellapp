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
let allDishes = [];
document.addEventListener("DOMContentLoaded", function () {
  allDishes = dishesManager.getAllDishes();
  renderDishes(allDishes);

  const orderBtn = document.getElementById("orderBtn");
  const orderStatus = document.getElementById("orderStatus");
  const cartWrapper = document.querySelector(".cartWrapper");
  const toggleCartBtn = document.getElementById("toggleCartBtn");
  toggleCartBtn.addEventListener("click", () => {
    cartWrapper.classList.toggle("open");
  });

  orderBtn.addEventListener("click", () => {
    cart.empty();
    cart.render();
    orderStatus.textContent = "Deine Testbestellung ist auf dem Weg! 🍕";
    orderStatus.classList.remove("dNone");

    setTimeout(() => {
      orderStatus.classList.add("dNone");
    }, 3000);
  });
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

  removeDishCompletely(dishId) {
    this.items = this.items.filter((d) => d.id !== dishId);
    this.render();
  }

  total() {
    let sum = 0;
    for (let i = 0; i < this.items.length; i++) {
      sum += this.items[i].price * this.items[i].amountInCart;
    }
    return sum.toLocaleString("de-DE");
  }

  empty() {
    this.items = [];
    this.render();
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
      const delBtn = wrapper.querySelector(".delBtn");
      if (delBtn) {
        delBtn.addEventListener("click", () =>
          this.removeDishCompletely(dish.id)
        );
      }

      if (addBtn) addBtn.addEventListener("click", () => this.add(dish));
      if (removeBtn)
        removeBtn.addEventListener("click", () => this.remove(dish));
    }
  }
}
const cart = new Cart();
// #endregion Cart

function renderCartTotal(cartTotal) {
  const cartTotalRef = document.getElementById("cartTotal");
  if (cartTotalRef) {
    cartTotalRef.textContent = cartTotal + " €";
  }
}

// class restaurant

// TODO next: show restaurant name, stars, desc, information (deliveryPrice) statically

class Restaurant {
  name = "";
  stars = 0;
  desc = "";
  deliveryPrice = 0;

  constructor(name, stars, desc, deliveryPrice) {
    this.name = name;
    this.stars = stars;
    this.desc = desc;
    this.deliveryPrice = deliveryPrice;
  }
}

const r = new Restaurant("Flavio", 4, "Italienische Spezialitäten", 4.45);
console.log(r);

// function renderInfo(){
//   for(){

//   }
// }

// class cart

// TODO: order button which deletes cart and triggers a prompt telling that a test order is on its way
// (button named orderBtn DONE)

// TODO: cart appears as a row at the bottom latest at with 320px;
// process: dNone cart at that point and show a button that calls an overlay cart (with same functionality ?)

// TEST: responsive to a width of 320px without vertical scroll bars?

// class restaurant optional
// optional TODO: show meal slider linking to sections pizza, pasta, etc. separated from images
