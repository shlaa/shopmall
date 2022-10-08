import {createRouter, createWebHistory} from 'vue-router'

import Home from "@/views/home/Home";
import Cart from "@/views/cart/Cart";
import Category from "@/views/category/Category";
import Profile from "@/views/profile/Profile";
import Detail from "@/views/detail/Detail";

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

const router = createRouter({
  //createWebHistory   --路由模式路径不带#号(生产环境下不能直接访问项目,需要nginx转发)
  // createWebHashHistory　　----路由模式路径带#号
  history: createWebHistory(),
  routes,
})

export default router
