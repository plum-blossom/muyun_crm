//读取缓存，判断是都登录
if (getCookie('username') == "") {
    // window.location = 'login.html';
    alert('请登录');
}
$(() => {
    //新增员工按钮
    let btn_content = `
                    <button type="button" class="am-btn am-btn-success btn_empAdd">
                            新增员工
                        </button>
                    `;
    if (getCookie('isAdmin') == 1) {
        $('#btn_empAdd').html(btn_content);
    }
    emp_list();
    $('.tpl-header-list-user-nick').html(getCookie('username'));
    // 退出当前登录账号
    $('#quit').click(function (e) {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;)
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
        e.stopPropagation();
        e.preventDefault();
        window.location = 'login.html';
    })
    //内容页切换
    $(".tpl-left-nav-menu>li:not('.seat')").on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $('.bread').html($(this).children().children('span').html());
        $('.tab' + $(this).index()).css('display', 'block').siblings(".tab").css('display', 'none');
    })
});

/*
    ************************添加学员****************************
*/

reg_txt = /^[\u0391-\uFFE5]+$/;//汉字验证
$('.stu_name').on('blur', function () {
    if (!reg_txt.test($(this).val()) || $(this).val().length < 2 || $(this).val().length > 5) {
        $(this).css('borderColor', 'red').focus();
    } else {
        $(this).css('borderColor', '#ccc');
    }
})
var reg_phone = /^[1][3,4,5,7,8][0-9]{9}$/;//电话号码验证
$('.stu_phone').on('blur', function () {
    if (reg_phone.test($(this).val())) {
        $(this).css('borderColor', '#ccc');
    } else {
        $(this).css('borderColor', 'red').focus();
    }
})
var reg_qq = /^[1-9][0-9]{4,9}$/;//qq号验证

$('.stu_qq').on('blur', function () {
    if (reg_qq.test($(this).val())) {
        $(this).css('borderColor', '#ccc');
    } else {
        $(this).css('borderColor', 'red').focus();
    }
})
var reg_money = /^[1-9][0-9]{0,4}$/;
$('.stu_money,.stu_totalMoney').on('blur', function () {
    if (reg_money.test($(this).val())) {
        $(this).css('borderColor', '#ccc');
    } else {
        $(this).css('borderColor', 'red').focus();
    }
})
//加载咨询顾问列表
let stu_cons_list = `<select data-am-selected="{btnSize: 'sm'}" class="stu_cons"><option>请选择咨询顾问</option>`;
//判断当前是都为管理员账户,仅管理员账户可以选择咨询顾问
if (getCookie('isAdmin') == 0) {
    $('.stu_cons').val(getCookie('username')).attr('disabled', 'true');
} else {
    $.get('data/cons_lists.php', function (data) {
        data = JSON.parse(data);
        for (let i = 0; i < data.length; i++) {
            stu_cons_list += `<option value="${data[i].uname}">${data[i].uname}</option>`;
        }
        stu_cons_list += `</select>`;
        $('.stu_cons_box').html(stu_cons_list);
    })
}
//协助咨询
$(function () {
    $('.stu_help').change(function () {
        if ($('.stu_help').val() == "否") {
            $('.stu_assist_box').hide();
        } else {

            $('.stu_assist_box').show();
            $('.stu_assist').html(stu_cons_list);
        }
    });
})
//提交添加
$('#submit').click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    var d = {};
    d.stu_across = $('.stu_across').val();
    d.stu_author = $('.stu_author').val();
    d.stu_cons = $('.stu_cons').val();
    d.stu_deg = $('.stu_deg').val();
    d.stu_class = $('.stu_class').val();
    d.stu_gender = $('.stu_gender').val();
    d.stu_intro = $('.stu_intro').val();
    d.stu_major = $('.stu_major').val();
    d.stu_money = parseInt($('.stu_money').val());
    d.stu_totalMoney = parseInt($('.stu_totalMoney').val());
    d.stu_name = $('.stu_name').val();
    d.stu_phone = $('.stu_phone').val();
    d.stu_qq = $('.stu_qq').val();
    d.stu_school = $('.stu_school').val();
    d.stu_second = $('.stu_second').val();
    d.stu_source = $('.stu_source').val();
    d.stu_state = $('.stu_state').val();
    d.stu_help = $('.stu_help').val();
    d.stu_assist = $('.stu_assist').val();
    d.stu_count = d.stu_help == "是" ? 0.5 : 1;
    d.stu_isAll = parseInt(d.stu_money) >= parseInt(d.stu_totalMoney) ? 1 : 0;
    if (!reg_txt.test(d.stu_name) || d.stu_name.length < 2 || d.stu_name.length > 5) {
        alert("咦~~学生姓名似乎不对");
        $('.stu_name').css('borderColor', 'red').focus();
        return;
    }
    if (!reg_money.test(d.stu_money)) {
        alert("❌ 缴费金额不对( ⊙ o ⊙ )");
        $('.stu_money').css('borderColor', 'red').focus();
        return;
    }
    if (!reg_money.test(d.stu_totalMoney)) {
        alert("❌ 业绩核算金额不对( ⊙ o ⊙ )");
        $('.stu_totalMoney').css('borderColor', 'red').focus();
        return;
    }
    if (d.stu_intro.length < 10) {
        alert("走点儿心吧，十个字都没有是几个意思");
        $('.stu_intro').css('borderColor', 'red').focus();
        return;
    }

    $.ajax({
        type: "POST",
        url: "data/add.php",
        data: d,
        success: function (data) {
            alert("老铁！稳 👍 ");
            window.location = "index.html";
        },
        error: function () {
            console.log("网络出现故障，请检查您的网络!");
        }
    });
});
/*
    *****************学员操作**************************
*/
$('.tab2>table>tbody').on('click', 'tr', function () {
    setCookie('stu_consultant', $(this).children('td:nth-child(4)').html(), 1);
    //加载学员详情
    detail($(this).attr('id').split('_')[1]);
});
$('#basic').on('click', '.close', function () {
    $('.bg').css('display', 'none');
    $('#basic').html("");
});
//修改学员信息

