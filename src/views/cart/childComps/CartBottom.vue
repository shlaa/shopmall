<template>
  <div class="cart-bottom">
    <div class="cart-button">
      <check-button></check-button>
      <span>全选</span>
    </div>
  </div>
</template>

<script>
  import CheckButton from "@/views/cart/childComps/CheckButton";

  export default {
    name: "CartBottom",
    components: {
      CheckButton
    },
  }
</script>

<style scoped>
  .cart-bottom {
    height: 40px;
    position: relative;
    background-color: #f13e3a;
  }

  .cart-button {
  display: flex;
  }
</style>
