function getJbjectsAdressPosition()  {
    if( $(".map_objects_popup").length > 0 ) {
        var leftOHCoord = $(".map_objects_popup .popup_content").offset().left;
        $(".map_objects_templ .objects_adress").css({
            "left" : leftOHCoord + "px"
        });
    }
}

if( document.getElementById("object_map") ) {

	var map;
	var marker;
	var image = "img/marker.svg";
	var styles;

	function initMap() {

		map = new google.maps.Map(document.getElementById('object_map'), {
			center: {lat: 55.882593, lng: 37.5477503},
			scrollwheel: false,
			scaleControl: false,
			zoom: 16
		});

		marker = new google.maps.Marker({
			map: map,
			draggable: false,
			animation: google.maps.Animation.DROP,
			position: {lat: 55.882593, lng: 37.5477503},
			map: map,
			icon: image,
			title: ''
		});

		// marker.addListener('click', toggleBounce);
		marker.addListener('click', showObject);

	}

	function showObject() {
        popupName = "popup_2";
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
        $(".popup_bg").fadeIn(300);
        $("[data-popup = '"+ popupName +"']").fadeIn(300);
		setTimeout(function() {
			getJbjectsAdressPosition();
		}, 100);       

        objectSlider = $(".map_objects_thumbs .object_slider").not(".slick-initialized").slick({
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

        innerWrappHeightArr = [];
        $(".map_objects_thumbs .bc_card").css({
            "height" : "auto"
        });
        $(".map_objects_thumbs .bc_card").each(function() {
            innerWrapp = $(this).find(".inner_content");
            innerWrappHeight = $(this).outerHeight();
            innerWrappHeightArr.push(innerWrappHeight);
        });
        maxHeight = Math.max.apply(null, innerWrappHeightArr);
        $(".map_objects_thumbs .bc_card").css({
            "height" : maxHeight + "px"
        });

	}

}

$(document).ready(function() {
    getJbjectsAdressPosition();
});

$(window).resize(function() {
    getJbjectsAdressPosition();
});

if( document.getElementById("location_map") ) {
    function initMap() {

        var image2 = "img/marker.svg";

        map2 = new google.maps.Map(document.getElementById('location_map'), {
            center: {lat: 55.882593, lng: 37.5477503},
            scrollwheel: false,
            scaleControl: false,
            zoom: 16,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        marker2 = new google.maps.Marker({
            map: map2,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: {lat: 55.882593, lng: 37.5477503},
            icon: image2,
            title: ''
        });

        // marker.addListener('click', toggleBounce);
        // marker.addListener('click', showObject);

    }
}