/*
 * @Author: Administrator
 * @Date:   2016-07-15 07:35:02
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-07-16 15:50:03
 */

'use strict';
// 1、index.html_js
/*
 *	$(function(){
 *	$('input').click(function(){
 *		alert('第一个jQuery程序');
 *	});
 *	});
 */



// 2、fundamental_core.html_js
/*
 *	$(function(){//执行一个页面函数
 *	$('#box').css('color','red');//页面元素的选择
 *	});
 */
// 出于$本身就是jquery的缩写形式
/*
 *	jQuery(function(){//执行一个页面函数
 *	jQuery('#box').css('color','red');//页面元素的选择
 *	});
 */
// alert($===jQuery);//相等，恒等
/*$(function(){
	alert($);			//jQuery对象的内部
	alert($());			//返回的jQuery对象
	alert($('#box'));	//返回的也是jQuery对象
	// alert($('#box').css('color','red'));//还是jQuery对象
	$('#box').css('color','red').css('font-size','20px');//还是jQuery对象
});*/
// $('#box').css('color','red').css('font-size','20px');//还是jQuery对象
/*window.onload = function(){
	alert(1);
};
window.onload = function(){
	alert(2);
};
// 最终结果打印出2，因为被覆盖掉了*/
/*
$(document).ready(function(){
	alert(1);
});
$(document).ready(function(){
	alert(2);
});
// 可以执行多次，第N次都不会被覆盖*/
// $(function(){
// alert($('#box'));	//jQue对象
// alert(document.getElementById('box'));//原生DOM对象

// alert($('#box').get(0)); //class可能多个
// alert($(document.getElementById('box')).css('color','red'));//原生DOM对象转换为jQuery对象
// });

// jQuery库在base库之前引用，那么$所有权就是base库的



// 3、selectnormal.html
// 常规选择器
// jQuery最核心的组成部分就是：选择器引擎，它继承了
// CSS的语法，可以对DOM元素的标签名，属性名，状态等
// 进行快速准确的选择，
// 在使用jQuery选择器的时候，我们首先必须使用"$()"
// 函数来包装我们的CSS规则，而CSS规则作为参数传递到
// jQuery对象内部吼，再返回包含页面中对应元素的jQuery
// 对象，随后，我们就可以对这个获取到的DOM节点进行行为操作
/*
$(function(){
	$('div').css('color','orange');//所有的div
	$('#box').css('color','blue');//添加行为,这个行为是添加样式
	$('.pox').css('color','red');//所有class为pox的
});
*/
// 如果id全是box?就选择了第一个，变成了红颜色
// id出现多次是不能的
/*<div id="box">
	常规选择器
</div>
<div id="box">
	常规选择器
</div>
<div id="box">
	常规选择器
</div>*/
/*
$(function(){
	alert($('#box').size());//1
	alert($('.pox').size());//2
	$('div').eq(1).css('color','red');
	alert($('#box').length);//1，属性不用加()
});
*/
/*#box > p{
	color:red;//只有前三个
}*/
// jQuery兼容ie6，兼容性非常好
/*$(function(){
	$('#box > p').css('color','red');
});*/
/*$(function(){
	$('#pox').css('color','red');//但是没有box这个id的div
	if(document.getElementById('pox')){
		document.getElementById('pox').style.color = 'red';//console会报错
	}
	// 很多情况下有动态DOM生成的问题，会导致执行不存在的ID选择器
	alert($('#box').size());//1
	alert($('#pox').size());//0
	if($('#pox').size()>0){
		$('#pox').css('color','red');
	}
	// 加个判断
	if($('#box').get(0)){
		...
	}
	alert($('#box')[0]);
	if($('#box')[0]){
		...dom节点的判断
	}
});
*/



// 4、selectednext.html
// 进阶选择器
/*$(function(){
	// $('div,p,strong').css('color','red');//群组选择器，多种加红
	// $('#box,.pox,strong').css('color','blue');
	// ——————————————
	// 相同的样式进行合并
	/*ul a{
	color:green;
	}
	// $('ul li a').css('color','green');//后代选择器
	// ——————————————
	// $('*').css('color','orange');//统配选择器
	// alert($('*').size());//18
	// alert($('*')[0].nodeName);//HTML
	// 真正需要的不多，造成极大的浪费，
	// 在全局范围使用*，会极大地消耗资源，
	// 所以不建议在全局使用
	// ——————————————
	// $('ul li *').css('color','red');//混合使用选择器
	// ——————————————
	// <div class="box">div</div>
 	// <p class="box">p</p>
 	// <div>div</div>
 	// <p>p</p>
 	// 第一个div加红
 	// ——————————————
 	// $('div .box').css('color','red');//限定元素标签
 	// <div class="box pox">div</div>
 	// <p class="box">p</p>
 	// <div class="box">div</div>
 	// <p class="pox">p</p>
 	// $('.box.pox').css('color','red');//不能有空格
 	// $('.box,.pox').css('color','red');//有区别
 	// 选择器越复杂，那么字符串解析越慢
});*/



