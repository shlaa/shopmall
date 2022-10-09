<template>
  <div id="home">
    <!--    <keep-alive>-->
    <!--      <div>-->
    <nav-bar class="home-navbar">
      <template v-slot:center>
        <div>首页</div>
      </template>
    </nav-bar>
    <tab-cotrol :titles="['流行','新款','精选']"
                @tabClick="tabClick"
                ref="topTabControl"
                class="tab-cotrol"
                v-show="istabFixed"></tab-cotrol>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="lodMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-cotrol :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  ref="tabCotrol"></tab-cotrol>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click="BackClick" v-show="isShowBackClick"></back-top>
  </div>
  <!--    </keep-alive>-->
  <!--  </div>-->
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import HomeSwiper from "@/views/home/childcomps/HomeSwiper";
  import RecommendView from "@/views/home/childcomps/RecommendView";
  import FeatureView from "@/views/home/childcomps/FeatureView";
  import TabCotrol from "@/components/content/tabCotrol/TabCotrol";
  import goodsList from "@/components/content/goods/goodsList";
  import BackTop from "@/components/content/backTop/BackTop";
  import Scroll from "@/components/common/scroll/Scroll";

  import {getHomeMultidata, getHomeData} from "@/network/home";
  import {inject} from 'vue'

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabCotrol,
      goodsList,
      BackTop,
      Scroll
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackClick: false,
        tabOffsetTop: 0,
        istabFixed: false,
        saveY: 0
      }
    },
    created() {
      this.getHomeMultidata();
      //  请求商品数据
      this.getHomeData('pop');
      this.getHomeData('new');
      this.getHomeData('sell');
    },
    mounted() {
      const refresh = this.debounce(this.$refs.scroll.refresh, 500)

      inject('itemImageLoad', () => {
        refresh()
      })

    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      },
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    methods: {
      //网络请求
      debounce(func, delay) {
        let timer = null
        return function (...arges) {
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this, arges)
          }, delay)
        }
      },
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeData(type) {
        const page = this.goods[type].page + 1
        getHomeData(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      },
      //响应事件
      tabClick(index) {
        // console.log(index)
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break
        }
        if (this.$refs.topTabControl !== undefined || this.$refs.tabCotrol != undefined) {
          this.$refs.topTabControl.currentIndex = index
          this.$refs.tabCotrol.currentIndex = index
        }

      },
      BackClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        this.isShowBackClick = (-position.y) > 1000

        this.istabFixed = (-position.y) > this.tabOffsetTop
      },
      lodMore() {
        this.getHomeData(this.currentType)
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabCotrol.$el.offsetTop;
        // console.log(this.$refs.tabCotrol.$el.offsetTop);
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-navbar {
    background-color: var(--color-tint);
    color: #ffffff;

    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 100;*/
  }

  /*.fixed{*/
  /*  position: fixed;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*  top: 44px;*/
  /*}*/
  .tab-cotrol {
    /*top: 44px;*/
    position: relative;
    z-index: 1;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
