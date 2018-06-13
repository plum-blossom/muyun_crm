$(function() {
  $('#login-button').click(function(e) {
    e.preventDefault();
    var currentUser = null;
    var uname = $("#uname").val();
    var pwd = $("#pwd").val();
    if (!uname.match(/^([a-z])+@tedu.cn$/)) {
      alert("请重新输入正确的tedu邮箱");
      $("#uname").focus();
    } else {
      $.ajax({
        type: "POST",
        url: "data/login.php",
        data: {
          uname: uname,
          pwd: pwd
        },
        success: function(data) {
          if (data != "用户名密码错误") {
            var users = JSON.parse(data);
            setCookie('username',users.uname,1); 
            setCookie('posts',users.posts,1); 
            setCookie('isAdmin', users.isAdmin,1); 
            setCookie('dept', users.dept,1); 
            window.location = "index.html";
          } else {
            alert(data);
          }
        },
        error: function() {
          alert("网络出现故障，请检查您的网络!");
        }
      });
    }

  });

});
