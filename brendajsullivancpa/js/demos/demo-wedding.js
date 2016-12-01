/*
Name: 			Wedding
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	5.0.0
*/

(function( $ ) {

	/*
	Slider
	*/
	$('#revolutionSlider').revolution({
		sliderType: 'standard',
		sliderLayout: 'fullwidth',
		delay: 9000,
		gridwidth: 1170,
		gridheight: 810,
		disableProgressBar: 'on',
		spinner: 'spinner3',
		parallax:{
			type:"mouse",
			origo:"slidercenter",
			speed:2000,
			levels:[2,3,4,5,6,7,12,16,10,50],
		},
		navigation: {
			arrows: {
				style: "hades",
				enable: false,
				hide_onmobile: false,
				hide_onleave: false,
				tmp: '<div class="tp-arr-allwrapper">	<div class="tp-arr-imgholder"></div></div>',
				left: {
					h_align: "left",
					v_align: "center",
					h_offset: 10,
					v_offset: 0
				},
				right: {
					h_align: "right",
					v_align: "center",
					h_offset: 10,
					v_offset: 0
				}
			}
		}
	});

	/*
	Header Logo
	*/
	var $headerLogo = $('.header-logo');

	var showLogo = function() {
		$headerLogo.addClass('loaded').addClass('animated fadeInUp');
	};

	fontSpy('Great Vibes', {
		success: function() {
			showLogo();
		},
		failure: function() {
			showLogo();	
		}
	});

	/*
	Countdown
	*/
	$('#clock').countdown('2017/06/10 12:00:00').on('update.countdown', function(event) {
		var $this = $(this).html(event.strftime(''
			+ '<span>%D<span>day%!d</span></span> '
			+ '<span>%H<span>hours</span></span> '
			+ '<span>%M<span>minutes</span></span> '
			+ '<span>%S<span>seconds</span></span> '
		));
	});

	/*
	Custom History Load More 
	*/
	var historyLoadMore = {

		pages: 0,
		currentPage: 0,
		$wrapper: $('#historyLoadMoreWrapper'),
		$btn: $('#historyLoadMore'),
		$loader: $('#historyLoadMoreLoader'),

		build: function() {

			var self = this

			self.pages = self.$wrapper.data('total-pages');

			if(self.pages <= 1) {

				self.$btn.remove();
				return;

			} else {

				// init isotope
				self.$wrapper.isotope({
					masonry: {
						columnWidth: '.col-md-3'
					}
				});

				self.$btn.on('click', function() {
					self.loadMore();
				});

				// Lazy Load
				if(self.$btn.hasClass('btn-history-lazy-load')) {
					self.$btn.appear(function() {
						self.$btn.trigger('click');
					}, {
						data: undefined,
						one: false,
						accX: 0,
						accY: 0
					});
				}

				zoomHistoryGallery(self.$wrapper);

			}

		},
		loadMore: function() {

			var self = this;

			self.$btn.hide();
			self.$loader.show();

			// Ajax
			$.ajax({
				url: 'demo-wedding-history-ajax-load-more.html',
				complete: function(data) {

					var $items = $(data.responseText);

					setTimeout(function() {

						self.$wrapper.append($items)

						self.$wrapper.isotope('appended', $items);

						self.currentPage++;

						if(self.currentPage < self.pages) {
							self.$btn.show().blur();
						} else {
							self.$btn.remove();
						}

						// Lightbox
						zoomHistoryGallery(self.$wrapper);

						self.$loader.hide();

						// Refresh Parallax
						$(window).trigger('scroll');

					}, 1000);

				}
			});

		}

	}

	var zoomHistoryGallery = function($wrapper) {
		$wrapper.magnificPopup({
			delegate: 'a',
			type: 'image',
			closeOnContentClick: false,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			image: {
				verticalFit: true,
				titleSrc: function(item) {
					
				}
			},
			gallery: {
				enabled: true
			},
			zoom: {
				enabled: true,
				duration: 300,
				opener: function(element) {
					return element.find('img');
				}
			},
			callbacks: {
				open: function() {
					$('html').addClass('lightbox-opened');
				},
				close: function() {
					$('html').removeClass('lightbox-opened');
				}
			}
		});
	}

	/*
	Custom Blog Load More 
	*/
	var blogLoadMore = {

		pages: 0,
		currentPage: 0,
		$wrapper: $('#blogLoadMoreWrapper'),
		$btn: $('#blogLoadMore'),
		$loader: $('#blogLoadMoreLoader'),

		build: function() {

			var self = this

			self.pages = self.$wrapper.data('total-pages');

			if(self.pages <= 1) {

				self.$btn.remove();
				return;

			} else {

				// init isotope
				self.$wrapper.isotope();

				self.$btn.on('click', function() {
					self.loadMore();
				});

				// Lazy Load
				if(self.$btn.hasClass('btn-blog-lazy-load')) {
					self.$btn.appear(function() {
						self.$btn.trigger('click');
					}, {
						data: undefined,
						one: false,
						accX: 0,
						accY: 0
					});
				}

			}

		},
		loadMore: function() {

			var self = this;

			self.$btn.hide();
			self.$loader.show();

			// Ajax
			$.ajax({
				url: 'demo-wedding-blog-ajax-load-more.html',
				complete: function(data) {

					var $items = $(data.responseText);

					setTimeout(function() {

						self.$wrapper.append($items)

						self.$wrapper.isotope('appended', $items);

						self.currentPage++;

						if(self.currentPage < self.pages) {
							self.$btn.show().blur();
						} else {
							self.$btn.remove();
						}

						// Carousel
						$(function() {
							$('[data-plugin-carousel]:not(.manual), .owl-carousel:not(.manual)').each(function() {
								var $this = $(this),
									opts;

								var pluginOptions = $this.data('plugin-options');
								if (pluginOptions)
									opts = pluginOptions;

								$this.themePluginCarousel(opts);
							});
						});

						self.$loader.hide();

						// Refresh Parallax
						$(window).trigger('scroll');

					}, 1000);

				}
			});

		}

	}

	setTimeout(function(){
		if($('#historyLoadMoreWrapper').get(0)) {
			historyLoadMore.build();
		}

		if($('#blogLoadMoreWrapper').get(0)) {
			blogLoadMore.build();
		}
	}, 500);

	/*
	Popup with video or map
	*/
	$('.popup-gmaps').magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});

	/*
	Guestbook Form
	*/
	$('#guestbookSendMessage').validate({
		submitHandler: function(form) {

			var $form = $(form),
				$messageSuccess = $('#guestBookSuccess'),
				$messageError = $('#guestBookError'),
				$submitButton = $(this.submitButton),
				$errorMessage = $('#guestBookErrorMessage');

			$submitButton.button('loading');

			// Ajax Submit
			$.ajax({
				type: 'POST',
				url: $form.attr('action'),
				data: {
					name: $form.find('#guestbookName').val(),
					email: 'you@domain.com',
					subject: 'Wedding - Guestbook',
					message: $form.find('#guestbookMessage').val()
				}
			}).always(function(data, textStatus, jqXHR) {

				$errorMessage.empty().hide();

				if (data.response == 'success') {

					$messageSuccess.removeClass('hidden');
					$messageError.addClass('hidden');

					// Reset Form
					$form.find('.form-control')
						.val('')
						.blur()
						.parent()
						.removeClass('has-success')
						.removeClass('has-error')
						.find('label.error')
						.remove();

					if (($messageSuccess.offset().top - 80) < $(window).scrollTop()) {
						$('html, body').animate({
							scrollTop: $messageSuccess.offset().top - 80
						}, 300);
					}

					$submitButton.button('reset');
					
					return;

				} else if (data.response == 'error' && typeof data.errorMessage !== 'undefined') {
					$errorMessage.html(data.errorMessage).show();
				} else {
					$errorMessage.html(data.responseText).show();
				}

				$messageError.removeClass('hidden');
				$messageSuccess.addClass('hidden');

				if (($messageError.offset().top - 80) < $(window).scrollTop()) {
					$('html, body').animate({
						scrollTop: $messageError.offset().top - 80
					}, 300);
				}

				$form.find('.has-success')
					.removeClass('has-success');
					
				$submitButton.button('reset');

			});
		}
	});

	/*
	RSVP Form
	*/
	$('#rsvpForm').validate({
		submitHandler: function(form) {

			var $form = $(form),
				$messageSuccess = $('#rsvpSuccess'),
				$messageError = $('#rsvpError'),
				$submitButton = $(this.submitButton),
				$errorMessage = $('#rsvpErrorMessage');

			$submitButton.button('loading');

			// Ajax Submit
			$.ajax({
				type: 'POST',
				url: $form.attr('action'),
				data: {
					name: $form.find('#rsvpName').val(),
					email: 'you@domain.com',
					subject: 'Wedding - RSVP',
					message: 'Name' + $form.find('#rsvpName').val() + '<br>Number of guests:' + $form.find('#rsvpName').val() + '<br>Attending to:' + $form.find('#rsvpAttendingTo').val()
				}
			}).always(function(data, textStatus, jqXHR) {

				$errorMessage.empty().hide();

				if (data.response == 'success') {

					$messageSuccess.removeClass('hidden');
					$messageError.addClass('hidden');

					// Reset Form
					$form.find('.form-control')
						.val('')
						.blur()
						.parent()
						.removeClass('has-success')
						.removeClass('has-error')
						.find('label.error')
						.remove();

					if (($messageSuccess.offset().top - 80) < $(window).scrollTop()) {
						$('html, body').animate({
							scrollTop: $messageSuccess.offset().top - 80
						}, 300);
					}

					$submitButton.button('reset');
					
					return;

				} else if (data.response == 'error' && typeof data.errorMessage !== 'undefined') {
					$errorMessage.html(data.errorMessage).show();
				} else {
					$errorMessage.html(data.responseText).show();
				}

				$messageError.removeClass('hidden');
				$messageSuccess.addClass('hidden');

				if (($messageError.offset().top - 80) < $(window).scrollTop()) {
					$('html, body').animate({
						scrollTop: $messageError.offset().top - 80
					}, 300);
				}

				$form.find('.has-success')
					.removeClass('has-success');
					
				$submitButton.button('reset');

			});
		}
	});

}).apply( this, [ jQuery ]);