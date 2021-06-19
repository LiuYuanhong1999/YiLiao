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
            {
              path:'/recipe',
                name:'recipe',
                component:()=>import('/src/components/LYH/recipe.vue'),
            },
        ],
    }
];
const router=createRouter({
    history:createWebHistory(),
    routes,
});

export default router