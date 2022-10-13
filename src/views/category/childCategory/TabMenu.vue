<template>
  <div class="tab-menu">
    <!--    <li v-for="(index,item) in categorys">{{item}}</li>-->
    <scroll class="scroll-content" :pull-up-load="true">
      <el-row class="tac">
        <el-col :span="28">
          <el-menu
            default-active="正在流行">
            <el-menu-item v-for="(item,index) in categorys"
                          :index="item.title"
                          :key="index"
                          @click="setClick(index)">
              <span>{{item.title}}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </scroll>
  </div>
</template>

<script setup>
  import {Document, Menu as IconMenu, Location, Setting,} from '@element-plus/icons-vue'
  import Scroll from "@/components/common/scroll/Scroll";
  import {ref, defineEmits} from 'vue'

  const currentIndex = ref(0)
  defineProps({
    categorys: {
      type: Array,
      default() {
        return []
      }
    }
  });
  const emit = defineEmits()
  const setClick = (index) => {
    emit("selectItem", index);
    currentIndex.value = index;
    // console.log(currentIndex.value);
  }
</script>

<style scoped>
  .tac {
    width: 28%;
  }

  .tab-menu {
    text-align: center;
  }

  .scroll-content {
    width: 100px;
    height: 100%;
    box-sizing: border-box;
  }
</style>
