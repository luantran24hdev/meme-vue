<template>
<div id="home-page">
  <!-- header -->
 <div class="container">
			
<!--sections-->
<div class="row">
    <div class="col-lg-8">
        <div class="ass1-section__list">
          <comp-list-item 
            v-for="item in getListPost"
            v-bind:key="item.PID"
            v-bind:itemPosts="item"
          />
         
           
            <button 
            v-if="getListPost && getListPost.length" 
            class="load-more ass1-btn"
            v-on:click="handleLoadMore"
            ><span>Xem thêm</span></button>
        </div>
    </div>
    <!-- sidebar -->
   <comp-sidebar />
					


    </div>
</div>
<!-- footer -->

</div>
</template>

<script>
import {PAGE_SIZE,CURRENT_PAGE} from '../constance'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
import CompSidebar from '../components/CompSidebar'
import CompListItem from '../components/CompListItem'
export default {
    name:"Home-page",
    components:{  
        CompSidebar,
        CompListItem
    },
    data() {
        return {
            pageSize: PAGE_SIZE,
            currPage: CURRENT_PAGE,
            tagIndex : parseInt(this.$route.query.tagIndex)
        }
    },
    // mounted(){
    //     //test gọi api được chưa
    //      this.getListByCategory({})
    // },
   computed: {    
       
       ...mapGetters([
           'getListPost'
       ]),
   },
//    watch: {
//     '$route'(to, from) {
//         this.tagIndex = to.query.tagIndex;
//         this.currPage = 1;
//     }
//   },
// cái created này chuyên dùng để reload lại trạng nó có dữ liệu
  created() {
      var tagIndex = this.$route.query.tagIndex;
       if(tagIndex){
          //rest api getListByCategory
          this.getListByCategory({tagIndex:tagIndex}) // Để biết trang path url tagIndex chính là tagIndex cần gọi
         
      }else{
           //rest api getListPagination
           this.getListPagination({})
      }
  },
  
     // Nó chỉ có dữ liệu lúc ban đầu thôi, còn reload lại thì không
    watch: {
    '$route'(to, from) {
    //   console.log(from);
    //   console.log(to);
     this.tagIndex = to.query.tagIndex;
     this.currPage = 1;
      var tagIndex = to.query.tagIndex
      if(tagIndex){
          //rest api getListByCategory
          this.getListByCategory({tagIndex:tagIndex})
         
      }else{
           //rest api getListPagination
           this.getListPagination({})
      }
    }
  },
   methods: {
       ...mapActions([
           'getListByCategory',
           'getListPagination'
       ]),
        handleLoadMore(){
        
           //khi click thì tăng currPage lên 1 đơn vị
           this.currPage = this.currPage + 1;
           let data = {
               pageSize: this.pageSize,
               currPage: this.currPage,
               tagIndex : this.tagIndex
           }
            var tagIndex = this.$route.query.tagIndex;
       if(tagIndex){
          //rest api getListByCategory
          this.getListByCategory(data)
         
      }else{
           //rest api getListPagination
           this.getListPagination(data)
      }
       }
       
   },
 
  
 
    
}
</script>

<style>
</style>