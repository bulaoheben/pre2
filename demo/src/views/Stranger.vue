<!--<template>-->

<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "Stranger"-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->




<!--<template>-->
<!--  <div class="box">-->
<!--    <div class="right">-->
<!--      <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--        <el-breadcrumb-item style="padding: 10px 0 2px 10px; font-size: 1.5em;">监控管理</el-breadcrumb-item>-->
<!--        <el-breadcrumb-item  style="padding: 15px 0 2px 0; font-size: 1.1em">陌生人检测监控</el-breadcrumb-item>-->
<!--      </el-breadcrumb>-->
<!--      <div class="videos">-->
<!--        <el-main class="show">-->
<!--          <el-row :gutter="20">-->
<!--            <el-col :span="10" :offset="8">-->
<!--              <el-select v-model="value" placeholder="请选择摄像头" style="width: 80%;margin: 4px">-->
<!--                <el-option-->
<!--                    v-for="item in options"-->
<!--                    :key="item.value"-->
<!--                    :label="item.label"-->
<!--                    :value="item.value">-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--            </el-col>-->
<!--            <el-col :span="2">-->
<!--              <el-button size="small" type="success" style="margin-top: 8px" @click="selectCamera"> 选择 </el-button>-->
<!--            </el-col>-->
<!--            <el-col :span="2">-->
<!--              <el-button size="small" style="margin-top: 8px" type="warning" @click="updateModel"> 更新 </el-button>-->
<!--            </el-col>-->

<!--          </el-row>-->
<!--          <el-row class="pc iframe">-->
<!--            <el-col :span="12" :offset="5">-->
<!--              <img :src = "url"/>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--        </el-main>-->
<!--        <el-aside class="workChart">-->
<!--          <div class="myTV">-->
<!--            <el-scrollbar >-->
<!--              <div class="message">-->
<!--                <div class="cards" v-for="i in body" :key="i">-->
<!--                  <h3>{{ i.event_desc }}</h3>-->
<!--                  <p style="padding-bottom: 2px">{{ i.event_date }}</p>-->
<!--                </div>-->
<!--              </div>-->
<!--            </el-scrollbar>-->
<!--          </div>-->
<!--        </el-aside>-->
<!--      </div>-->
<!--      <div class="tip">-->
<!--        <el-footer></el-footer>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->



<!--<script>-->
<!--import axios from "axios";-->

