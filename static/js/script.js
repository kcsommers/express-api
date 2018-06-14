$(document).ready(function() {
	$('form').on('submit', function(e) {
		e.preventDefault();
		var newData = $(this).serialize();
		var url = $(this).attr('action');
		$.ajax({
			method: 'PUT', 
			url: url,
			data: newData
		}).done(function(data) {
			window.location = '/songs';
		});
	});	

	$('a').on('click', function(e) {
		e.preventDefault();
		var url = $(this).attr('href');
		$.ajax({
			method: 'DELETE',
			url: url
		}).done(function(data) {
			window.location = '/songs';
		});
	});
});