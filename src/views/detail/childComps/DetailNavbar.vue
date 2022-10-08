<template>
  <nav-bar>
    <template v-slot:left>
      <div class="back" @click="backClick">
        <img src="@/assets/img/common/back.svg">
      </div>
    </template>
    <template v-slot:center>
      <div class="title">
        <div v-for="(item,index) in titles" class="title-item"
             :class="{active:index===currentIndex}"
             @click="titlesItem(index)">
          {{item}}
        </div>
      </div>
    </template>
  </nav-bar>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";

  export default {
    name: "DetailNavbar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods:{
      titlesItem(index){
        this.currentIndex=index;

      },
      backClick(){
        this.$router.back()
      }
    }
  }
</script>

<style>
  .title {
    display: flex;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }
  .back img{
    margin-top: 10px;
  }
</style>
