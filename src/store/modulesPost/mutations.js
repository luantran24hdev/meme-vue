export default {
  SET_LIST_POST(state, data) {
    state.listPosts = data;
  },

  PUSH_ITEM_MORE(state, data) {
    state.listPosts = [...state.listPosts, ...data];
  },

  SET_POST_DETAIL(state, data) {
    console.log("SET_POST_DETAIL", data);
    state.postDetail = data;
  },
  PUSH_LIST_COMMENT(state, comment) {
    console.log("PUSH_LIST_COMMENT", comment);
    state.postDetail.comments.push(comment);
  }
};
