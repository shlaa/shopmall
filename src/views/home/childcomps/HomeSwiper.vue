<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" @load="imgeLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from "@/components/common/swiper"

  export default {
    name: "HomeSwiper",
    data(){
      return{
        isLoad:false
      }
    },
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods:{
      imgeLoad() {
        if (!this.isLoad){
          this.$emit('swiperImageLoad')
          this.isLoad=true
        }
      }
    }
  }
</script>

<style scoped>

</style>
