<template>
  <div>
    <nav-bar class="category-navbar">
      <template v-slot:center>
        <div>分类</div>
      </template>
    </nav-bar>
    <div class="content">
      <tab-menu :categorys="categorys.categories" @selectItem="selectItem"></tab-menu>
      <div>
        <scroll class="scroll-content"
                :pull-up-load="true" @scroll="contentScroll">
          <tab-category :subcategories="showSubcategory"></tab-category>
          <tab-cotrol :titles="['综合','新品','销量']"></tab-cotrol>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script setup>
  import TabMenu from '@/views/category/childCategory/TabMenu'
  import TabCategory from "@/views/category/childCategory/TabCategory";
  import TabContentDetail from "@/views/category/childCategory/TabContentDetail"

  import NavBar from "@/components/common/navbar/NavBar";
  import Scroll from "@/components/common/scroll/Scroll";
  import TabCotrol from "@/components/content/tabCotrol/TabCotrol";
  import {getCategory, getSubcategory, getCategoryDetail} from '@/network/category'
  import {POP, NEW, SELL} from "@/common/const";

  import {reactive, computed} from 'vue'

  let categorys = reactive({
    categories: [],
    categoryData: {},
    currentIndex: -1,
    currentType: 'pop',
    istabFixed: false,
  })
  const showSubcategory = computed(() => {
    if (categorys.currentIndex === -1) return {}
    return categorys.categoryData[categorys.currentIndex].subcategories
  })
  const showCategoryDetail = computed(() => {
    if (categorys.currentIndex === -1) return []
    return categorys.categoryData[categorys.currentIndex].categoryDetail[categorys.currentType]
    // console.log(categorys.categoryData[0].categoryDetail['pop']);
  })

  getCategory().then(res => {
    categorys.categories = res.data.category.list
    // console.log(categorys.categories);

    for (let i = 0; i < categorys.categories.length; i++) {
      categorys.categoryData[i] = {
        subcategories: {},
        categoryDetail: {
          'pop': [],
          'new': [],
          'sell': []
        }
      }
    }

    selectItem(0)
  })

  const selectItem = (index) => {
    categorys.currentIndex = index;
    const mailKey = categorys.categories[index].maitKey;
    // console.log(mailKey);
    getSubcategory(mailKey).then(res => {
      categorys.categoryData[index].subcategories = res.data
      categorys.categoryData = {...categorys.categoryData}
      // console.log(categorys);
      // getCategoryDetailT(POP)
      // getCategoryDetailT(SELL)
      // getCategoryDetailT(NEW)
      getCategoryDetailT(categorys.currentType)
    })
  }
  const getCategoryDetailT = (currentType) => {
    const miniWallkey = categorys.categories[categorys.currentIndex].miniWallkey;
    getCategoryDetail(miniWallkey, currentType).then(res => {
      categorys.categoryData[categorys.currentIndex].categoryDetail[currentType] = res
      categorys.categoryData = {...categorys.categoryData}
      // console.log(currentType);
      // console.log(res);
    })
  }

  const tabClick = (index) => {
    switch (index) {
      case 0:
        categorys.currentType = 'pop'
        break
      case 1:
        categorys.currentType = 'new'
        break;
      case 2:
        categorys.currentType = 'sell'
        break
    }
  }

  const contentScroll = (position) => {
    categorys.istabFixed = (-position.y) > 1000
  }
</script>

<style scoped>
  .category-navbar {
    background-color: var(--color-tint);
    color: #ffffff;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;

    display: flex;
  }

  .scroll-content {
    height: 100%;
    flex: 1;
    z-index: -1;
  }

</style>
