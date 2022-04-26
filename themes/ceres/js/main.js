$(document).ready(function(){
	$('.slider-home').slick({
		dots:false,
		arrows:false,
		autoplay:true,
		draggable:false,
		fade:true,
		pauseOnHover:false,
		pauseOnFocus:false
	});
	/*
	$('.slider-model').slick({
		arrows:true,
		autoplay:true,
		slidesToShow: 2,
		slidesToScroll: 1,
		prevArrow: '<div class="slick-prev"><span>&lsaquo;</span></div>',
		nextArrow: '<div class="slick-next"><span>&rsaquo;</span></div>',
		appendArrows:$('.slick-arrows'),
		adaptiveHeight: false
	});
	*/
	$('.open-in-self').click(function(){
		onLoading(true);
		var post_id = $(this).data('id');
		openSelf(post_id);
		
	})
	
	$('.close-self').click(function(){
		closeSelf();
	})
	
	if(window.location.hash) {
		var userInsta = window.location.hash;
		
		if ($(window).width() > 768) {  		   
			onLoading(true);
			var post_id = $('a[href="'+userInsta+'"]').data('id');
			openSelf(post_id);
	   }
   }
	
	$('body').on('click', '.open-modal', function(){
		
		var post_id = $(this).data('id');
		
		$.ajax({
			type: 'POST',
			url: ajaxurl,
			data: {action: 'show_model_popup',
				post_id: post_id},
			dataType: "json",
			success: function(data){
				var modal = $('#modelModal');
				
				modal.find('.pop-name').text(data['name']);
				modal.find('.pop-coord').text(data['coordenadas']);
				
				modal.find('.pop-datos').empty();
				
				$.each(data['datos'], function( index, value){					
					modal.find('.pop-datos').append('<div class="col-4">'+value+'</div>');
				})
				
				modal.find('.pop-signo').text(data['signo']);
				
				modal.find('.pop-imagen').attr('src', data['thumb']);
				modal.find('.pop-imagen-signo').attr('src', data['signo_img']);
				
				modal.modal('show');
			},
			error: function(){ 
			}
		});
		
	})
	
	$('.slider-model-mob').each(function(){		

		$(this).slick({
			arrows:false,
			dots:true,
			autoplay:true,
			appendDots:$(this).parent().find('.slider-dots'),
		})
		
	})
	
	$('.navbar-toggler').on('click', function(){
		$('.navbar').toggleClass('collapseing');
		$('.navbar').find('.nav-content').toggleClass('collapseing');
		$(this).toggleClass('collapsed');
	});
	
	$('#search').find('input').keypress(function(e) {
		// Enter pressed?
		if(e.which == 10 || e.which == 13) {
			this.form.submit();
		}
	});
	
})

$(window).load(function(){
	if(window.location.hash) {
		var userInsta = window.location.hash;
		
		if ($(window).width() <= 767) {  		   
			var offset = $('a[href="'+userInsta+'"]').offset().top;
			$('html, body').animate({scrollTop:offset}, 500);
		}
   }
	
})

function openSelf(post_id){
	$.ajax({
	  url: ajaxurl,
	  data: {action: 'show_model_gallery', 
			post_id: post_id},
	  method: 'POST',
	  dataType: 'json',
	  success: function(data){ 

			var self = $('.self-single');
	  
			self.find('.pop-insta').text(data['ig_user']);
			self.find('.pop-insta').attr('href', data['ig_url']);
			self.find('.open-modal').attr('data-id', post_id);
			
			var slider = $('.slider-model');
			
			$.each(data['gallery'], function(index, value){
				slider.append(value);
			})
	  
			slider.slick({
				arrows:true,
				autoplay:true,
				prevArrow: '<div class="slick-prev"><span>&lsaquo;</span></div>',
				nextArrow: '<div class="slick-next"><span>&rsaquo;</span></div>',
				appendArrows:$('.slick-arrows'),
				adaptiveHeight: true
			});
			
			
			$('body').addClass('self-singled');
			onLoading(false);
			self.addClass('on');
	  },
	});
}

function closeSelf(){
	var self = $('.self-single');
	
	var slider = self.find('.slider-model');
	slider.slick('unslick');
	slider.empty();
	
	self.removeClass('on');
	$('body').removeClass('self-singled');
}

// Open the full screen search box 
function openSearch() {
  document.getElementById("myOverlay").style.display = "block";
}

// Close the full screen search box 
function closeSearch() {
  document.getElementById("myOverlay").style.display = "none";
}

function onLoading(status){
	if(status){
		$('.loader').addClass('onLoading');
	}else{
		$('.loader').removeClass('onLoading');
	}
}