const template = document.createElement('template');
const style = `
<style>
  @import "./src/components/SellItem/sellitem.css";
</style>
`;

template.innerHTML = `
${style}
<div class="sell-item">
  <div class="photo"><img/></div>
  <br>
  <div class="info">
    <h3></h3>
    <div class="value">
      <span class="price"></span>
      <span class="discount"></span>
      <p class="normal">Normal: <span  class="original"></span></p>
    </div>
    <div class="stars">
      <div class="rating-group"></div>
    </div>
  </div>
</div>
`;

class SellItem extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'photo', 'original', 'discount', 'stars'];
  }
  constructor() {
    super();
    
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.querySelector('h3').innerText = this.name;
    this.shadowRoot.querySelector('img').src = this.photo;
    this.shadowRoot.querySelector('.original').innerText = "$" + this.original;
    this.shadowRoot.querySelector('.discount').innerText = "-" + this.discount + "%";
    this.shadowRoot.querySelector('.price').innerText = "$" + this.price;

    for (var i=1; i <= 5; i++) {
      if (i <= Math.floor(this.stars)) {
        this.shadowRoot.querySelector('.rating-group').innerHTML += `<label aria-label="4 stars" class="rating-label" for="rating2-40"><i class="rating-icon rating-icon--star fa fa-star"></i></label>`;
      } else if (i === Math.ceil(this.stars)) {
        this.shadowRoot.querySelector('.rating-group').innerHTML += `<label aria-label="3.5 stars" class="rating-label rating-label--half" for="rating2-35"><i class="rating-icon rating-icon--star fa fa-star-half"></i></label>
        <label aria-label="4 stars" class="rating-label" for="rating2-40"><i class="rating-icon rating-icon--none fa fa-star"></i></label>`;
      } else {
        this.shadowRoot.querySelector('.rating-group').innerHTML += `<label aria-label="4 stars" class="rating-label" for="rating2-40"><i class="rating-icon rating-icon--none fa fa-star"></i></label>`;
      }
    }
  }

  get name() {
    return this.getAttribute('name');
  }

  get photo() {
    return this.getAttribute('photo');
  }

  get original() {
    return this.getAttribute('original');
  }

  get discount() {
    return this.getAttribute('discount');
  }

  get stars() {
    return this.getAttribute('stars');
  }

  get price() {
    return Math.round(this.original * (1 - this.discount / 100)).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  }
}

window.customElements.define('sell-item', SellItem);
