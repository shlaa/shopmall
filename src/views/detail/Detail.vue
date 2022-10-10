<template>
  <div class="detail">
    <detail-navbar class="detail-nav"
                   @titleClick="titleClick"
                   ref="nav"></detail-navbar>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="detailScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="goods" :goods="recommend"></goods-list>
    </scroll>
    <back-top @click="BackClick" v-show="isShowBackClick"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <toast :message="message" :show="show"></toast>
    <!--    <toast></toast>-->
  </div>
</template>

<script>
  import DetailNavbar from "@/views/detail/childComps/DetailNavbar";
  import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
  import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
  import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
  import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
  import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
  import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
  import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

  import {getDetail, Goods, Shop, GoodsParam, getRcommend} from "@/network/detail";
  import Scroll from "@/components/common/scroll/Scroll";
  import goodsList from "@/components/content/goods/goodsList";
  import BackTop from "@/components/content/backTop/BackTop";
  import {mapActions} from 'vuex'
  import Toast from "@/components/common/toast/Toast";

  export default {
    name: "Detail",
    components: {
      DetailNavbar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      goodsList,
      DetailBottomBar,
      BackTop,
      Toast
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommend: [],
        themeTopY: [],
        currentIndex: 0,
        isShowBackClick: false,
        message: '',
        show: false
      }
    },
    created() {
      //保存传入iid
      this.iid = this.$route.params.iid;
      //根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res)
        //获取数据
        const data = res.result;
        //取出轮播图的数据
        this.topImages = res.result.itemInfo.topImages

        //  创建商品对象
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //  创建店铺对象
        this.shop = new Shop(data.shopInfo)

        //获取商品的详情数据
        this.detailInfo = data.detailInfo
        //获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //  取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      });

      //请求推荐数据
      getRcommend().then(res => {
        // console.log(res);
        this.recommend = res.data.list
      })
    },
    updated() {

    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        this.$refs.scroll.refresh()

        this.themeTopY = []
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.param.$el.offsetTop);
        this.themeTopY.push(this.$refs.comment.$el.offsetTop);
        this.themeTopY.push(this.$refs.goods.$el.offsetTop);
        // console.log(this.themeTopY);
      },
      titleClick(index) {
        // console.log(this.themeTopY[index]);
        this.$refs.scroll.scrollTo(0, -(this.themeTopY[index] - 44), 100)
      },
      detailScroll(position) {
        const positionY = -position.y;
        this.isShowBackClick = (-position.y) > 1000

        const length = this.themeTopY.length;
        for (let i = 0; i < length; i++) {
          if (this.currentIndex !== i && (
            (i < length - 1 && positionY >= (this.themeTopY[i] - 44) &&
              positionY < (this.themeTopY[i + 1]) - 44)
            || (i === length - 1 && positionY >= (this.themeTopY[i] - 44)))) {
            this.currentIndex = i;
            // console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      },
      BackClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      addToCart() {
        //  获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.newPrice = this.goods.realPrice;
        product.iid = this.iid

        this.addCart(product).then(res => {
          //普通封装
          this.show = true;
          this.message = res;
          setTimeout(() => {
            this.show = false;
            this.message = ''
          }, 1500)
        })
        // this.$store.dispatch('addCart',product).then(res=>{
        //   console.log(res)
        // })

        //  添加到购物车成功

      }
    }
  }
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    background-color: #fff;
    position: relative;
    z-index: 10;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }
</style>
