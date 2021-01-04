app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template:
  /*html*/
  `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img v-bind:src="image">
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>

        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>

        <p> Shipping : {{ shipping}} </p>

        <product-details :details = "details"></product-details>

        <div
          v-for="(variant , index) in variants"
          :key="variant.id"
          @mouseover="updateVariant(index)"
          class = "color-circle"
          :style="{ backgroundColor : variant.color }">
        </div>

        <button
          class="button"
          :class="{ disabledButton: !inStock }"
          :disabled="!inStock"
          v-on:click="addToCart">
          Add to Cart
        </button>

        <button
        class="button"
        :class="{ disabledButton: !inStock }"
        :disabled="!inStock"
        @click="removeFromCart">
        Remove Item
      </button>

      </div>
    </div>
    <review-list v-if="reviews.length" :reviews = "reviews"></review-list>
    <review-form @review-submitted = "addReview"></review-form>
  </div>`,

/*
<review-list v-if="reviews.length" :reviews = "reviews"></review-list>
means that if reviews list is empty then don't show the review component
*/

  data() { //or data function()
    return{
      product: 'Socks', //reactivity system
      selectedVariant: 0, //we initialize it with 0 because we're going to update this
      //with the index of the variant that's currently hovered on
      //so we deleted the inStock and image properties
      //because they're gonna be computed properties
      brand: 'Vue Mastery',
      details: ['50% cotton', '30% wool', '20% polyester'],
      variants: [
        { id: 2234 , color: 'green' , image: './assets/download.jpeg' , quantity:50},
        { id: 2235 , color: 'blue' , image: './assets/electric-blue-socks.jpg' , quantity:0},
        { id: 2236 , color: 'red' , image: './assets/maos-red-plain-socks.jpg' , quantity:2},
      ],
      reviews: []
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart' , this.variants[this.selectedVariant].id)
    },
    removeFromCart() {
        this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
      },
    updateVariant(index){
      this.selectedVariant = index
      console.log(index) //yeşil ve mavi yuvarlaklara dokunduğumuzda indexleri gösterir 0 ve 1 olarak
    },
    addReview(review){
      this.reviews.push(review)
    }
  },
  computed: { //computed property : calculate or compute values for us
    title() {
      return this.brand+ ' ' +this.product
    },
    image() {
      return this.variants[this.selectedVariant].image
    },
    inStock(){
      return this.variants[this.selectedVariant].quantity
    },
    shipping(){
      if(this.premium){
        return 'Free'
      }
      return 2.99
    }
  }
})
