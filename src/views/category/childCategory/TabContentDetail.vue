<template>
  <grid-view>
    <goods-list-items v-for="(item,index) in categoryDetail"
                     :goods-item="item">
    </goods-list-items>
  </grid-view>
</template>

<script setup>
  import GridView from "@/components/common/gridView/GridView";
  import goodsListItems from "@/views/category/childCategory/goodsListItems";

  defineProps({
    categoryDetail: {
      type: Array,
      default() {
        return []
      }
    }
  });
</script>

<style scoped>

</style>
