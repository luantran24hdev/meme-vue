import axiosInstance from "../../plugins/axios";
import { PAGE_SIZE, CURRENT_PAGE } from "../../constance";

export default {
  async getListPagination(
    { commit },
    { pagesize = PAGE_SIZE, currPage = CURRENT_PAGE }
  ) {
    commit("SET_LOADING", true);
    try {
      var result = await axiosInstance.get(
        `/post/getListPagination.php?pagesize=${pagesize}&currPage=${currPage}`
      );

      if (result.data.status === 200) {
        commit("SET_LOADING", false);
        if (currPage === 1) {
          commit("SET_LIST_POST", result.data.posts);
        } else if (currPage > 1) commit("PUSH_ITEM_MORE", result.data.posts);
        // console.log("result.data.posts", result.data.posts);
      } else {
        console.log("error", result.data.error);
      }
    } catch (error) {
      console.log("error", error);
    }
  },

  async getListByCategory(
    { commit },
    { pagesize = PAGE_SIZE, currPage = CURRENT_PAGE, tagIndex = 7 }
  ) {
    commit("SET_LOADING", true);
    try {
      var result = await axiosInstance.get(
        `/post/getListByCategory.php?pagesize=${pagesize}&currPage=${currPage}&tagIndex=${tagIndex}`
      );
      commit("SET_LOADING", false);
      if (result.data.status === 200) {
        if (currPage === 1) {
          commit("SET_LIST_POST", result.data.posts);
        } else if (currPage > 1) commit("PUSH_ITEM_MORE", result.data.posts);
      } else {
        console.log("error", result.data.error);
      }
    } catch (error) {
      commit("SET_LOADING", false);
      console.log("error", error);
    }
  },

  // Bước 1 : gọi api postDetail
  async getPostDetail({ commit, dispatch }, postid) {
    commit("SET_LOADING", true);
    try {
      var result = await axiosInstance.get("/post/post.php?postid=" + postid);

      //Bước 4 : Nếu như = 200 là ok rồi. sẽ lưu result api này và0 trong store
      if (result.data.status === 200) {
        //Bước 8 dispatch actions/user getUserById và truyền USERID qua
        // var resultUser = await dispatch("getUserById",result.data.data.post.USERID);
        // var result = await dispatch("GetListComentByPost", postid);

        var promiseUser = dispatch("getUserById", result.data.data.post.USERID);
        var promiseComments = dispatch("GetListComentByPost", postid);
        let [resultUser, resultComments] = await Promise.all([
          promiseUser,
          promiseComments
        ]);
        console.log("resultComments", resultComments);

        let dataPostDetail = {
          ...result.data.data,
          comments: []
        };
        if (resultComments.ok) {
          dataPostDetail.comments = resultComments.data;
        }

        commit("SET_LOADING", false);
        // Say khi gọi đc api getUserById trong actions user trong comp
        // Tiền hành lưu nó trong state và dùng getters để xử lý

        commit("SET_POST_DETAIL", dataPostDetail);
        // return lỗi này để qua bên comp .then(res=>{}) ta có thể lấy dc promise
        return {
          ok: true,
          error: null,
          data: result.data.data
        };
      }
      //BƯỚC 6 Commit qua mutation thay đổi state, dùng getters để lấy state hoặc import state vào trong comp để sài cái data này
    } catch (error) {
      commit("SET_LOADING", false);
      // return lỗi này để qua bên comp .then(res=>{}) ta có thể lấy dc promise
      return {
        ok: false,
        error: error.message
      };
    }
  },

  // search
  async search({ commit }, data) {
    commit("SET_LOADING", true);
    try {
      let result = await axiosInstance.get("/post/search.php?query=" + data);
      commit("SET_LOADING", false);
      if (result.data.status === 200) {
        return {
          ok: true,
          data: result.data.posts
        };
      } else {
        return {
          ok: false
        };
      }
    } catch (error) {
      commit("SET_LOADING", false);
      return {
        ok: false,
        error: error.message
      };
    }
  },
  // upload
  async CreateNewPost(
    { commit },
    { url_image = "", post_content = "", obj_image = null, category = "" }
  ) {
    try {
      // thêm trường form-data
      var bodyFormData = new FormData();
      bodyFormData.append("url_image", url_image);
      bodyFormData.append("post_content", post_content);
      bodyFormData.append("category", category);
      if (obj_image) {
        bodyFormData.append("obj_image", obj_image);
      }
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("ACESS_TOKEN"),
          "Content-Type": "multipart/form-data"
        }
      };
      // console.log("bodyFormData new post", bodyFormData);

      let result = await axiosInstance.post(
        "/post/addNew.php",
        bodyFormData,
        config
      );
      if (result.data.status === 200) {
        return {
          ok: true,
          data: result.data.data
        };
      } else {
        return {
          ok: false,
          error: result.data.error
        };
      }
    } catch (error) {
      return {
        ok: false,
        error: error.message
      };
    }

    //
  },

  // lấy comment
  async GetListComentByPost({ commit }, postid) {
    try {
      let result = await axiosInstance.get(
        "/comment/comments.php?postid=" + postid
      );
      if (result.data.status === 200) {
        return {
          ok: true,
          data: result.data.comments
        };
      } else {
        return {
          ok: false,
          error: result.data.error
        };
      }
    } catch (error) {
      return {
        ok: false,
        error: error.message
      };
    }
  },

  // postComments
  async PostNewCommentForNews({ commit, rootState }, data) {
    commit("SET_LOADING", true);
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("ACESS_TOKEN")
        }
      };
      let result = await axiosInstance.post(
        "/comment/add_new.php",
        data,
        config
      );
      commit("SET_LOADING", false);
      // console.log("result CommentNeew", result);
      if (result.data.status === 200) {
        let comment = {
          ...result.data.body,
          fullname: rootState.user.currentUser.fullname,
          profilepicture: rootState.user.currentUser.profilepicture
        };
        console.log("result comment = ", result.data.body);
        console.log("result add fullname và profile = ", comment);
        commit("PUSH_LIST_COMMENT", comment);
        return {
          ok: true,
          data: comment
        };
      } else {
        return {
          ok: false
        };
      }
    } catch (error) {
      commit("SET_LOADING", true);
      return {
        ok: false,
        error: error.message
      };
    }
  },

  //Edit post
  async EditPost(
    { commit },
    {
      url_image = "",
      post_content = "",
      obj_image = null,
      category = "",
      postid = ""
    }
  ) {
    try {
      // thêm trường form-data
      var bodyFormData = new FormData();
      bodyFormData.append("url_image", url_image);
      bodyFormData.append("post_content", post_content);
      bodyFormData.append("category", category);
      bodyFormData.append("postid", postid);
      if (obj_image) {
        bodyFormData.append("obj_image", obj_image);
      }
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("ACESS_TOKEN"),
          "Content-Type": "multipart/form-data"
        }
      };
      

      let result = await axiosInstance.post(
        "/post/edit.php",
        bodyFormData,
        config
      );

      if (result.data.status === 200) {
        return {
          ok: true,
          data: result.data.data
        };
      } else {
        return {
          ok: false,
          error: result.data.error
        };
      }
    } catch (error) {
      return {
        ok: false,
        error: error.message
      };
    }

    //
  },

  async Status({ commit, dispatch }, postid) {
    commit("SET_LOADING", true);
    try {
      const config = {
       headers: {
          Authorization: "Bearer " + localStorage.getItem("ACESS_TOKEN"),
         
        }
      }
        const data = {postid}
        const result = await axiosInstance.post("/post/activeDeactive.php",data,config);
        commit("SET_LOADING", false);
      if(result.data.status === 200){
        return {ok:true, body:result.data.message}

      }else {
        return {
          ok:false, error :result.data.error
        }
      }
    } catch (error) {
      commit("SET_LOADING", false);
      // return lỗi này để qua bên comp .then(res=>{}) ta có thể lấy dc promise
      return {
        ok: false,
        error: error.message
      };
    }
  }
};
