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
            //门诊
            {
                path:'/registration',
                name:'registrationManager',
                component:()=>import('/src/components/ZSX/opc/registrationManager.vue'),
                meta:'挂号管理',
            },
            {
                path:'/charging',
                name:'chargingManager',
                component:()=>import('/src/components/ZSX/opc/chargingManager.vue'),
                meta:'划价管理'
            },
            {
                path:'/charge',
                name:'chargeManager',
                component:()=>import('/src/components/ZSX/opc/chargeManager.vue'),
                meta:'门诊收费'
            },
            {
                path:'/lock',
                name:'lockManager',
                component:()=>import('/src/components/ZSX/opc/lockManager.vue'),
                meta:'门诊锁定'
            },

            {
                path:'/relieve',
                name:'relieveManager',
                component:()=>import('/src/components/ZSX/opc/relieveManager.vue'),
                meta:'门诊解锁'
            },
            //护士工作站
            {
                path:'/dispensing',
                name:'hospitalDispensingManager',
                component:()=>import('/src/components/ZSX/nurse/hospitalDispensingManager.vue'),
                meta:'住院发药'
            },
            {
                path:'/hospitalExecute',
                name:'hospitalExecuteManager',
                component:()=>import('/src/components/ZSX/nurse/hospitalExecuteManager.vue'),
                meta:'住院医嘱执行'
            },
            {
                path:'/opcExecute',
                name:'opcExecuteManager',
                component:()=>import('/src/components/ZSX/nurse/opcExecuteManager.vue'),
                meta:'门诊医嘱执行'
            },
            //手术室
            {
                path:'/operationNote',
                name:'operationNoteManager',
                component:()=>import('/src/components/ZSX/operation/operationNoteManager.vue'),
                meta:'手术记录'
            },
            {
                path:'/operationRoom',
                name:'operationRoomManager',
                component:()=>import('/src/components/ZSX/operation/operationRoomManager.vue'),
                meta:'手术室安排'
            },
            {
                path:'/project',
                name:'projectManager',
                component:()=>import('/src/components/ZSX/operation/projectManager.vue'),
                meta:'手术项目管理'
            },
            //住院
            {
                path: '/zytz',
                name:'zytz',
                component:()=>import('/src/components/TYH/zytz.vue'),
            },
            {
                path: '/zydj',
                name:'zydj',
                component:()=>import('/src/components/TYH/zydj.vue'),
            },
            {
                path: '/yjsq',
                name:'yjsq',
                component:()=>import('/src/components/TYH/yjsq.vue'),
            },
            {
                path: '/cytz',
                name:'cytz',
                component:()=>import('/src/components/TYH/cytz.vue'),
            },
            {
                path: '/zyfyjz',
                name:'zyfyjz',
                component:()=>import('/src/components/TYH/zyfyjz.vue'),
            },
            {
                path: '/yjtf',
                name:'yjtf',
                component:()=>import('/src/components/TYH/yjtf.vue'),
            },
            {
                path: '/cyjl',
                name:'cyjl',
                component:()=>import('/src/components/TYH/cyjl.vue'),
            },
            {
                path: '/zysd',
                name:'zysd',
                component:()=>import('/src/components/TYH/zysd.vue'),
            },
            {
                path: '/zyjs',
                name:'zyjs',
                component:()=>import('/src/components/TYH/zyjs.vue'),
            },
        ],
    },
    // {
    //     path: "/tyh",
    //         name: 'HomePage',
    //         component:()=>import('/src/components/HomePage.vue'),
    //         children:[
    //             {
    //                 path: '/zytz',
    //                 name:'zytz',
    //                 component:()=>import('/src/components/tyh/zytz.vue'),
    //             },
    //         ],
    // }
];
const router=createRouter({
    history:createWebHistory(),
    routes,
});

export default router