$(document).ready(function(){
	//slide speed
	var speed = 500;
	var autoslide  = true;
	//autoslide speed
	var autoslide_speed = 4000;
	
	//hiding all slide except the first one
	$('.slide').hide();
	$('.slide').first().addClass('active');
	$('.active').show();
	
	//next slide handler
	$('#next').on('click',nextSlide);
	//previous slide handler
	$('#prev').on('click',prevSlide);
	
	
	//autoslide handler
	if(autoslide == true){
		setInterval(nextSlide,autoslide_speed);
	}
	
	
	//next slide function
	function nextSlide(){
		
		$('.active').addClass('oldActive').removeClass('active');	
		if($('.oldActive').is(':last-child')){
			$('.slide').first().addClass('active');
		}
		else{
			$('.oldActive').next().addClass('active');
		}
		$('.oldActive').removeClass('oldActive');
		$('.slide').fadeOut(speed);
		$('.active').fadeIn(speed);
		
	}
	
	//previous slide function
	function prevSlide(){
		$('.active').addClass('oldActive').removeClass('active');	
		if($('.oldActive').is(':first-child')){
			$('.slide').last().addClass('active');
		}
		else{
			$('.oldActive').prev().addClass('active');
		}
		$('.oldActive').removeClass('oldActive');
		$('.slide').fadeOut(speed);
		$('.active').fadeIn(speed);
	}
	
}
);