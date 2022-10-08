<template>
  <div class="detail">
    <detail-navbar class="detail-nav"></detail-navbar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
    </scroll>
  </div>
</template>

<script>
  import DetailNavbar from "@/views/detail/childComps/DetailNavbar";
  import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
  import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
  import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
  import Scroll from "@/components/common/scroll/Scroll";
  import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
  import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
  import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";

  import {getDetail, Goods, Shop,GoodsParam} from "@/network/detail";

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
      DetailCommentInfo
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo:{},
        commentInfo:{}
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
        this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //  取出评论信息
        if (data.rate.cRate!==0){
          this.commentInfo=data.rate.list[0]
        }
      })

    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
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
    height: calc(100% - 44px);
  }
</style>
