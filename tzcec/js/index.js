/*
 * @Author: Administrator
 * @Date:   2016-07-15 07:35:02
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-07-29 17:25:06
 */

'use strict';
$(function() {
	$('#search_button').button({
		icons: {
			primary: 'ui-icon-search',
		},
	});

	$('#question_button').button({
		icons: {
			primary: 'ui-icon-lightbulb',
		},
	}).click(function(){
		if($.cookie('user')){
			$('#question').dialog('open');
		}else{
			$('#error').dialog('open');
			setTimeout(function(){
				$('#error').dialog('close');
				$('#login').dialog('open');
			},1000);
		}
	});

	$.ajax({
		url : 'show_content.php',
		type : 'POST',
		success : function(response,status,xhr){
			// alert(response);
			var json = $.parseJSON(response);
			var html = '';
			var arr = [];
			var summary = [];
			$.each(json,function(index,value){
				// alert(value+''+title);
				html += '<h4>' + value.user + ' 发表于 ' + value.date + '</h4><h3>' + value.title + '</h3><div class="editor">' + value.content + '</div><div class="bottom"><span class="comment" data-id="' + value.id + '">' + value.count + '条评论</span> <span class="up">收起</span></div><hr noshade="noshade" size="1" /><div class="comment_list"></div>';
			});
			$('.content').append(html);
				

			$.each($('.editor'), function (index, value) {
				arr[index] = $(value).html();
				summary[index] = arr[index].substr(0, 200);
				
				if (summary[index].substring(199,200) == '<') {
					summary[index] = replacePos(summary[index], 200, '');
				}
				if (summary[index].substring(198,200) == '</') {
					summary[index] = replacePos(summary[index], 199, '');
				}
				
				if (arr[index].length > 200) {
					summary[index] += '...<span class="down">显示全部</span>';
					$(value).html(summary[index]);
				}
				$('.bottom .up').hide();
			});
			
			$.each($('.editor'), function (index, value) {
				$(this).on('click', '.down', function () {
					$('.editor').eq(index).html(arr[index]);
					$(this).hide();
					$('.bottom .up').eq(index).show();
				});
			});
			
			$.each($('.bottom'), function (index, value) {
				$(this).on('click', '.up', function () {
					$('.editor').eq(index).html(summary[index]);
					$(this).hide();
					$('.editor .down').eq(index).show();
				});
			});
			$.each($('.bottom'), function (index, value) {
				$(this).on('click', '.comment', function () {
					var comment_this = this;
					if ($.cookie('user')) {
						if (!$('.comment_list').eq(index).has('form').length) {
							$.ajax({
								url : 'show_comment.php',
								type : 'POST',
								data : {
									titleid : $(comment_this).attr('data-id'),
								},
								beforeSend : function (jqXHR, settings) {
									$('.comment_list').eq(index).append('<dl class="comment_load"><dd>正在加载评论</dd></dl>');
								},
								success : function (response, status) {
									$('.comment_list').eq(index).find('.comment_load').hide();
									var json_comment = $.parseJSON(response);
									var count = 0;
									$.each(json_comment, function (index2, value) {
										count = value.count;
										$('.comment_list').eq(index).append('<dl class="comment_content"><dt>' + value.user + '</dt><dd>' + value.comment + '</dd><dd class="date">' + value.date + '</dd></dl>');
									});
									$('.comment_list').eq(index).append('<dl><dd><span class="load_more">加载更多评论</span></dd></dl>');
									var page = 2;
									if (page > count) {
										$('.comment_list').eq(index).find('.load_more').off('click');
										$('.comment_list').eq(index).find('.load_more').hide();
									}
									$('.comment_list').eq(index).find('.load_more').button().on('click', function () {
										$('.comment_list').eq(index).find('.load_more').button('disable');
										$.ajax({
											url : 'show_comment.php',
											type : 'POST',
											data : {
												titleid : $(comment_this).attr('data-id'),
												page : page,
											},
											beforeSend : function (jqXHR, settings) {
												$('.comment_list').eq(index).find('.load_more').html('<img src="img/more_load.gif" />');
											},
											success : function (response, status) {
												var json_comment_more = $.parseJSON(response);
												$.each(json_comment_more, function (index3, value) {
													$('.comment_list').eq(index).find('.comment_content').last().after('<dl class="comment_content"><dt>' + value.user + '</dt><dd>' + value.comment + '</dd><dd class="date">' + value.date + '</dd></dl>');
												});
												$('.comment_list').eq(index).find('.load_more').button('enable');
												$('.comment_list').eq(index).find('.load_more').html('加载更多评论');
												page++;
												if (page > count) {
													$('.comment_list').eq(index).find('.load_more').off('click');
													$('.comment_list').eq(index).find('.load_more').hide();
												}
											}
										});
									});
									$('.comment_list').eq(index).append('<form><dl class="comment_add"><dt><textarea name="comment"></textarea></dt><dd><input type="hidden" name="titleid" value="' + $(comment_this).attr('data-id') + '" /><input type="hidden" name="user" value="' + $.cookie('user') + '" /><input type="button" value="发表" /></dd></dl></form>');
									$('.comment_list').eq(index).find('input[type=button]').button().click(function () {
										var _this = this;
										$('.comment_list').eq(index).find('form').ajaxSubmit({
											url : 'add_comment.php',
											type : 'POST',
											beforeSubmit : function (formData, jqForm, options) {
												$('#loading').dialog('open');
												$(_this).button('disable');
											},
											success : function (responseText, statusText) {
												if (responseText) {
													$(_this).button('enable');
													$('#loading').css('background', 'url(img/success.gif) no-repeat 20px center').html('数据新增成功...');
													setTimeout(function () {
														var date = new Date();
														$('#loading').dialog('close');
														$('.comment_list').eq(index).prepend('<dl class="comment_content"><dt>' + $.cookie('user')+ '</dt><dd>' + $('.comment_list').eq(index).find('textarea').val() + '</dd><dd>' +date.getFullYear() + '-' + (date.getMonth()+ 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' +date.getMinutes() + ':' + date.getSeconds() + '</dd></dl>');
														$('.comment_list').eq(index).find('form').resetForm();
														$('#loading').css('background', 'url(img/loading.gif) no-repeat 20px center').html('数据交互中...');
													}, 1000);
												}
											},
										});
									});
								},
							});
						}
						if ($('.comment_list').eq(index).is(':hidden')) {
							$('.comment_list').eq(index).show();
							
						} else {
							$('.comment_list').eq(index).hide();
						}
					} else {
						$('#error').dialog('open');
						setTimeout(function () {
							$('#error').dialog('close');
							$('#login').dialog('open');
						}, 1000);
					}
				});
			});
			
		},
	});

	$('#question').dialog({
		autoOpen: false,
		modal: true,
		title: '提问',
		width: 500,
		height: 360,
		resizable: false,
		buttons: {
			'发布': function() {
				$(this).ajaxSubmit({
					url : 'add_content.php',
					type : 'POST',
					data : {
						user : $.cookie('user'),
						content : $('.uEditorIframe').contents().find('#iframeBody').html(),
					},
					beforeSubmit: function(formData, jqForm, options) {
						$('#loading').dialog('open');
						$('#question').dialog('widget').find('button').eq(1).button('disable');
					},
					success: function(responseText, statusText) {
						if (responseText) {
							$('#question').dialog('widget').find('button').eq(1).button('enable');
							$('#loading').css('background', 'url(img/success.gif) no-repeat 20px center').html('数据新增成功...');
							setTimeout(function() {
								$('#loading').dialog('close');
								$('#question').dialog('close');
								$('#question').resetForm();
								$('.uEditorIframe').contents().find('#iframeBody').html('请输入问题描述！'),
								$('#loading').css('background', 'url(img/loading.gif) no-repeat 20px center').html('数据交互中...');
							}, 1000);
						}
					},
				});
			},
		},
		show: true,
		hide: true, //淡出
		closeText: '关闭',
	});

	$('.uEditorCustom').uEditor();

	$('#error').dialog({
		autoOpen: false,
		modal: true,
		closeOnEscape: false,
		resizable: false,
		draggable: false,
		width: 180,
		height: 50,
	}).parent().find('.ui-widget-header').hide();

	$('#reg_a').click(function() {
		$('#reg').dialog('open');
	});

	$('#member,#logout').hide();

	if($.cookie('user')){
		$('#member,#logout').show();
		$('#reg_a,#login_a').hide();
		$('#member').html($.cookie('user'));
	}else{
		$('#member,#logout').hide();
		$('#reg_a,#login_a').show();
	}
	$('#logout').click(function(){
		$.removeCookie('user');
		window.location.href = '/jQueryProject'
	});

	$('#loading').dialog({
		autoOpen: false,
		modal: true,
		closeOnEscape: false,
		resizable: false,
		draggable: false,
		width: 180,
		height: 50,
	}).parent().find('.ui-widget-header').hide();


	$('#reg').dialog({
		autoOpen: false,
		modal: true,
		title: '知问前端用户注册',
		width: 320,
		height: 340,
		resizable: false,
		buttons: {
			'提交': function() {
				$(this).submit();
			},
			'取消': function() {
				$(this).dialog('close');
			}
		},
		show: true,
		hide: true, //淡出
		closeText: '关闭',
	}).buttonset().validate({
		submitHandler: function(form) {
			// alert('验证成功，准备提交中...');
			$(form).ajaxSubmit({
				url: 'add.php',
				type: 'POST',
				beforeSubmit: function(formData, jqForm, options) {
					$('#loading').dialog('open');
					// alert($('#reg').dialog());
					$('#reg').dialog('widget').find('button').eq(1).button('disable');
				},
				success: function(responseText, statusText) {
					if (responseText) {
						$('#reg').dialog('widget').find('button').eq(1).button('enable');
						$('#loading').css('background', 'url(img/success.gif) no-repeat 20px center').html('数据新增成功...');
						$.cookie('user',$('#user').val());
						setTimeout(function() {
							$('#loading').dialog('close');
							$('#reg').dialog('close');
							$('#reg').resetForm();
							$('#reg span.star').html('*').removeClass('succ');
							$('#loading').css('background', 'url(img/loading.gif) no-repeat 20px center').html('数据交互中...');
							$('#member,#logout').show();
							$('#reg_a,#login_a').hide();
							$('#member').html($.cookie('user'));	
						}, 1000);
					}
				},
			});
		},
		showErrors: function(errorMap, errorList) {
			var errors = this.numberOfInvalids();
			if (errors > 0) {
				$('#reg').dialog('option', 'height', errors * 20 + 340);
			} else {
				$('#reg').dialog('option', 'height', 340);
			}
			this.defaultShowErrors();
		},
		highlight: function(element, errorClass) {
			$(element).css('border', '1px solid #630');
			$(element).parent().find('span').html('*		').removeClass('succ');
		},
		unhighlight: function(element, errorClass) {
			$(element).css('border', '1px solid #ccc');
			$(element).parent().find('span').html('&nbsp;').addClass('succ');
		},
		errorLabelContainer: 'ol.reg_error',
		wrapper: 'li',
		rules: {
			user: {
				required: true,
				minlength: 2,
				remote : {
					url : 'is_user.php',
					type : 'POST',
				}
			},
			pass: {
				required: true,
				minlength: 6,
			},
			email: {
				required: true,
				email: true,
			},
			date: {
				date: true,
			},
		},
		messages: {
			user: {
				required: '账号不得为空！',
				minlength: '账号不得小于{0}位！',
				remote: '账号被占用！',
			},
			pass: {
				required: '密码不得为空！',
				minlength: '密码不得小于{0}位！',
			},
			email: {
				required: '邮箱不得为空！',
				email: '请输入正确的邮箱地址！',
			},
			date: {
				required: '日期不得为空！',
			},
		},
	});

	$('#date').datepicker({
		changeMonth: true,
		changeYear: true,
		yearSuffix: '',
		maxDate: 0,
		yearRange: '1950:2020',
	});

	$('#email').autocomplete({
		delay: 0,
		autoFocus: true,
		source: function(request, response) {
			var hosts = ['qq.com', '163.com', '126.com', '263.com', 'sina.com.cn', 'gmail.com', 'foxmail.com', 'hotmail.com'],
				term = request.term,
				name = term,
				host = '',
				ix = term.indexOf('@'),
				result = [];
			result.push(term);
			if (ix > -1) {
				name = term.slice(0, ix);
				host = term.slice(ix + 1);
			}
			if (name) {
				var findedHosts = (host ? $.grep(hosts, function(value, index) {
						return value.indexOf(host) > -1;
					}) : hosts),
					findedResult = $.map(findedHosts, function(value, index) {
						return name + '@' + value;
					});
				result = result.concat(findedResult);
			}
			response(result);
		},
	});

	$('#login_a').click(function() {
		$('#login').dialog('open');
	});

	$('#login').dialog({
		autoOpen: false,
		modal: true,
		title: '知问前端用户登录',
		width: 320,
		height: 240,
		resizable: false,
		buttons: {
			'登录': function() {
				$(this).submit();
			},
		},
		show: true,
		hide: true, //淡出
		closeText: '关闭',
	}).validate({
		submitHandler: function(form) {
			// alert('验证成功，准备提交中...');
			$(form).ajaxSubmit({
				url: 'login.php',
				type: 'POST',
				beforeSubmit: function(formData, jqForm, options) {
					$('#loading').dialog('open');
					// alert($('#reg').dialog());
					$('#login').dialog('widget').find('button').eq(1).button('disable');
				},
				success: function(responseText, statusText) {
					if (responseText) {
						$('#login').dialog('widget').find('button').eq(1).button('enable');
						$('#loading').css('background', 'url(img/success.gif) no-repeat 20px center').html('登录成功...');
						
						if($('#expires').is(':checked')){
							$.cookie('user',$('#login_user').val(),{
								expires : 7,
							});
						}else{
							$.cookie('user',$('#login_user').val());	
						}
						setTimeout(function() {
							$('#loading').dialog('close');
							$('#login').dialog('close');
							$('#login').resetForm();
							$('#login span.star').html('*').removeClass('succ');
							$('#loading').css('background', 'url(img/loading.gif) no-repeat 20px center').html('数据交互中...');
							$('#member,#logout').show();
							$('#reg_a,#login_a').hide();
							$('#member').html($.cookie('user'));	
						}, 1000);
					}
				},
			});
		},
		showErrors: function(errorMap, errorList) {
			var errors = this.numberOfInvalids();
			if (errors > 0) {
				$('#login').dialog('option', 'height', errors * 20 + 240);
			} else {
				$('#login').dialog('option', 'height', 240);
			}
			this.defaultShowErrors();
		},
		highlight: function(element, errorClass) {
			$(element).css('border', '1px solid #630');
			$(element).parent().find('span').html('*').removeClass('succ');
		},
		unhighlight: function(element, errorClass) {
			$(element).css('border', '1px solid #ccc');
			$(element).parent().find('span').html('&nbsp;').addClass('succ');
		},
		errorLabelContainer: 'ol.login_error',
		wrapper: 'li',
		rules: {
			login_user: {
				required: true,
				minlength: 2,
			},
			login_pass: {
				required: true,
				minlength: 6,
				remote : {
					url : 'login.php',
					type : 'POST',
					data : {
						login_user : function(){
							return $('#login_user').val();
						},
					},
				}
			},
		},
		messages: {
			login_user: {
				required: '账号不得为空！',
				minlength: '账号不得小于{0}位！',
			},
			login_pass: {
				required: '密码不得为空！',
				minlength: '密码不得小于{0}位！',
				remote: '账号或密码不正确！',
			},
		},
	});

	$('#tabs').tabs({

	});

	$('#accordion').accordion({

	});
});



function replacePos(strObj, pos, replaceText) {
	return strObj.substr(0, pos-1) + replaceText + strObj.substring(pos, strObj.length);
}