// 05_selectedtop.html
// 高级选择器
// $(function(){
// $('#box p').css('color','red');//所有都变红
// find方法
// $('#box').find('p').css('color','blue');//与上面等价
// 以下3个选择器IE6不支持,该方法的css，jquery可以哦
// ···子选择器，只能选择到儿子
// $('#box > p').css('color','orange');
// children方法
// $('#box').children('p').css('color','red');//与上面等价
// ···next选择器
// <p>p</p>
// <p>p</p>
// <p>p</p>
// <div id="box">
// 	div
// </div>
// <p>p</p>
// <p>p</p>
// <p>p</p>
// $('#box+p').css('color','blue');//下一个p变蓝
// next()方法
// $('#box').next('p').css('color','blue');//与上面等价
// 如果p上面还有一个strong，就不能用了
// 往下找有p的选择器方法~
// $('#box ~ p').css('color','navy');//接下来的p全都变成海军蓝色
// nextAll方法
// $('#box').nextAll('p').css('color','red');//与上面同价
// 如果find()/next()/nextAll()和children方法中不写参数，默认为*
// 不建议使用，建议尽量不去使用
// prev,某一个节点上一个同级节点
// $('#box').prev('p').css('color','blue');
// prev,某一个节点上m个同级节点
// $('#box').prevAll('p').css('color','blue');
// 如果上下全都加红
// $('#box').prevAll('p').css('color','blue');
// $('#box').nextAll('p').css('color','blue');
//sibliings上下同级所有
// $('#box').siblings('p').css('color','blue');//与上面同理
// 同级上非指定元素选定， 遇到则停止
// nextUntil方法
// $('#box').nextUntil('p').css('color','blue');
// jQuery提供的方法都是单个选择器，对客户端脚本没有太大实用性，
// 取决于浏览器对该元素的支持效果
// });



// 06_selectedtop2.html
// 高级选择器2+属性选择器
// $(function(){
// $('#box').find('p');//最快的
// $('#box p').css('color','red');//慢5%-10%
// $('p','#box').css('color','blue');//速度比上一个快
// children就是子节点，大约慢50%
// $('#box > p');//慢70%
// $('.box p').css('color','blue');//慢77%
// $('p',$('#box')).css('color','green');//慢23%
// find>高级选择器
// <a href="#" title="num1">num1</a>
// <a href="#">num2</a>
// <a href="#">num3</a>
// <a href="#">num4</a>
// <a href="#" title="num5">num5</a>
// $('a[title]').css('color','red');//只要有title这个属性,1和5红了
// $('a[title=num1]').css('color','red');//title为num1的，1红了
// $('a[title^=num]').css('color','red');//开头为num的title，1和5红了
// $('a[title$=num]').css('color','red');//结尾为num的title，1和5红了
// <a href="#" title="num-1">num1</a>
// $('a[title|=num]').css('color','red');//具有这个属性切属性值相等，或者开头属性值匹配后面一个，num-1也会被匹配
// $('a[title!=num]').css('color','red');//只要不等于num1的，5红了
// <a href="#" title="num1 aaa bbb">num1</a>
// $('a[title~=num]').css('color','red');//num1倍选中，a也会选中
// $('a[title*=aaa]').css('color','red');//包含子串，例如numdsdasd中包含num的
// $('a[bbb=aaa][title=num]').css('color','red');//只有num5了
// });



// 07_filtercontrol.html
// 过滤选择器-过滤器-css3中的伪类
// a:hover/:not/，CSS在，IE6-IE8都不支持，jQuery都支持
// 兼容性非常好,其实就是伪类选择器
// 基本过滤器，内容过滤器，可见性过滤器，子元素过滤器
// $(function(){
// 只选取第一个元素li
// $('li:first').css('background','#ccc');
// 选区最后一个元素
// $('li:last').css('background','#ccc');
// $('#box li:last').css('background','#ccc');
// $('ul:first li:last').css('background','#ccc');
//	只要class不是red的，选择
// $('li:not(.red)').css('background','#ccc');
// 选择偶数的元素li
// $('li:even').css('background','#ccc');
// 选择奇数的元素li
// $('li:odd').css('background','#ccc');
// 获取当前指定索引的元素，选择第3个元素。0,1,2
// 负数从末尾开始计算，这时候就是1,2,3
// $('li:eq(2)').css('background','#ccc');
// $('li:eq(-2)').css('background','#ccc');
// 大于2的元素，也有负的
// $('li:gt(2)').css('background','#ccc');
// $('li:gt(-2)').css('background','#ccc');
// 小于2的元素li
// $('li:lt(2)').css('background','#ccc');
// 选择标题h1到h6
// $(':header').css('background','#ccc');
// $('div :header').css('background','#ccc');//包含加空格
// 选择当前被焦点的元素，必须是网页除湿状态
// $('input').get(0).focus();//加焦点
// $('input:focus').css('background','red');
// 专用的方法，even，odd都没有
// $('li').first().css('background','#ccc');
// $('li').last().css('background','#ccc');
// $('li').not('.red').css('background','#ccc');
// $('li').eq(3).css('background','#ccc');
// 选取含有"tzc.edu.cn"某个文本的元素
// $('div:contains("tzc.edu.cn")').css('background','#ccc');
// 选择不包含文本的,并且是不包含标签
// $('div:empty').css('background','#ccc');
// 选取class是red的元素
// $('li').not('.red').css('background','#ccc');
// $('ul:has(.red)').css('background','#ccc');//选择是第一个ul还是第二个ul，选择的是父元素
// 只要是div有子元素的
// $('div:parent').css('background','#ccc');
// $('ul').has('.red').css('background','#ccc');
// 返回父元素,有两个元素
// $('li').parent().css('background','#ccc');
// alert($('li').parent().get(0));
// parent加个s是所有的祖宗节点
// $('li').parents().css('background','#ccc');
// 遇到某一个父节点停止
// $('li').parentsUntil('body').css('background','#ccc');
// 可见性过滤器
// 选取所有不可见内容
// alert($('div:hidden').size());//一个
// 一秒钟之后显示出来
// $('div:hidden').css('background','#ccc').show(1000);
// alert($('div:visible').size());//3个

