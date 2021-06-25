<template>

<!--  <div>-->
<!--      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">-->
<!--        <el-alert v-if="noticeList[0]" :closable="noticeList[0].closable">-->
<!--          <div-->
<!--              style="display: flex; align-items: center; justify-content: center"-->
<!--          >-->
<!--            <a-->
<!--                target="_blank"-->
<!--                href="https://github.com/chuzhixin/vue-admin-beautiful"-->
<!--            >-->
<!--              <img-->
<!--                  style="margin-right: 10px"-->
<!--                  src="https://img.shields.io/github/stars/chuzhixin/vue-admin-beautiful?style=flat-square&label=Stars&logo=github"-->
<!--              />-->
<!--            </a>-->
<!--            <p v-html="noticeList[0].title"></p>-->
<!--          </div>-->
<!--        </el-alert>-->
<!--    </el-col>-->
<!--  </div>-->
</template>

<script>
export default {
name: "Test",
  data(){
  return{
    noticeList: [],
  }
  }
}
</script>

<style scoped>

</style>
