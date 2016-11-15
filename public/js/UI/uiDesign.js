$(document).ready(function(){
	$('header > ul > li').hover(function(){
		$(this).children('ul').toggle();
	});
});