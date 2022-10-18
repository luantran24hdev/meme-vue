<template>
    <div class="ass1-section__footer">
        <a href="#" class="ass1-section__btn-comment ass1-btn-icon"><i
                class="icon-Comment_Full"></i><span>{{getCount}}</span></a>
    </div>
</template>

<script>

export default {
    name:"comp-item-body-footer",
  props:{
        itemPosts:{type:Object, default:null}
    },
    computed: {
        getCount(){
          if(this.itemPosts.count){
              return this.itemPosts.count
          }else{
              return 0;
          }
        }
    },
}
</script>

<style>

</style>