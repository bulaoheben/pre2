<template>
<div>
    <el-button @click="startVoice()">开始录音</el-button>
    <el-button @click="endVoice()">结束录音</el-button>
</div>
</template>

<script>
import api from "@/api";

export default {
    name: "Voice",
    methods:{
        startVoice(){
            api.post('http://localhost:8080/api/startChat',{
                headers: {
                    "content-type": "multipart/form-data"
                }
            }).then(res=>{
                console.log(res)
            })
            .catch(err=>{
            });
        },
        endVoice(){
            api.get('http://localhost:8080/api/finishChat',{
                headers: {
                    "content-type": "multipart/form-data"
                }
            }).then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.error(err.message); // 输出 "除数不能为0"
            });
        },

    }

}
</script>

<style scoped>

</style>