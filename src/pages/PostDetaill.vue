
<template>

  <main>
      
        <div class="container">
            <!--sections-->
            <div class="row">
                <div class="col-lg-8">
                    <!--section-->
                    <div class="ass1-section__list" v-if="setPostDetail && setPostDetail.post">
                        <div class="ass1-section" >
                            <comp-list-item v-bind:itemPosts="setPostDetail.post"/>
                            <div class="ass1-section__feeling">
                                <div class="ass1-feeling">
                                    <a href="#" rel="tooltip" data-original-title="Happy"><img src="/public/fonts/emotion/svg/Happy.svg" alt=""><span>126</span></a>
                                    <a href="#" rel="tooltip" data-original-title="Lol"><img src="/public/fonts/emotion/svg/LOL.svg" alt=""><span>256</span></a>
                                    <a href="#" rel="tooltip" data-original-title="Surprised"><img src="/public/fonts/emotion/svg/Surprised.svg" alt=""><span>741</span></a>
                                    <a href="#" rel="tooltip" data-original-title="Sad"><img src="/public/fonts/emotion/svg/Sad.svg" alt=""><span>2K</span></a>
                                    <a href="#" rel="tooltip" data-original-title="Tongue Out"><img src="/public/fonts/emotion/svg/Tongue_Out.svg" alt=""><span>245</span></a>
                                    <a href="#" rel="tooltip" data-original-title="No words"><img src="/public/fonts/emotion/svg/No_words.svg" alt=""><span>237</span></a>
                                    <a href="#" rel="tooltip" data-original-title="Love"><img src="/public/fonts/emotion/svg/Love.svg" alt=""><span>1,236</span></a>
                                    <a href="#" rel="tooltip" data-original-title="Blushing"><img src="/public/fonts/emotion/svg/Blushing.svg" alt=""><span>365</span></a>
                                    <a href="#" rel="tooltip" data-original-title="Cool"><img src="/public/fonts/emotion/svg/Cool.svg" alt=""><span>412</span></a>
                                    <a href="#" rel="tooltip" data-original-title="Angry"><img src="/public/fonts/emotion/svg/Angry.svg" alt=""><span>478</span></a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="ass1-add-comment">
                            <form action="#" v-on:submit.prevent="handleNewComment">
                                <input 
                                v-model="newComments"
                                type="text" class="form-control ttg-border-none" placeholder="Th??m m???t b??nh lu???n">
                            </form>
                            <div class="ass1-add-comment__content">
                                <a href="#" class="ass1-add-comment__btn-save ass1-btn-icon"><span>180</span><i class="icon-Submit_Tick"></i></a>
                            </div>
                        </div>
                        <!-- comments -->
                         <div class="ass1-comments">
                            <div class="ass1-comments__head">
                                <div class="ass1-comments__title">{{ setPostDetail.comments.length }} B??nh lu???n</div>
                                <div class="ass1-comments__options">
                                    <span>S???p x???p theo:</span>
                                    <a href="#" class="ass1-comments__btn-upvote ass1-btn-icon"><i class="icon-Upvote"></i></a>
                                    <a href="#" class="ass1-comments__btn-down ass1-btn-icon"><i class="icon-Downvote"></i></a>
                                    <a href="#" class="ass1-comments__btn-expand ass1-btn-icon"><i class="icon-Expand_all"></i></a>
                                </div>
                            </div>
                            <!--comment-->
                            <Comments 
                          v-for="item in setPostDetail.comments"
                             v-bind:key="item.CID"
                             v-bind:comments="item"
                             />
                            
                        </div>
                        
                        <!-- end - comments -->
                    </div>
                </div>
                <div class="col-lg-4">
                     <aside class="ass1-aside">
                        <div class="ass1-content-head__t" v-if="isLogin">
                            <div>B??i vi???t g???n ????y c???a b???n.</div>
                        </div>
                        <div v-else>Vui l??ng ????ng nh???p ????? xem ???????c n???i dung n??y !
                            <router-link to="/login">????ng nh???p</router-link>
                        </div>
                        <template v-if="getListPostByUserid && getListPostByUserid.length && isLogin">
                            <comp-list-item 
                                v-for="item in getListPostByUserid"
                                v-bind:key="item.PID"
                                v-bind:itemPosts="item"
                            />
                        </template>

                    </aside>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import Comments from '../components/Comments'
