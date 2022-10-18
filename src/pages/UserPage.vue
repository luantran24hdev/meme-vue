<template>
  <main>
		<div class="container">
		 <!-- user-page-info -->
     <comp-user-page-infomation 
     v-bind:userInfo="userInfo"
     v-bind:listPost="listPost"
     v-bind:currentUser="currentUser"
     />
      <!-- masonry sole -->
        <div
          v-if="listPost && listPost.length"
          v-masonry
          column-width=".grid-sizer"
          transition-duration="0.3s"
          item-selector=".ass1-section__item"
          class=".ass1-section__wrap row ass1-section__isotope-init">
          <div class="grid-sizer"></div>
         
        
      <!-- Bài viết của user -->
			 <comp-list-item 
            v-masonry-tile
            v-for="item in listPost"
            v-bind:key="item.PID"
            v-bind:itemPosts="item"
            class="col-lg-6"
          />

      <!-- End Bài viết của user -->
      </div>
		</div>
	</main>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import CompListItem from '../components/CompListItem'
import CompUserPageInfomation from '../components/CompUserPageInfomation'
export default {
    name:"user-page",
    // data là khi người ta load lại trang lần đầu tiên để lấy user id trong route
    data() {
      return {
        // gọi api xong rồi lưu vào data để render lên giao diện 
        userInfo:null,
        listPost:[],
        userid:this.$route.params.id
      }
    },
    //theo dõi sự thay đổi của router
    watch: {
    $route(to, from) {
      this.userid = to.params.id;
      this.fetchAllData()

    }
  },
  computed: {
     ...mapState({
           currentUser:state=>state.user.currentUser
        }),
  },
    components:{
      CompUserPageInfomation,
      CompListItem
    },

    // để lấy api khi load lai trang = created
    created() {
      this.fetchAllData()
    },
    methods: {
      // trong này tạo 1 hàm gọi dispatch 2 action :
      // 1.gọi user by id để render ra profile --------->id đó kiếm từ $route trên đường dẫn của trang
      // 2. gọi posts by id để render ra bài viết của user đó -------->id đó kiếm từ $route trên đường dẫn của trang
      ...mapActions([
        'getUserById',
        'getPostListByUserId'
      ]),
      async fetchAllData(){
        let userid = this.userid;
        let promiseUser = this.getUserById(userid);
        let promisePost = this.getPostListByUserId(userid)


        // dùng promiseAll để gộp 2 promise trên lại 
        let [resultUser,resultPost] = await Promise.all([promiseUser, promisePost]);
        if(resultUser.ok && resultPost.ok){
          this.userInfo = resultUser.data;
          this.listPost = resultPost.data;
        //    console.log('resultUser',resultUser);
        // console.log('resultPost',resultPost);



        //data đã được thay đổi 
        this.$redrawVueMasonry(); // Lấy defaultid và vẽ lại giao diện
        }else{
          this.$router.push('/')
        }
       
      }

    },
}
</script>

<style>
</style>