<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
  import goodsListItem from "@/components/content/goods/goodsListItem";
  export default {
    name: "goodsList",
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components:{
      goodsListItem
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;


    /*padding: 2px;*/
  }
</style>
