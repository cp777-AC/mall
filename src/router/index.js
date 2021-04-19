import VueRouter from 'vue-router'
import Vue from 'vue'

const Home = () => import('views/home/Home.vue')
const CateGory = () => import('views/category/Category.vue')
const ShopCart = () => import('views/shopcart/ShopCart.vue')
const Profile = () => import('views/profile/Profile.vue')
const Detail = () => import('views/detail/Detail.vue')

Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    redirect: '/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/cateGory',
    component:CateGory
  },
  {
    path:'/shopCart',
    component:ShopCart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:id',
    component:Detail
  }
]

const router = new VueRouter({
  mode :'history',
  routes
})

export default router