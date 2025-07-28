class Dish {
  static idCounter = 0;
  amountInCart = 0;

  constructor({ name, desc, price, imgSrc, amountInCart }) {
    this.id = Dish.idCounter++;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imgSrc = imgSrc;
    this.amountInCart = amountInCart;
  }
}

class Dishes {
  alldishes = [];

  addDish(dishData) {
    const dish = new Dish(dishData);
    this.alldishes.push(dish);
    return dish;
  }

  getAllDishes() {
    return [...this.alldishes];
  }
}

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

function renderDishes(allDishes) {
  const dishesRef = document.getElementById("renderDishes");
  dishesRef.innerHTML = "";

  for (let i = 0; i < allDishes.length; i++) {
    dishesRef.innerHTML += getDishTemplate(allDishes[i]);
  }

  const dishContainers = document.querySelectorAll(".dishContainer");
  for (let i = 0; i < dishContainers.length; i++) {
    const id = parseInt(dishContainers[i].dataset.id);
    dishContainers[i].addEventListener("click", () => cart.add(allDishes[id]));
  }
}

class Cart {
  constructor() {
    this.items = [];
  }

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

function renderCartTotal(cartTotal) {
  const cartTotalRef = document.getElementById("cartTotal");
  if (cartTotalRef) {
    cartTotalRef.textContent = cartTotal + " €";
  }
}

class Restaurant {
  constructor(name, description, stars) {
    this.name = name;
    this.description = description;
    this.stars = stars; // e.g., 4.5
  }

  renderStars() {
    const fullStars = Math.floor(this.stars);
    const halfStar = this.stars % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    let starsHTML = "";
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<span class="star full">&#9733;</span>';
    }
    if (halfStar) {
      starsHTML += '<span class="star half">&#9733;</span>';
    }
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<span class="star empty">&#9733;</span>';
    }
    return starsHTML;
  }

  render(selector) {
    const container = document.querySelector(selector);
    if (!container) {
      console.error("Selector not found:", selector);
      return;
    }

    container.innerHTML = `
      <h1>${this.name}</h2>
      <div class="restaurant-stars">${this.renderStars()}</div>
      <p class="restaurant-description">${this.description}</p>
    `;
  }
}
const myRestaurant = new Restaurant(
  "Savor Bistro",
  "A cozy place with fresh seasonal dishes.",
  4.5
);

document.addEventListener("DOMContentLoaded", () => {
  myRestaurant.render("#restaurantInfo");
});
