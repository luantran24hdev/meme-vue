import axiosInstance from "../../plugins/axios";
import { FormCheckboxPlugin } from "bootstrap-vue";
// import { LoaderOptionsPlugin } from "webpack";
import {parseJwt} from "../../helpder";
export default {
  //Bước 7: viết api getUserById
  async getUserById({ commit }, userid) {
    try {
      var result = await axiosInstance.get(
        "/member/member.php?userid=" + userid
      );
      console.log("result trong getUserByID", result);
      if (result.data.status === 200) {
        //Sau khi nhận được USERID bên kia truyền qua commit đến mutation và sửa nó trong mutations
        commit("SET_USER_BY_ID", result.data.user);
        return {
          ok: true,
          error: null,
          data: result.data.user
        };
      }
    } catch (error) {
      return {
        ok: false,
        error: error.message
      };
    }
  },

  async login({ commit, dispatch }, data) {
    commit("SET_LOADING", true);
    try {
      var result = await axiosInstance.post("/member/login.php", data);
      commit("SET_LOADING", false);
      console.log("result", result);
      //in ra lỗi cho bên client nó báo cho người dùng biết đó là lỗi gì
      if (result.data.status === 200) {
        //Sau khi login thành công gán data thành công vào users/state  Bởi vì users có dạng 2:object cho nên phải lưu vào currentUser
        commit("SET_USER_BY_ID", result.data.user);
        //Sau khi login thành công gán data thành công vào currentUser + token /state
        commit("SET_LOGIN_INFO", result.data);
        let resultPost = await dispatch(
          "getPostListByUserId",
          result.data.user.USERID
        );
        return {
          ok: true,
          data: result.data,
          error: null
        };
      } else {
        commit("SET_LOADING", false);
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

  // gán lại SET_LOGIN_INFO và cho vào app created để khi load lại khôg bị mất đi currentUser và token
  async checkLogin({ commit, dispatch }) {
    commit("SET_LOADING", false);
    try {
      let token = localStorage.getItem("ACESS_TOKEN");

      let objUser = parseJwt(token);

      // let resultUser = await dispatch("getUserById",objUser.id);
      // let resultPost = await dispatch("getPostListByUserId", objUser.id);

      let promiseUser = dispatch("getUserById", objUser.id);
      let promisePost = dispatch("getPostListByUserId", objUser.id);

      // dùng promiseAll để gộp 2 promise trên lại
      let [resultUser, resultPost] = await Promise.all([
        promiseUser,
        promisePost
      ]);

      commit("SET_LOADING", false);
      console.log("resultUser", resultUser);
      if (resultUser.ok && resultPost.ok === true) {
        let data = {
          user: resultUser.data,
          token: token
        };
        commit("SET_LOGIN_INFO", data);
        return {
          ok: true,
          error: error.message
        };
      } else {
        commit("SET_LOADING", false);
        return {
          ok: false
        };
      }
    } catch (error) {
      return {
        ok: false,
        error: error.message
      };
    }
  },

  logout({ commit }) {
    try {
      commit("LOGOUT");
    } catch (error) {
      return {
        ok: false,
        error: error.message
      };
    }
  },

  // gọi api getListPostByUserId api này cần có  config bearer vì đây là api không public
  async getPostListByUserId({ commit }, userid) {
    try {
      let config = {
        params: {
          userid: userid
        },
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("ACESS_TOKEN")
        }
      };
      var result = await axiosInstance.get(
        "/post/getListPostUserID.php",
        config
      );
      console.log("getPostListByUserId", result);
      if (result.data.status === 200) {
        commit("SET_POST_BY_USERID", result.data);
       
        return {
          ok: true,
          data: result.data.posts || [],
          error: null
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

  //Chức năng đăng ký :
  async register({ commit, dispatch }, data) {
    try {
      var result = await axiosInstance.post("/member/register.php", data);
      console.log("register", result);
      if (result.data.status === 200) {
        // đăng ký thành công tất cả các mutation ở login :
        // SET_USER_BY_ID
        let data = {
          user: result.data.user,
          token: result.data.token
        };
        // lấy state/users lấy users để thực hiện chức năng thay đổi profile và xem user khác nhau
        commit("SET_USER_BY_ID", result.data.user);
        // gán access_token vào localStorage
        commit("SET_LOGIN_INFO", data);
        // Lấy danh sách bài viết bằng USERID
        //  dispatch("getPostListByUserId",result.data.user.USERID);
        dispatch("getPostListByUserId", result.data.user.USERID);
        return {
          ok: true,
          error: null,
          data: result.data
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

  // chức năng update
  async update(
    { commit },
    {
      avatar = "",
      fullname = "",
      description = "",
      gender = "",
      ObjectFile = null
    }
  ) {
    commit("SET_LOADING", true);
    try {
      //gọi api theo form data
      let bodyFormData = new FormData();
      bodyFormData.append("fullname", fullname);
      bodyFormData.append("description", description);
      bodyFormData.append("gender", gender);
      if (ObjectFile) {
        bodyFormData.append("avatar", ObjectFile);
      }
      if (avatar) {
        bodyFormData.append("avatar", avatar);
      }

      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("ACESS_TOKEN")
        }
      };
      let result = await axiosInstance.post(
        "/member/update.php",
        bodyFormData,
        config
      );
      commit("SET_LOADING", false);
      if (result.data.status === 200) {
        commit("GET_CURRENT_USEER", result.data.user);
        return {
          ok: true,
          data: result.data.user
        };
      } else {
        return {
          ok: false,
          error: result.data.error
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

  //Chức năng đổi mật khẩu :
  async changePassword({ commit }, data) {
    console.log('data action changepasswrod',data)
    commit("SET_LOADING", true);
    try {
       let config = {
        //  params: {
        //    userid: userid
        //  },
         headers: {
           'Content-Type': "application/json",
           'Authorization': "Bearer " + localStorage.getItem("ACESS_TOKEN")
         }
       };
      let result = await axiosInstance.post("/member/password.php",data,config);
    
      commit("SET_LOADING", false);
      if (result.data.status === 200) {
        return {
          ok: true,
          message: result.data.message
        };
      } else {
        return {
          ok: false,
          error: result.data.error
        };
      }
    } catch (error) {
      commit("SET_LOADING", false);
      return {
        ok: false,
        error: error.response.data.error
      };
    }
  },

  handleDeleteDashboard({commit,state},data){
    let resultListTaskAfterDelete = data;
    
      commit("HANDLE_DELETE_ITEM", resultListTaskAfterDelete);
  },


  //Chức năng delete:
  async delete({ commit }, postid) {
    // console.log("postid", postid);
    commit("SET_LOADING", true);
    try {
        let params =  {
           'postid': postid
         }
        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("ACESS_TOKEN")
          }
        };
      let result = await axiosInstance.post("/post/delete.php", params, config);
      // console.log("result deletedsdsds", result);
      commit("SET_LOADING", false);
      if (result.data.status === 200) {
        return {
          ok: true,
          message: result.data.message
        };
      } else {
        return {
          ok: false,
          error: result.data.error
        };
      }
    } catch (error) {
      commit("SET_LOADING", false);
      return {
        ok: false,
        error: error.response.data.error
      };
    }
  },
  
 

};
