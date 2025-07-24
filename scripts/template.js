function getDishTemplate(dish) {
  return `
    <div class="dishContainer" data-id="${dish.id}">
      <img src="${dish.imgSrc}" alt="${dish.name}" class="dish-img" />
      <div>
        <h2>${dish.name}</h2>
        <p>${dish.desc}</p>
        <span>${dish.price.toLocaleString('de-DE')} €</span>
      </div>
    </div>
  `;
}

function getCartItemTemplate(dish) {
  return `
    <div class="itemWrapper" data-id="${dish.id}">
      <div class="showName">${dish.name}</div>
      <li>
        <button class="removeBtn" aria-label="Remove"></button>
        <span class="quantityInCart">${dish.amountInCart}</span>
        <button class="addBtn" aria-label="Add"></button>
      </li>
      <div class="showOrderPrice">${(dish.price * dish.amountInCart).toLocaleString('de-DE')} €</div>
    </div>
  `;
}