export default {
  getListPost: state => {
    return state.listPosts;
  },
  // Dùng rootState để kết hợp 2 state ở 2 mudule khác nhau
  setPostDetail(state, getters, rootState) {
    if (state.postDetail) {
      console.log("rootState", rootState);
      var USERID = state.postDetail.post.USERID;
      var user = rootState.user.users[USERID];
      console.log("USERID", USERID);
      console.log("user", user);
      var data = {
        post: {
          ...state.postDetail.post,
          fullname: user.fullname,
          profilepicture: user.profilepicture
        },
        category: state.postDetail.categories,
        comments:state.postDetail.comments
      };
      console.log("data tổng", data);
    }
    return data;
  }
};
