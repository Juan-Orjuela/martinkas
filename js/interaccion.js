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
		videoFinal = document.getElementById("videoFinal");


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
				translateY: {
					value: [20, 0],
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
				translateY: {
					value: [20, 0],
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
	function desvanecer(){
		$('#videoFinal').addClass('desvanecer');
		setTimeout(function () {
			$("#videoFinal").remove();
		}, 1200);
	}
	//Cargando
	setTimeout(function () {
		$("#cargando").remove();
	}, 3000);

	//Fullpage ========

	$('#fullpage').fullpage({
		///sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
		anchors: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9'],
		menu: '#menu',
		scrollingSpeed: 1000,
		afterLoad: function (anchorLink, index) {
			
			if (inicio === 0 && index === 1) {
				videoIntro.play();
				videoIntro.onended = function () {
					intro.play();
					inicio++;
				};
			} else if (final === 0 && index === 9) {
				videoFinal.play();
				videoFinal.onended = function () {
					animarSlide9();
					desvanecer();
					final++;
				};
			} else if (index === 9){
				animarSlide9();
			} else if (index !== 1 && index !== 9) {
				animarSlide(index);
			} else {
				console.log("Algo malo está pasando");
			}
			
			if (scrollado === 0){
				$('#logo').css('opacity', 1);
				$('#menu li').css('opacity', 1);
				$('#menu i').css('height', '120%');
			} else {
				scrollado = 1;
			}
		}
	});

	//Swipe en moviles
	$('body').on('swipeup', function (e) {
		$.fn.fullpage.moveSectionDown();
	});
	$('body').on('swipedown', function (e) {
		$.fn.fullpage.moveSectionUp();
	});

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
			translateY: {
				value: [60, 0],
				duration: 800
			},
			opacity: {
				value: [0, 1],
				duration: 1200
			},
			easing: 'linear',
			offset: '-=5500'
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
			offset: '-=5000'
		})
		.add({
			targets: '#sec-1 .bajarIntro .texto',
			color: {
				value: ['rgba(230,230,230,0)', 'rgba(230,230,230,1)'],
				duration: 1200
			},
			easing: 'linear',
			offset: '-=4000'
		})
		.add({
			targets: '#sec-1 .txt-lineas span',
			width: [0, '8px'],
			delay: function (el, i) {
				return (i * 100);
			},
			offset: '-=4000'
		})
		.add({
			targets: '#sec-1 .txt-lineas span i',
			opacity: [0, 1],
			delay: function (el, i) {
				return (i * 100);
			},
			offset: '-=3000'
		})
		.add({
			targets: '#sec-1 .flecha .rojo .i',
			top: [-32, 0],
			duration: 600,
			easing: 'linear',
			offset: '-=3000'
		});
}); // Final
