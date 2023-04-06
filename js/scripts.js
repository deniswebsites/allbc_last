function getHeaderParams() {
	var headerSite = $(".header_site");
    if(bodyWidth <= 800) {
    	if( $(".promo_sect").length > 0 ) {
    		if( headerSite.offset().top > 1 ) {
    			headerSite.addClass("js");
    		} else {
    			headerSite.removeClass("js");
    		}
    	}else {
    		headerSite.addClass("js");
    	}
    }
}

function getAdaptivePositionElements() {
    $(".append-elem").each(function() {
        screenParam = parseInt( $(this).attr("data-min-screen") );
        indexElem = $(this).attr("data-append-desktop-elem");
        if( bodyWidth <= screenParam ) {
            $("[data-append-elem = '"+ indexElem +"']").append($(this).children());
        }
         if( bodyWidth > screenParam ) {
            $("[data-append-desktop-elem = '"+ indexElem +"']").append($("[data-append-elem = '"+ indexElem +"']").children());
        }
    });
}

function getBarsChart() {
    if($(".bars").length > 0) {
        $(".bars").each(function() {
            if( $(this).is(":visible") ) {
                var heightArr = [];
                bar = $(this).find(".bar");
                barsLength = bar.length;
                bar.each(function() {
                    heightVal = parseInt($(this).attr("data-count-val"));
                    heightArr.push(heightVal);
                });
                maxHeight = Math.max.apply(null, heightArr);
                chartHeight = $(this).height();
                chartWidth = $(this).width();
                heightModul = chartHeight/maxHeight;      
                bar.each(function() {
                    heightVal = parseInt($(this).attr("data-count-val"));
                    $(this).css({
                        "height" : ( heightVal * heightModul ) + "px",
                        "width" : chartWidth / barsLength + "px"
                    });
                });
                barsCharts = $(this).closest(".bars_range_wrapp");
                handleLower = barsCharts.find(".noUi-handle-lower");
                handleUpperr = barsCharts.find(".noUi-handle-upper");
                leftCoord = handleLower.offset().left;
                $(this).find(".bar").each(function() {
                    if(handleUpperr.length > 0) {
                        rightCoord = handleUpperr.offset().left;
                        if( $(this).offset().left > leftCoord && $(this).offset().left < rightCoord ) {
                            $(this).removeClass("disable");
                        } else {
                            $(this).addClass("disable");
                        }
                    } else {
                        if( $(this).offset().left < leftCoord) {
                            $(this).removeClass("disable");
                        } else {
                            $(this).addClass("disable");
                        }
                    }                    
                });
            }
        });
    }
}

function getMapParams() {
    if( $(".object_map").length > 0 && bodyWidth > 767) {
        if($(".filter_nav").length> 0) {
            filtersCoord = $(".filter_nav").offset().top + $(".filter_nav").height();
        } else {
            filtersCoord = $(document).scrollTop();
        }        
        mapCoord = $(".object_map").offset().top;        
        if(filtersCoord >= mapCoord) {            
            $(".map_scroll").addClass("fixed");
            $(".map_scroll").css({
                "top" : $(".filter_nav").height() + "px"
            });
            mapScrollBootmCoord = filtersCoord + $(".map_scroll").height();
            bottomCoord = $(".bottom_coord").offset().top;
            if( mapScrollBootmCoord >= bottomCoord ) {
                $(".map_scroll").addClass("bottom_position");
            } else {
                $(".map_scroll").removeClass("bottom_position");
            }
        } else {
            $(".map_scroll").removeClass("fixed");
            $(".map_scroll").css({
                "top" : 0
            });
        }
    }
}

function getContactsPosition() {
    if( $(".contacts_scroll").length > 0 && bodyWidth > 900 ) {
        $(".contacts_scroll_height").css({
            "height" : $(".contacts_scroll").height() + "px"
        });
        contactsScrollWrappCoord = $("#contactsScrollWrapp").offset().top;
        contactsScrollBottomCoord = $(".contacts_scroll").offset().top + $(".contacts_scroll").height();
        bottomCoord = $(".contactsScrollBotttomCoord").offset().top;
        if($(document).scrollTop() >= contactsScrollWrappCoord ) {
            $(".contacts_scroll").addClass("fixed");
            $(".contacts_scroll").css({
                "left" : $("#contactsScrollWrapp").offset().left + "px"
            });
            if( ($(document).scrollTop() + $(".contacts_scroll").height() ) >= bottomCoord ) {
                $(".contacts_scroll").addClass("bottom_position");
            } else {
                $(".contacts_scroll").removeClass("bottom_position");
            }
        } else {
            $(".contacts_scroll").removeClass("fixed");
            $(".contacts_scroll").removeClass("bottom_position");
            $(".contacts_scroll").css({
                "left" : 0
            });
        }
    } else {
        $(".contacts_scroll").removeClass("fixed");
        $(".contacts_scroll").removeClass("bottom_position");
        $(".contacts_scroll").css({
            "left" : 0
        });
    }
}

function getfilterNavParams() {
    if($("#filters").length > 0) {
        if($(window).scrollTop() > $("#filters").offset().top ) {
            $(".filter_nav").addClass("fixed");
            $(".filter_resp").addClass("scroll");
            $("#filters").outerHeight($(".filter_nav").outerHeight());
        } else {
            $(".filter_nav").removeClass("fixed");
            $(".filter_resp").removeClass("scroll");
            $("#filters").height(false);
        }
    }
}

function getCardParams() {
    setTimeout(function() {
        if( mouseover == false ) {
            innerWrappHeightArr = [];
            $(".cardsHeight .bc_card").css({
                "height" : "auto"
            });
            $(".cardsHeight .bc_card").each(function() {        
                innerWrapp = $(this).find(".inner_content");
                innerWrappHeight = $(this).height();
                innerWrappHeightArr.push(innerWrappHeight);
            });
            maxHeight = Math.max.apply(null, innerWrappHeightArr);    
            $(".cardsHeight .bc_card").css({
                "height" : maxHeight + "px"
            });
        }
    }, 300);
}

// function getMapParams2() {
//     if($("#mapWrapp").length > 0) {
//         mapWidth = $("#mapWrapp").offset().left + $("#mapWrapp").width();
//         console.log(mapWidth);
//         $(".map_scroll").css({
//             "width" : mapWidth + "px !important"
//         });
//         // $(".objectMap").css({
//         //     "width" : mapWidth + "px !important"
//         // });
//     }
// }

function debounce(func){
  var timer;
  return function(event){
    if(timer) clearTimeout(timer);
    timer = setTimeout(func,100,event);
  };
}

function getBcSlideParams() {
    $(".bc_slider .slide").height($(".bc_slider_wrapp").height());
}

