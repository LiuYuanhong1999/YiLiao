import {createRouter,createWebHistory} from "vue-router";

const routes=[
    {
        path: '/',
        name: 'login',
        component:()=>import('/src/components/login.vue'),
    },
    {
    path: '/s',
        name: 'HomePage',
        component:()=>import('/src/components/HomePage.vue'),
        children:[
            //主页


            //药房
            {
              path:'/recipe',
                name:'recipe',
                component:()=>import('/src/components/LYH/recipe.vue'),
            },
            {
                path: '/drugInfosC',
                name: 'drugInfosC',
                component:()=>import('/src/components/LYH/drugInfosC.vue')
            },{
                path: '/drugApplyC',
                name: 'drugApplyC',
                component:()=>import('/src/components/LYH/drugApplyC.vue')
            },
            {
                path:'/Xrecipe',
                name:'Xrecipe',
                component:()=>import('/src/components/LYH/Xrecipe.vue'),
            },
            {
                path: '/XdrugInfosC',
                name: 'XdrugInfosC',
                component:()=>import('/src/components/LYH/XdrugInfosC.vue')
            },{
                path: '/XdrugApplyC',
                name: 'XdrugApplyC',
                component:()=>import('/src/components/LYH/XdrugApplyC.vue')
            },
        ],
    }
];
const router=createRouter({
    history:createWebHistory(),
    routes,
});

export default router