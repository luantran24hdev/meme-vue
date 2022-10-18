<template>
    <main>
		<div class="container">
          <div class="info-search">
                <p>Từ khoá bạn cần tìm là :<strong>{{query}}</strong></p>
                <p>Đã tìm được trong: <strong>{{listPostSearch.length}}</strong> bài viết</p>
          </div>
      <!-- masonry sole -->
        <div
          v-if="listPostSearch && listPostSearch.length"
          v-masonry
          column-width=".grid-sizer"
          transition-duration="0.3s"
          item-selector=".ass1-section__item"
          class=".ass1-section__wrap row ass1-section__isotope-init">
          <div class="grid-sizer"></div>
         
        
      <!-- Bài viết của user -->
			 <comp-list-item 
            v-masonry-tile
            v-for="item in listPostSearch"
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
import {mapActions} from 'vuex'
import CompListItem from '../components/CompListItem'
export default {
    name:'search-page',
    components:{
        CompListItem
    },
    data() {
        return {
            query:this.$route.query.query,
            listPostSearch:[]
        }
    },  
    watch: {
        '$route'(to,from){
            this.query = to.query.query
            this.fetchData();
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        ...mapActions([
            'search'
        ]),
        //hàm gọi apiSearch 
        fetchData(){
           if(this.query){
                this.search(this.query).then(res=>{
                if(res.ok){
                    this.listPostSearch = res.data;
                     this.$redrawVueMasonry(); // Lấy defaultid và vẽ lại giao diện
                }else{
                    this.listPostSearch = []
                }
            })
           }
        },
        
    },
    
}
</script>

<style>
    .info-search{
        margin-top: 45px;
    }
    mark {
        background-color: yellow;
        padding: 0;
    }
</style>