if (getCookie('isAdmin') != 1) {
    $('#basic .edit').hide();
}
$('#basic .edit').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var new_data = {};
    new_data.stu_id = $('#stu_id').html();
    new_data.stu_money = $('#stu_money').val();
    $.ajax({
        type: "POST",
        url: "data/edit.php",
        data: new_data,
        success: function (data) {
            $.each(JSON.parse(data), function (k, v) {
                $('#' + k).val(v);
                $('#' + k).html(v);
            });
            alert("ok");
        },
        error: function () {
            console.log("网络出现故障，请检查您的网络!");
        }
    })

});
//新增回访
$('.add').click(function () {
    $('#add_rec').show();
    $(this).hide();
});
//提交回访
$('#add_rec textarea').blur(function () {
    if ($(this).val().length < 8) {
        $(this).css('borderColor', 'red').focus();
    } else {
        $(this).css('borderColor', '#fff');
    }
});
$('.rec_submit').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    var rec_content = $('#add_rec textarea').val();
    var rec_steady = $('#add_rec .rec_steady').val();
    var rec_person = getCookie('username');
    var stu_id = getCookie('stu_id');
    var stu_consultant = getCookie('stu_consultant');
    var rec_type = "";
    //判断回访类型
    if (getCookie('dept') == "教学部") {
        rec_type = "教学回访";
    } else if (getCookie('dept') == "职发部") {
        rec_type = "职发回访";
    } else if (getCookie('posts') == "咨询顾问") {
        rec_type = "咨询回访";
    } else if (getCookie('posts') == "信审") {
        rec_type = "信审抽查";
    } else {
        rec_type = "主管抽查";
    }
    if (rec_content.length < 11) {
        alert("访谈学生怎能如此草率,10个字的反馈不过分吧？");
        $('#add_rec textarea').css('borderColor', 'red').focus();
        return;
    }
    //加载回访列表
    $.ajax({
        type: "POST",
        url: "data/add_rec.php",
        data: {
            rec_type: rec_type,
            rec_content: rec_content,
            rec_steady: rec_steady,
            rec_person: rec_person,
            stu_id: stu_id
        },
        success: function (data) {

            var html = "";
            $.each(JSON.parse(data), function (k, v) {
                html += `
                    <tr>
                        <td>创建人：
                            <span>${v['rec_person']}</span>
                        </td>
                        <td>时间：
                            <span>${v['rec_time']}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>回访类型：
                            <span>${v['rec_type']}</span>
                        </td>
                        <td>风险评级：
                            <span>${v['rec_steady']}</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">回访反馈：${v['rec_content']}</td>
                    </tr>
                    <tr><td colspan="2"><div class="border">&nbsp;<hr></div></td></tr>
                `;
            });
            $('#rec_detail').html(html);
            $('.add').show();
            $('#add_rec').hide();
        },
        error: function () {
            console.log("网络出现故障，请检查您的网络!");
        }
    })


})
/*
   **********************搜索学员******************** 
*/

