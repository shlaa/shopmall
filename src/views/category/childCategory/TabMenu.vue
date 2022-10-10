<template>
  <div class="tab-menu">
    <!--    <li v-for="(index,item) in categorys">{{item}}</li>-->
<!--    <scroll class="scroll-content" :pull-up-load="true">-->
      <el-row class="tac">
        <el-col :span="28">
          <el-menu
            default-active="正在流行">
            <el-menu-item v-for="(item,index) in categorys"
                          :index="item.title"
                          :key="index"
            @click="setClick()">
              <span>{{item.title}}</span>
            </el-menu-item>
<!--            <el-menu-item index="89">-->
<!--              <span>Four</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="90">-->
<!--              <span>Four</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="91">-->
<!--              <span>Four</span>-->
<!--            </el-menu-item>-->
          </el-menu>
        </el-col>
      </el-row>
<!--    </scroll>-->
  </div>
</template>

<script setup>
  import {Document, Menu as IconMenu, Location, Setting,} from '@element-plus/icons-vue'
  import Scroll from "@/components/common/scroll/Scroll";

  defineProps({
    categorys: {
      type: Array,
      default() {
        return []
      }
    }
  })
</script>

<style scoped>
  .tac {
    width: 28%;
  }

  .tab-menu {
    text-align: center;
  }

  .scroll-content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
