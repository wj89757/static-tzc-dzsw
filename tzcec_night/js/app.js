/*
 * @Author: Administrator
 * @Date:   2016-08-04 12:44:53
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-08-04 14:15:16
 */

'use strict';
$(document).ready(function() {

	var stars = 800;
	var $stars = $('.stars');
	var r = 800;
	
	for (var i = 0; i < stars; i++) {
		
		var $star = $('<div/>').addClass('star');
		$stars.append($star);
	}
	
	$('.star').each(function() {
		var cur = $(this);
		var s = 0.2 + Math.random() * 1;
		var curR = r + Math.random() * 300;
		cur.css({
			transformOrigin: '0 0 ' + curR + 'px',
			transform: ' translate3d(0,0,-' + curR + 'px) rotateY(' + Math.random() * 360 + 'deg) rotateX(' + Math.random() * -50 + 'deg) scale(' + s + ',' + s + ')'
		});
	});
});