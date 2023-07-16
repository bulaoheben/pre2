<template>
    <div style="display: flex">
        <video ref="videoElement" autoplay></video>
        <div v-if="countdown > 0" class="countdown">{{ countdown }}</div>

        <el-table
            :data="tableData"
            style="width: 30%">
            <el-table-column
                prop="event_date"
                label="日期"
                sortable>
                <template #default="scope">
                    {{formeDateFun(scope.row.event_date) }}
                </template>
            </el-table-column>
            <el-table-column
                prop="event_location"
                label="事件发生地点"
                sortable>
            </el-table-column>
            <el-table-column
                prop="event_desc"
                label="事件描述">
            </el-table-column>
            <el-table-column label="操作" width="280">
                <template #default="scope">
                    <el-button size="mini" @click="check(scope.row)">查看截图</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios';
import api from "@/api";

export default {
    data() {
        return {
            countdown: 0,
            stream: null,
            search:'',
            form:{},
            dialogVisible:false,
            currentPage:1,
            total:0,
            pageSize:10,
            tableData: [],
            timer:null,
        };
    },
    mounted() {
        this.initializeCamera();
        this.refresh();
        this.timer = setInterval(this.refresh, 40 * 1000);
    },
    methods: {
        async initializeCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                this.$refs.videoElement.srcObject = stream;
                this.stream = stream;
            } catch (error) {
                console.error('Failed to initialize camera: ', error);
            }
        },
        capture() {
            this.countdown = 3;
            const countdownTimer = setInterval(() => {
                this.countdown--;
                if (this.countdown === 0) {
                    clearInterval(countdownTimer);
                    this.takeSnapshot();
                }
            }, 1000);
        },
        takeSnapshot() {
            const videoElement = this.$refs.videoElement;
            const canvas = document.createElement('canvas');
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            canvas.getContext('2d').drawImage(videoElement, 0, 0);
            const imageDataUrl = canvas.toDataURL('image/jpeg');

            // 发送图像数据到后端
            const name = this.
            axios.post('http://localhost:8080/api/video/video_feed',)
                .then(() => {
                    console.log('Face collection completed.');
                })
                .catch((error) => {
                    console.error('Failed to collect face:', error);
                });
        },
        refresh(){
            var date = new Date();
            var time = this.getCurrentDateTime();
            // 传递当前时间
            api.get("http://localhost:8080/api/event/getEventsAfterDate",{
                headers: {
                    "content-type": "application/json"
                },
                params:{
                    event_date:time
                }
            }).then(res=>{
                this.tableData=res.data
                console.log("this.tableData",this.tableData)
            })
        },
        getCurrentDateTime() {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const hours = String(currentDate.getHours()).padStart(2, '0');
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');
            const seconds = String(currentDate.getSeconds()).padStart(2, '0');

            const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            return formattedDateTime;
        },
        formeDateFun(time){
            let d = new Date(time);
            let year=d.getFullYear();
            let mounce=d.getMonth() + 1;
            let day=d.getDate()
            let str=`${year}-${ mounce>9?mounce:'0'+mounce}-${day>9?day:'0'+day}`;
            return str;
        },
        check(){
            const image_name=this.image_name;
            if(this.form.ID){
                api.POST(`http://localhost:8080/api/video/get_pic`, {image_name}).then(res=>{
                    console.log(res)
                    if(res.code=='200'){
                        this.$message({
                            type:"success",
                            message:"查看成功"
                        })
                    }
                })
            }
        },
    },

    beforeDestroy() {
        clearInterval(this.timer);
        if (this.stream) {
            this.stream.getTracks().forEach((track) => {
                track.stop();
            });
        }
    },
    destroyed() {
        api.get("http://localhost:8080/api/video/close_video",{
            headers: {
                "content-type": "multipart/form-data"
            }
        }).then(res=>{
            console.log("退出关闭视频")
        })
    }
};
</script>
