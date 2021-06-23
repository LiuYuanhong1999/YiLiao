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
            //yxj-体检管理
            {
                path: '/Yxjcategory',
                name: 'Yxjcategory',
                component:()=>import('/src/components/YXJ/physical/YxjCategory.vue')
            },
            {
                path: '/Yxjphysical',
                name: 'Yxjphysical',
                component:()=>import('/src/components/YXJ/physical/YxjPhysical.vue')
            },
            //yxj-体检管理结束

            //yxj-权限管理开始
            {
                path: '/YxjStaff',
                name: 'YxjStaff',
                component:()=>import('/src/components/YXJ/power/YxjStaff.vue')
            },
            {
                path: '/YxjDept',
                name: 'YxjDept',
                component:()=>import('/src/components/YXJ/power/YxjDept.vue')
            },
            {
                path: '/YxjDesk',
                name: 'YxjDesk',
                component:()=>import('/src/components/YXJ/power/YxjDesk.vue')
            },
            {
                path: '/YxjShift',
                name: 'YxjShift',
                component:()=>import('/src/components/YXJ/power/YxjShift.vue')
            },
            {
                path: '/YxjCrew',
                name: 'YxjCrew',
                component:()=>import('/src/components/YXJ/power/YxjCrew.vue')
            },
            {
                path: '/YxjPagePer',
                name: 'YxjPagePer',
                component:()=>import('/src/components/YXJ/power/YxjPagePer.vue')
            },
            {
                path: '/YxjRolePer',
                name: 'YxjRolePer',
                component:()=>import('/src/components/YXJ/power/YxjRolePer.vue')
            },
            //yxj-权限管理结束


        ],
    }
];
const router=createRouter({
    history:createWebHistory(),
    routes,
});

export default router