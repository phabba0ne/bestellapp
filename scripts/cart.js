import { getCartItemTemplate } from "./scripts/template.js";

export class Cart {
  constructor(allDishes) {
    this.allDishes = allDishes;
    this.items = [];
  }

  add(dish) {
    const existing = this.items.find((d) => d.id === dish.id);
    if (existing) {
      existing.amountInCart++;
    } else {
      dish.amountInCart = 1;
      this.items.push(dish);
    }
    this.render();
  }

  remove(dish) {
    const index = this.items.findIndex((d) => d.id === dish.id);
    if (index !== -1) {
      this.items[index].amountInCart--;
      if (this.items[index].amountInCart <= 0) {
        this.items.splice(index, 1);
      }
    }
    this.render();
  }

  removeDishCompletely(dishId) {
    this.items = this.items.filter((d) => d.id !== dishId);
    this.render();
  }

  total() {
    return this.items
      .reduce((sum, d) => sum + d.price * d.amountInCart, 0)
      .toLocaleString("de-DE");
  }

  empty() {
    this.items = [];
    this.render();
  }

  render() {
    const cartRef = document.getElementById("cartItems");
    cartRef.innerHTML = "";

    for (const item of this.items) {
      cartRef.innerHTML += getCartItemTemplate(item);
    }

    renderCartTotal(this.total());

    const wrappers = document.querySelectorAll(".itemWrapper");
    wrappers.forEach((wrapper) => {
      const id = parseInt(wrapper.dataset.id);
      const dish = this.allDishes.find((d) => d.id === id);

      wrapper
        .querySelector(".addBtn")
        ?.addEventListener("click", () => this.add(dish));
      wrapper
        .querySelector(".removeBtn")
        ?.addEventListener("click", () => this.remove(dish));
      wrapper
        .querySelector(".delBtn")
        ?.addEventListener("click", () => this.removeDishCompletely(dish.id));
    });
  }
}
