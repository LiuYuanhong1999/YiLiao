import {createStore} from "vuex";
const  store = createStore({
    state:{
        count:0,
        token:'',
    },
    mutations:{
        increment(state){
            state.count++
        }
    },
    // actions:{
    //     incrementAsync(context,obj){
    //         setTimeout(() =>{
    //             context.commit('increment')
    //             console.log(obj.name)
    //         },3000)
    //     }
    // }

})
export  default store