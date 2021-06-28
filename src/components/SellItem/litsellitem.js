import {LitElement, html, css} from 'https://unpkg.com/lit-element/lit-element.js?module';
import {unsafeHTML} from 'https://unpkg.com/lit-html@1.4.1/directives/unsafe-html.js?module';

class LitSellItem extends LitElement {
  static get styles() {
    return css`
      h3 {
        margin-top: 0;
        color: coral;
      }

      .sell-item {
        width: fit-content;
        padding: 7px;
        margin: 0 10px 0 10px;
        border: 2px solid #bfbfbf;
      }

      .photo, .info {
        padding: 7px;
        border: 2px solid #bfbfbf85;
      }

      .price {
        font-size:large;
      }

      .discount {
        float:right;
        font-weight: bold;
        border-radius: 5px;
        padding: 2.5px;
        background-color: #d02727;
        color: white;
      }

      .normal {
        margin-top: 0;
        font-size:small;
      }

      .original {
        text-decoration: line-through;
      }

      .stars {
        text-align: center;
      }

      .rating-group {
        display: inline-flex;
      }

      .rating-label {
        cursor: pointer;
        padding: 0 0.1em;
        font-size: 1.8rem;
      }

      .rating-label--half {
        padding-right: 0;
        margin-right: -0.6em;
        z-index: 2;
      }

      .rating-icon--star {
        color: orange;
      }

      .rating-icon--none {
        color: #ddd;
      }
    `;
  }
  render(){
    this.price = Math.round(this.original * (1 - this.discount / 100)).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    for (var i=1; i <= 5; i++) {
      if (i <= Math.floor(this.stars)) {
        this.starsHtml += `<label aria-label="4 stars" class="rating-label" for="rating2-40"><i class="rating-icon rating-icon--star fa fa-star"></i></label>`;
      } else if (i === Math.ceil(this.stars)) {
        this.starsHtml += `<label aria-label="3.5 stars" class="rating-label rating-label--half" for="rating2-35"><i class="rating-icon rating-icon--star fa fa-star-half"></i></label>
        <label aria-label="4 stars" class="rating-label" for="rating2-40"><i class="rating-icon rating-icon--none fa fa-star"></i></label>`;
      } else {
        this.starsHtml += `<label aria-label="4 stars" class="rating-label" for="rating2-40"><i class="rating-icon rating-icon--none fa fa-star"></i></label>`;
      }
    }

    return html`
      <style>
        @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
      </style>
      <div class="sell-item">
        <div class="photo"><img src="${this.photo}"/></div>
        <br>
        <div class="info">
          <h3>${this.name}</h3>
          <div class="value">
            <span class="price">$${this.price}</span>
            <span class="discount">-${this.discount}%</span>
            <p class="normal">Normal: <span  class="original">$${this.original}</span></p>
          </div>
          <div class="stars">
            
            <div class="rating-group">${unsafeHTML(this.starsHtml)}</div>
          </div>
        </div>
      </div>
    `;
  }

  constructor() {
    super();
    this.name = "Comida Japonesa";
    this.photo = "https://lorempixel.com/200/200/food/1/";
    this.original = 175990;
    this.discount = 35;
    this.stars = 4.5;
    this.price = Math.round(this.original * (1 - this.discount / 100)).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    this.starsHtml = '';
  }
  

  static get properties(){
    return{
      photo: {type: String},
      name: {type: String},
      original: {type: Number},
      discount: {type: Number},
      price: {type: Number},
      stars: {type: Number}
    };
  }
}

customElements.define('lit-sell-item', LitSellItem);