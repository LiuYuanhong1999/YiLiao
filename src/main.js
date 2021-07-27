import { createApp } from 'vue'
import App from './App.vue'
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router";
//引入store
import store from "./store/index.js";
import {mixins} from "./mixins";


import { Plugin } from 'vue-responsive-video-background-player'
import VideoBackground from 'vue-responsive-video-background-player'





// 全局引入ElementPlus，当然也可以使用局部引入
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css"; //引入样式
import locale from "element-plus/lib/locale/lang/zh-cn";



// 全局前置守卫，可用做前端权限验证的简单实现
router.beforeEach(function (to,from,next){
   if(to.path=='/login' || sessionStorage.getItem('token')){
       next();
   }else {
       next('/login')
   }
})


createApp(App)
    .use(store)
    .use(router)
    .use(Plugin)
    .component('video-background', VideoBackground)
    .mixin(mixins)
    .use(VueAxios,axios)
    .use(ElementPlus, { size: "small", zIndex: 3000, locale })
    .use(router)
    .mount("#app");