$('#search button').click(function () {
    var val = $('#search input').val().replace(/\s+/g, "");
    if (val != "") {
        $.ajax({
            type: "POST",
            url: "data/search.php",
            data: {
                val: val
            },
            success: function (data) {
                var html = '';
                if (JSON.parse(data).length == 0) {
                    html = "<tr><td colspan='5' class='no'>Sorry 没有搜索到相关内容,换个关键字试试...   ^_^</td></tr>";
                } else {
                    $.each(JSON.parse(data), function (k, v) {
                        html += `
                    <tr id="stu_${v['stu_id']}">
                            <td>
                                <a href="#">${v['stu_name']}</a>
                            </td>
                            <td>${v['stu_state']}</td>
                            <td class="am-hide-sm-only">${v['stu_consultant']}</td>
                            <td>${v['stu_date']}</td>
                        </tr>
                    `;
                    });

                }
                $('.tab2 tbody').html(html);
                $('.tab2 tfoot').hide();
                $('.tab2 tbody .no').css({
                    'color': 'red',
                    'fontSize': '18px',
                    'lineHeight': '40px'
                });
            },
            error: function () {
                console.log("网络出现故障，请检查您的网络!");
            }
        })
    }
})
//退费学员
$('#back_money').click(function () {
    $.ajax({
        type: "POST",
        url: "data/back_money.php",
        data: {},
        success: function (data) {
            var html = '';
            if (JSON.parse(data).length == 0) {
                html = "<tr><td colspan='5' class='no'>恭喜！没有退费学员...   ^_^</td></tr>";
            } else {
                $.each(JSON.parse(data), function (k, v) {
                    html += `
                    <tr id="stu_${v['stu_id']}">
                            <td>
                                <a href="#">${v['stu_name']}</a>
                            </td>
                            <td>${v['stu_state']}</td>
                            <td class="am-hide-sm-only">${v['stu_consultant']}</td>
                            <td>${v['stu_date']}</td>
                        </tr>
                    `;
                });

            }
            $('.tab2 tbody').html(html);
            $('.tab2 tfoot').hide();
            $('#back_money i.back_count').html($('.tab2 tbody tr:last-child').index() + 1);
            $('.tab2 tbody .no').css({
                'color': 'red',
                'fontSize': '18px',
                'lineHeight': '40px'
            });
        },
        error: function () {
            console.log("网络出现故障，请检查您的网络!");
        }
    })
})
$('.stu_list').click(function () {
    list(1);
})

/*
    *******************员工操作************************
*/
//新增员工
$('#btn_empAdd').on('click', '.btn_empAdd', function () {
    $('.emp').css({
        "height": $(document).height(),
        "width": $(document).width(),
        'display': 'block'
    });
})
$('.add_emp button').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    var emp_name = $('#emp_name').val(); //姓名
    var emp_email = $('#emp_email').val(); //邮箱
    var emp_phone = $('#emp_phone').val(); //手机号
    var emp_dept = $('#emp_dept').val(); //所在部门
    var emp_date = $('#emp_date').val(); //入职日期
    if (emp_name == "" || emp_email == "" || emp_phone == "" || emp_date == "") {
        alert("红框所示为必填内容");
    } else {
        $.ajax({
            type: "POST",
            url: "data/add_emp.php",
            data: {
                emp_name: emp_name,
                emp_email: emp_email,
                emp_phone: emp_phone,
                emp_dept: emp_dept,
                emp_posts: $('#emp_posts').val(), //职务
                emp_admin: $("input[name='isAdmin']:checked").val(), //是否是管理员
                u_date: emp_date
            },
            success: function (data) {

                if (data == 1) {
                    alert("添加成功 ^_^");
                    $('.emp').hide();
                    emp_list();
                } else {
                    alert("添加失败");
                }
            },
            error: function () {
                console.log("网络出现故障，请检查您的网络!");
            }
        })
    }

});
$('.emp_close button').click(function () {
    $('.emp').hide();
});

