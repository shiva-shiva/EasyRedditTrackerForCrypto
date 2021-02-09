let users = [
  {
    userName: "Shiva",
    password: 1111,
    saved: [],
  },
  {
    userName: "Sam",
    password: 2222,
    saved: [],
  },
  {
    userName: "Max",
    password: 3333,
    saved: [],
  },
  {
    userName: "Richard",
    password: 4444,
    saved: [],
  },
  {
    userName: "Giovanni",
    password: 5555,
    saved: [],
  },
];
//points to the obj
let onlineNow;

class User {
  constructor(username, password, saved) {
    this.userName = username;
    this.password = password;
    this.saved = [];
  }
}

function loadPage() {
  if (localStorage.users) {
    users = JSON.parse(localStorage.getItem("users"));
    console.log(users);
  } else localStorage.setItem("users", JSON.stringify(users));

  if (localStorage.onlineNow) {
    onlineNow = JSON.parse(localStorage.getItem("onlineNow"));
    console.log(onlineNow.userName);
    $("#userName").html(onlineNow.userName);
  }
}
////STORE USER
function storeUser(name, password) {
  const newOne = new User(name, password);
  users.push(newOne);
  localStorage.setItem("users", JSON.stringify(users));
}
////CREATE NEW USER
function newUser(e) {
  e.preventDefault();
  const name = $(".createUsername").val();
  const password = $(".createPassword").val();
  console.log(name, password);
  if (name && password) {
    let check = checkUserName(name);
    if (check) {
      //replaced the alert with #modal1
      registerHide();
      $("#modal1").modal("show");
      return;
    } else {
      storeUser(name, password);
      clearFIelds();
      closeModal();
    }
  } else {
  //replaced the alert with #modal2
  registerHide();
  $("#modal2").modal("show");
    
}
}
//////LOGIN LOGIC
function login(e) {
  e.preventDefault();
  let username = $(".username").val();
  let password = $(".password").val();
  [currentUser] = users.filter(
    (el) =>
      el.password == password &&
      el.userName.toLowerCase() === username.toLowerCase()
  );
  if (currentUser) {
    console.log(`${currentUser.userName} just logged in`);
    onlineNow = currentUser;
    localStorage.setItem("onlineNow", JSON.stringify(onlineNow));
    clearFIelds();
    window.location.assign("home.html");
  } else alert("User not found!");
}
/////////////
function checkUserName(user) {
  const el = (el) => el.userName.toLowerCase() === user.toLowerCase();
  let check = users.some(el);
  return check;
}
/////clear input fields
function clearFIelds() {
  $(".username").val("");
  $(".password").val("");
  $(".createUsername").val("");
  $(".createPassword").val("");
}

function closeModal() {
  $("#exampleModal").modal("hide");
}

$(".loginBtn").on("click", login);
$(".registerBtn").on("click", newUser);
$(window).on("load", loadPage);

function saveChanges() {
  let username = $(".createUsername").val();
  let password = $(".createPassword").val();
  console.log(username, password);
  clearFIelds();
  closeModal();
}

////logout function
function logOut(e) {
  e.preventDefault();
  onlineNow = {};
  localStorage.removeItem("onlineNow");
  window.location.assign("index.html");
}

$("#logoutBtn").on("click", logOut);

function showModal() {
  $("#ForgatPasswordModal").modal("show");
}

function forgotPass(e) {
  let user = $(".re-createUsername").val();
  let pswd = $(".re-createPassword").val();
  let pswdSecond = $(".re-createPasswordSecond").val();
  console.log(user, pswd, pswdSecond);
  /// check for valid inputs and that the 2 passwords match
  if (user == "") {
    // alert("Please insert your Username!");
    PWHide();
    $("#modal3").modal("show");
    return;
  }
  if (pswd !== pswdSecond || pswd == "") {
    // alert("Passwords do not match!");
    PWHide();
    $("#modal4").modal("show");
    return;
  }
  /////take users froom local storage
  let users = JSON.parse(localStorage.getItem("users"));
  let check = false;
  // console.log(users);
  for (element of users) {
    if (element.userName.toLowerCase() === user.toLowerCase()) {
      ////if exists update password
      element.password = pswd;
      check = true;
    }
  }
  if (!check) {
  // alert("Username not found! Please register!");
  PWHide();
  $("#modal5").modal("show");
  return;
  }
  localStorage.setItem("users", JSON.stringify(users));
  console.log(users);
  hideForgotModal();
}

function hideForgotModal() {
  $("#ForgatPasswordModal").modal("hide");
}

$(".closeForgot").on("click", hideForgotModal);

function registerHide() {
  $("#exampleModal").modal("hide");
}
function registerShow() {
  $("#exampleModal").modal("show");
}
function PWHide() {
  $("#ForgatPasswordModal").modal("hide");
}
function PWShow() {
  $("#ForgatPasswordModal").modal("show");
}