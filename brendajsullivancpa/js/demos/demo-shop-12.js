/*
Name: 			Shop12
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	5.0.0
*/

(function( $ ) {

	// Newsletter popup
	if ( document.getElementById('newsletter-popup-form') ) {
		$.magnificPopup.open({
			items: {
				src: '#newsletter-popup-form'
			},
			type: 'inline'
		}, 0);
	}

	// Home Products Carousel
	$('.home-products-carousel').owlCarousel({
		loop: false,
		responsive: {
			0: {
				items: 1
			},
			480: {
				items: 2
			},
			768: {
				items: 3
			},
			1200: {
				items: 4
			}
		},
		margin: 20,
		nav:true,
		navText: [],
		dots: false,
		autoWidth: false
	});

	// Mobile menu accordion
	$('.mobile-side-menu').find('.mmenu-toggle').on('click', function (e) {
		var closestLi = $(this).closest('li');

		if (closestLi.find('ul').length) {
			closestLi.children('ul').slideToggle(300, function () {
				closestLi.toggleClass('open');
			});
			e.preventDefault();
		}
	});

	// Mobile menu show/hide 
	$('.mmenu-toggle-btn, #mobile-menu-overlay').on('click', function (e) {
		$('.body').toggleClass('mmenu-open');
		e.preventDefault();
	});	

	// Show hide menu - main menu for 992px and wider 
	// - mobile menu for 991x and smaller
	$('.main-toggle-btn').on('click', function(e) {
		if ( $(window).width() >= 992 ) {
			$('.main-dropdown-menu').toggleClass('open');
		} else {
			$('.body').toggleClass('mmenu-open');
		}
		e.preventDefault();
 	});

	// Search Dropdown Toggle
	$('.search-toggle').on('click', function (e) {
		$('.header-search-wrapper').toggleClass('open');
		e.preventDefault();
	});

	// Toggle new/change password section via checkbox
	$('#change-pass-checkbox').on('change', function () {
		$('#account-chage-pass').toggleClass('show');
	});

	// Toggle creditcard section -- see checkout page
	$('.payment-card-check').on('change', function () {
		var cardArea = $('#payment-credit-card-area');
		switch($(this).val()) {
	        case 'checkcard':
	            cardArea.addClass('show');
	            break;
            case 'checkmo':
	            cardArea.removeClass('show');
	            break;
	    }       
	});

	// Vertical Spinner - Touchspin - Product Details Quantity input
	if ( $.fn.TouchSpin ) {
		$('#product-vqty').TouchSpin({
			verticalbuttons: true
	    });
	}

	// Filter Price Slider
	if (typeof noUiSlider === 'object') {
		var priceSlider = document.getElementById('price-slider'),
			priceLow 	= document.getElementById('price-range-low'),
			priceHigh 	= document.getElementById('price-range-high');

		// Create Slider
		noUiSlider.create(priceSlider, {
			start: [ 50, 250 ],
			connect: true,
			step: 1,
			range: {
				'min': 0,
				'max': 300
			}
		});

		// Update Input values
		priceSlider.noUiSlider.on('update', function( values, handle ) {
			var value = values[handle];

			if ( handle ) {
				priceHigh.value = Math.round(value);
			} else {
				priceLow.value = Math.round(value);
			}
		});

		// when inpout values changei update slider
		priceLow.addEventListener('change', function(){
			priceSlider.noUiSlider.set([this.value, null]);
		});

		priceHigh.addEventListener('change', function(){
			priceSlider.noUiSlider.set([null, this.value]);
		});
	}

	// Product Details Gallery 
	if ($.fn.elevateZoom) {
		$('#product-zoom').elevateZoom({
			responsive: true,
			zoomType: "inner",
			cursor: "default"
		});
	}

	$('#productGalleryThumbs')
		.owlCarousel({
			margin: 10,
			items: 4,
			nav: false,
			center: false,
			dots: false,
			autoplay: false
		})
		.on('click', '.owl-item', function(e) {
			var ez = $('#product-zoom').data('elevateZoom'),
				targetLink= $(this).find('a'),
				smallImg = targetLink.data('image'),
				bigImg = targetLink.data('zoom-image');

			ez.swaptheimage(smallImg, bigImg);
		});

	// No def events for links
	$('#productGalleryThumbs').find('a').on('click', function (e) {
		e.preventDefault();
	});
    
}).apply( this, [ jQuery ]);