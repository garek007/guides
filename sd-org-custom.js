// JavaScript Document
function getQueryVariable(variable)
{
	 var query = window.location.search.substring(1);
	 var vars = query.split("&");
	 for (var i=0;i<vars.length;i++) {
					 var pair = vars[i].split("=");
					 if(pair[0] == variable){return pair[1];}
	 }
	 return(false);
}

function setCookie(c_name,value,exdays)
{
	 var exdate=new Date();
	 exdate.setHours(exdate.getHours() + exdays);
	 var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	 document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
	 var i,x,y,ARRcookies=document.cookie.split(";");
	 for (i=0;i<ARRcookies.length;i++)
	 {
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x==c_name)
			{
				 return unescape(y);
			}
	 }
}
function isScrolledIntoView(elem)
{
    var $elem = $(elem);
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,
						c.length);
		}
		return null;
}

$( document ).ready(function() {
		
	$( "#datepicker" ).datepicker({dateFormat: "mm/dd"});
	
	function formAlert(data){
		//$('#formalert').fadeIn(200).text(data).delay(2500).fadeOut(200);
		
		var width = $(window).width();
		var height = $(window).height();
		var left = (width/2) - 85;
		var exists = $('#formalert').length;
		if(exists ==0){
			$('body').prepend('<div id="coverup" style="position:fixed;background:black;z-index:900;width:100%;height:'+height+'px;"></div>');
			$('body').prepend('<div id="formalert" class="success" style="top:250px;left:'+left+'px;"></div>');
		}
	
		$('#coverup').fadeTo(200,.6);
		$('#formalert').fadeIn(200).text(data).delay(3000).fadeOut(200,function(){
			$('#coverup').fadeOut(200);
		});
		
	}
	
	if ($('#pageURL').length) {
		$('#pageURL').val(document.URL);
	}	


  $('#mainInnerColWrap').delegate('#et-newsletter, #et-newsletter-holiday','submit',function(event){
	event.preventDefault();
		var $wrap = $(".loadwrapper");
		$wrap.fadeIn();
		
		if($(this).hasClass("travel_trade")){
			var fullFormURL = "http://www.sandiego.org/travel-trade/newsletter.aspx";
		}else{
			var fullFormURL = "http://www.sandiego.org/newsletter.aspx";
		};
		
    formData = $(this).serialize();	
	
    $.ajax({
      type: "POST",
      dataType: "text",
      url: "http://www.enjoysandiego.com/exacttarget/handle-et-data.php", //Relative or absolute path to response.php file
      data: formData
	  }).done(function(data) {
			$wrap.fadeOut();
		switch($.trim(data)){
			case "success-redirectsuccess-redirect":
			case "success-redirect": location.href = "http://www.sandiego.org/newsletter/thank-you.aspx";break;
			case "addmoreinfo":
			$('#newsletter_signup_box, #newsletter_signup_box_tt').html('<a class="addmoreinfo" href="'+fullFormURL+'">Thank you. You are now subscribed. Click here if you\'d like to add more detail.</a>');
			
			$('.newsletter_slideOn').addClass('subscribed').html('<div class="overlay"></div>\
			<a class="addmoreinfo" href="http://www.sandiego.org/newsletter.aspx">Thank you. You are now subscribed. Click here if you\'d like to add more detail.</a><div class="newsletter_slideOn_close">x</div>');
			
			
			break;
			default:formAlert(data); break;
			
		}
		  
      });
    

	
    return false;
  });




//$('#mainContentCol4').find('p:nth-of-type(2)').after('<a href="http://www.sandiego.org/summer"><img src="http://www.enjoysandiego.com/share/images/Summer_597x50.jpg" /></a>');




/*


if( (document.URL.indexOf("summer") == -1) && (document.URL.indexOf("members") == -1)                   ){
//if(!(/summer/.test(document.URL) || /members/.test(document.URL))){
	console.log("must NOT be a summer or member page");
$('#mainContentCol4').find('.sdcvb-content').append('<a style="margin-top:10px;display:block;" class="inline_summer_banner" href="http://www.sandiego.org/summer"><img style="width:100%;" src="http://www.enjoysandiego.com/share/images/Summer_597x50.jpg" /></a>');

//don't forget to remove tracking from GTM
}

*/
if( (document.URL.indexOf("summer") == -1) && (document.URL.indexOf("members") == -1) && (document.URL.indexOf("meetings") == -1) && (document.URL.indexOf("press") == -1)&& (document.URL.indexOf("travel-trade") == -1)){
	
//$('#mainContentCol4').find('.main-detail-section').append('<div id="inline_summer_banner" style="height:50px; width:597px;margin-top:20px;"></div>');

//googletag.cmd.push(function() { googletag.display('inline_kidsfree_banner'); });
}






$('#pageURL2').val(document.URL);

/* NEWSLETTER SLIDE ON BOX
Steps to activate this.
1) uncomment the block below
2) Set up a triggered send in ExactTarget
3) Put triggered send key as the value="" in the Triggered_Send_Key input below 
*/

$('#mainContentCol4').append('\
<div class="newsletter_slideOn">\
<div class="loadwrapper">\
<span></span>\
<img src="http://www.enjoysandiego.com/share/images/loading.gif">\
</div>\
<div class="newsletter_slideOn_close">x</div>\
<p>Signup to get the deals.</p>\
<form method="post" name="subscribeForm" action="http://www.enjoysandiego.com/exacttarget/handle-et-data.php" id="et-newsletter-holiday">\
    <input class="textinput" type="text" id="et-email" placeholder="Email" name="Email Address" />\
    <input class="textinput" type="text" id="et-zipcode" placeholder="Zip Code" name="United States Zip Code" />\
    <input type="hidden" id="pageURL2" name="Signup URL" value="Kids Free Slide On" />\
    <input type="hidden" id="et-leisure" value="true" name="San Diego Monthly Newsletter" />\
		<input type="hidden" id="exkey" value="Cons-10001-whalewatching" name="Ex_Key" />\
		<input type="hidden" id="triggeredsendkey" value="2016KidsFree" name="Triggered_Send_Key" />\
    <input type="submit" id="submit-button" class="et-rail-submit" value="Join Now" />\
</form>\
</div>');
//END NEWSLETTER SLIDE ON BOX
var isCookieSet = readCookie("sawit");
console.log(isCookieSet);
if(isCookieSet != "dontannoy"){
  setTimeout(function(){$('.newsletter_slideOn').animate({width:'toggle'},450)},8000);			
}

 $('body').delegate('.newsletter_slideOn_close','click',function(){

	 $('.newsletter_slideOn').animate({width:'toggle'},250);
	 	  //document.cookie = "sawit=dontannoy; expires=Tue, 1 Dec 2015 20:00:00 UTC; path=/";	
		 var date = new Date();
		 date.setTime(date.getTime()+(60*60*24*14*1000));
		 var expires = "; expires="+date.toGMTString();
	
		 //document.cookie = name+"="+value+expires+"; path=/";					
			document.cookie = "sawit=dontannoy"+expires+"; path=/";							
								 
	 });
	 
	 
	 

	 
		
		var initialOffset = $('#footer-container').offset().top;
		var alreadyShowing;
$(window).scroll(function(){
		var scroll_position = $(this).scrollTop();
		var scrollBottom = $(this).scrollTop() + $(window).height();
		var offset = $('#footer-container').offset();
		//console.log(offset);
		//$('#scrollposition').text('Scroll position is ' + scroll_position +' offset is '+ offset.top);

		//if scroll position greater than consumable
		//btn-consumable.addClass active
		
		//var myVal = scroll_position - offset.top;
		//console.log(initialOffset-scroll_position);
		
		if(initialOffset-scroll_position <600){
			//call slideUp box
			if(alreadyShowing != true){		
			slideLinkBoxUp();	
			}
		}
			
		//$('product_menu').addClass('fixed');
		
	});		
		
		
		
	function slideLinkBoxUp(){
		var offset = $('#pinned-footer').find('.social-connect').offset();
		var lefPos = offset.left + 300;
		console.log(lefPos);
		$('.holiday_slideOn').offset({left: lefPos});
		$('.holiday_slideOn').animate({height:'toggle'},450)
		alreadyShowing = true;
	}
$(function () {
	$("#green-form").validate({
		rules: {
			first_name: "required",
			last_name: "required",
			email: "required",
			company: "required",
			GreenInitiativeTitle: "required",
			GreenDescription: "required",
			GreenPage: "required",
			phone_number: "required",
			filename: "required"
		},
		messages: {
			first_name: "First Name is required",
			last_name: "Last Name is required",
			email: "Email Address is required",
			company: "Company Name is required",
			GreenInitiativeTitle: "Green Initiative Title is required",
			GreenDescription: "Green Description is required",
			GreenPage: "Green Page is required",
			phone_number: "Phoner Number is required",
			filename: "You must upload an image"
		},
		focusInvalid: false,
		invalidHandler: function (form, validator) {
			if (!validator.numberOfInvalids())
				return;
			var scrollPos = $(validator.errorList[0].element).offset().top - 100;
			if (scrollPos < 0) scrollPos = 0;
			$(window).scrollTop(scrollPos);
		}
	});
});
	 
//MemberNet Popup
    $('.closepopup').click(function() {
        $('popup').fadeOut(400, function() {
            $('.popup.overlay').fadeOut();
						document.cookie =
                "membernetpopup=dontannoy; expires=Fri, 7 Oct 2016 20:00:00 UTC; path=/";
        });
    });
 
    var mCookie = readCookie("membernetpopup");
		if(mCookie != "dontannoy"){
			$('.popup.overlay').fadeIn('fast', function() {
        $('.popup').fadeIn('fast');
    });
			
		}
    



 
 
	 /*
 setTimeout(
 	function(){
		var offset = $('#pinned-footer').find('.social-connect').offset();
		var lefPos = offset.left + 300;
		console.log(lefPos);
		$('.holiday_slideOn').offset({left: lefPos});
		$('.holiday_slideOn').animate({height:'toggle'},450)
	
	},4000);
	
	*/
	
 $('.holiday_slideOn_close').click(function(){
	 $('.holiday_slideOn').animate({height:'toggle'},400);
	 });	 
$('.inlineSlideshow').find('img:first-child').show();
//console.log($("#gallery-rotator").children().first());

/*
	$('.forarrow').click(function(){
				var $previous = $(this).parent().prev();
				if($previous.hasClass("sdta-gallery-rotator")){
					var lastImage = $previous.find('a:last-child');
				}else{
					var lastImage = $previous.find('img:last-child');
				}
									var img2 = $previous.find(':first-child');
					console.log("first is "+img2);
				if(lastImage.is(":visible")!= true){
       
				 if($previous.find('.active').length == 0){//slideshow has not been initiated, no active class exists
					var img = $previous.find(':first-child');

					img.next().addClass('active');
					//img.fadeOut('fast');
					img.next().fadeIn();	 
				 }else{
					var img = $previous.find('.active');
					//img.addClass('last-active');
					img.next().fadeIn();
					img.next().addClass('active');
					//img.fadeOut('fast');
					img.removeClass('active');
								 
				 }		
				}
		});
		
		
	$('.backarrow').click(function(){
				var $previous = $(this).parent().prev();
				var secondImage = $previous.find(':first-child').next();
       if(secondImage.is(":visible")== true){
				 if($previous.find('.active').length == 0){//slideshow has not been initiated, no active class exists
						//do nothing 
				 }else{
					var img = $previous.find('.active');
				
					img.prev().addClass('active');
					img.fadeOut('fast');
					img.removeClass('active');
								 
				 }		
			 }
		});
		
		*/
$('.forarrow').click(function(){
	goNext($(this));
	});
$('.backarrow').click(function(){
	goBack($(this));
});

		
		
$(window).scroll(function(){
	
	$('.inlineSlideshow').each(function(){
		
			if(isScrolledIntoView(this)){
				loadImages(this);
			}
		});
});


var t = setTimeout(advanceGallery, 7000);
 
});
function loadImages(slideshow){
	$(slideshow).children().each(function(){
		var dataSrc = $(this).data('src');
		
		$(this).attr('src',dataSrc);
		})
		
}
function advanceGallery(){
	
	var $gal = $(".sdta-gallery-rotator");
	var $first = $gal.find(':first-child');
	if($gal.find(".active").length == 0){
		var img = $first;
		img.next().addClass('active');
		img.next().fadeIn();
	}else{
		var img = $gal.find('.active');
		if(img.is(":last-child")){
			$(".gallery-image-link").fadeOut().removeClass("active");
			$($first).fadeIn();
		}else{
			img.next().fadeIn();
			img.next().addClass('active');
			img.removeClass('active');
		}
	}
	t=setTimeout(advanceGallery, 5000);
	
}

