//缓存
function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
//加载学员列表
function list(currentPage) {
    $.ajax({
        type: "POST",
        url: "data/list.php",
        data: {
            currentPage: currentPage
        },
        success: function (data) {
            var val = JSON.parse(data).data;
            var html = '';
            $.each(val, function (k, v) {
                html += `
                    <tr id="current_${v['stu_id']}">
                        <td>
                            ${v['stu_name']}
                        </td>
                        <td>${v['stu_state']}</td>
                        <td class="am-hide-sm-only">${v['stu_consultant']}</td>
                        <td>${v['stu_lastTime']}</td>
                    </tr>
                `;
            });
            $('.tab2 tbody').html(html);
            var pageHTML = "<span class='first'>&lt;&lt;</span>";
            var page = JSON.parse(data).totalPage;
            setCookie('page', page, 1);
            for (var i = 1; i <= page; i++) {
                pageHTML += "<span class='num'>" + i + "</span>";
            }
            pageHTML += "<span class='last'>&gt;&gt;</span>"

            $("#page").html(pageHTML);
            // 分页
            $('#page').on('click', 'span.num', function (e) {
                e.stopPropagation();
                list(parseInt($(this).html()));
                $(this).addClass('current_page').siblings().removeClass('current_page');
            });
            $('#page').on('click', 'span.last', function (e) {
                e.stopPropagation();
                list(getCookie('page'));
            });
            $('#page').on('click', 'span.first', function (e) {
                e.stopPropagation();
                list(1);
            });
        },
        error: function () {
            alert("网络出现故障");
        }
    });
}
//加载员工列表
function emp_list(currentPage) {
    $.ajax({
        type: "POST",
        url: "data/emp_list.php",
        data: {
            currentPage: currentPage
        },
        success: function (data) {
            var val = JSON.parse(data).list_users;
            var val_task = JSON.parse(data).list_task;
            var html = '';
            $.each(val, function (k, v) {
                html += `
                    <tr>
                            <td class="emp_${v['uid']}">
                                <a href="#">${v['uname']}</a>
                            </td>
                            <td class="emp_dept">${v['dept']}</td>
                             <td class="am-hide-sm-only">${v['posts']}</td>
                            <td class="task task_${v['uid']}"></td>
                            <td class="task task_money_${v['uid']}"></td>
                            <td class="off_duty">${v['off_duty']}</td>
                        </tr>
                    `;
            });
            $('.tab4 tbody').html(html);
            $.each(val_task, function (k, v) {
                $('td.task_' + v['uid']).html(v['emp_task']);
                $('td.task_money_' + v['uid']).html(v['emp_task_money']);
            });
            var btn = `
            <div class="am-btn-toolbar">
                                    <div class="am-btn-group am-btn-group-xs">
                                        
                                        <button class="am-btn am-btn-default am-btn-xs btn_task">
                                            <span class="am-icon-copy"></span> 任务分配</button>
                                        <button class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only btn_off">
                                            <span class="am-icon-trash-o"></span>撤离员工</button>
                                    </div>
                                </div>
            `;
            for (let i = 0; i < $('td.off_duty').length; i++) {
                if ($('td.off_duty')[i].innerHTML == 1) {
                    $('td.off_duty')[i].innerHTML = btn;
                } else {
                    $('td.off_duty')[i].innerHTML = "已离职";
                };
            }
            for (let i = 0; i < $('td.emp_dept').length; i++) {
                if (($('td.emp_dept')[i].innerHTML != "职发部") && ($('td.emp_dept')[i].innerHTML != "咨询部")) {
                    $($('td.emp_dept')[i]).siblings('td.off_duty').find('.btn_task').attr('disabled', "true");
                }
                if (getCookie('isAdmin') == 0) {
                    $($('td.emp_dept')[i]).siblings('td.off_duty').html(" ");
                }
            }

        },
        error: function () {
            alert("网络出现故障");
        }
    });
}
//加载学员详情
function detail(stu_id) {
    $.ajax({
        type: "POST",
        url: "data/detail.php",
        data: {
            stu_id: stu_id
        },
        success: function (data) {
            //加载基本信息
            let stu = JSON.parse(data).stu_detail;
            let content = `
                <button type="submit" class="am-btn am-btn-success edit">修改</button>
                <button type="button" class="am-btn am-btn-danger close">关闭</button>
                <table class="am-table am-table-hover " cellspacing="0">
                    <tr>
                        <td>姓名：
                            <span>${stu.stu_name}</span>
                        </td>
                        <td>性别：
                            <span>${stu.stu_gender}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>咨询：
                            <span>${stu.stu_consultant}</span>
                        </td>
                        <td>班级：
                            <span>${stu.stu_class}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>是否合作缴费：
                            <span>${stu.isHelp}</span>
                        </td>
                        <td>合作顾问：
                            <span>${stu.assist}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>电话：
                            <span>${stu.stu_phone}</span>
                        </td>
                        <td>QQ：
                            <span>${stu.stu_qq}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>毕业院校：
                            <span>${stu.stu_school}</span>
                        </td>
                        <td>专业：
                            <span>${stu.stu_major}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>编号：
                            <span>${stu.stu_id}</span>
                        </td>
                        <td>学历：
                            <span>${stu.stu_deg}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>报名时间：
                            <span>${stu.stu_date}</span>
                        </td>
                        <td>信息来源：
                            <span>${stu.stu_source}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>交费金额：
                            <input type="text" value="${stu.stu_money}">
                        </td>
                        <td>业绩核算金额：
                            <span>${stu.stu_totalMoney}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>状态：
                            <span>${stu.stu_state}</span>
                        </td>
                        <td>层次咨询：
                            <span>${stu.stu_second}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>交叉回访：
                            <span>${stu.stu_across}</span>
                        </td>
                        <td>最后修改时间：
                            <span>${stu.stu_lastTime}</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">概况：
                            <span>${stu.stu_intro}</span>
                        </td>
                    </tr>
                </table>
                
            `;
            $('#basic').append(content);

            //加载访谈记录
            var html = "";
            var v = JSON.parse(data).stu_rec;
            $.each(v, function (k, v) {
                html += `
                    <tr>
                        <td>创建人：
                            <span>${v.rec_person}</span>
                        </td>
                        <td>时间：
                            <span>${v.rec_time}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>回访类型：
                            <span>${v.rec_type}</span>
                        </td>
                        <td>风险评级：
                            <span>${v.rec_steady}</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">访谈内容：<span>${v.rec_content}</span></td>
                    </tr>
                    <tr><td colspan="2"><div class="border">&nbsp;<hr></div></td></tr>
                `;
            });
            $('#rec_detail').html(html);
        },
        error: function () {
            alert("网络出现故障，请检查您的网络!");
        }
    })
    $('.bg').css({
        "height": $(document).height(),
        "width": $(document).width(),
        'display': 'block'
    });
    $('.in').css({
        'overflow': 'auto'
    });
}