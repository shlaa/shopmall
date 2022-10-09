<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>购物车({{cartLength}})</div>
      </template>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom></cart-bottom>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import {mapGetters} from 'vuex'

  import CartList from "@/views/cart/childComps/CartList";
  import CartBottom from "@/views/cart/childComps/CartBottom";

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottom
    },
    computed: {
      ...mapGetters(['cartLength', 'cartList'])
      // cartLength() {
      //   return this.$store.getters.cartLength
      // },
      // cartCount() {
      //   return this.$store.getters.cartCount
      // }
    }
  }
</script>

<style scoped>
  #cart {
    /*position: relative;*/
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  /*.cart-list {*/
  /*  position: absolute;*/
  /*  top: 44px;*/
  /*  bottom: 49px;*/
  /*  width: 100%;*/
  /*}*/
</style>
