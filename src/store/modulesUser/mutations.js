import Vue from "vue";
export default {
  // Bước 9 : bởi vì state này là 1 obj cho nên ta dùng vue.set trong vue để thay đổi
  // gán dữ liệu vào store/state/users
  SET_USER_BY_ID(state, data) {
    Vue.set(state.users, data.USERID, data);
  },


  //Sau khi login thành công thì Lưu data thành công vào trong store/state
  SET_LOGIN_INFO(state,{user=null,token=''}){
    localStorage.setItem("ACESS_TOKEN", token); //đồng thời lưu trong localStorage để thực hiện chức năng khi reload lại thì tất cả dữ liệu trong state đều mất hết dựa vào đã lưu trong localStorage để duy truỳ trạng thái đăng nhập
      state.ACESS_TOKEN = token;
      state.currentUser = user;
  },

  LOGOUT(state){
    state.ACESS_TOKEN = '';
    state.currentUser = null;
    localStorage.removeItem("ACESS_TOKEN");
  },


  // gán dữ liệu vào store/state/posts
  SET_POST_BY_USERID(state,data){
    state.posts = data,
    state.listTask = data
  },

  GET_CURRENT_USEER(state,data){
    state.currentUser = data
  },

  HANDLE_DELETE_ITEM(state,resultListTaskAfterDelete){
       
         state.listTask.posts.splice(resultListTaskAfterDelete, 1);
        
        
    },



  

};
