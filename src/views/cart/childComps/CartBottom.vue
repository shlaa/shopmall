<template>
  <div class="cart-bottom">
    <div class="cart-comment">
      <check-button class="cart-button"
                    :is-checked="isSelectAll"
                    @click.native="BottomClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price-comment">合计：{{totalPrice}}</div>
    <div class="length-comment">去计算({{cartBLength}})</div>
  </div>
</template>

<script>
  import CheckButton from "@/views/cart/childComps/CheckButton";
  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottom",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        const cartList = this.$store.getters.cartList;
        return '￥' + cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.newPrice
        }, 0).toFixed(2)
      },
      ...mapGetters(['cartLength', 'cartList']),
      cartBLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.cartLength == 0)
          return false
        // if ((!this.cartList.find(item => !item.checked)) && this.cartLength !== 0) {
        //   return true
        // }
        //!this.cartList.filter(item => !item.checked).length
        // return !this.cartList.find(item => !item.checked)
        for (let item of this.cartList) {
          if (!item.checked) {
            return false
          }
        }
        return true
      }
    },
    methods: {
      BottomClick() {
        if (this.isSelectAll) {
          this.cartList.forEach(item => {
            item.checked = false;
          });
        } else {
          this.cartList.forEach(item => {
            item.checked = true;
          });
        }
      },
      // toPrice(){
      //   if (!this.isSelectAll){
      //     this.$toast.show('请选择购买的商品',2000)
      //   }
      // }
    }
  }
</script>

<style scoped>
  .cart-bottom {
    height: 40px;
    position: relative;
    background-color: #eee;
    line-height: 40px;
    display: flex;
  }

  .cart-comment {
    display: flex;
    margin-left: 10px;
    align-items: center;
  }

  .cart-button {
    margin-right: 5px;
    line-height: 20px;
  }

  .price-comment {
    margin-left: 25px;
    font-size: 16px;
    color: #666;
  }

  .length-comment {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    position: fixed;
    right: 0;
  }
</style>
