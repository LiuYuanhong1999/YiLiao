<template>
<div id="app">
  <router-view/>
</div>
</template>

<script >
import HelloWorld from './components/HelloWorld.vue'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md

export default{
  name:'App',
  components:{
    HelloWorld
  },
  created:function () {
    if(sessionStorage.getItem("state")){
      this.$store.replaceState(
          Object.assign(
              {},
              this.$store.state,
              JSON.parse(sessionStorage.getItem("state"))
          ))
    }
  },
  methods:function (){
    window.addEventListener('beforeunload',() =>{
      //刷新前将目前登录的用户保存到sessionStorage中
      sessionStorage.setItem('state',JSON.stringify(this.$store.state))
    })
  }
}

</script>





<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  margin-top: auto;
}

html,body,#app{
  height: 100%;

}
</style>
