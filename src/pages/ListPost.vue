<template>
<div class="container-xl">
    <div class="table-responsive">
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-5">
                        <h2>Danh sách bài viết <b></b></h2>
                    </div>
                </div>
            </div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Hình ảnh/Tên bài viết</th>						
                        <th>ID Bài viết</th>						
                        <th>Người đăng</th>
                        <!-- <th>Trạng thái</th> -->
                        <th>Thời gian đăng bài</th>
                        <th>Hành động</th>
                    </tr>
                </thead>


                <!-- pagination ant desighn -->


                
                <!--  -->
                <tbody>
                    <list-post-item                      
                    v-for="(item, index) in getDashboard"   
                    v-bind:key="item.PID"
                    v-bind:index="index"
                    v-bind:listPostAdmin="item"
                    
                    /> 
                   
                </tbody>
            </table>
            <div class="clearfix">
                <!-- <div class="hint-text" v-if="getDashboard && getDashboard.length">Hiển thị <b>{{getDashboard.length}}</b> của <b>{{this.getDashboard.length}}</b> tất cả bài viết</div> -->


               <div class="container">
                <template v-if="this.getDashboard && this.getDashboard.length">
                    <div>
                       
                        <a-pagination
                        :total='this.getDashboard.length'
                        :show-total="(total, range)  => `${range[0]}-${range[1]} of ${total} Bài viết`"
                        :page-size="this.pageSize"
                        :default-current="1"
                        />
                    </div>
                    </template>
               </div>
            </div>
        </div>
    </div>
</div> 
  
  
</template>

<script>
import {PAGE_SIZE,CURRENT_PAGE} from '../constance'
import {parseJwt} from "../helpder";
import {mapActions, mapGetters} from 'vuex'
import ListPostItem from '../components/ListPostItem'
export default {
    data() {
        return {
            pageSize: PAGE_SIZE,      // số lượng bài viết cần load 
            currPage: CURRENT_PAGE,   // trang hiện tại 0
            tagIndex : parseInt(this.$route.query.tagIndex)
        }
    },

  components:{
    ListPostItem
  },
  computed: {
      ...mapGetters([
        'getDashboard',
        'getListPost'
      ])
  },

 

  created() {
     this.fetchAllDataDashboard()

     // gọi pagination 
      var tagIndex = this.$route.query.tagIndex;
       if(tagIndex){
          //rest api getListByCategory
          this.getListByCategory({tagIndex:tagIndex}) // Để biết trang path url tagIndex chính là tagIndex cần gọi
         
      }else{
           //rest api getListPagination
           this.getListPagination({})
      }

      
  },
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
      handlePagination(){
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
      },
   
    ...mapActions([
      'getPostListByUserId',
      'getListPagination'
    ]),

     fetchAllDataDashboard(){
       let token = localStorage.getItem("ACESS_TOKEN");

      let objUser = parseJwt(token); 
         console.log('objUser ===',objUser.id);
      this.getPostListByUserId(objUser.id)
      
      
       
      }
  },
  
}
</script>

<style>
html, body{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;
  color: #222;
}

a{
  text-decoration: none;
}

p, li, a{
  font-size: 14px;
}

/* GRID */

.twelve { width: 100%; }
.eleven { width: 91.53%; }
.ten { width: 83.06%; }
.nine { width: 74.6%; }
.eight { width: 66.13%; }
.seven { width: 57.66%; }
.six { width: 49.2%; }
.five { width: 40.73%; }
.four { width: 32.26%; }
.three { width: 23.8%; }
.two { width: 15.33%; }
.one { width: 6.866%; }

/* COLUMNS */

.col {
	display: block;
	float:left;
	margin: 1% 0 1% 1.6%;
}

.col:first-of-type {
  margin-left: 0;
}

.container{
  width: 100%;
  max-width: 940px;
  margin: 0 auto;
  position: relative;
  text-align: center;
}

/* CLEARFIX */

.cf:before,
.cf:after {
    content: " ";
    display: table;
}

.cf:after {
    clear: both;
}

.cf {
    *zoom: 1;
}

