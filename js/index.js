//
//
// Index JS
//
//



(function ($) {
	'use strict';



	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Navigation

	// Global vars
	var navTarget = $('body').attr('data-page-url');
	var docTitle = document.title;
	var History = window.History;

	var flag = true;
	var wrapInnerClone = $('.works').find('.wrap').html();

	var slickConfig = {
		dots: true,
		speed: 500,
		fade: true,
		infinite: true,
		cssEase: 'linear',
		adaptiveHeight: true
	};

	//var $btn = $('.selected').parent('.wrap').parent().find('a.btn-works');
	$('body').on('click', 'a.btn-works', function(e) {
		e.preventDefault();
		return false;
	});

	$('body').on('click', 'a.btn-works .square.big, a.btn-works .tiles', function(e) {
		$('.wrap').fadeOut(0);
		
		$('a.btn-works').toggleClass('slider');

		e.preventDefault();
		// caching
		var $selected = $('.works').find('.wrap').html(wrapInnerClone).find('.selected');

		// clear out contents of the wrap
		$('.works').find('.wrap').empty();
		$selected = $('.works').find('.wrap').append($selected).find('.selected');

		if(flag) {
			$selected.addClass('gallery').attr('data-columns', 3);
			pageFunctions();
			flag = false;
		} else {
			$selected.slick(slickConfig);
			flag = true;
		}
		$('.wrap').fadeIn();

		return false;
	});

	// State change event
	History.Adapter.bind(window,'statechange',function(){
		var state = History.getState();
		// console.log(state);

		// Loading state
		$('body').addClass('loading');

		// Load the page
		$('.page-loader').load( state.hash + ' .page__content', function() {

			// Scroll to top
			$( 'body, html' ).animate({
				scrollTop: 0
			}, 300);

			// Find transition time
			var transitionTime = 400;

			// After current content fades out
			setTimeout( function() {

				// Remove old content
				$('.page .page__content').remove();

				// Append new content
				$('.page-loader .page__content').appendTo('.page');

				// Set page URL
				$('body').attr('data-page-url', window.location.pathname);

				// Update navTarget
				navTarget = $('body').attr('data-page-url');

				// Set page title
				docTitle = $('.page__content').attr('data-page-title');
				document.title = docTitle;

				// Run page functions
				pageFunctions();
				$('.selected').slick(slickConfig);
				flag = true;

			}, transitionTime);

		});

	});


	// On clicking a link

	if ( $('body').hasClass('ajax-loading') ) {

		$(document).on('click', 'a', function (event){

			// Don't follow link
			event.preventDefault();

			// Get the link target
			var thisTarget = $(this).attr('href');

			// If we don't want to use ajax, or the link is an anchor/mailto/tel
			if ($(this).hasClass('js-no-ajax') || thisTarget.indexOf('#') >= 0 || thisTarget.indexOf('mailto:') >= 0 || thisTarget.indexOf('tel:') >= 0) {

				// Use the given link
				window.location = thisTarget;
			}

			// If link is handled by some JS action – e.g. fluidbox
			else if ( $(this).is('.gallery__item__link') ) {
				
				// Let JS handle it
			}

			// If link is external
			else if ( thisTarget.indexOf('http') >= 0 ) {

				// Go to the external link
				window.open(thisTarget, '_blank');

			}

			// If link is internal
			else {

				// Change navTarget
				navTarget = thisTarget;
				
				// Switch the URL via History
				History.pushState(null, docTitle, thisTarget);
			}

		});

	}



	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Page load

	function pageFunctions() {


		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Show content

		// Wait until first image has loaded
		$('.page__content').find('img:first').imagesLoaded( function() {
	
			// Portfolio grid layout
			$('.portfolio-wrap').imagesLoaded( function() {
				$('.portfolio-wrap').masonry({
					itemSelector: '.portfolio-item',
					transitionDuration: 0
				});
			});

			// Blog grid layout
			$('.blog-wrap').imagesLoaded( function() {
				$('.blog-wrap').masonry({
					itemSelector: '.blog-post',
					transitionDuration: 0
				});
			});

			// Show the content
			$('body').removeClass('loading');

			// Hide the menu
			$('body').removeClass('menu--open');
		});



		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Active links

		// Switch active link states
		$('.active-link').removeClass('active-link');
		$('a[href="' + navTarget + '"]').addClass('active-link');



		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Galleries

		// Destroy all existing waypoints
		Waypoint.destroyAll();

		// Set up count for galleries to give them unique IDs
		var galleryCount = 0;

		// If there's a gallery
		$('.gallery').each( function() {

			// Get gallery element
			var $this = $(this);

			// Add ID via count
			galleryCount++;
			var thisId = 'gallery-' + galleryCount;
			$this.attr('id', thisId);

			// Gallery columns
			var galleryCols = $this.attr('data-columns');

			// Set up gallery container
			$this.append('<div class="gallery__wrap"></div>');

			// Add images to container
			$this.children('.imgs').each( function() {
				$(this).appendTo('#' + thisId + ' .gallery__wrap');
			});
			$this.children('img').each( function() {
				$(this).appendTo('#' + thisId + ' .gallery__wrap');
			});

			// Wrap images
			$this.find('.gallery__wrap img').each( function() {
				var imageSrc = $(this).attr('src');
				$(this).wrapAll('<div class="gallery__item"><a href="' + imageSrc + '" class="gallery__item__link"></div></div>').appendTo();
			});

			// Wait for images to load
			$this.imagesLoaded( function() {

				// If it's a single column gallery
				if ( galleryCols === '1' ) {

					// Add carousel class to gallery
					$this.addClass('gallery--carousel');

					// Add owl styles to gallery wrap
					$this.children('.gallery__wrap').addClass('owl-carousel');

					// Use carousel
					$this.children('.gallery__wrap').owlCarousel({
						items: 1,
						loop: true,
						mouseDrag: false,
						touchDrag: false,
						pullDrag: false,
						dots: false,
						autoplay: false,
						autoplayTimeout: 6000,
						autoHeight: true,
						animateOut: 'fadeOut'
					});

					// When scrolling over the bottom
					var waypoint1 = new Waypoint({
						element: document.getElementById(thisId),
						handler: function(direction) {

							if ( direction === 'down') {

								// console.log('pause');
							
								// Pause this carousel
								$this.children('.gallery__wrap').trigger('stop.owl.autoplay');
							}

							if ( direction === 'up') {

								// console.log('play');
								
								// Play this carousel
								$this.children('.gallery__wrap').trigger('play.owl.autoplay');
							}
						},
						offset: '-100%'
					});

					// When scrolling over the top
					var waypoint2 = new Waypoint({
						element: document.getElementById(thisId),
						handler: function(direction) {

							if ( direction === 'down') {

								// console.log('play');
								
								// Play this carousel
								$this.children('.gallery__wrap').trigger('play.owl.autoplay');
							}

							if ( direction === 'up') {

								// console.log('pause');
							
								// Pause this carousel
								$this.children('.gallery__wrap').trigger('stop.owl.autoplay');
							}
						},
						offset: '100%'
					});

				}

				else {

					$this.addClass('gallery--grid');

					// Use masonry layout
					$this.children('.gallery__wrap').masonry({
						itemSelector: '.gallery__item',
						transitionDuration: 0
					});
							
					// Init fluidbox
					// $this.find('.gallery__item__link').fluidbox({
					// 	loader: true
					// });
					$('.gallery a').each(function(){
						$(this).attr('title', $(this).parent().parent().find('p').html());
					});
					$('.gallery a').simpleLightbox();

				}

				// Show gallery once initialized
				$this.addClass('gallery--on');
			});

		});



		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Images

		$('.single p > img').each( function() {
			var thisP = $(this).parent('p');
			$(this).insertAfter(thisP);
			$(this).wrapAll('<div class="image-wrap"></div>');
			thisP.remove();
		});



		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Videos

		// For each iframe
		$('.single iframe').each( function() {

			// If it's YouTube or Vimeo
			if ( $(this).attr('src').indexOf('youtube') >= 0 || $(this).attr('src').indexOf('vimeo') >= 0 ) {

				var width = $(this).attr('width');
				var height = $(this).attr('height');
				var ratio = (height/width)*100;

				// Wrap in video container
				$(this).wrapAll('<div class="video-wrap"><div class="video" style="padding-bottom:' + ratio + '%;"></div></div>');

			}

		});



		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Tables

		$('.single table').each(function () {
			$(this).wrapAll('<div class="table-wrap"></div>');
		});

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Home scroll bar fix

		if($('.single').hasClass('home')) {
			$('body').addClass('scroll-fix');
		} else {
			$('body').removeClass('scroll-fix');
		}

	}

	// Run functions on load
	pageFunctions();
	$('.selected').slick(slickConfig);
	flag = true;

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Menu

	$(document).on('click', '.js-menu-toggle', function (){

		// If already open
		if ( $('body').hasClass('menu--open') ) {
			$('body').removeClass('menu--open');
		}

		// If not open
		else {
			$('body').addClass('menu--open');
		}
	});

	$(document).on('click', '.menu__list__item__link', function (){

		// If menu is open when you click a link on mobile
		if ( $('.menu').hasClass('menu--open') ) {
			$('.menu').removeClass('menu--open');
		}
	});



	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Contact Form

	// Override the submit event
	$(document).on('submit', '#contact-form', function (e) {

		// Clear previous classes
		$('.contact-form__item--error').removeClass('contact-form__item--error');

		// Get form elements
		var emailField = $('.contact-form__input[name="email"]');
		var nameField = $('.contact-form__input[name="name"]');
		var messageField = $('.contact-form__textarea[name="message"]');
		var gotchaField = $('.contact-form__gotcha');

		// Validate email
		if ( emailField.val() === '' ) {
			emailField.closest('.contact-form__item').addClass('contact-form__item--error');
		}

		// Validate name
		if ( nameField.val() === '' ) {
			nameField.closest('.contact-form__item').addClass('contact-form__item--error');
		}

		// Validate message
		if ( messageField.val() === '' ) {
			messageField.closest('.contact-form__item').addClass('contact-form__item--error');
		}

		// If all fields are filled, except gotcha
		if ( emailField.val() !== '' && nameField.val() !== '' && messageField.val() !== '' && gotchaField.val().length === 0 ) {

			// Submit the form!
		}

		else {

			// Stop submission
			e.preventDefault();
		}

	});


	/*!
 * modernizr v3.6.0
 * Build https://modernizr.com/download?-mq-dontmin
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera

	* MIT License
	*/

	/*
	* Modernizr tests which native CSS3 and HTML5 features are available in the
	* current UA and makes the results available to you in two ways: as properties on
	* a global `Modernizr` object, and as classes on the `<html>` element. This
	* information allows you to progressively enhance your pages with a granular level
	* of control over the experience.
	*/

	;(function(window, document, undefined){
		var tests = [];


		/**
		 *
		 * ModernizrProto is the constructor for Modernizr
		 *
		 * @class
		 * @access public
		 */

		var ModernizrProto = {
			// The current version, dummy
			_version: '3.6.0',

			// Any settings that don't work as separate modules
			// can go in here as configuration.
			_config: {
				'classPrefix': '',
				'enableClasses': true,
				'enableJSClass': true,
				'usePrefixes': true
			},

			// Queue of tests
			_q: [],

			// Stub these for people who are listening
			on: function(test, cb) {
				// I don't really think people should do this, but we can
				// safe guard it a bit.
				// -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
				// This is in case people listen to synchronous tests. I would leave it out,
				// but the code to *disallow* sync tests in the real version of this
				// function is actually larger than this.
				var self = this;
				setTimeout(function() {
					cb(self[test]);
				}, 0);
			},
		};


		// Fake some of Object.create so we can force non test results to be non "own" properties.
		var Modernizr = function() {};
		Modernizr.prototype = ModernizrProto;

		// Leak modernizr globally when you `require` it rather than force it here.
		// Overwrite name so constructor name is nicer :D
		Modernizr = new Modernizr();


		var classes = [];


		/**
		 * is returns a boolean if the typeof an obj is exactly type.
		 *
		 * @access private
		 * @function is
		 * @param {*} obj - A thing we want to check the type of
		 * @param {string} type - A string to compare the typeof against
		 * @returns {boolean}
		 */

		function is(obj, type) {
			return typeof obj === type;
		};

		/**
		 * docElement is a convenience wrapper to grab the root element of the document
		 *
		 * @access private
		 * @returns {HTMLElement|SVGElement} The root element of the document
		 */

		var docElement = document.documentElement;


		/**
		 * A convenience helper to check if the document we are running in is an SVG document
		 *
		 * @access private
		 * @returns {boolean}
		 */

		var isSVG = docElement.nodeName.toLowerCase() === 'svg';


		/**
		 * createElement is a convenience wrapper around document.createElement. Since we
		 * use createElement all over the place, this allows for (slightly) smaller code
		 * as well as abstracting away issues with creating elements in contexts other than
		 * HTML documents (e.g. SVG documents).
		 *
		 * @access private
		 * @function createElement
		 * @returns {HTMLElement|SVGElement} An HTML or SVG element
		 */

		function createElement() {
			if (typeof document.createElement !== 'function') {
				// This is the case in IE7, where the type of createElement is "object".
				// For this reason, we cannot call apply() as Object is not a Function.
				return document.createElement(arguments[0]);
			} else if (isSVG) {
				return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
			} else {
				return document.createElement.apply(document, arguments);
			}
		}

		/**
		 * getBody returns the body of a document, or an element that can stand in for
		 * the body if a real body does not exist
		 *
		 * @access private
		 * @function getBody
		 * @returns {HTMLElement|SVGElement} Returns the real body of a document, or an
		 * artificially created element that stands in for the body
		 */

		function getBody() {
			// After page load injecting a fake body doesn't work so check if body exists
			var body = document.body;

			if (!body) {
				// Can't use the real body create a fake one.
				body = createElement(isSVG ? 'svg' : 'body');
				body.fake = true;
			}

			return body;
		}

		/**
		 * injectElementWithStyles injects an element with style element and some CSS rules
		 *
		 * @access private
		 * @function injectElementWithStyles
		 * @param {string} rule - String representing a css rule
		 * @param {function} callback - A function that is used to test the injected element
		 * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
		 * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
		 * @returns {boolean}
		 */

		function injectElementWithStyles(rule, callback, nodes, testnames) {
			var mod = 'modernizr';
			var style;
			var ret;
			var node;
			var docOverflow;
			var div = createElement('div');
			var body = getBody();

			if (parseInt(nodes, 10)) {
				// In order not to give false positives we create a node for each test
				// This also allows the method to scale for unspecified uses
				while (nodes--) {
					node = createElement('div');
					node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
					div.appendChild(node);
				}
			}

			style = createElement('style');
			style.type = 'text/css';
			style.id = 's' + mod;

			// IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
			// Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
			(!body.fake ? div : body).appendChild(style);
			body.appendChild(div);

			if (style.styleSheet) {
				style.styleSheet.cssText = rule;
			} else {
				style.appendChild(document.createTextNode(rule));
			}
			div.id = mod;

			if (body.fake) {
				//avoid crashing IE8, if background image is used
				body.style.background = '';
				//Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
				body.style.overflow = 'hidden';
				docOverflow = docElement.style.overflow;
				docElement.style.overflow = 'hidden';
				docElement.appendChild(body);
			}

			ret = callback(div, rule);
			// If this is done after page load we don't want to remove the body so check if body exists
			if (body.fake) {
				body.parentNode.removeChild(body);
				docElement.style.overflow = docOverflow;
				// Trigger layout so kinetic scrolling isn't disabled in iOS6+
				// eslint-disable-next-line
				docElement.offsetHeight;
			} else {
				div.parentNode.removeChild(div);
			}

			return !!ret;

		}

		/**
		 * Modernizr.mq tests a given media query, live against the current state of the window
		 * adapted from matchMedia polyfill by Scott Jehl and Paul Irish
		 * gist.github.com/786768
		 *
		 * @memberof Modernizr
		 * @name Modernizr.mq
		 * @optionName Modernizr.mq()
		 * @optionProp mq
		 * @access public
		 * @function mq
		 * @param {string} mq - String of the media query we want to test
		 * @returns {boolean}
		 * @example
		 * Modernizr.mq allows for you to programmatically check if the current browser
		 * window state matches a media query.
		 *
		 * ```js
		 *  var query = Modernizr.mq('(min-width: 900px)');
		 *
		 *  if (query) {
		 *    // the browser window is larger than 900px
		 *  }
		 * ```
		 *
		 * Only valid media queries are supported, therefore you must always include values
		 * with your media query
		 *
		 * ```js
		 * // good
		 *  Modernizr.mq('(min-width: 900px)');
		 *
		 * // bad
		 *  Modernizr.mq('min-width');
		 * ```
		 *
		 * If you would just like to test that media queries are supported in general, use
		 *
		 * ```js
		 *  Modernizr.mq('only all'); // true if MQ are supported, false if not
		 * ```
		 *
		 *
		 * Note that if the browser does not support media queries (e.g. old IE) mq will
		 * always return false.
		 */

		var mq = (function() {
			var matchMedia = window.matchMedia || window.msMatchMedia;
			if (matchMedia) {
				return function(mq) {
					var mql = matchMedia(mq);
					return mql && mql.matches || false;
				};
			}

			return function(mq) {
				var bool = false;

				injectElementWithStyles('@media ' + mq + ' { #modernizr { position: absolute; } }', function(node) {
					bool = (window.getComputedStyle ? window.getComputedStyle(node, null) : node.currentStyle).position == 'absolute';
				});

				return bool;
			};
		})();


		ModernizrProto.mq = mq;


		// Run the things that are supposed to run after the tests
		for (var i = 0; i < Modernizr._q.length; i++) {
			Modernizr._q[i]();
		}

		// Leak Modernizr namespace
		window.Modernizr = Modernizr;


	})(window, document);

	var cachedFlag = flag;
	var query = Modernizr.mq('(max-width: 768px)');

	if (query && flag) {
		$('a.btn-works .tiles').click();
		flag = false;
	}

	$(window).resize(function() {
		var query = Modernizr.mq('(max-width: 768px)');
		if (query && flag) {
			$('a.btn-works .tiles').click();
			flag = false;
		}
		// if (!query && cachedFlag) {
		// 	$('a.btn-works .tiles').click();
		// 	flag = true;
		// 	cachedFlag = false;
		// }
	});

	// if (!query && cachedFlag) {
	// 	$('a.btn-works .tiles').click();
	// 	flag = true;
	// }

	// $(window).resize(function() {
	// 	var query = Modernizr.mq('(max-width: 768px)');
	// 	if (!query && cachedFlag) {
	// 		$('a.btn-works .tiles').click();
	// 		flag = true;
	// 	}
	// });

}(jQuery));