// });



// 08_filtercontrol2.html
// 过滤选择器
// 子元素过滤器
// 父元素和子元素关系来获取
// $(function(){
// first-child获取每个父元素的第一个子元素
// first获取的第一个元素的第一个子元素
// $('li:first-child').css('background','#ccc');
// last-child获取每个父元素的最后一歌子元素
// $('li:last-child').css('background','#ccc');
// only-child只获取有一个元素的父元素
// $('li:only-child').css('background','#ccc');
// 间隔开始
// $('li:nth-child(even)').css('background','#ccc');
// $('li:nth-child(odd)').css('background','#ccc');
// 索引从1开始
// $('li:nth-child(1)').css('background','#ccc');
// 四倍显示
// $('li:nth-child(4n)').css('background','#ccc');
// $('li:nth-child(4n+1 )').css('background','#ccc');
// 其他方法
// 判断某一个元素是否为指定的元素
// alert($('.red').is('li'));
// alert($('.red').is('div'));
// alert($('.red').is($('li')));
// alert($('.red').is($('li').get(2)));
// alert($('.red').is($('li').eq(2)));
// 自定义验证
// 必须找到title为列表4的
// alert($('.red').is(function(){
// return $(this);
// return $('.red');
// return $(this).attr('title') == '列表4';
// }));
// 注意：必须使用$(this)来表示要判断的元素，
// 否则，不管function里面是否返回true或者
// false都和调用的元素无关
// $('li').eq(2).hasClass('red');//red不能加red
// 第0个开始，选到第2个位置
// $('li').slice(0,2).css('background','#ccc');
// $('li').slice(2);.css('background','#ccc');//直接从第二个开始选
// 从最后第2个开始选，选到前面的
// $('li').slice(0,-2);.css('background','#ccc');//直接从第二个开始选
// end返回当前元素的前一个元素状态
// alert($('#box').find('li').get(0));//li的dom对象
// alert($('#box').find('li').end().get(0));//li的dom对象
// $('#box').next('ul').parent().css('background','#ccc');//这个时候用它就是全部变成灰色的了
// $('#box').next('ul').end().css('background','#ccc');
// 获取p下的所有文本节点和元素节点
// alert($('div:first').children().size());
// alert($('div:first').contents().size());
// $('li').filter('.red,:first,:last').css('background','#ccc');
// $('li').filter('.red,:first-child,:last-child').css('background','#ccc');
// $('li').filter(function(){
// 	return $(this).attr('class') == 'red'&&
// 	$(this).attr('title') == '列表4';
// }).css('background','#ccc');
// });

$(function() {
	$('#navbar-collapse a:odd').css('padding-left', '0').css('padding-right', '0');
	$('.carousel-inner img').css('height','400px');
});
$(function() {
	// 设置自动播放	
	$('#myCarousel').carousel({
		// 自动4秒播放
		intervar: 2000,
	});
	$(window).load(function() {
		$('.text').eq(0).css('margin-top', ($('.auto').eq(0).height() - $('.text').eq(0).height()) / 2 + 'px');
	});
	$(window).resize(function() {
		$('.text').eq(0).css('margin-top', ($('.auto').eq(0).height() - $('.text').eq(0).height()) / 2 + 'px');
	});
	$(window).load(function() {
		$('.text').eq(1).css('margin-top', ($('.auto').eq(1).height() - $('.text').eq(1).height()) / 2 + 'px');
	});
	$(window).resize(function() {
		$('.text').eq(1).css('margin-top', ($('.auto').eq(1).height() - $('.text').eq(1).height()) / 2 + 'px');
	});
});
$(function(){
	if($(window).width()<768){
		// alert(1);
		$('#navbar-collapse a:odd').css('display', 'none');
	}
});