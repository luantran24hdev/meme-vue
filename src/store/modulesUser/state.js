export default {
  // ta truyền vào id nào thì users sẽ trả cho ta dữ liệu tương tứng với USERID đó
  // Để ta có thể lấy dc userid của chính bản thân mình và xem dc user của người khác = cách cho id vào thì dữ liệu tự render ra
  users: {},
  ACESS_TOKEN: localStorage.getItem("ACESS_TOKEN"),
  currentUser: null,
  posts: {},

  listTask:[]
};
