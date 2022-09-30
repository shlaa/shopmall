<template>
  <div class="tab-cotrol">
    <div v-for="(item,index) in titles" class="tab-cotrol-item"
         :class="{active:index===currentIndex}" @click="tabClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabCotrol",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods:{
      tabClick(index){
        this.currentIndex=index
      }
    }
  }
</script>

<style scoped>
  .tab-cotrol {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #f6f6f6;
  }

  .tab-cotrol-item {
    flex: 1;
  }

  .tab-cotrol-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 1px solid var(--color-high-text);
  }
</style>
