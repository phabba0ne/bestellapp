import { getDishTemplate, getCartItemTemplate } from "./template.js";

export function renderDishes(dishes, onClick) {
  const container = document.getElementById("renderDishes");
  container.innerHTML = dishes.map(getDishTemplate).join("");

  document.querySelectorAll(".dishContainer").forEach((el) => {
    const id = parseInt(el.dataset.id);
    el.addEventListener("click", () => onClick(id));
  });
}

export function renderCart(items, total, { add, remove, removeAll }) {
  const container = document.getElementById("cartItems");
  container.innerHTML = items.map(getCartItemTemplate).join("");

  const totalEl = document.getElementById("cartTotal");
  if (totalEl) totalEl.textContent = total + " €";

  document.querySelectorAll(".itemWrapper").forEach((el) => {
    const id = parseInt(el.dataset.id);
    el.querySelector(".addBtn")?.addEventListener("click", () => add(id));
    el.querySelector(".removeBtn")?.addEventListener("click", () => remove(id));
    el.querySelector(".delBtn")?.addEventListener("click", () => removeAll(id));
  });
}
