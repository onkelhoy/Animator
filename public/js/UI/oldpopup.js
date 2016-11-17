function showPopup(klass, hide) {
	$('#popup-container').show().children('div').children('.'+klass).show();
}

function hidePopup() {
	$('#popup-container').hide();
}
window.onresize = function() {
	$('#popup-container').height($(document).height());
}
$(document).ready(function(){

	$('#file').on('change', function(){
		var files = $(this).prop('files');

		if(files.length == 1)
			$('#file + label > span').text("1 BILD");
		else if (files.length > 1) 
			$('#file + label > span').text(files.length + " BILDER");
		else $('#file + label > span').text("BILDER");
	});


	$('#popup-container').height($(document).height());
	$('#popup-container').click(function(e){
		if(!$(this).children().is(e.target)  && $(this).has(e.target).length === 0) {
			$(this).hide();
		}
	});

});