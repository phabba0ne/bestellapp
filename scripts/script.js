import { Dishes } from "./data.js";
import { Cart } from "./cart.js";
import { renderDishes } from "./render.js";
import { Restaurant } from "./restaurant.js";

document.addEventListener("DOMContentLoaded", main);

function main() {
  const dishesManager = new Dishes();
  const cart = new Cart(dishesManager);

  setupApp(dishesManager, cart);
  setupUI(cart);
}

function setupApp(dishesManager, cart) {
  const allDishes = dishesManager.getAllDishes();
  renderDishes(allDishes, (id) => cart.addById(id));

  const restaurant = new Restaurant(
    "Savor Bistro",
    "A cozy place with fresh seasonal dishes.",
    4.5
  );
  restaurant.render("#restaurantInfo");
}

function setupUI(cart) {
  document.getElementById("orderBtn")?.addEventListener("click", () => {
    cart.empty();
    const msg = document.getElementById("orderStatus");
    msg.classList.remove("dNone");
    setTimeout(() => msg.classList.add("dNone"), 3000);
  });

  document.getElementById("toggleCartBtn")?.addEventListener("click", () => {
    document.querySelector(".cartWrapper")?.classList.toggle("open");
  });
}