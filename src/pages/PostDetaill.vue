
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
                                type="text" class="form-control ttg-border-none" placeholder="Thêm một bình luận">
                            </form>
                            <div class="ass1-add-comment__content">
                                <a href="#" class="ass1-add-comment__btn-save ass1-btn-icon"><span>180</span><i class="icon-Submit_Tick"></i></a>
                            </div>
                        </div>
                        <!-- comments -->
                         <div class="ass1-comments">
                            <div class="ass1-comments__head">
                                <div class="ass1-comments__title">{{ setPostDetail.comments.length }} Bình luận</div>
                                <div class="ass1-comments__options">
                                    <span>Sắp xếp theo:</span>
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
                            <div>Bài viết gần đây của bạn.</div>
                        </div>
                        <div v-else>Vui lòng đăng nhập để xem được nội dung này !
                            <router-link to="/login">Đăng nhập</router-link>
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
    //Bước 2: tạo postid ràng buộc trong data
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
       // vì lặp lại code cho nên tạo hàm fecthdata 
        fetchDataPostDetail(){
            this.getPostDetail(this.postid).then(res=>{
            console.log('res',res);
            if(!res.ok){
                // alert('url không chính xác')
                 this.$notify({
                                group: 'noti',
                                duration: 10000,
                                type: 'error',
                                title: 'Thông báo',
                                text: 'Đường dẫn không chính xác'
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
                        //alert('Bình luận thành công')
                        // this.$notify({
                        //         group: 'noti',
                        //         duration: 10000,
                        //         type: 'success',
                        //         title: 'Thông báo',
                        //         text: 'Bình luận thành công'
                        //     });
                        this.$notification.open({
                                duration:3,
                                message: 'Thông báo',
                                description:
                                'Bình luận thành công.',
                                // duration: 0,
                              
                        });
                        this.newComments = ''
                    }else{
                        //alert('Lỗi bình luận')
                         this.$notify({
                                group: 'noti',
                                duration: 10000,
                                type: 'error',
                                title: 'Thông báo',
                                text: 'Lỗi bình luận'
                            });
                    }
                })
            }
            
        }  
    },
    // Bước 3 : khi có sự thay đổi trong router thì lập tức thay đổi theo.Ở đây là khi có sự thay đổi postid trong route sẽ thay đổi theo
    watch: {
    $route(to, from) {
      this.postid = to.params.id;
      this.fetchDataPostDetail()
    }
  },
  // Bước 5 : cái bươc này khi reload lại ta sẽ log dc resull api bên actions
  created() {
      // Dựa vào res này ta có thể log ra dc res nhờ vào đó thể xử lý các bước lồng ghép theo điều kiện
      this.fetchDataPostDetail()
     
    
     
  },
     
   
 
}
</script>

<style>
</style>
