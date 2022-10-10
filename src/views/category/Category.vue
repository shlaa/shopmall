<template>
  <div>
    <nav-bar class="category-navbar">
      <template v-slot:center>
        <div>分类</div>
      </template>
    </nav-bar>
    <tab-menu :categorys="categorys[0]"></tab-menu>
<!--    <p>{{categorys[0]}}</p>-->
  </div>
</template>

<script setup>
  import TabMenu from '@/views/category/childCategory/TabMenu'

  import NavBar from "@/components/common/navbar/NavBar";
  import {getCategory,getSubcategory,getCategoryDetail} from '@/network/category'
  import {reactive} from 'vue'

  let categorys = reactive([{
    categories: [],
    categoryData: {},
  }])

  getCategory().then(res=>{
    categorys[0]=res.data.category.list
    // console.log(res.data.category.list);
  })

</script>

<style scoped>
  .category-navbar {
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>