import CompListItem from '../components/CompListItem'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
export default {
    name:"post-detail",
    
    components:{
        CompListItem,
        Comments
    },
    //B?????c 2: t???o postid r??ng bu???c trong data
     data() {
        return {
            newComments:'',
            postid:parseInt(this.$route.params.id)
        }
    },
    computed: {
        ...mapGetters([
            'setPostDetail',
            'getListPostByUserid',
             'isLogin'
        ]),
       
      
    },
    methods: {

        // ant design notify 
            // openNotification() {
            // this.$notification.open({
            //     message: 'Notification Title',
            //     description:
            //     'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            //     onClick: () => {
            //     console.log('Notification Clicked!');
            //     },
            // });
            // },



       ...mapActions([
           'getPostDetail',
           'getUserById',
           'PostNewCommentForNews'
       ]),
       //dist/images/microphone-1209816_1920.jpg
    //    formatPicture(){
    //        if(this.setPostDetail.post){
    //            return this.setPostDetail.post.profilepicture
    //        }else{
    //            return 'dist/images/microphone-1209816_1920.jpg'
    //        }
    //    },
       // v?? l???p l???i code cho n??n t???o h??m fecthdata 
        fetchDataPostDetail(){
            this.getPostDetail(this.postid).then(res=>{
            console.log('res',res);
            if(!res.ok){
                // alert('url kh??ng ch??nh x??c')
                 this.$notify({
                                group: 'noti',
                                duration: 10000,
                                type: 'error',
                                title: 'Th??ng b??o',
                                text: '???????ng d???n kh??ng ch??nh x??c'
                            });
                this.$router.push('/')
            }
        })
        },
        handleNewComment(){
            if(this.newComments){
                let data = {
                comment: this.newComments,
                postid :this.postid
            }
                this.PostNewCommentForNews(data).then(res=>{
                    if(res.ok){
                        //alert('B??nh lu???n th??nh c??ng')
                        // this.$notify({
                        //         group: 'noti',
                        //         duration: 10000,
                        //         type: 'success',
                        //         title: 'Th??ng b??o',
                        //         text: 'B??nh lu???n th??nh c??ng'
                        //     });
                        this.$notification.open({
                                duration:3,
                                message: 'Th??ng b??o',
                                description:
                                'B??nh lu???n th??nh c??ng.',
                                // duration: 0,
                              
                        });
                        this.newComments = ''
                    }else{
                        //alert('L???i b??nh lu???n')
                         this.$notify({
                                group: 'noti',
                                duration: 10000,
                                type: 'error',
                                title: 'Th??ng b??o',
                                text: 'L???i b??nh lu???n'
                            });
                    }
                })
            }
            
        }  
    },
    // B?????c 3 : khi c?? s??? thay ?????i trong router th?? l???p t???c thay ?????i theo.??? ????y l?? khi c?? s??? thay ?????i postid trong route s??? thay ?????i theo
    watch: {
    $route(to, from) {
      this.postid = to.params.id;
      this.fetchDataPostDetail()
    }
  },
  // B?????c 5 : c??i b????c n??y khi reload l???i ta s??? log dc resull api b??n actions
  created() {
      // D???a v??o res n??y ta c?? th??? log ra dc res nh??? v??o ???? th??? x??? l?? c??c b?????c l???ng gh??p theo ??i???u ki???n
      this.fetchDataPostDetail()
     
    
     
  },
     
   
 
}
</script>

<style>
</style>
