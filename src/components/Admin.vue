<template>

  <div> 

    <!-- pagination new -->
     <!-- <template>
            <div v-if="data && data.length">

              <a-pagination
                :total="data.length"
                :show-total="(total, range) => `Từ trang ${ range[0]} đến trang ${ range[1]} của ${total} trang`"
                :page-size="5"
                :default-current="1"
              />
            </div>
          </template> -->
     

        <!-- pagination old -->
      <a-table 
        :pagination='{pageSize: 5, showTotal}'
      
        
        :data-source="data" 
       
      >

         
     
      
        <!-- <a-pagination
        :data-source="data"
          :show-total="(total, range) => `${range[0]}-${range[1]} of ${total} items`"
          :total="85"
          
          :page-size="5"
          :default-current="1"
        />     -->
      <!-- :pagination='{pageSize: 5}' :data-source="data" -->
      
     <a-table-column key="STT" title="#">
        <template slot-scope="text, item, index">
            <span>{{index}}</span>
        </template>
     </a-table-column>


      <a-table-column key="Postid" title="Post Id">
        <template slot-scope="text, item, index">
            <span>{{text.PID}}</span>
        </template>
     </a-table-column>

    <!-- <a-table-column key="PID" title="PID" data-index="PID" /> -->
    <!-- <a-table-column key="url_image" title="url_image" data-index="url_image" /> -->

    <a-table-column class="img" title="Hình ảnh" data-index="url_image" >
      <template slot-scope="text, item, index">
        <span >
          <img v-bind:src="text"/>
        </span>
      </template>
    </a-table-column>


    <!-- <a-table-column key="fullname" title="Người đăng" data-index="fullname" /> -->

    <a-table-column key="fullname" title="Người đăng bài">
        <template slot-scope="text, item, index">
            <span>{{text.fullname}}</span>
        </template>
     </a-table-column>
    

    <!-- <a-table-column key="time_added" title="Thời gian đăng bài" data-index="time_added" /> -->


    <a-table-column key="time_added" title="Thời gian đăng bài">
        <template slot-scope="text, item, index">
            <span>{{text.time_added}}</span>
        </template>
     </a-table-column>
    

    <a-table-column key="post_content" title="Nội dung">
        <template slot-scope="text, item, index">
            <span>{{text.post_content}}</span>
        </template>
     </a-table-column>

    <a-table-column key="action" title="Hành động">
      <template slot-scope="text, record, index">
        <span>
           <button class="edit"><router-link  class="edit" v-bind:to="{name:'dashboard-users', params:{id:text.PID}}">Edit</router-link></button>
          
          <button v-on:click="handleDelete(text, record, index)" class="delete" title="Delete" data-toggle="tooltip">Delete</button>
        </span>
      </template>
    </a-table-column>
    
  </a-table>


  <!-- total -->
    

 
  </div>
  
</template>

  


<script>




import {mapActions, mapGetters} from 'vuex'
export default {
  data() {
    return {
     
    };
  },
  methods: {
    showTotal(){
      return 
    },
      ...mapActions([
            'handleDeleteDashboard',
            'delete',
            'Status'
        ]),
      handleDelete(text, record, index){
           let data = index;
           console.log(data)   //underfined
            this.handleDeleteDashboard(data);
             let postid = parseInt(text.PID)
             console.log(postid)   // NaN
            this.delete(postid).then(res=>{
                // console.log('res',res);
                if(res.ok){
                    this.$notify({
                    group: "noti",
                    duration: 10000,
                    type: "success",
                    title: "Thông báo",
                    text:   res.message
                    });
                }
            })
             
      }
  },
   computed: {
      ...mapGetters({
           data:'getDashboard'
      }),
     

      
  },
};
</script>

<style>
        .img {
            width: 100px;
        }
        .edit {
          background: aqua;
          border: 2px solid aqua;
          
        }
        .edit:hover {
          color: yellow;
          transition: all 0.3s ease;
        }
        .delete {
          background: red;
          border: 2px solid red;
        }
         .delete:hover {
          color: yellow;
          transition: all 0.3s ease;
        }
</style>