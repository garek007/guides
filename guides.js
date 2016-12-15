// JavaScript Document
$( document ).ready(function() {
	/*
		$('.next_insider').click(function(e){
				e.preventDefault();
				//$(this).closest('table').next().fadeIn();
			var nextGuide = $(this).closest('table').next();
			if(nextGuide.length == 0){
				//$(this).closest('table').siblings().hide();
				$(this).closest('table').hide();
				$(this).closest('table').siblings().first().toggle('slide');
				
				
			}else{
				$(this).closest('table').next().toggle('slide');
				$(this).closest('table').hide();
				
			}
			
			
	*/		
			
			/*
			ga('create', 'UA-7670410-1', 'auto');
			ga('send', {
				hitType: 'event',
				eventCategory: 'Insiders',
				eventAction: 'next',
				eventLabel: 'Guides 2016'
			});
			*/
			
			
		
	$('#gallery-rotator').click(function(){
			$('#colorbox2').fadeIn();
		});
	$('#cboxClose2').click(function(){
		console.log('wtf');
			$('#colorbox2').fadeOut('fast', function(){
							var vidsrc = $('#vimeo-player-1').attr('src');
			$('#vimeo-player-1').attr('src','');
			$('#vimeo-player-1').attr('src',vidsrc);
				
				
				});

			
	});
});


//setCookie("noredirect","1",1);
