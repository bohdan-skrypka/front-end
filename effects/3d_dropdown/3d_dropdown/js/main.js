$(function() {
	var allOptions = $('ul');
	$('input').click(function() {
		allOptions.removeClass('visible'); //When input clicked, first remove visible from all dropdowns
		$(this).parent().find('ul').addClass('visible');
	});
	$('li').click(function() {
		$(this).parent().parent().prev().val($(this).text());
		$(this).parent().removeClass('visible');
	});
})
