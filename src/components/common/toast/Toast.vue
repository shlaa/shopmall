<template>
  <div class="toast" v-show="show">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      message: {
        type: String,
        default: ''
      },
      show:{
        type: Boolean,
        default: false
      }
    },
    // methods:{
    //   show(message,duration){
    //
    //   }
    // }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 8px 10px;
    color: #f2f5f8;
    transform: translate(-50% ,-50%);
    background-color: rgba(0,0,0,.75);

  }
</style>
