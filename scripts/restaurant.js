export class Restaurant {
  constructor(name, description, stars) {
    this.name = name;
    this.description = description;
    this.stars = stars;
  }

  renderStars() {
    const full = Math.floor(this.stars);
    const half = this.stars % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      "★".repeat(full) +
      (half ? "<span class=\"star half\">★</span>" : "") +
      "☆".repeat(empty)
    );
  }

  render(selector) {
    const container = document.querySelector(selector);
    if (!container) return;

    container.innerHTML = `
      <h1>${this.name}</h1>
      <div class="restaurant-stars">${this.renderStars()}</div>
      <p class="restaurant-description">${this.description}</p>
    `;
  }
}