/* GENERAL STYLES */

.pagination{
  padding: 30px 0;
}

.pagination ul{
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.pagination a{
  display: inline-block;
  padding: 10px 18px;
  color: #222;
}

/* ONE */

.p1 a{
  width: 40px;
  height: 40px;
  line-height: 40px;
  padding: 0;
  text-align: center;
}

.p1 a.is-active{
  background-color: #2ecc71;
  border-radius: 100%;
  color: #fff;
}
body {
    color: #566787;
    background: #f5f5f5;
    font-family: 'Varela Round', sans-serif;
    font-size: 13px;
}
.table-responsive {
    margin: 30px 0;
}
.table-wrapper {
    min-width: 1000px;
    background: #fff;
    padding: 20px 25px;
    border-radius: 3px;
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
}
.table-title {
    padding-bottom: 15px;
    /* background: #299be4; */
    color: #fff;
    padding: 16px 30px;
    margin: -20px -25px 10px;
    border-radius: 3px 3px 0 0;
}
.table-title h2 {
    margin: 5px 0 0;
    font-size: 24px;
    font-family: fantasy;
    font-weight: bold;
}
.table-title .btn {
    color: #566787;
    float: right;
    font-size: 13px;
    background: #fff;
    border: none;
    min-width: 50px;
    border-radius: 2px;
    border: none;
    outline: none !important;
    margin-left: 10px;
}
.table-title .btn:hover, .table-title .btn:focus {
    color: #566787;
    background: #f2f2f2;
}
.table-title .btn i {
    float: left;
    font-size: 21px;
    margin-right: 5px;
}
.table-title .btn span {
    float: left;
    margin-top: 2px;
}
table.table tr th, table.table tr td {
  
    border-color: #e9e9e9;
    padding: 12px 15px;
    vertical-align: middle;
}
table.table tr th:first-child {
    width: 60px;
}
table.table tr th:nth-child(2){
  
    width: 400px;
}
table.table-striped tbody tr:nth-of-type(odd) {
    background-color: #fcfcfc;
}
table.table-striped.table-hover thead{
    background: black;
    color: burlywood;
    
}
table.table-striped.table-hover {
    font-family:fantasy;
}
table.table-striped.table-hover tbody tr:hover {
    background: #f5f5f5;
}
table.table th i {
    font-size: 13px;
    margin: 0 5px;
    cursor: pointer;
}	
table.table td:last-child i {
    opacity: 0.9;
    font-size: 22px;
    margin: 0 5px;
}
table.table td a {
    font-weight: bold;
    color: #566787;
    display: inline-block;
    text-decoration: none;
}
table.table td a:hover {
    color: #2196F3;
}
table.table td a.settings {
    color: #2196F3;
}
table.table td a.delete {
    color: #F44336;
}
table.table td i {
    font-size: 19px;
}
table.table .avatar {
    max-width: 20%;
    vertical-align: middle;
    margin-right: 10px;
}
.status {
    font-size: 30px;
    margin: 2px 2px 0 0;
    display: inline-block;
    vertical-align: middle;
    line-height: 10px;
}
.text-success {
    color: #10c469;
}
.text-info {
    color: #62c9e8;
}
.text-warning {
    color: #FFC107;
}
.text-danger {
    color: #ff5b5b;
}
.pagination {
    float: right;
    margin: 0 0 5px;
}
.pagination li a {
    border: none;
    font-size: 13px;
    min-width: 30px;
    min-height: 30px;
    color: #999;
    margin: 0 2px;
    line-height: 30px;
    border-radius: 2px !important;
    text-align: center;
    padding: 0 6px;
}
.pagination li a:hover {
    color: #666;
}	
.pagination li.active a, .pagination li.active a.page-link {
    background: #03A9F4;
}
.pagination li.active a:hover {        
    background: #0397d6;
}
.pagination li.disabled i {
    color: #ccc;
}
.pagination li i {
    font-size: 16px;
    padding-top: 6px
}
.hint-text {
    float: left;
    margin-top: 10px;
    font-size: 13px;
}
  
</style>