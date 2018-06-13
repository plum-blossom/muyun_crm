//消息提醒
$(function() {
  var msg;
  getNew();
  setInterval(getNew, 60000);

  function getNew() {
    $.get('data/msg.php', function(data) {
      msg = JSON.parse(data);
      //获取消息条数
      $('#list_1').find('.number').html(msg.list_1.length);
      $('#list_7').find('.number').html(msg.list_7.length);
      $('#list_15').find('.number').html(msg.list_15.length);
      //加载顶部消息列表
      for (let i = 0; i < msg.list_1.length; i++) {
        if (msg.list_1[i].stu_consultant == getCookie('username')) {
          let li = `
					<li class="tpl-dropdown-list-bdbc">
	                    <a href="#" class="tpl-dropdown-list-fl" id="stu_${msg.list_1[i].stu_id}">
	                        ${msg.list_1[i].stu_name}
	                    </a>
	                    <span class="tpl-dropdown-list-fr">${msg.list_1[i].rec_time}</span>
	                </li>
        		`;
          $('#notice_list').append(li);
        }
      }
    });
  }

  $('.notice_count').html($('#notice_list li').length - 1);
  if ($('#notice_list li').length < 2) {
    $('#notice_list').html("<li class='notice_no'>别点啦 ^_^ 没有消息提醒</li>");
    $('.notice_count').html($('#notice_list li').length - 1);
  }

  $('#notice_list>li').on('click', 'a', function(e) {
    e.preventDefault();
    e.stopPropagation();
    detail($(this).attr('id').split('_')[1]);
  });
  $('.alert_stu').click(function(e) {
    let index = $(this).attr('id');
    $('.student_list_bg').show().css({ "height": $(document).height(), "width": $(document).width() });
    $('.student_list tbody').html(getList(msg[index]));
  })

  function getList(list) {
    var str = "";
    for (let i = 0; i < list.length; i++) {
      str += `
			<tr id="stu_${list[i].stu_id}">
				<td>${list[i].stu_name}</td>
				<td>${list[i].stu_consultant}</td>
				<td>${list[i].rec_time}</td>
			</tr>
    	`;
    }
    return str;
  }
  $('.student_list button').click(function() {
    $('.student_list_bg').hide();
  })
  $('.student_list').on('click', 'tbody tr', function() {
    $('.student_list_bg').hide();
    detail($(this).attr('id').split('_')[1]);

  })
})