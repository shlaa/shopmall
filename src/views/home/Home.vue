<template>
  <div id="home">
    <nav-bar class="home-navbar">
      <template v-slot:center>
        <div>首页</div>
      </template>
    </nav-bar>

<!--    <scroll class="content">-->
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-cotrol :titles="['流行','新款','精选']"
                  class="tab-cotrol"
                  @tabClick="tabClick"></tab-cotrol>
      <goods-list :goods="showGoods"></goods-list>
<!--    </scroll>-->

  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import HomeSwiper from "@/views/home/childcomps/HomeSwiper";
  import RecommendView from "@/views/home/childcomps/RecommendView";
  import FeatureView from "@/views/home/childcomps/FeatureView";
  import TabCotrol from "@/components/content/tabCotrol/TabCotrol";
  import goodsList from "@/components/content/goods/goodsList";
  // import Scroll from "@/components/common/scroll/Scroll";

  import {getHomeMultidata, getHomeData} from "@/network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabCotrol,
      goodsList,
      // Scroll
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
        currentType: 'pop'
      }
    },
    created() {
      this.getHomeMultidata();
      //  请求商品数据
      this.getHomeData('pop');
      this.getHomeData('new');
      this.getHomeData('sell');
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      //网络请求
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
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
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
    z-index: 1;
  }

  /*.content {*/
  /*  overflow: hidden;*/

  /*  position: absolute;*/
  /*  top: 44px;*/
  /*  bottom: 49px;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*}*/

</style>