<!--export default {-->
<!--  name: "CCTV2",-->
<!--  data () {-->
<!--    return {-->
<!--      // url: 'http://192.168.159.128:5000/'-->
<!--      // url: 'http://192.168.43.74:5000/FLASK-SERVER/stranger_expression'-->
<!--      // url: 'http://192.168.43.74:5000/FLASK-SERVER/checking_fall'-->
<!--      // url: 'http://192.168.43.74:5000/FLASK-SERVER/checking_fence'-->
<!--      // url: 'http://192.168.43.74:5000/FLASK-SERVER/checking_activity'-->
<!--      // url: 'http://192.168.43.74:5000/FLASK-SERVER/stranger_expression'-->
<!--      url: '',-->
<!--      urls:[],-->
<!--      body: [],-->

<!--      options: [],-->
<!--      value: '',-->
<!--      timer: '',-->
<!--      ip: '',-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--    this.$http.get(this.global.baseURL + '/back/service_num',{-->

<!--    }).then(res=>{-->
<!--      console.log(res.data)-->
<!--      if (res.data>0){-->
<!--        this.$http.get(this.global.baseURL + '/back/service',{-->

<!--        }).then(res=>{-->
<!--          console.log(res.data)-->
<!--          if(res.data!==''){-->
<!--            for(var key in res.data){-->
<!--              console.log(res.data)-->
<!--              if(key!=='gateway'){-->
<!--                this.options.push({-->
<!--                  value: res.data[key],-->
<!--                  label: "摄像头：" + key-->
<!--                })-->
<!--              }-->
<!--            }-->
<!--            // this.urls = res.data-->
<!--            // // this.url = this.urls[0] + 'checking_activity'-->
<!--            // for(let i = 0; i < this.urls.length; i++){-->
<!--            //   this.options.push({-->
<!--            //     value: this.urls[i],-->
<!--            //     label: "摄像头" + (i + 1)-->
<!--            //   })-->
<!--            // }-->

<!--            let _this = this-->
<!--            this.timer = window.setInterval(() => {-->
<!--              // setTimeout是自带清除定时器-->
<!--              setTimeout(function() {-->
<!--                _this.$http.get(_this.value + 'message',{-->

<!--                }).then(res=>{-->
<!--                  console.log(res)-->
<!--                  if(res.data !== ''){-->
<!--                    _this.body.push(res.data)-->
<!--                  }-->
<!--                })-->
<!--              }, 600)-->
<!--            }, 5000)-->
<!--          }-->
<!--        })-->
<!--      }else{-->
<!--        this.message('摄像头占用')-->
<!--      }-->
<!--    })-->
<!--  },-->
<!--  beforeDestroy() {-->
<!--    axios.get(this.value + "close")-->
<!--    clearInterval(this.timer)-->

<!--  },-->
<!--  methods: {-->
<!--    selectCamera() {-->
<!--      this.url = this.value + 'stranger_expression'-->

<!--      // let _this = this-->
<!--      // _this.$http({-->
<!--      //             method: 'post',-->
<!--      //             url: this.url,-->
<!--      //             data: {src/views/CCTV2.vue-->
<!--      //               'status': 'true',-->
<!--      //               'save_video_path': this.$route.params.type,-->
<!--      //             }-->
<!--      //           }).then(res=>{-->
<!--      //             console.log(res)-->
<!--      //             // this.url = this.urls[0] + 'collecting_faces_image'-->
<!--      //           })-->

<!--      if(this.ip!==''){-->
<!--        axios.get(this.ip + "close")-->
<!--      }-->
<!--      this.ip = this.value-->
<!--      // alert(this.value)-->
<!--    },-->
<!--    updateModel(){-->
<!--      axios.get(this.value + "close")-->
<!--      axios.get(this.value + "update")-->
<!--      this.$router.push("/Update")-->
<!--    }-->
<!--  }-->

<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.box{-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  /*background-color: #766d17;*/-->
<!--  display: flex;-->
<!--  background: url('../assets/images/background.png');-->
<!--  background-size: cover;-->
<!--}-->
<!--.left{-->
<!--  /*min-width: 64px;*/-->
<!--  /*max-width: 200px;*/-->
<!--  /*height: 100%;*/-->
<!--  /*background-color: antiquewhite;*/-->
<!--  /*margin-left:0;*/-->
<!--}-->
<!--.right{-->
<!--  /*min-width: 100%;*/-->
<!--  /*max-width: 100%;*/-->
<!--  width: 100%;-->
<!--  height: 660px;-->
<!--  /*background-color: #42b983;*/-->
<!--  /*margin-right:0;*/-->
<!--  margin: 53px 0 0 0;-->
<!--  /*z-index: 1;*/-->
<!--}-->
<!--.iframe {-->
<!--  width: 100%;-->
<!--  height: 99%;-->
<!--  background: rgba(0, 0, 0, 0.5);-->
<!--}-->
<!--.videos{-->
<!--  width: 100%;-->
<!--  height: auto;-->
<!--  display: flex;-->
<!--}-->
<!--.show{-->
<!--  width: 70%;-->
<!--  height: 629px;-->
<!--  background: url('../assets/back.png');-->
<!--  margin: 0 auto;-->
<!--  overflow-y: hidden;-->
<!--  padding-top: 0;-->
<!--}-->
<!--.workChart{-->
<!--  height: 630px;-->
<!--  width: auto;-->
<!--  /*background-color: #ffb352;*/-->
<!--  text-align: center;-->
<!--  padding: 20px;-->
<!--  background: url('../assets/TV1back.png');-->
<!--  background-size: cover;-->

<!--}-->
<!--.myTV{-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  text-align: center;-->
<!--  padding: 2px;-->
<!--  background: url('../assets/CCTV1.png');-->
<!--  background-size: cover;-->
<!--}-->
<!--.message{-->
<!--  background-color: rgba(0,0,0,0.3);-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--}-->
<!--.tip{-->
<!--  height: auto;-->
<!--  width: 100%;-->
<!--  background-color: #ffb352;-->
<!--  text-align: center;-->
<!--  padding-top: 20px;-->
<!--}-->
<!--.cards{-->
<!--  width: 90%;-->
<!--  height: auto;-->
<!--  background-color: white;-->
<!--  border-radius: 10px;-->
<!--  border: 1px solid white;-->
<!--  margin: 10px auto;-->
<!--}-->
<!--</style>-->

<!--<style>-->
<!--span.el-breadcrumb__inner {-->
<!--  color: #ffffff;-->
<!--}-->
<!--</style>-->
