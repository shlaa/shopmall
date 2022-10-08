<template>
<!--  <div class="detail-swiper">-->
    <swiper>
      <swiper-item v-for="item in topImages" class="sweiper-item">
<!--        <a :href="item.link">-->
          <img :src="item">
<!--        </a>-->
      </swiper-item>
    </swiper>
<!--  </div>-->
</template>

<script>
  import {Swiper, SwiperItem} from "@/components/common/swiper";

  export default {
    name: "DetailSwiper",
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
.sweiper-item{
  height: 300px;
  overflow: hidden;
}
</style>
