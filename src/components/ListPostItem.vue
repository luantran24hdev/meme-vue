<template>
  <tr>
        <td>{{index+1}}</td> 
        <td><a href="#"><img v-bind:src=customAvatar class="avatar" alt="Avatar">{{listPostAdmin.post_content}}</a></td>
        <td>{{ listPostAdmin.PID }}</td>               
        <td>{{listPostAdmin.fullname}}</td>
        <!-- status -->
        <!-- <td>
            
            <div class="custom-control custom-switch">
            <select  v-on:click="handleSort" v-model="status" name="ds" class="form-control" required="required">
                <option 
             value="0">Active</option>
                <option  value="1">InActive</option>
            </select>
                

                
            </div>
        </td> -->
        <td>{{listPostAdmin.time_added}}</td>
        
        <td>
            <router-link v-bind:to="{name:'dashboard-users', params:{id: listPostAdmin.PID}}" class="settings" title="Settings" data-toggle="tooltip"><i class="fa fa-pencil" aria-hidden="true"></i></router-link>
            <a v-on:click="handleDelete" class="delete" title="Delete" data-toggle="tooltip"><i class="fa fa-trash" aria-hidden="true"></i></a>
        </td>
    </tr>
</template>

<script>
import { mapState } from 'vuex'
import {mapActions} from 'vuex'
export default {
   data() {
        return {
            status:'0',
            postid:this.listPostAdmin.PID
        }
    },
    
    
  
    props:{
        listPostAdmin:{type:Object, default:{}},
        index:{type:Number, default:0}
    },
    computed: {
          ...mapState([
              'taskSelected'
          ]),
        customAvatar(){
            if(this.listPostAdmin.url_image){
                    return this.listPostAdmin.url_image
            }else{
                return '/public/images/user-default.jpg'
            }
        }
    },
    methods: {
        handleSort(){
         
             let postid = this.postid
        this.Status(postid).then(res=>{
            console.log(res)
        //   if(res.ok){
        //             this.$notify({
        //             group: "noti",
        //             duration: 10000,
        //             type: "success",
        //             title: "Thông báo",
        //             text:   res.body
        //             });
        //         }
        })
        },

        handleStatus(){
            console.log('a')
        },
        ...mapActions([
            'handleDeleteDashboard',
            'delete',
            'Status'
        ]),
        handleDelete(){
           
            
            let data = this.index;
            this.handleDeleteDashboard(data);

             let postid = parseInt(this.listPostAdmin.PID)
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


   
}
</script>

<style>
    .custom-control {
        padding: 0;
        width: 102px;
        border: node;
        font-size: 10px;
    }
</style>