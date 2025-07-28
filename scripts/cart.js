import { renderCart } from "./render.js";

export class Cart {
  constructor(dishesManager) {
    this.dishesManager = dishesManager;
    this.items = [];
  }

  addById(id) {
    const dish = this.dishesManager.getDishById(id);
    this.add(dish);
  }

  add(dish) {
    const found = this.items.find((d) => d.id === dish.id);
    if (found) {
      found.amountInCart++;
    } else {
      this.items.push({ ...dish, amountInCart: 1 });
    }
    this.render();
  }

  remove(id) {
    const index = this.items.findIndex((d) => d.id === id);
    if (index !== -1) {
      this.items[index].amountInCart--;
      if (this.items[index].amountInCart <= 0) this.items.splice(index, 1);
    }
    this.render();
  }

  removeDishCompletely(id) {
    this.items = this.items.filter((d) => d.id !== id);
    this.render();
  }

  empty() {
    this.items = [];
    this.render();
  }

total() {
  return this.items
    .reduce((sum, d) => sum + d.price * d.amountInCart, 0)
    .toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

  render() {
    renderCart(this.items, this.total(), {
      add: (id) => this.addById(id),
      remove: (id) => this.remove(id),
      removeAll: (id) => this.removeDishCompletely(id),
    });
  }
}