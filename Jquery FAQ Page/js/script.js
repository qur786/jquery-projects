var action = 'click';
var speed = 400;

$('document').ready(function(){
	//question handler
	$('li.q').on(action,function(){
		// selecting the next sibling of li.q which is li.a
		$(this).next()
			// toggling slide up and down
			.slideToggle(speed)
				//selecting all siblings 
				.siblings('li.a')
					// slide up
					.slideUp();
		// selecting the child icon of the selected li.q			
		var icon = $(this).children('i');
		// removing rotate class from all the i except the curren one
		$('i').not(icon).removeClass('rotate');
		//putting rotate class on the current icon
		$(icon).toggleClass('rotate');
	});
	
});