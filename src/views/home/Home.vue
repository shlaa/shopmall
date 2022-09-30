<template>
  <div id="home">
    <nav-bar class="home-navbar">
      <template v-slot:center>
        <div>首页</div>
      </template>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-cotrol :titles="['流行','新款','精选']" class="tab-cotrol"></tab-cotrol>

    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import HomeSwiper from "@/views/home/childcomps/HomeSwiper";
  import RecommendView from "@/views/home/childcomps/RecommendView";
  import FeatureView from "@/views/home/childcomps/FeatureView";
  import TabCotrol from "@/components/content/tabCotrol/TabCotrol";

  import {getHomeMultidata, getHomeData} from "@/network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabCotrol
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        }
      }
    },
    created() {
      this.getHomeMultidata();
      //  请求商品数据
      this.getHomeData('pop');
      this.getHomeData('new');
      this.getHomeData('sell');
    },
    methods: {
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
        })
      }
    }
  }
</script>

<style>
  #home {
    padding-top: 44px;
  }

  .home-navbar {
    background-color: var(--color-tint);
    color: #ffffff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 100;
  }

  .tab-cotrol {
    position: sticky;
    top: 44px;
  }
</style>