function initialSlider() {
    $(".slider_5").not(".slick-initialized").slick({
        dots: false,
        arrows: true,
        // autoplay: true,
        // autoplaySpeed: 4000,
        speed: 1200,
        slidesToShow: 2,
        slidesToScroll: 2,
        prevArrow: '<button class="slick-prev slider_5_arrow" aria-label="Previous" type="button"><img src="img/left_arrow_bold.svg" alt="" /></button>',
        nextArrow: '<button class="slick-next slider_5_arrow" aria-label="Next" type="button"><img src="img/right_arrow_bold.svg" alt="" /></button>',
        responsive: [
            {
              breakpoint: 660,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
    });
}

function getpaadingLeft() {
    if($("#col1").length > 0 && bodyWidth > 900) {
        paddingLeft = $("#col1").offset().left - $("#threeCols").offset().left;
        $(".leftCol").css({
            "padding-left" : paddingLeft + "px"
        });
    } else {
        $(".leftCol").css({
            "padding-left" : 0
        });
    }
}

function getOrangePillParams() {
    if($("#orangePill").length > 0) {
        if($("#orangePill").hasClass("visible_900")) {
            topOffset = 0;
        } else {
            topOffset = $(window).height() * .7;
        }

        if( $(document).scrollTop() > topOffset ) {
            $("#orangePill").addClass("active");
        } else {
            $("#orangePill").removeClass("active");
        }
    }
}

// function getPointsPosition() {
//     $("#staticChart").find(".ct-point").each(function() {
//         topOffset = $(this).offset().top;
//         leftOffset = $(this).offset().left;
//         widthPointHalf = $(".ct_point_bg").width() / 2;
//         index = $(this).index(".ct-point");
//         pointValue = $(this).attr("ct:value");
//         $(".whiteCircle .ct_point_bg").each(function() {
//             indexCtPointBg = $(this).index(".ct_point_bg");
//             if(pointValue == $(this).attr("data-val") && index == indexCtPointBg) {
//                 $(this).offset({ top: ( topOffset - widthPointHalf - 3 ), left: ( leftOffset - widthPointHalf - 3 ) });
//             }
//         });
//     });   
// }

window.addEventListener('resize', debounce(getCardParams));

var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

var parentBlock;
var HEIGHTCONST;
var screenParam;
var indexElem;
var hide_element;

var bar,
    heightVal,
    chartHeight,
    chartWidth,
    heightModul,
    maxHeight,
    barsLength;

var minVal,
    maxVal,
    leftRange,
    rightRange,
    leftCoord,
    rightCoord,
    values,
    handleLower,
    handleUpperr;

var filtersCoord,
    mapCoord,
    mapScrollBootmCoord,
    bottomCoord;

var innerWrapp;

var mouseover = false;

var slideImgBox;
var imagePath;
var objectSlider;

$(window).resize(function() {
    bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;
    getAdaptivePositionElements();
    getHeaderParams();
    getMapParams();
    getBarsChart();
    getfilterNavParams();
    getCardParams();
    // getMapParams2();
    // -------------
    $(".promo_slider .slide").css({
        "height" : $(".promo_slider").height() + "px"
    });
    // -------------
    getBcSlideParams();
    getContactsPosition();
    getpaadingLeft();
    getOrangePillParams();
    // setTimeout(function() {        
    //     getPointsPosition();
    // }, 300);
    
});

$(window).on("load", function() {
    getCardParams();
    getBarsChart();
});

$(document).scroll(function() {
    getHeaderParams();
    getMapParams();
    getfilterNavParams();
    // getCardParams();
    // getMapParams2();
    getContactsPosition();
    getOrangePillParams();
});

$(document).ready(function() {

    if($(".scroll_y").length > 0) {
        $(".scroll_y").mCustomScrollbar();
    }
    if($(".scroll_x").length > 0) {
        $(".scroll_x").mCustomScrollbar({
            axis:"x"
        });
    }
    if($(".chart_tabs_scrollbar").length > 0) {
        $(".chart_tabs_scrollbar").mCustomScrollbar({
            axis:"x",
            scrollButtons:{ enable: true }
        });
    }
    getHeaderParams();
    getAdaptivePositionElements();
    getMapParams();
    // getBarsChart();
    getfilterNavParams();
    // getCardParams();
    // getMapParams2();
    getContactsPosition();
    getpaadingLeft();
    getOrangePillParams();

    // -------------
    // mouseover = false;
    // $('.bc_card').on('mouseover', function() {
    //     mouseover = true;
    // }).on('mouseleave', function(){
    //     mouseover = false;
    // });

    // $('.bc_card').on('mouseover', function() {
    //     innerWrappHeightArr = [];
    //     thisElem = $(this);
    //     $(".bc_card").each(function() {
    //     // if( mouseover == false ) {
    //         // if( !$(this).siblings() ) {
    //         if( $(this) != thisElem ) {
    //             innerWrapp = $(this).find(".inner_content");
    //             innerWrappHeight = $(this).height();
    //             innerWrappHeightArr.push(innerWrappHeight);
    //         }
    //     // }
    //     });
    //     maxHeight = Math.max.apply(null, innerWrappHeightArr);
    //     $(".bc_card").css({
    //         "height" : maxHeight + "px"
    //     });
    //     console.log(maxHeight);
    // });

    $(".cardsHeight").on('mouseover', function(e) {
        e.preventDefault();
        mouseover = true;
    });

    $(".cardsHeight").on('mouseleave', function(e) {
        e.preventDefault();
        mouseover = false;
        getCardParams();
    });

    // -------------

    $(".top_menu").each(function() {
        $(this).find(".main_nav > li ul").each(function() {
            $(this).addClass("sub-menu");
        });
        $(this).find(".main_nav > li").each(function() {
            if($(this).find(".sub-menu").length > 0) {
                $(this).append("<button type='button' class='menu_btn'></button>");
            }        
        });
    });

    $(".menu_btn").on("click", function(e) {
        e.preventDefault();
        var menuItem = $(this).closest("li").find(".sub-menu");
        if(menuItem.is(":hidden")) {
            menuItem.slideDown(300);
            $(this).addClass("active");
        } else {
            menuItem.slideUp(300);
            $(this).removeClass("active");
        }
    });

$(document).on("click", ".respmenubtn", function(e){
      e.preventDefault();
      // popupName = $(this).attr("data-popup-link");


    if( $("#resp_nav").is(":hidden") ) {
        div = document.createElement('div');
        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        scrollWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);
        $("body").addClass("fixed");
        $("body").css({
          "position" : "fixed",
          "top" :  -$(document).scrollTop() + "px",
          "overflow" : "hidden",
          "right" : 0,
          "left" : 0,
          "bottom" : 0,
          "padding-right" : scrollWidth + "px"
        });
        $("#resp_nav").fadeIn(300);
        $(".respmenubtn").addClass("active");
    } else {
        $("#resp_nav").fadeOut(300);
        $(".respmenubtn").removeClass("active");
        curTop = $("body").css("top");
        curTop = Math.abs(parseInt(curTop, 10));
        $("body").attr("style", "");
        if (curTop !== 0) {
            $("html").scrollTop(curTop);
        }
        $("body").removeClass("fixed");
    }
  });

  // $(".close_popup, .popup_bg").on("click", function(e) {
  //     e.preventDefault();
  //     curTop = $("body").css("top");
  //     curTop = Math.abs(parseInt(curTop, 10));
  //     $("body").attr("style", "");
  //     if (curTop !== 0) {
  //         $("html").scrollTop(curTop);
  //     }
  //     $("body").removeClass("fixed");
  //     $(".popup_bg").fadeOut(300);
  //     $("[data-popup]").fadeOut(300);

  //     setTimeout(function() {
  //       $(".popup_form").removeClass("hide");
  //       $(".succes_wrapp").fadeOut(200);
  //     }, 500);

  // });
  $(this).keydown(function(eventObject){
      if (eventObject.which == 27 ) {
          curTop = $("body").css("top");
          curTop = Math.abs(parseInt(curTop, 10));
          $("body").attr("style", "");
          if (curTop !== 0) {
              $("html").scrollTop(curTop);
          }
            $("body").removeClass("fixed");
            $("#resp_nav").fadeOut(300);
            $(".respmenubtn").removeClass("active");
      }
  });

	$(".search_open").on('click', function(e) {
		e.preventDefault();
		var searchPopup = $(".search_popup");
		searchPopup.toggleClass("active");
        if(!searchPopup.hasClass("active")) {
            $(".search_result").css({
                "display": "none"
            });
        }
	});

    $(".close_x").on('click', function(e) {
        e.preventDefault();
        var searchPopup = $(".search_popup");
        searchPopup.removeClass("active");
        $(".search_result").css({
            "display": "none"
        });
    });

	$(this).keydown(function(eventObject){
        if (eventObject.which == 27) {
			$(".search_popup").removeClass("active");
        }
    });

    $(document).mouseup(function (e){
        hide_element = $(".search_popup")
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
        	$(".search_popup").removeClass("active");
        }
    });

	$(".dropdown_title").on('click', function(e) {		
		e.preventDefault();
		parentBlock = $(this).closest(".dropdowm_wrapp");
		var dropdownMenu = parentBlock.find(".dropdown_menu");
		if(dropdownMenu.is(":hidden")) {
			parentBlock.addClass("active");
			dropdownMenu.slideDown(300);
		} else {			
			dropdownMenu.slideUp(300);
			setTimeout(function() {
				parentBlock.removeClass("active");
			}, 400);
		}
	});

	$(".dropdowm_wrapp ul a").on('click', function(e) {
		e.preventDefault();
		var linkText = $(this).text();
		parentBlock = $(this).closest(".dropdowm_wrapp");
        parentBlock.find(".p_width").text(linkText);
		parentBlock.find(".dropdown_title input").val(linkText);
        parentBlock.find("ul a").removeClass("active");
        $(this).addClass("active");
	});

	$(this).keydown(function(eventObject){
        if (eventObject.which == 27) {
        	$(".dropdown_menu").slideUp(300);
        	setTimeout(function() {
				$(".dropdowm_wrapp").removeClass("active");
			}, 400);
        }
    });

    $(document).mouseup(function(e) {
        hide_element = $(".dropdown_menu");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
        	parentBlock = hide_element.closest(".dropdowm_wrapp");
            hide_element.slideUp(300);
            setTimeout(function() {
                $(".dropdowm_wrapp").each(function() {
                    if($(this).find(".dropdown_menu").is(":hidden")) {
                        $(this).removeClass("active");
                    }
                });
            }, 400);
        }
    });

    $(".text_box").each(function(e) {
        $(this).css({
            "height" : parseInt( $(this).attr("data-minheight") ) + "px"
        });
    });

	$("[data-slidebox-id]").on('click', function(e) {
		e.preventDefault();
		var slideTextName = $(this).attr('data-slidebox-id');
		var slideText = $("#" +slideTextName+"");
        HEIGHTCONST = parseInt(slideText.attr("data-minheight"));
		if(slideText.height() > HEIGHTCONST) {
			slideText.animate({
				"height" : HEIGHTCONST + "px"
			}, 500);
			$(this).removeClass("active");
		} else {
			slideText.animate({
				"height" : slideText.find(".inner_height").height() + "px"
			}, 500);
			setTimeout(function() {
				slideText.css({
					"height" : "auto"
				});
			}, 600);
			$(this).addClass("active");
		}
	});

    var countItem;

    $(".number_list").each(function() {
        countItem = 0;
        $(this).find("li").each(function() {
            countItem++;
            $(this).prepend("<span class='number'>"+countItem+". </span>");
        });
    });

	if( $(".slider_partners").length > 0 ) {
        $(".slider_partners").not(".slick-initialized").slick({
            dots: false,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1200,
            slidesToShow: 6,
            slidesToScroll: 1,
            responsive: [
                {
                  breakpoint: 1220,
                  settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 1000,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 560,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 410,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
            });
    }

	if( $(".testimonial_slider").length > 0 ) {
        $(".testimonial_slider").not(".slick-initialized").slick({
            dots: false,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1200,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            appendArrows: $(".testimonial_slider_contorls"),
            asNavFor: $(".slider_partners_2")
        });
    }

    if( $(".slider_partners_2").length > 0 ) {
        $(".slider_partners_2").not(".slick-initialized").slick({
            dots: false,
            arrows: false,
            slidesToShow: 6,
            slidesToScroll: 1,
            asNavFor: $(".testimonial_slider"),
            responsive: [
                {
                  breakpoint: 1140,
                  settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 960,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 510,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 400,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
            });

    }

    if( $(".slider_2").length > 0 ) {
        $(".slider_2").not(".slick-initialized").slick({
            dots: false,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1200,
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth: true
            // responsive: [
            //     {
            //       breakpoint: 1100,
            //       settings: {
            //         slidesToShow: 2,
            //         slidesToScroll: 1
            //       }
            //     },
            //     {
            //       breakpoint: 900,
            //       settings: {
            //         slidesToShow: 4,
            //         slidesToScroll: 1
            //       }
            //     },
            //     {
            //       breakpoint: 768,
            //       settings: {
            //         slidesToShow: 3,
            //         slidesToScroll: 1
            //       }
            //     },
            //     {
            //       breakpoint: 510,
            //       settings: {
            //         slidesToShow: 2,
            //         slidesToScroll: 1
            //       }
            //     },
            //     {
            //       breakpoint: 400,
            //       settings: {
            //         slidesToShow: 1,
            //         slidesToScroll: 1
            //       }
            //     }
            //   ]
        });
    }

    if( $(".slider_3").length > 0 ) {
        $(".slider_3").not(".slick-initialized").slick({
            dots: false,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1200,
            slidesToShow: 3,
            slidesToScroll: 1,
            appendArrows: $(".slider_3_controls"),
            responsive: [
                {
                  breakpoint: 1130,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 640,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
            ]
        });
    }

    if( $(".slider_4").length > 0 ) {
        $(".slider_4").not(".slick-initialized").slick({
            dots: false,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1200,
            slidesToShow: 3,
            slidesToScroll: 1,
            appendArrows: $(".slider_4_controls"),
            responsive: [
                {
                  breakpoint: 900,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 620,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
            ]
        });
    }

    $("[data-slidedown-btn]").on('click', function(e) {
    	e.preventDefault();
    	var slideBoxName = $(this).attr("data-slidedown-btn");
    	var slideBox = $("[data-slidedown = '"+ slideBoxName +"']");
    	HEIGHTCONST = parseInt( slideBox.attr("data-minheight") );
    	if( slideBox.height() <= HEIGHTCONST)  {
    		slideBox.animate({
    			"height" : slideBox.find(".tags_slidedown").height() + "px"
    		}, 300);
    		setTimeout(function() {
    			slideBox.css({
    				"height" : "auto"
    			});
    		}, 400);
    	}else {
    		slideBox.animate({
    			"height" : HEIGHTCONST + "px"
    		}, 300);
    	}

    });

    if( $(".charts_slider").length > 0 ) {
        $(".charts_slider").not(".slick-initialized").slick({
            dots: false,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1200,
            slidesToShow: 1,
            slidesToScroll: 1,
            appendArrows: $(".charts_slider_controls")
        });
    }

    if($(".object_slider").length > 0) {
        // var slideImgBox;
        // var imagePath;
        // var objectSlider;

        objectSlider = $(".object_slider").not(".slick-initialized").slick({
            dots: false,
            arrows: true,
            autoplay: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            prevArrow: '<button class="slick-prev white_left_arrow" aria-label="Previous" type="button"></button>',
            nextArrow: '<button class="slick-next white_right_arrow" aria-label="Next" type="button"></button>'
        });

        $(".object_slider").each(function() {
            slideImgBox = $(this).find(".slick-current .img_box");
            imagePath = $(this).find(".slick-current .img_box").attr("data-imageurl");
            slideImgBox.find("img").attr("src", imagePath);
        });

        objectSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            slideImgBox = $(this).find("[data-slick-index ="+nextSlide+"] .img_box");
            imagePath = slideImgBox.attr("data-imageurl");
            slideImgBox.find("img").attr("src", imagePath);
        });

        $(".object_card *").on('click', function(e) {
            if($(this).hasClass("slick-prev") || $(this).hasClass("slick-next")) {
                e.preventDefault();
            }
        });

    }

    var mapCheckbox;

    $(".map_checkbox").on('click', function() {
        var mapCheckbox = $(this).find("input");
        if(mapCheckbox.prop("checked")) {
            $("#mapTempl").addClass("mapVisible");
            $("html").scrollTop($("#mapTempl").offset().top - 40);
        } else {
            $("#mapTempl").removeClass("mapVisible");
        }
        $(".object_slider").slick('reinit');
        $(".object_slider").each(function() {
            slideImgBox = $(this).find(".slick-current .img_box");
            imagePath = $(this).find(".slick-current .img_box").attr("data-imageurl");
            slideImgBox.find("img").attr("src", imagePath);
        });
        getCardParams();
        getMapParams();
    });

    if( $(".table_slider").length > 0 ) {
        $(".table_slider").not(".slick-initialized").slick({
            dots: false,
            arrows: true,
            // autoplay: true,
            autoplaySpeed: 4000,
            speed: 1200,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            appendArrows: $(".table_slider_controls")
        });
    }

    var dropdowmMenu;

    $(".dropdown_item_title").on('click', function(e) {
        e.preventDefault();
        parentBlock = $(this).closest(".dropdow_item_wrapp");
        dropdowmMenu = parentBlock.find(".dropdown_item_menu");
        mask = $("#map_box .mask");       
        if($(this).closest(".items_sect").length > 0) {
            $(".dropdown_item_menu").slideUp(300);
            $(".dropdow_item_wrapp").removeClass("visible");
            maskHeight = $(document).height() - $("#map_box").offset().top;
            if(dropdowmMenu.is(":hidden")) {
                $(".item_wrapp").removeClass("z_top");
                parentBlock.closest(".item_wrapp").addClass("z_top");
                mask.addClass("visible");
                mask.height(maskHeight);
            } else {
                mask.removeClass("visible");
            }
            $("#filters_menu").removeClass("visible");
            $(".more_filter").removeClass("active");            
        }        
        if(dropdowmMenu.is(":hidden")) {
            dropdowmMenu.slideDown(300);
            parentBlock.addClass("active");
            getBarsChart();
        } else {
            dropdowmMenu.slideUp(300);
            parentBlock.removeClass("active");
        }
    });

    $("#map_box .mask").on("click", function(e) {
        e.preventDefault();
        $(".dropdown_item_menu").slideUp(300);
        setTimeout(function() {
            $(".dropdow_item_wrapp").removeClass("active");
            $("#map_box .mask").removeClass("visible");
        }, 400);
    });

    var curTop;

    $(".more_filter").on('click', function(e) {
        e.preventDefault();
        if( !$("#filters_menu").hasClass("visible") ) {
            $("#filters_menu").addClass("visible");
            $(this).addClass("active");
            getBarsChart();
            $("body").css({
                "position" : "fixed",
                "top" :  -$(document).scrollTop() + "px",
                "overflow" : "hidden",
                "right" : 0,
                "left" : 0,
                "bottom" : 0
            });
            $("body").addClass("fixed_position");
        } else {
            $("#filters_menu").removeClass("visible");
            $(this).removeClass("active");
            curTop = $("body").css("top");
            curTop = Math.abs(parseInt(curTop, 10));
            $("body").attr("style", "")
            if (curTop !== 0) {
                $("html").scrollTop(curTop);
            }
            $("body").removeClass("fixed_position");
        }
        $(".dropdown_item_menu").slideUp(300);
        $(".dropdow_item_wrapp").removeClass("active");
        $("#map_box .mask").removeClass("visible");
    });

    $(".close_filter").on("click", function(e) {
        e.preventDefault();
        $("#filters_menu").removeClass("visible");
        $("body").removeClass("fixed_position");
        curTop = $("body").css("top");
        curTop = Math.abs(parseInt(curTop, 10));
        $("body").attr("style", "")
        if (curTop !== 0) {
            $("html").scrollTop(curTop);
        }
        $(".more_filter").removeClass("active");
        $(".dropdown_item_menu").slideUp(300);
        $(".dropdow_item_wrapp").removeClass("active");
        $("#map_box .mask").removeClass("visible");
    });

    $(".mask_2").on("click", function() {
        $("#filters_menu").removeClass("visible");
        $(".more_filter").removeClass("active");
        $("body").removeClass("fixed_position");
        curTop = $("body").css("top");
        curTop = Math.abs(parseInt(curTop, 10));
        $("body").attr("style", "")
        if (curTop !== 0) {
            $("html").scrollTop(curTop);
        }
    });

    $(this).keydown(function(eventObject){
        if (eventObject.which == 27) {
            $("#filters_menu").removeClass("visible");
            $(".more_filter").removeClass("active");
            $(".dropdown_item_menu").slideUp(300);
            $("body").removeClass("fixed_position");
            curTop = $("body").css("top");
            curTop = Math.abs(parseInt(curTop, 10));
            $("body").attr("style", "")
            if (curTop !== 0) {
                $("html").scrollTop(curTop);
            }
            setTimeout(function() {
                $(".dropdow_item_wrapp").removeClass("active");
                $("#map_box .mask").removeClass("visible");
            }, 400);
        }
    });

    $(document).mouseup(function(e) {
        hide_element = $(".dropdown_item_menu");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
                hide_element.slideUp(300);
                setTimeout(function() {
                    $(".dropdown_item_menu").each(function() {
                        if($(this).is(":hidden")) {
                            $(this).closest(".dropdow_item_wrapp").removeClass("active");
                        }
                    });                    
                }, 400);
                $("#map_box .mask").removeClass("visible");
        }
    });

    // Custom Select 

    $(".custom_select .select_input").on("click", function(e) {
        e.preventDefault();
        parentBlock = $(this).closest(".custom_select");
        dropdowmMenu = parentBlock.find(".dropdown_select");
        if(dropdowmMenu.is(":hidden")) {
            dropdowmMenu.slideDown(200);
            parentBlock.addClass("active");
        } else {
            dropdowmMenu.slideUp(200);
            parentBlock.removeClass("active");
        }
    });

    $(this).keydown(function(eventObject){
        if (eventObject.which == 27) {
            $(".dropdown_select").slideUp(300);
            setTimeout(function() {
                $(".custom_select").removeClass("active");
            }, 400);
        }
    });

    $(document).mouseup(function(e) {
        hide_element = $(".dropdown_select");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
            hide_element.slideUp(300);
            setTimeout(function() {
                $(".dropdown_select").each(function() {
                    if($(this).is(":hidden")) {
                        $(this).closest(".custom_select").removeClass("active");
                    }
                });
            }, 400);
        }
    });

    $(".select_item p").on("click", function(e) {
        e.preventDefault();
        var itemText = $(this).text();
        parentBlock = $(this).closest(".custom_select");
        var inputVal = parentBlock.find(".select_input .sel_val");
        parentBlock.find(".select_res").val(itemText);
        inputVal.html(itemText);
        if(inputVal.attr("id") == "price_sel" ) {
            $(".price_resp").html(itemText);
        }
    });

    // Range Slider

    if( document.getElementById("range_slider_2") ) {
        priceSlider2 = document.getElementById("range_slider_2");
        noUiSlider.create(priceSlider2, {
          start: [ 1000, 50000 ],
          range: {
              'min': [ 0 ],
              'max': [ 100000 ]
          },
          connect: true,
            format: wNumb({
                decimals: 0
            })
        });
        priceSlider2.noUiSlider.on('update', function( values, handle ) {
            minVal = parseInt( values[0] );
            maxVal = parseInt( values[1] );
            $("#input-number_1").val(minVal);
            $("#input-number_2").val(maxVal);
            leftRange = minVal;
            rightRange = maxVal;
            handleLower = $("#range_slider_2").find(".noUi-handle-lower");
            handleUpperr = $("#range_slider_2").find(".noUi-handle-upper");
            leftCoord = handleLower.offset().left;
            rightCoord = handleUpperr.offset().left;
            barsCharts = handleLower.closest(".bars_range_wrapp");
            barsCharts.find(".bars .bar").each(function() {
                if( $(this).offset().left > leftCoord && $(this).offset().left < rightCoord ) {
                    $(this).removeClass("disable");
                } else {
                    $(this).addClass("disable");
                }
            });
            $("[data-filters-index='filters_3'] .minVal2").html(leftRange);
            $("[data-filters-index='filters_3'] .maxVal2").html(rightRange);
            $(".price_resp").html($("#price_sel").html());
            // $(".price_values").text($("#price_sel").text()[0] + " " + $("#input-number_1").val()+" - "+ $("#input-number_2").val());
        });
        priceSlider2.noUiSlider.on('set', function( values, handle ) {
            setTimeout(function() {           
                handleLower = $("#range_slider_2").find(".noUi-handle-lower");
                handleUpperr = $("#range_slider_2").find(".noUi-handle-upper");
                leftCoord = handleLower.offset().left;
                rightCoord = handleUpperr.offset().left;
                barsCharts = handleLower.closest(".bars_range_wrapp");
                barsCharts.find(".bars .bar").each(function() {
                    if( $(this).offset().left > leftCoord && $(this).offset().left < rightCoord ) {
                        $(this).removeClass("disable");
                    } else {
                        $(this).addClass("disable");
                    }
                });
            }, 500);
            $("[data-filters-index='filters_3'] .minVal2").html(minVal);
            $("[data-filters-index='filters_3'] .maxVal2").html(maxVal);
            $(".price_resp").html($("#price_sel").html());
            $(".price_values").text($("#price_sel").text()[0] + " " + $("#input-number_1").val()+" - "+ $("#input-number_2").val());
        });
        $("#input-number_1").keyup(function() {
            activeInputVal = parseInt( $(this).val() );
            if( activeInputVal < parseInt( $("#input-number_2").val() ) ) {
                leftRange = parseInt( $(this).val() );
                priceSlider2.noUiSlider.set([leftRange, null]);
            }
        });
        $("#input-number_2").keyup(function() {
          activeInputVal = parseInt( $(this).val() );
          if( activeInputVal > parseInt( $("#input-number_1").val() ) ) {
              rightRange = parseInt( $(this).val() );
              priceSlider2.noUiSlider.set([null, rightRange]);
          }
        });
    }

    if( document.getElementById("range_slider_3") ) {
        priceSlider3 = document.getElementById("range_slider_3");
        noUiSlider.create(priceSlider3, {
          start: [ 1000 ],
          range: {
              'min': [ 0 ],
              'max': [ 100000 ]
          },
          connect: [true, false],
          tooltips: true,
            format: wNumb({
                decimals: 0
            }),
        });
        priceSlider3.noUiSlider.on('update', function( values, handle ) {
            minVal = parseInt( values[0] );
            $("#metro_val").text(minVal);
            $("#metro_name").html($("#metro_name_val a").html());
            if( parseInt( $("#range_slider_3 .noUi-tooltip").text() ) <= 0) {
                $("#range_slider_3 .noUi-tooltip").text("не важно");
            }
        });
        priceSlider3.noUiSlider.on('set', function( values, handle ) {
            if( parseInt( $("#range_slider_3 .noUi-tooltip").text() ) <= 0) {
                $("#range_slider_3 .noUi-tooltip").text("не важно");
            }
            setTimeout(function() {
                handleLower = $("#range_slider_3").find(".noUi-handle-lower");
                leftCoord = handleLower.offset().left;
                barsCharts = handleLower.closest(".bars_range_wrapp");
                barsCharts.find(".bars .bar").each(function() {
                    if( $(this).offset().left < leftCoord ) {
                        $(this).removeClass("disable");
                    } else {
                        $(this).addClass("disable");
                    }
                });
            }, 500);
        });
    }

    if( document.getElementById("range_slider_4") ) {
        priceSlider4 = document.getElementById("range_slider_4");
        noUiSlider.create(priceSlider4, {
          start: [ 1000, 3500 ],
          range: {
              'min': [  0 ],
              'max': [ 8906 ]
          },
          connect: true,
            format: wNumb({
                decimals: 0
            })
        });
        inputNumberMin = document.getElementById("input-number_5");
        inputNumberMax = document.getElementById("input-number_6");

        priceSlider4.noUiSlider.on('update', function( values, handle ) {
            minVal = parseInt( values[0] );
            maxVal = parseInt( values[1] );
            leftRange = maxVal;
            rightRange = maxVal;
            $("#input-number_5").val(minVal);
            $("#input-number_6").val(maxVal);
            handleLower = $("#range_slider_4").find(".noUi-handle-lower");
            handleUpperr = $("#range_slider_4").find(".noUi-handle-upper");
            leftCoord = handleLower.offset().left;
            rightCoord = handleUpperr.offset().left;
            barsCharts = handleLower.closest(".bars_range_wrapp");
            barsCharts.find(".bars .bar").each(function() {
                if( $(this).offset().left > leftCoord && $(this).offset().left < rightCoord ) {
                    $(this).removeClass("disable");
                } else {
                    $(this).addClass("disable");
                }
            });
            $("[data-filters-index='filters_4'] .minVal").html(minVal);
            $("[data-filters-index='filters_4'] .maxVal").html(maxVal);   
        });

        priceSlider4.noUiSlider.on('set', function( values, handle ) {
            setTimeout(function() { 
                handleLower = $("#range_slider_4").find(".noUi-handle-lower");
                handleUpperr = $("#range_slider_4").find(".noUi-handle-upper");
                leftCoord = handleLower.offset().left;
                rightCoord = handleUpperr.offset().left;
                barsCharts = handleLower.closest(".bars_range_wrapp");
                barsCharts.find(".bars .bar").each(function() {
                    if( $(this).offset().left > leftCoord && $(this).offset().left < rightCoord ) {
                        $(this).removeClass("disable");
                    } else {
                        $(this).addClass("disable");
                    }
                });
            }, 500);
        });

        $("#input-number_5").keyup(function() {
            activeInputVal = parseInt( $(this).val() );
            if( activeInputVal < parseInt( $("#input-number_6").val() ) ) {
                leftRange = parseInt( $(this).val() );
                priceSlider4.noUiSlider.set([leftRange, null]);
            }
        });
        $("#input-number_6").keyup(function() {
          activeInputVal = parseInt( $(this).val() );
          if( activeInputVal > parseInt( $("#input-number_5").val() ) ) {
              rightRange = parseInt( $(this).val() );
              priceSlider4.noUiSlider.set([null, rightRange]);
          }
        });
    }

    var imagesArrayPaths = [];
    var index,
        imagesPathParent,
        pathVal,
        galleryimagesLinks;

    $("[data-photogallerylink]").on("click", function(e) {
        e.preventDefault();
        $(".photo_gallery").html("");
        imagesArrayPaths = [];
        index = $(this).attr("data-photogallerylink");
        imagesPathParent = $("[data-photogalleryindex ='"+ index +"' ]");
        imagesPathParent.find("[data-imagepath]").each(function() {
            pathVal = $(this).attr("data-imagepath");
            imagesArrayPaths.push(pathVal);
        });
        galleryimagesLinks = "";
        jQuery.each( imagesArrayPaths, function( i, val ) {
            galleryimagesLinks += '<a href="'+val+'" data-fancybox="1"><img src="'+val+'" alt="#" /></a>';
        });
        $(".photo_gallery").html(galleryimagesLinks);
        $(".photo_gallery [data-fancybox]:eq(0)").trigger("click");
    });

    var selectVal,
        selectList;

    $(".custom_select_item").on("click", function(e) {
        e.preventDefault();
        selectVal = $(this).html();
        parentBlock = $(this).closest(".custom_select_2");
        parentBlock.find(".custom_select_title").html(selectVal);
        parentBlock.find(".custom_select_item").removeClass("selected");
        $(this).addClass("selected");
        if(parentBlock.find(".custom_select_title").attr("id") == "metro_name_val") {
            $("#metro_name").html(selectVal);
        }
    });

    $(".custom_select_title").on("click", function(e) {
        e.preventDefault();
        parentBlock = $(this).closest(".custom_select_2");
        dropdowmMenu = parentBlock.find(".custom_select_list");
        if(dropdowmMenu.is(":hidden")) {
            dropdowmMenu.slideDown(200);
            parentBlock.addClass("active");
        } else {
            dropdowmMenu.slideUp(200);
            parentBlock.removeClass("active");
        }
    });

    $(this).keydown(function(eventObject){
        if (eventObject.which == 27) {
            $(".custom_select_list").slideUp(300);
            setTimeout(function() {
                $(".custom_select_2").removeClass("active");
            }, 400);
        }
    });

    $(document).mouseup(function(e) {
        hide_element = $(".custom_select_list");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
            hide_element.slideUp(300);
            setTimeout(function() {
                $(".custom_select_list").each(function() {
                    if($(this).is(":hidden")) {
                        $(this).closest(".custom_select_2").removeClass("active");
                    }
                });
            }, 400);
        }
    });

    // ------------------
    var filtersIndex;
    var filtersArray;

    $("[data-filter]").on("click", function() {
        if(!$(this).hasClass("checked_filter")) {
            $(this).addClass("checked_filter");
            filtersIndex = $(this).attr("data-filter");                       
        } else {
            $(this).removeClass("checked_filter");
        }
        filtersArray = []; 
        $("[data-filter = '"+ filtersIndex +"']").each(function() {
            if($(this).hasClass("checked_filter") ) {
                filtersArray.push($(this).text());
            }
        });
        $("[data-filters-index = '"+filtersIndex+"']").text(filtersArray);
    });

    $("[data-radio-filter]").on("click", function() {
        filtersIndex = $(this).attr("data-radio-filter");
        filtersArray = "";
        $("[data-filters-index = '"+filtersIndex+"']").text($(this).html());
    });

    // -----------------

    $(".rotate_btn").on("click", function(e) {
        e.preventDefault();
        $(this).toggleClass("rotate");
    });

    // -----------------

    var chChildrens;

    $(".main_checkbox input").on("change", function() {
        parentBlock = $(this).closest(".checkboxes_array");
        chChildrens = parentBlock.find(".ch_childrens input");
        if($(this).is(":checked")) {
            chChildrens.prop("checked", true);
        } else {
            chChildrens.prop("checked", false);
        }
    });

    $(".ch_childrens input").on("change", function() {
        parentBlock = $(this).closest(".checkboxes_array");
        chChildrens = parentBlock.find(".ch_childrens input");
        mainCheckbox = parentBlock.find(".main_checkbox input");
        chChildrens.each(function() {
            if(!$(this).is(":checked")) {
                mainCheckbox.prop("checked", false);
                return false;
            } else {
                mainCheckbox.prop("checked", true);
            }
        });
    });

    // -----------

    $(".main_checkbox_wrapp .dropdown_btn").on("click", function(e) {
        e.preventDefault();
        parentBlock = $(this).closest(".checkboxes_array");
        dropdowmMenu = parentBlock.find(".ch_childrens");
        if(dropdowmMenu.is(":hidden")) {
            dropdowmMenu.slideDown(300);
            $(this).addClass("active");
        } else {
            dropdowmMenu.slideUp(300);
            $(this).removeClass("active");
        }
    });

    // ------------

    if( $(".promo_slider").length > 0 ) {

        $(".promo_slider").on('init', function(){
            $(".promo_slider .slide").css({
                "height" : $(".promo_slider").height() + "px"
            });
        });

        $(".promo_slider").not(".slick-initialized").slick({
            dots: false,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1200,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            appendArrows: $(".promo_slider_arrows"),
            prevArrow: '<button class="slick-prev white_left_arrow" aria-label="Previous" type="button"></button>',
            nextArrow: '<button class="slick-next white_right_arrow" aria-label="Next" type="button"></button>'
        });
    }

    // ------------

    var chIndex, countCh;

    $("[data-ch]").on("change", function() {
        chIndex = $(this).attr("data-ch");
        countCh = 0;
        $("[data-ch ='"+chIndex+"']").each(function() {
            if($(this).is(":checked")) {
                countCh++;
            }
        });
        if(countCh == 0) {
            $("[data-count-ch ='"+chIndex+"']").text("");
        } else {
            $("[data-count-ch ='"+chIndex+"']").text(": "+countCh);
        }        
    });

    $("[data-main-ch]").on("change", function() {
        chIndex = $(this).attr("data-main-ch");
        countCh = 0;
        $("[data-ch ='"+chIndex+"']").each(function() {
            if($(this).is(":checked")) {
                countCh++;
            }
        });
        if(countCh == 0) {
            $("[data-count-ch ='"+chIndex+"']").text("");
        } else {
            $("[data-count-ch ='"+chIndex+"']").text(": "+countCh);
        }        
    });

    // ----------
    $(".close_popup, .popup_bg").on("click", function(e) {
        e.preventDefault();
        curTop = $("body").css("top");
        curTop = Math.abs(parseInt(curTop, 10));
        $("body").attr("style", "");
        if (curTop !== 0) {
            $("html").scrollTop(curTop);
        }
        $("body").removeClass("fixed");
        $(".popup_bg").fadeOut(300);
        $("[data-popup]").fadeOut(300);
    });
    $(this).keydown(function(eventObject){
        if (eventObject.which == 27 ) {
            curTop = $("body").css("top");
            curTop = Math.abs(parseInt(curTop, 10));
            $("body").attr("style", "");
            if (curTop !== 0) {
                $("html").scrollTop(curTop);
            }
            $("body").removeClass("fixed");
            $(".popup_bg").fadeOut(300);
            $("[data-popup]").fadeOut(300);
        }
    });
    $(document).on("mouseup", function(e) {
      if($(".popup").is(":visible")) {
        e.preventDefault();
        hide_element = $(".popup_content");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
            curTop = $("body").css("top");
            curTop = Math.abs(parseInt(curTop, 10));
            $("body").attr("style", "");
            if (curTop !== 0) {
                $("html").scrollTop(curTop);
            }
            $("body").removeClass("fixed");
            $(".popup_bg").fadeOut(300);
            $("[data-popup]").fadeOut(300);
        }
      }
    });

    // -------------

    $(".slideBtn").on("click", function(e) {
        e.preventDefault();
        $(this).toggleClass("active");
        parentBlock = $(this).closest(".bc_card");
        slideBlock = parentBlock.find(".slide_block");
        if($(this).hasClass("active")) {
            slideBlock.slideDown(300);
        } else {
            slideBlock.slideUp(300);
        }
    });

    // ------------

    if( $(".slider_companies").length > 0 ) {
        $(".slider_companies").not(".slick-initialized").slick({
            dots: false,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1200,
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth: true
            // appendArrows: $(".slider_4_controls"),
            // responsive: [
            //     {
            //       breakpoint: 550,
            //       settings: {
            //         slidesToShow: 2,
            //         slidesToScroll: 1
            //       }
            //     },
            //     {
            //       breakpoint: 400,
            //       settings: {
            //         slidesToShow: 1,
            //         slidesToScroll: 1
            //       }
            //     }
            // ]
        });
    }

    // ------------

    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var hrefAttr = $(this).attr("href");
        if( hrefAttr.length > 0 && hrefAttr != "#" ) {
            $('html, body').stop().animate({
                'scrollTop': $(hrefAttr).offset().top - 100
            }, 500);
        }
    });

    // ------------

    if( $(".bc_slider").length > 0 ) {

        $(".bc_slider").on('init', function(){
            // $(".appendBcDots ul li").each(function() {
            //     index = $(this).index();
            //     imgPath = $(".bc_miniatures_images > div:eq("+index+")").attr("data-imgminiature-path");
            //     $(this).find("button").css({
            //         "background-image" : "url("+imgPath+")"
            //     });
            // });
            getBcSlideParams();
        });

        $(".bc_slider").not(".slick-initialized").slick({
            dots: false,
            // autoplay: true,
            autoplaySpeed: 4000,
            speed: 1200,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            prevArrow: $("#bcRightArrow"),
            nextArrow: $("#bcLeftArrow"),
            // appendDots: $(".appendBcDots")
            // appendArrows: $(".testimonial_slider_contorls"),
            // asNavFor: $(".slider_partners_2")
        });
    }

    // ------------

    $("[data-dropdown-link]").on("click", function(e) {
        e.preventDefault();
        dropdown = $("[data-dropdown-box = '"+ $(this).attr("data-dropdown-link") +"']");
        if( dropdown.is(":hidden") ) {
            dropdown.slideDown(300);
            $(this).addClass("active");
        } else {
            dropdown.slideUp(300);
            $(this).removeClass("active");
        }
    });

    // ------------

    $(".dropdown_row_title_sub").on("click", function(e) {
        e.preventDefault();
        parent = $(this).closest(".dropdown_row_wrapp");
        dropdown = parent.find(".dropdown_row_content");
        parentWrapp = $(this).closest(".table_body");
        if(dropdown.height() <= 0) {
            parentWrapp.find(".dropdown_row_wrapp, .dropdown_row_title_sub").removeClass("active");
            slider = parent.find(".slider_5");                                   
            slider.not(".slick-initialized").slick({
                dots: false,
                arrows: true,
                // autoplay: true,
                // autoplaySpeed: 4000,
                speed: 1200,
                slidesToShow: 2,
                slidesToScroll: 2,
                prevArrow: '<button class="slick-prev slider_5_arrow" aria-label="Previous" type="button"><img src="img/left_arrow_bold.svg" alt="" /></button>',
                nextArrow: '<button class="slick-next slider_5_arrow" aria-label="Next" type="button"><img src="img/right_arrow_bold.svg" alt="" /></button>',
                // appendArrows: $(".slider_4_controls"),
                responsive: [
                    {
                      breakpoint: 660,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    }
                ]
            });
            parent.addClass("active");
            $(this).addClass("active");
        } else {
            $(this).removeClass("active");
            parent.removeClass("active"); 
        }
    });

    if( $(".slider_5").length > 0 ) {
                                 
        $(".slider_5").not(".slick-initialized").slick({
            dots: false,
            arrows: true,
            // autoplay: true,
            // autoplaySpeed: 4000,
            speed: 1200,
            slidesToShow: 2,
            slidesToScroll: 2,
            prevArrow: '<button class="slick-prev slider_5_arrow" aria-label="Previous" type="button"><img src="img/left_arrow_bold.svg" alt="" /></button>',
            nextArrow: '<button class="slick-next slider_5_arrow" aria-label="Next" type="button"><img src="img/right_arrow_bold.svg" alt="" /></button>',
            // appendArrows: $(".slider_4_controls"),
            responsive: [
                {
                  breakpoint: 660,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
            ]
        });

    }


    $('.slider_5 .slide').on('click', function(e) {
        e.preventDefault();
        parent = $(this).closest(".slider_5");
        parent.find(".slick-next").trigger("click");
    });

    // -----------

    $(".photo_gallery_bc_wrapp [data-dropdown-link]").on("click", function() {
        parent = $(this).closest(".photo_gallery_bc_wrapp");
        dataFancyboxAttr = parent.find(".gal_img_box:eq(0)").attr('data-fancybox');
        dropdownGalleryImgBox = parent.find(".photo_gallery_bc_dropdown .gal_img_box");
        if($(this).hasClass("active")) {
            dropdownGalleryImgBox.attr("data-fancybox", dataFancyboxAttr);
        } else {
            dropdownGalleryImgBox.attr("data-fancybox", "");
        }
    });

    // --------------

    $(".show_tel_link").on("click", function(e) {
        e.preventDefault();
        parent = $(this).closest(".tel_number_wrapp");
        parent.addClass("telVisible");
    });

    // --------------


    if( $(".sort_slider").length > 0 ) {      

        $(".sort_slider").not(".slick-initialized").slick({
            dots: false,
            arrows: true,
            // autoplay: true,
            autoplaySpeed: 4000,
            speed: 1200,
            slidesToShow: 4,
            slidesToScroll: 3,
            // variableWidth: true,
            appendArrows: $(".sort_slider_arrows .row"),
            prevArrow: '<button class="slick-prev sort_slider_arrow" aria-label="Previous" type="button"><img src="img/blue_arrow_left.png" alt="" /></button>',
            nextArrow: '<button class="slick-next sort_slider_arrow" aria-label="Next" type="button"><img src="img/blue_arrow_right.png" alt="" /></button>',
            responsive: [
                {
                  breakpoint: 1220,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                  }
                },
                {
                  breakpoint: 920,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 580,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
            ]
        });
    }    

    // ---------------

    $(".more_socials").on("click", function(e) {
        e.preventDefault();
        parent = $(this).closest(".socials_list");
        parent.find(".hide_soc").addClass("visible");
        $(this).closest("li").remove();
    });

    // ---------------

    // $('.datapicker').datepicker({
    //     position: "bottom left"
    // });

    // $('.only_time').datepicker({
    //     dateFormat: ' ',
    //     timepicker: true,
    //     classes: 'only_timepicker',
    //     position: "bottom right"
    // });

    if($(".tel_input").length > 0) {
        $(".tel_input").mask("+9(999) 999-9999");
    }

    // ---------------

    $(".like_link").on("click", function(e) {
        e.preventDefault();
        $(this).toggleClass("active");
    });

    // ---------------

    $(".items_show").on("click", function(e) {
        e.preventDefault();
        items = $(this).attr("data-items-btn");
        parent = $("[data-items = '"+items+"']");
        if($(this).hasClass("active")) {
           parent.find(".list_item.hiden").removeClass("active");
           $(this).removeClass("active"); 
        } else {
            parent.find(".list_item.hiden").addClass("active");
            $(this).addClass("active"); 
        }
    });

    // ---------------

    $(".del_comment").on("click", function(e) {
        e.preventDefault();
        parent = $(this).closest(".comment_item");
        parent.remove();
    });

    // ---------------

    $(".tag_2").on("click", function(e) {
        e.preventDefault();
        hrefAttr = $(this).attr("href");
        if( hrefAttr.length > 0 && hrefAttr != "#" ) {
            $(hrefAttr).find(".dropdown_btn_2").click();
        }
    });

    // ---------------

    $(".hidden_tel").on("click", function(e) {
        e.preventDefault();
        $(this).addClass("active");
    });

    // ---------------

    if( $(".office_slider").length > 0 ) {

        $('.office_slider').not(".slick-initialized").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            // asNavFor: '.office_slider_miniatures',
            prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><img src="img/left_chevron.svg"></button>',
            nextArrow: '<button class="slick-next" aria-label="Next" type="button"><img src="img/right_chevron.svg"></button>'
        });

        // $('.office_slider_miniatures').not(".slick-initialized").slick({
        //     slidesToShow: 5,
        //     slidesToScroll: 1,
        //     asNavFor: '.office_slider',
        //     dots: false,
        //     // centerMode: true,
        //     variableWidth: true,
        //     focusOnSelect: true
        // });

    }

    // ---------------

    $(".scroll_thumb_table").on("click", function (e) {
        e.preventDefault();
        $(".scroll_thumb_table").removeClass("active");
        $(this).addClass("active");
    });

    // ---------------

    if( $("[data-static-chart]").length> 0 ) {

        var chart;

        $("[data-static-chart]").each(function() {
            chartName = $(this).attr("data-static-chart");
            chartLabels = [];
            chartSeries = [];
            $("[data-static-chart-values = '"+chartName+"'] .dataVal").each(function() {
                chartLabels.push($(this).attr("data-val-x"));
                chartSeries.push( parseInt($(this).attr("data-val-y")) );
            });
            chart = new Chartist.Line("[data-static-chart = '"+chartName+"']", {
              labels: chartLabels,
              series: [
                chartSeries
              ]
                }, {
                // high: 30,
                low: 0,
                showArea: true,
                fullWidth: true,
                lineSmooth: false,
                axisY: {
                    offset: 3
                },
                axisX: {
                    offset: 60
                }
            });

            chart.on('draw', function(data) {
              if(data.type === 'point') {
                var circle = new Chartist.Svg('circle', {
                  r:"12",
                  cx: data.x,
                  cy: data.y,          
                  style: 'fill:#fff'
                }, 'ct-point');
                data.element.replace(circle);
              }
            });

        });
    }


    function getScrollbarArrows() {
        $("[data-tabs]").each(function() {
            tabsName = $(this).attr("data-tabs");
            if($(this).find(".mCSB_scrollTools_horizontal").is(":hidden") ) {
                $("[data-tabs-arrows = '"+tabsName+"']").addClass("noactive");
            } else {
                $(this).mCustomScrollbar({
                    axis:"x",
                    scrollButtons:{ enable: true }
                });
                $("[data-tabs-arrows = '"+tabsName+"']").removeClass("noactive");
            }
        });
    }

    $(window).on("load", function() {
        $("[data-static-chart]").each(function() {
            parent = $(this);
            chartName = $(this).attr("data-static-chart");
            $("[data-static-chart = '"+chartName+"']").find(".ct-point").each(function() {
                chart = $(this).closest("[data-static-chart]");
                index = $(this).index(".ct-point");
                ctPoint = $(this);
                chartBarBg = chart.find(".chart_bar_bg");
                leftCoord = parseInt( $(this).attr("cx") );
                barHeight = parseInt( parent.find(".ct-vertical:eq(0)").attr("y1") ) - parseInt( $(this).attr("cy") );
                barWidth = parseInt( parent.find(".ct-point:eq(1)").attr("cx") ) - parseInt( parent.find(".ct-point:eq(0)").attr("cx"));
                $("[data-static-chart-values = '"+chartName+"']").find(".dataVal").each(function() {
                    valIndex = $(this).index(".dataVal");
                    if(index == valIndex) {
                        chartBarBg.find(".chart_bar_hover").each(function() {
                            valIndex = $(this).index(".chart_bar_hover");
                            if(index == valIndex) {
                                $(this).css({
                                    "width" : barWidth + "px",
                                    "height" : barHeight + "px",
                                    "left" : leftCoord + "px"
                                });
                            }
                        });
                    }
                });
            });

            chartWidth = $(this).width();
            $("[data-static-chart = '"+chartName+"']").find(".ct-point").each(function() {
                xCoord = $(this).attr("cx");
                xPercent = (xCoord * 100) / chartWidth;
                if( xPercent >= 0 && xPercent <= 25) {
                    $(this).addClass("green_1");
                }
                if( xPercent >= 26 && xPercent <= 50) {
                    $(this).addClass("green_2");
                }
                if( xPercent >= 51 && xPercent <= 75) {
                    $(this).addClass("blue_1");
                }
                if( xPercent >= 75 && xPercent <= 100) {
                    $(this).addClass("blue_2");
                }
            });

        });

        $(".static_chart .ct-end").each(function() {
            parent = $(this).closest("foreignObject");
            parent.addClass("horizontal_val");
        });

        if(bodyWidth <= 600) {
            $(".static_chart .ct-point").attr("r", "8");
        } else {
            $(".static_chart .ct-point").attr("r", "12");
        }

        $("[data-tabs]").each(function() {
            tabsName = $(this).attr("data-tabs");
            leftArrow = $(this).find(".mCSB_buttonLeft");
            rightArrow = $(this).find(".mCSB_buttonRight");
            leftArrow.appendTo("[data-tabs-arrows = '"+tabsName+"'");
            rightArrow.appendTo("[data-tabs-arrows = '"+tabsName+"'");
        });

        getScrollbarArrows();

    });

    $(window).on("resize", function() {

        setTimeout(function() {
            $("[data-static-chart]").each(function() {
                chartName = $(this).attr("data-static-chart");
                chartWidth = $(this).width();
                $("[data-static-chart = '"+chartName+"']").find(".ct-point").each(function() {
                    xCoord = $(this).attr("cx");
                    xPercent = (xCoord * 100) / chartWidth;
                    if( xPercent >= 0 && xPercent <= 25) {
                        $(this).addClass("green_1");
                    }
                    if( xPercent >= 26 && xPercent <= 50) {
                        $(this).addClass("green_2");
                    }
                    if( xPercent >= 51 && xPercent <= 75) {
                        $(this).addClass("blue_1");
                    }
                    if( xPercent >= 75 && xPercent <= 100) {
                        $(this).addClass("blue_2");
                    }
                });

                parent = $(this);
                chartName = $(this).attr("data-static-chart");
                $("[data-static-chart = '"+chartName+"']").find(".ct-point").each(function() {
                    chart = $(this).closest("[data-static-chart]");
                    index = $(this).index(".ct-point");
                    ctPoint = $(this);
                    chartBarBg = chart.find(".chart_bar_bg");
                    leftCoord = parseInt( $(this).attr("cx") );
                    barHeight = parseInt( parent.find(".ct-vertical:eq(0)").attr("y1") ) - parseInt( $(this).attr("cy") );
                    barWidth = parseInt( parent.find(".ct-point:eq(1)").attr("cx") ) - parseInt( parent.find(".ct-point:eq(0)").attr("cx"));
                    chartBarBg.find(".chart_bar_hover").each(function() {
                        valIndex = $(this).index(".chart_bar_hover");
                        if(index == valIndex) {
                            $(this).css({
                                "width" : barWidth + "px",
                                "height" : barHeight + "px",
                                "left" : leftCoord + "px"
                            });
                        }
                    });
                });
            });
            if(bodyWidth <= 600) {
                $(".static_chart .ct-point").attr("r", "8");
            } else {
                $(".static_chart .ct-point").attr("r", "12");
            }
            getScrollbarArrows();
        }, 500);        
        
    });

    // --------------------

    $("[data-valtypechart]").on("change", function() {
        valType = $(this).val();
        chartName = $(this).attr("data-valtypechart");
        chart = $("[data-static-chart = '"+chartName+"']");
        chart.find(".valType").text(valType);
    });

    // --------------------

    $(".chart_bar_hover").on("mouseover", function() {
        parent = $(this).closest(".static_chart");
        maxRightCoord = parent.offset().left + parent.width() - 20;
        maxLeftCoord = parent.offset().left;
        tooltip = $(this).find(".ct_point_tooltip");
        tooltipRightCoord = tooltip.offset().left + tooltip.outerWidth();
        tooltipLeftCoord = tooltip.offset().left;
        if(tooltipRightCoord >= maxRightCoord) {
            $(this).addClass("lastChart");
        }
        if(tooltipLeftCoord <= maxLeftCoord) {
            $(this).addClass("firstChart");
        }
    });

    // --------------------
    //  Chart Slider
    // --------------------

    $("[data-chart-slider-arrow]").on("click", function(e) {
        e.preventDefault();
        chartName = $(this).attr("data-chart-slider-arrow");
        chartSlider = $("[data-chart-slider = '"+chartName+"']");        
        indexActiveSlide = chartSlider.find(".chart_slide.active").index(".chart_slide");
        chartSlidesCount = chartSlider.find(".chart_slide").length;
        chartSlider.find(".chart_slide").removeClass("active");
        if( $(this).hasClass("next") ) {
            nextSlideIndex = indexActiveSlide + 1;
            if(nextSlideIndex < chartSlidesCount) {
                chartSlider.find(".chart_slide:eq("+nextSlideIndex+")").addClass('active');
            } else {
                chartSlider.find(".chart_slide:eq(0)").addClass('active');
            }            
        }
        if( $(this).hasClass("prev") ) {
            nextSlideIndex = indexActiveSlide - 1;
            if(nextSlideIndex >= 0) {
                chartSlider.find(".chart_slide:eq("+nextSlideIndex+")").addClass('active');
            } else {
                chartSlider.find(".chart_slide:eq("+ (chartSlidesCount - 1) +")").addClass('active');
            }
        }
    });

    // -------------------

    $(".chart_tab").on("click", function() {
        parent = $(this).closest(".chart_tabs_scrollbar");
        parent.find(".chart_tab").removeClass("active");
        $(this).addClass("active");
    });

    // -------------------

    $(".ac_tag .del_tag").on("click", function() {
        parent = $(this).closest(".ac_tag");
        parent.remove();
    });

    // -------------------

    $(".kviz .next_pill").on("click", function(e) {
        e.preventDefault();
        parentSlide = $(this).closest(".slide");
        kvizSlider = parentSlide.closest(".kviz_slider");
        kvizSlider.find(".slide").removeClass("current");
        parentSlide.next(".slide").addClass("current");
    });

    $(".kviz .back_link").on("click", function(e) {
        e.preventDefault();
        parentSlide = $(this).closest(".slide");
        kvizSlider = parentSlide.closest(".kviz_slider");
        kvizSlider.find(".slide").removeClass("current");
        parentSlide.prev(".slide").addClass("current");
    });

    // -----------------

    $(".placeholderTextArea").on("click", function(e) {
        e.preventDefault();
        if($(this).find("textarea").val() == "") {
            $(this).addClass("active");
            $(this).find("textarea").focus();
        }
    });

    $(document).on("mouseup", function() {
        hide_element = $(".placeholderTextArea");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
            $(".placeholderTextArea").each(function() {
                if($(this).find("textarea").val() == "") {
                    $(this).removeClass("active");
                }
            });
        }
    });

});