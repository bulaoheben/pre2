<template>
    <div style="margin: 30px;width: 100px;overflow: hidden">
        <h2>老人年龄段统计</h2>
            <span>00-10</span>
            <el-progress :percentage="percentage"  :stroke-width="26" :text-inside="true" style="margin: 10px;margin-right: 90px"></el-progress>
            <span>10-20</span>
            <el-progress :percentage="percentage1" :stroke-width="26" :text-inside="true" style="margin: 10px;margin-right: 90px"></el-progress>
            <span>20-30</span>
            <el-progress :percentage="percentage2" :stroke-width="26" :text-inside="true" style="margin: 10px;margin-right: 90px"></el-progress>
            <span>30-40</span>
            <el-progress :percentage="percentage3" :stroke-width="26" :text-inside="true" style="margin: 10px;margin-right: 90px"></el-progress>
            <span>40-50</span>
            <el-progress :percentage="percentage4" :stroke-width="26" :text-inside="true" style="margin: 10px;margin-right: 90px"></el-progress>
            <span>50-60</span>
            <el-progress :percentage="percentage5" :stroke-width="26" :text-inside="true" style="margin: 10px;margin-right: 90px"></el-progress>
            <span>60-70</span>
            <el-progress :percentage="percentage6" :stroke-width="26" :text-inside="true" style="margin: 10px;margin-right: 90px"></el-progress>
            <span>70-80</span>
            <el-progress :percentage="percentage7" :stroke-width="26" :text-inside="true" style="margin: 10px;margin-right: 90px"></el-progress>
            <span>80+</span>
            <el-progress :percentage="percentage8" :stroke-width="26" :text-inside="true" style="margin: 10px;margin-right: 90px"></el-progress>
        </div>
</template>

<script>
import api from "@/api";

export default {
    name: "statistics",
    data() {
        return {
            percentage: 20,
            percentage1: 20,
            percentage2: 20,
            percentage3: 20,
            percentage4: 20,
            percentage5: 20,
            percentage6: 20,
            percentage7: 20,
            percentage8: 20,
            customColor: '#409eff',
            total:0,
        };
    },
    mounted() {
        api.post("http://localhost:8080/api/getEmployeeRecord",{
            headers: {
                "content-type": "multipart/form-data"
            }}).then(res=>{
                this.total=0;
            for (const age in res.data) {
                if (res.data.hasOwnProperty(age)) {
                    this.total += res.data[age];
                }
            }
            this.percentage = parseInt(res.data["00-10"]*100/this.total);
            this.percentage1 = parseInt(res.data["10-20"]*100/this.total);
            this.percentage2 = parseInt(res.data["20-30"]*100/this.total);
            this.percentage3 = parseInt(res.data["30-40"]*100/this.total);
            this.percentage4 = parseInt(res.data["40-50"]*100/this.total);
            this.percentage5 = parseInt(res.data["50-60"]*100/this.total);
            this.percentage6 = parseInt(res.data["60-70"]*100/this.total);
            this.percentage7 = parseInt(res.data["70-80"]*100/this.total);
            this.percentage8 = parseInt(res.data["80+"]*100/this.total);
        })
    },
}

</script>

<style scoped>

</style>