//任务设置
$('#emp_list').on('click', '.btn_task', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $('.taskbox').css({
        "height": $(document).height(),
        "width": $(document).width(),
        'display': 'block'
    });
    setCookie('uid_task', $(this).parent().parent().parent().parent('tr').find('td:first').attr('class').split('_')[1]);
})
$('.task_close button').click(function () {
    $('.taskbox').hide();
});
$('#submit_task').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (Math.abs($('#task_mon').val() - (new Date).getMonth() + 1) < 1) {
        alert('Sorry！只能设置当月及次月任务');
    } else {
        $.ajax({
            type: "POST",
            url: "data/add_task.php",
            data: {
                uid: getCookie('uid_task'),
                task_mon: $('#task_mon').val(),
                emp_task: $('#emp_task').val(),
                emp_task_money: $('#emp_task_money').val()
            },
            success: function (data) {
                if (data == 1) {
                    $('.taskbox').hide();
                    emp_list();
                    alert("新增成功 ^_^");
                } else {
                    alert("更新失败");
                }
            },
            error: function () {
                alert("网络出现故障，请检查您的网络!");
            }
        })
    }

})
//设置离职
$('#emp_list').on('click', '.btn_off', function (e) {
    e.preventDefault();
    e.stopPropagation();
    let uid = $(this).parent().parent().parent().parent('tr').find('td:first').attr('class').split('_')[1];
    $('#my-confirm').modal({
        relatedTarget: this,
        onConfirm: function (options) {
            $.ajax({
                type: "POST",
                url: "data/emp_canl.php",
                data: {
                    uid: uid
                },
                success: function (data) {
                    if (data == 1) {
                        emp_list();
                        alert("操作成功 ^_^");
                    } else {
                        alert("操作失败");
                    }
                },
                error: function () {
                    console.log("网络出现故障，请检查您的网络!");
                }
            })
        },
        onCancel: function () {}
    });
})
$('.tab5').html("欢迎来到" + getCookie('username') + "的个人中心");
$.get('data/cons_list.php', function (data) {

    var cons_list = JSON.parse(data).cons_list;
    let html = "";
    for (let i = 0; i < cons_list.length; i++) {
        html += `
                    <tr>
                        <td class="cons_">${cons_list[i].uname}</td>
                        <td class="info_${cons_list[i].uid}">0</td>
                        <td class="visit_${cons_list[i].uid}">0</td>
                        <td class="site_${cons_list[i].uid} site_${cons_list[i].uname}">0</td>
                        <td class="tasks_${cons_list[i].uid}">0</td>
                        <td class="count_all_${cons_list[i].uid} count_all_${cons_list[i].uname}">0</td>
                        <td class="tasks_money_${cons_list[i].uid}">0</td>
                        <td class="total_${cons_list[i].uid} total_${cons_list[i].uname}">0</td>
                        <td class="change_${cons_list[i].uid}">0</td>
                    </tr>
                `;
    }
    $('#tableSort tbody').html(html);

    var emps_tasks = JSON.parse(data).emps_task;
    $.each(emps_tasks, function (k, v) {
        $('td.tasks_' + v['uid']).html(v['emp_task']);
        $('td.tasks_money_' + v['uid']).html(v['emp_task_money']);
    });
    var cons_info = JSON.parse(data).cons_info;
    let arv_info = 0;
    let arv_visit = 0;
    var hash_visit = [];
    var hash_info = [];
    $.each(cons_info, function (k, v) {
        if (hash_visit[v['uid']] == undefined) {
            hash_visit[v['uid']] = parseInt(v['visit']);
        } else {
            hash_visit[v['uid']] += parseInt(v['visit']);
        }
        if (hash_info[v['uid']] == undefined) {
            hash_info[v['uid']] = parseInt(v['info']);
        } else {
            hash_info[v['uid']] += parseInt(v['info']);
        }
        arv_info += parseInt(v['info']);
        arv_visit += parseInt(v['visit']);
    });
    for (let i in hash_visit) {
        $('td.visit_' + i).html(hash_visit[i]);
    }
    for (let i in hash_info) {
        $('td.info_' + i).html(hash_info[i]);
    }
    var stu_moneydata = JSON.parse(data).stu_money;

    // $.each(stu_moneydata, function (k, v) {
    //     if (parseInt(v['stu_money']) > 0 && parseInt(v['stu_money'])< parseInt(v['stu_totalMoney'])){
    //         if (v['isHelp'] == "否") {
    //             $('.site_' + v['stu_consultant']).html(parseInt($('.site_' + v['stu_consultant']).html()) + 1);
    //         }else{
    //             $('.site_' + v['stu_consultant']).html(parseInt($('.site_' + v['stu_consultant']).html()) + 0.5);
    //             let newKey= parseInt($('.site_' + v['assist']).html()) +0.5 ;

    //             $('.site_' + v['assist']).html(newKey);
    //             console.log($('.site_' + v['assist']));
    //         }
    //     }else{
    //         $('.total_' + v['stu_consultant']).html(parseInt($('.total_' + v['stu_consultant']).html()) + parseInt(v['stu_money']));
    //         if (v['isHelp'] == "否") {
    //             $('.count_all_' + v['stu_consultant']).html(parseInt($('.count_all_' + v['stu_consultant']).html()) + 1);
    //         } else {
    //             $('.count_all_' + v['stu_consultant']).html(parseInt($('.count_all_' + v['stu_consultant']).html()) + 0.5);

    //             $('.count_all_' + v['assist']).html(parseInt($('.count_all_' + v['assist']).html()) + 0.5);
    //         }
    //     }
    // });
    hash_site = [];
    $.each(stu_moneydata, function (k, v) {
        if (parseInt(v['stu_money']) > 0 && parseInt(v['stu_money']) < parseInt(v['stu_totalMoney']) && v['assist'] == "") {
            $('.site_' + v['stu_consultant']).html(parseInt($('.site_' + v['stu_consultant']).html()) + 1);

        } else if (parseInt(v['stu_money']) >= parseInt(v['stu_totalMoney']) && v['assist'] == "") {
            $('.count_all_' + v['stu_consultant']).html(parseInt($('.count_all_' + v['stu_consultant']).html()) + 1);
            $('.total_' + v['stu_consultant']).html(parseInt($('.total_' + v['stu_consultant']).html()) + parseInt(v['stu_money']));
        } else if (parseInt(v['stu_money']) >= parseInt(v['stu_totalMoney']) && v['assist'] != "") {
            $('.count_all_' + v['assist']).html(parseInt($('.count_all_' + v['assist']).html()) + 0.5);
            $('.total_' + v['stu_consultant']).html(parseInt($('.total_' + v['stu_consultant']).html()) + parseInt(v['stu_money']) / 2);
            $('.count_all_' + v['stu_consultant']).html(parseInt($('.count_all_' + v['stu_consultant']).html()) + 0.5);
        } else if (parseInt(v['stu_money']) > 0 && parseInt(v['stu_money']) < parseInt(v['stu_totalMoney']) && v['assist'] != "") {
            $('.site_' + v['stu_consultant']).html(parseInt($('.site_' + v['stu_consultant']).html()) + 0.5);
            if (hash_site[v['assist']] == undefined) {
                hash_site[v['assist']] = 0.5
            } else {
                hash_site[v['assist']] = 0.5;
            }
        }

    });
    for (let i in hash_site) {
        $('.site_' + i).html(parseInt($('.site_' + i).html()) + hash_site[i]);
    }

    let length = $('#tableSort>tbody').children('tr').length;
    var arv_task = 0;
    let arv_site = 0;
    let arv_all = 0;
    let arv_task_money = 0;
    let arv_money = 0;
    let arv_change = 0;
    for (let i = 0; i < length; i++) {
        let info = $($('#tableSort>tbody').children('tr')[i]).find('td:nth-child(2)').html();
        let count = $($('#tableSort>tbody').children('tr')[i]).find('td:nth-child(6)').html();
        arv_site += parseInt($($('#tableSort>tbody').children('tr')[i]).find('td:nth-child(4)').html());
        arv_task += parseInt($($('#tableSort>tbody').children('tr')[i]).find('td:nth-child(5)').html());
        arv_all += parseInt($($('#tableSort>tbody').children('tr')[i]).find('td:nth-child(6)').html());
        arv_task_money += parseInt($($('#tableSort>tbody').children('tr')[i]).find('td:nth-child(7)').html());
        arv_money += parseInt($($('#tableSort>tbody').children('tr')[i]).find('td:nth-child(8)').html());
        if (info == 0) {
            $($('#tableSort>tbody').children('tr')[i]).find('td:nth-child(9)').html("0%")
        } else {
            $($('#tableSort>tbody').children('tr')[i]).find('td:nth-child(9)').html((count / info).toFixed(4) * 100 + '%');
        }

        arv_change += parseInt($($('#tableSort>tbody').children('tr')[i]).find('td:nth-child(9)').html());
    }
    var arv = `
                <tr class="tr_arv">
                    <td>总数/平均</td>
                    <td>${arv_info}</td>
                    <td>${arv_visit}</td>
                    <td>${arv_site}</td>
                    <td>${arv_task}</td>
                    <td>${arv_all}</td>
                    <td>${arv_task_money}</td>
                    <td>${arv_money}</td>
                    <td>${(arv_change / length).toFixed(2)}%</td>
                </tr>
            `;
    $('#tableSort>tbody').append(arv);
    $('.total_goals').html(arv_task_money);
    $('.haveDone').html(arv_money);
    var tableObject = $('#tableSort');
    var tbHead = tableObject.children('thead');
    var tbHeadTh = tbHead.find('tr th');
    var tbBody = tableObject.children('tbody');
    var tbBodyTr = tbBody.find('tr:not(.tr_arv)');

    var sortIndex = -1;

    tbHeadTh.each(function () {
        var thisIndex = tbHeadTh.index($(this));
        $(this).click(function () {
            var dataType = $(this).attr("type");
            checkColumnValue(thisIndex, dataType);
        });
    });

    function checkColumnValue(index, type) {
        var trsValue = new Array();
        tbBodyTr.each(function () {
            var tds = $(this).find('td');
            trsValue.push(type + ".separator" + $(tds[index]).html() + ".separator" + $(this).html());
            $(this).html("");
        });
        var len = trsValue.length;
        if (index == sortIndex) {
            trsValue.reverse();
        } else {
            for (var i = 0; i < len; i++) {
                type = trsValue[i].split(".separator")[0];
                for (var j = i + 1; j < len; j++) {
                    value1 = trsValue[i].split(".separator")[1];
                    value2 = trsValue[j].split(".separator")[1];
                    if (type == "number") {
                        value1 = value1 == "" ? 0 : value1;
                        value2 = value2 == "" ? 0 : value2;
                        if (parseFloat(value1) > parseFloat(value2)) {
                            var temp = trsValue[j];
                            trsValue[j] = trsValue[i];
                            trsValue[i] = temp;
                        }
                    } else {
                        if (value1.localeCompare(value2) > 0) {
                            var temp = trsValue[j];
                            trsValue[j] = trsValue[i];
                            trsValue[i] = temp;
                        }
                    }
                }
            }
        }
        for (var i = 0; i < len; i++) {
            $("tbody tr:eq(" + i + ")").html(trsValue[i].split(".separator")[2]);
        }
        sortIndex = index;
    }
});
//销售日报信息录入
$(function () {
    $.get('data/cons_setInfo_list.php', function (data) {
        let list = JSON.parse(data);
        let cons_id_list = [];
        let html = '';
        $.each(list, function (k, v) {
            cons_id_list.push(v['uid']);
            setCookie('cons_uid', list);
            html += `
                <tr>
                    <td>${v['uid']}</td>
                    <td>${v['uname']}</td>
                    <td>
                        <input type="text" class="info_${v['uid']}">
                    </td>
                    <td>
                        <input type="text" class="visit_${v['uid']}">
                    </td>
                </tr>
            `;
        })
        setCookie('cons_id_list', cons_id_list);
        html += `
            <tr>
                <td></td><td></td>
                <td colspan="2">
                    <button class="am-btn-block" id="btn_setInfo">确认添加</button>
                </td>
            </tr>
        `
        $('.setInfo tbody').append(html);
    })
    $('.setInfo').on('click', '#btn_setInfo', function (e) {
        e.preventDefault();
        e.stopPropagation();
        let d = [];
        let cons_id_list = getCookie('cons_id_list').split(",");
        for (let i = 0; i < cons_id_list.length; i++) {
            let arr = {};
            arr.uid = parseInt(cons_id_list[i]);
            arr.visit = $('input.visit_' + parseInt(cons_id_list[i])).val();
            arr.info = $('input.info_' + parseInt(cons_id_list[i])).val();
            d.push(arr);
        }
        if (getCookie('posts') == "咨询助理") {
            $.ajax({
                type: "POST",
                url: "data/add_cons_info.php",
                data: {
                    data: d,
                    info_time: $('.datepicker').val()
                },
                success: function (data) {
                    alert("添加成功");
                },
                error: function () {
                    console.log("网络出现故障，请检查您的网络!");
                }
            })
        } else {
            alert("不该点的不要乱点🙄");
        }

    })
})