function goNext(me){
	clearTimeout(t);
				var $previous = me.parent().prev();
				if($previous.hasClass("sdta-gallery-rotator")){
					var lastImage = $previous.find('a:last-child');
				}else{
					var lastImage = $previous.find('img:last-child');
				}

				if(lastImage.is(":visible")!= true){
       
				 if($previous.find('.active').length == 0){//slideshow has not been initiated, no active class exists
					var img = $previous.find(':first-child');

					img.next().addClass('active');
					//img.fadeOut('fast');
					img.next().fadeIn();	 
				 }else{
					var img = $previous.find('.active');
					//img.addClass('last-active');
					img.next().fadeIn();
					img.next().addClass('active');
					//img.fadeOut('fast');
					img.removeClass('active');
								 
				 }		
				}
				t=setTimeout(advanceGallery, 15000);
		}
function goBack(me){
	clearTimeout(t);
				var $previous = me.parent().prev();
				var secondImage = $previous.find(':first-child').next();
       if(secondImage.is(":visible")== true){
				 if($previous.find('.active').length == 0){//slideshow has not been initiated, no active class exists
						//do nothing 
				 }else{
					var img = $previous.find('.active');
				
					img.prev().addClass('active');
					img.fadeOut('fast');
					img.removeClass('active');
								 
				 }		
			 }
			 t=setTimeout(advanceGallery, 15000);
		}		

//setCookie("noredirect","1",1);