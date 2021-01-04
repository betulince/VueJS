/*
var app = new Vue({
  el: '#app',
  data: {
    product: "Socks",
    image: "electric-blue-socks.jpg"
  }
})
*/

const app = Vue.createApp({ // {} --> options object,you must pass at least one object
  data() { //or data function()
    return{
      cart: [], //if we want to refer this cart we use this.cart in the method
      premium: true //user is premium or not
    }
  },
  methods: {
    updateCart(id){
      this.cart.push(id) //this method will update the actual cart
    },
    removeById(id){
      const index = this.cart.indexOf(id)
        if(index > -1){
          this.cart.splice(index,1)
        }
    }

  }
})
