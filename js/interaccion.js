// JavaScript Document
$(document).ready(function () {
	//Declarar variables
	var intro = anime.timeline({
		loop: false,
		autoplay: false
	}),
		inicio = 0,
		final = 0,
		scrollado = 0,
		videoIntro = document.getElementById("videoIntro"),
		videoFinal = document.getElementById("videoFinal"),
		altoVentana = $('body').height(),
		btns = $('.hot a, .tool a, .creditos');

	//Cargando
	setTimeout(function () {
		desvanecer('#cargando, .pace-inactive', 2000);
	}, 5000);
	// Controlar video
	$('#btn-play').on('click', function (e) {
		e.preventDefault();
		videoIntro.play();
		desvanecer('#btn-play', 2000);
		setTimeout(function () {
			aparecer('#btn-skip');
		}, 5000);
		videoIntro.play();
	});
	$('#btn-skip').on('click', function (e) {
		e.preventDefault();
		videoIntro.currentTime = 21.9;
	});
	//Function para animar cada slide
	function animarSlide(slide, estado) {
		var animacion = anime.timeline({
			loop: false,
			autoplay: false
		});
		animacion.add({
			targets: '#sec-' + slide + ' .txt-head i',
			width: [0, '100%'],
			delay: function (el, i) {
				return (i * 100);
			}
		})
			.add({
				targets: ['#sec-' + slide + ' .mk-img', '#sec-' + slide + ' h3', '#sec-' + slide + ' h2', '#sec-' + slide + ' .txt'],
				translateX: {
					value: [-20, 0],
					duration: 800
				},
				opacity: {
					value: [0, 1],
					duration: 1200
				},
				easing: 'linear',
				delay: function (el, i) {
					//console.log(i + "es el el: " + el + "lenght es: " + l );
					return 1000 + (i * 200);
				},
				offset: '-=2000'
			})
			.add({
				targets: ['#sec-' + slide + ' .linea i', '#sec-' + slide + ' .sombra', '#sec-' + slide + ' .bajar i'],
				width: ['0', '100%'],
				easing: 'easeOutExpo',
				duration: function (el, i) {
					if (i == 1 || i == 2) {
						return 1200;
					} else {
						return 800;
					}
				},
				delay: function (el, i, l) {
					//console.log(i + "es el el: " + el + "lenght es: " + l);
					return (i * 200);
				},
				offset: '-=1000'
			})
			.add({
				targets: '#sec-' + slide + ' .bajar a',
				translateY: {
					value: [-10, 0],
					duration: 1000
				},
				opacity: {
					value: [0, 1],
					duration: 800
				}
			})
			.add({
				targets: '#sec-' + slide + ' .txt-puntos i',
				opacity: [0, 1],
				delay: function () {
					return anime.random(0, 1000);
				},
				offset: '-=2000'
			}); //Final animacion

		animacion.play();
	} //Fin animar Slide

	//Function para animar slide 9
	function animarSlide9() {
		var animacion = anime.timeline({
			loop: false,
			autoplay: false
		});

		animacion.add({
			targets: '#sec-9 .txt-head i',
			width: [0, '100%'],
			delay: function (el, i) {
				return (i * 100);
			}
		})
			.add({
				targets: ['#sec-9 h2', '#sec-9 .txt'],
				translateX: {
					value: [-20, 0],
					duration: 800
				},
				opacity: {
					value: [0, 1],
					duration: 1200
				},
				easing: 'linear',
				delay: function (el, i) {
					//console.log(i + "es el el: " + el + "lenght es: " + l );
					return 1000 + (i * 200);
				},
				offset: '-=2000'
			})
			.add({
				targets: '#sec-9 .sombra',
				width: ['0', '100%'],
				easing: 'easeOutExpo',
				duration: 1200,
				delay: function (el, i) {
					return (i * 200);
				},
				offset: '-=1000'
			})
			.add({
				targets: '#sec-9 #form-contacto',
				opacity: [0, 1],
				duration: 2000,
				easing: 'linear',
				offset: '-=1000'
			})
			.add({
				targets: '#sec-9 .txt-puntos i',
				opacity: [0, 1],
				delay: function () {
					return anime.random(0, 1000);
				},
				offset: '-=2000'
			}); //Final animacion

		animacion.play();
	} //Fin animar Slide
	function desvanecer(el, dur) {
		$(el).addClass('desvanecer');
		setTimeout(function () {
			$(el).remove();
		}, dur);
	}
	function aparecer(el) {
		$(el).addClass('aparecer');
	}

	//Fullpage ========
	$('#fullpage').fullpage({
		///sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
		anchors: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9'],
		menu: '#menu',
		scrollingSpeed: 1000,
		scrollOverflow: true,
		responsiveWidth: 992,
		responsiveHeight: 800,
		afterLoad: function (anchorLink, index) {
			//console.log(inicio);
			//console.log(index);
			//console.log(scrollado);
			if (inicio === 0 && index === 1) {
				videoIntro.play();
				setTimeout(function () {
					if (videoIntro.paused) {
						aparecer('#btn-play');
					} else {
						setTimeout(function () {
							aparecer('#btn-skip');
						}, 5000);
					}
				}, 2000);
				videoIntro.onended = function () {
					intro.play();
					desvanecer('#btn-skip', 500);
					inicio++;
				};
			} else if (final === 0 && index === 9) {
				videoFinal.play();
				setTimeout(function () {
					if (videoFinal.paused && final === 0) {
						animarSlide9();
						desvanecer('.videoFinal', 1200);
						final++;
					}
				}, 500);
				videoFinal.onended = function () {
					animarSlide9();
					desvanecer('.videoFinal', 1200);
					final++;
				};
			} else if (index === 9) {
				animarSlide9();
			} else if (index !== 1 && index !== 9) {
				animarSlide(index);
			} else {
				console.log("Algo malo está pasando");
			}
			
			if (scrollado === 0 && index !== 1) {
				$('#logo').css('opacity', 1);
				$('#menu li').css('opacity', 1);
				$('#menu i').css('height', '120%');
			} else {
				scrollado = 1;
			}
		}
	});

	//Swipe en moviles
	/*function swipeArriba() {
		$.fn.fullpage.moveSectionDown();
	}
	function swipeAbajo() {
		$.fn.fullpage.moveSectionUp();
	}
	$('body').on('swipeup', swipeArriba);
	$('body').on('swipedown', swipeAbajo);
	*/
	//Carrusel 	
	$('.carrusel-clientes').slick({
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 4000,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			}
		}]
	});

	//Bajar con flechas
	$('.bajar a, .bajarIntro').on('click', function () {
		$.fn.fullpage.moveSectionDown();
	});

	//Generar textura de puntos ========
	$('.txt-puntos').each(function () {
		var col = $(this).data("col"),
			row = $(this).data("row"),
			ancho = (col - 1) * 16 + 2 + "px",
			alto = (row - 1) * 16 + 2 + "px",
			nCol = 0,
			nRow = 0;

		$(this).css({
			width: ancho,
			height: alto
		});

		for (var i = 1; i <= col * row; i++) {

			if (i % col == 1) {
				nCol = 0;
				nRow++;
			} else {
				nCol++;
			}

			var pTop = nRow * 16 - 16,
				pLeft = nCol * 16;

			//console.log("Top: "+ pTop + ", Left: "+ pLeft + " - " + index);

			$(this).append('<i style=\"top: ' + pTop + 'px; left: ' + pLeft + 'px\"></i>');
		}
	});

	//Animación inicial

	intro.add({
		targets: '#sec-1 #videoIntro',
		opacity: 0,
		duration: 300
	})
		.add({
			targets: '#sec-1 .container',
			height: [0, '100%'],
			duration: 1100,
			easing: 'easeOutQuad'
		})
		.add({
			targets: '#menu i',
			height: [0, '120%'],
			duration: 600,
			easing: 'easeOutQuad'
		})
		.add({
			targets: '#menu li',
			opacity: [0, 1],
			duration: 5000,
			delay: function (el, i) {
				return (i * 200);
			}
		})
		.add({
			targets: '#logo',
			opacity: [0, 1],
			duration: 1000,
			offset: '-=8000'
		})
		.add({
			targets: '#sec-1 .txt-head i',
			width: [0, '100%'],
			delay: function (el, i) {
				return (i * 100);
			},
			offset: '-=7000'
		})
		.add({
			targets: '#sec-1 h2',
			translateX: {
				value: [-20, 0],
				duration: 800
			},
			opacity: {
				value: [0, 1],
				duration: 1200
			},
			easing: 'linear',
			offset: '-=6500'
		})
		.add({
			targets: ['#sec-1 .sombra, #sec-1 .flecha .rojo, #sec-1 .texto i'],
			width: ['0', '100%'],
			easing: 'easeOutExpo',
			duration: 800,
			delay: function (el, i) {
				//console.log(i + "es el el: " + el + "lenght es: " + l);
				return (i * 200);
			},
			offset: '-=6000'
		})
		.add({
			targets: '#sec-1 .bajarIntro .texto',
			color: {
				value: ['rgba(230,230,230,0)', 'rgba(230,230,230,1)'],
				duration: 1200
			},
			easing: 'linear',
			offset: '-=5000'
		})
		.add({
			targets: '#sec-1 .txt-lineas span',
			width: [0, '8px'],
			delay: function (el, i) {
				return (i * 100);
			},
			offset: '-=5000'
		})
		.add({
			targets: '#sec-1 .txt-lineas span i',
			opacity: [0, 1],
			delay: function (el, i) {
				return (i * 100);
			},
			offset: '-=4000'
		})
		.add({
			targets: '#sec-1 .flecha .rojo .i',
			top: [-32, 0],
			duration: 600,
			easing: 'linear',
			offset: '-=4000'
		});
	/*$('#sec-9 input, #sec-9 textarea').on('focusin', function () {
		$('body').addClass('form-activo').off('swipeup', swipeArriba).off('swipedown', swipeAbajo);
		
	}).on('focusout', function () {
		$('body').removeClass('form-activo').on('swipeup', swipeArriba).on('swipedown', swipeAbajo);
		
	});*/
	//Interactividad hotspots
	btns.on("click", function (e){
		e.preventDefault();
	})
}); // Final
