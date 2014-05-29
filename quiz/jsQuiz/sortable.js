// $(document).ready(function() {

//$(window).bind("load", function() {
$(document).ready(function() {	


var $h1text;

var a=[];
var buttonTry = 1; 
	
var sentencesArr = [];
var answers = [];
var questions = [];
var saveData; 
var quoteText;
 var friends = window.parent.shout_text;
 var saveData = window.parent.xmlDataVar
 
 
	
var $h1 = $('h1');

(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);

	
		alignCenter = $(saveData).find(friends).find('alignCenter').text();
		wordsOnly = $(saveData).find(friends).find('wordsOnly').text();
		quoteText = $(saveData).find(friends).find('quote').text();
		
		$(saveData).find(friends).children('sentences').each(function () {
					
						questions.push($(this).children('sentence').text());
						answers.push($(this).find('answer').text());
		});
		
		var completeString = ''
	
												// create a complete string with broken paragraphs
			$.each(questions, function (i,e) {
			completeString += questions[i] + answers[i]
			});
	
		
			$check = $('#check'); 
			$feedText = $('.feedtext');
		
			
			if (alignCenter == 'true') {
				$feedText.html('Sort the words or sentences to match those on the left side.').transition({y: '0px', opacity: 1});
			}
			else {
				$feedText.html('Sort the endings to create correct and meaningful sentences.').transition({y: '0px', opacity: 1});
			}
	
			$new =  $( "#new" );
			if (quoteText != '') {	$('#quoteText').text(quoteText); }
			else {	$('#quoteText').remove(); }
			
			$('body').disableSelection();
			$static = $('#static');

			$allLists = $('#allLists');
			
		 
	
				var myHtml = "";
				$.each(questions, function(i)
				{
					myHtml += "<li><span class='squiggle'>" + questions[i] + "</span></li>";
				});
				$static.find('ul').html( myHtml );
	
				
				function shuffle(array) {
					  var tmp, current, top = array.length;
					  if(top) while(--top) {
						current = Math.floor(Math.random() * (top + 1));
						tmp = array[current];
						array[current] = array[top];
						array[top] = tmp;
					  }
					  return array;
				}
	
				
				//for (a=[],i=0;i<eqnumber;++i) a[i]=i + 1;                         //            Shuffle and insert into new ul - begin

					randomNumbers = shuffle(answers);
					//console.log (randomNumbers);
					/* $.each(answers, function(i){
										$new.find('li').eq(randomNumbers[i] - 1)
											.text(answers[i])
											.attr('id', i)
											.append("<div class='imgClass'><img class='imgPos' src='css/handleSmall.png'></div>");
					}); */
					var myHtml = "";
					$.each(randomNumbers, function(i)
						{
							 myHtml += "<li><span class='squiggle'>" + randomNumbers[i] + "</span><div class='imgClass'><img class='imgPos' src='css/cssImg/handleSmall.png'></div></li>"; 
							
						/* 	myHtml += "<li><span class='squiggle'>" + randomNumbers[i] + "</span></li>"; */
						});
						$new.find('ul').html( myHtml );
						eqnumber =$new.find('li').length;
					
					//$('<div><img class="imgPos" src="css/handle.png"></div>').attr('class','imgClass').appendTo('#new'));
			
			if (wordsOnly == 'true'){ $('li').css({fontSize: '32px', fontFamily: 'UnderwoodChampionRegular',letterSpacing: '-1px' }); };
			if (alignCenter == 'true')
			{
			$('#staticList')
			.css({textAlign: 'center'});
			$('#answerList').css({textAlign: 'center'});
			}
		
			$new.find('li').addClass('ui-state-default');
			
		
			if (!$.support.transition) {
				//$('li').css({border: 0})			
				$new.find('ul').sortable({
					
					containment: "parent",
					cursor: "move",
					tolerance: "pointer"
					});
				
			}
			else {
			//$('li').css({borderBottom: '1px dashed grey'});
					 $('.smooth-sortable li').draggable(
					{
					  //axis: 'y',
					  containment: 'parent',
					 // scroll: 'false',
					  //helper: 'original',
					  start: sortable.start,
					  drag: sortable.drag.throttle(17), //run drag handler at maximum every 17ms, that's about 60fps
					  stop: sortable.finish
					}
				  );
					
			}
			
 
		$check.removeAttr('disabled');

		var score = 0;
		
		$('#check').fastClick(function (event) {
				$(this).css('text-decoration','line-through').attr('disabled', 'disabled');
				event.preventDefault();
				var staticLi = $('#static').find('li');
				$('.imgPos').css({opacity:0});
				$new.find('li').each(function () {
					var $this = $(this);
						var index = $this.index();
			
						if ( completeString.indexOf(staticLi.eq(index).text() + $this.text()) >= 0  ) {
							
							$this.addClass('ui-state-disabled').find('.imgPos').attr('src','css/cssImg/checkButtonBlack.png');
							//$this.add(staticLi.eq(index)).css({color:'green'});
							score = score + 10;
							
						}
						else {
							/* console.log('hello') */
							//$this.find('.imgPos').attr('src','css/cssImg/cancelButtonSmall.png');
						}
						if ($this.hasClass('ui-state-disabled') == true) {
						//	window.parent.globalScoreVariable = window.parent.globalScoreVariable + 10;
						}
									
					}) 	
				$new.find('li').each(function (index2) {
				var $this = $(this);
					var index = $this.index();
		
						if ( completeString.indexOf(staticLi.eq(index).text() + $this.text()) >= 0  ) 
						{
							 $this
							.find('.imgPos').delay(index2 * 90).transition({opacity:1}).end() 
							.add(staticLi.eq(index)).delay(index2 * 100)
							.transition({
										
							},  80, function () {
							$this.add(staticLi.eq(index)).css({
							//color:'#006400',
							//backgroundColor: 'rgb(187, 187, 187)'
							})
							});
						//	$this.add(staticLi.eq(index)).css({color:'green'}); 
							
							
						}
						else {
						
						
						/* $this
						.find('.imgPos').delay(index2  * 90).transition({opacity:1}).end()
						.add(staticLi.eq(index)).delay(index2 * 120).transition({ */
						
					
						$this.add(staticLi.eq(index)).delay(index2 * 100).transition({ 
						
						
							},  0, function () {
								$(this).find('.squiggle').squiggle({
									intensity:70,
									thickness:3,
									color: 'rgb(34, 34, 34)'										
								});
								
								});
						}
						
				}).promise().done(function () {
					$feedText.transition({y: '-10px', opacity: 0}, function () {
							$(this).css({y: '10px'});
							if (score == 100) { $(this).html('Well done! Your score is ' + score + ' out of 100'); }
							if (score >= 70 && score < 100) { $(this).html('Almost. Your score is ' + score + ' out of 100'); }
							if (score < 70 ) { $(this).html('Try again. Your score is ' + score + ' out of 100'); } 
						$(this).transition({y: '0px', opacity: 1});
					});
					
				})
			
				//$scoreText.text('Score: ' + window.parent.globalScoreVariable + ' Out of 100').hide().fadeIn();
				if (!$.support.transition) {
					$new.find('ul').sortable('disable');
				 }
				else {
					$('.smooth-sortable li').draggable('disable');
				}
			});

		$('#restart').fastClick(function(event) {
		$('#check').css('text-decoration','none');
			event.preventDefault();
			score = 0;
				
			var $newLi =  $new.find('li');		
			$('#allLists').transition({opacity: 0}, 400, function() {
				$('li').css({
			//	color:'rgb(34, 34, 34)'
				});
				randomNumbers = shuffle(answers);
				$newLi.each(function(i){
						
						$(this).html("<span class='squiggle'>" + randomNumbers[i] + '</span>')
						.append("<div class='imgClass'><img class='imgPos' src='css/cssImg/handleSmall.png'></div>");
						
				});
				randomNumbers = shuffle(questions);				
				$static.find('li').each(function(i){
					$(this).html("<span class='squiggle'>" + randomNumbers[i] + '</span>')
					});
			}).transition({opacity: 1}, 700, function () {
				
				$feedText.transition({y: '-10px', opacity: 0}, function () {
					$(this).css({y: '10px'});
					if (alignCenter == 'true') {
						$(this).html('Sort the words or sentences to match those on the left side.').transition({y: '0px', opacity: 1});
					}
					else {
						$(this).html('Sort the endings to create correct and meaningful sentences.').transition({y: '0px', opacity: 1});
					}
				});
			});
		
			if (!$.support.transition) {
				$new.find('ul').sortable('enable');
			 }
			else {
			$('.smooth-sortable li').draggable('enable');
			}
			
			$check.removeAttr('disabled');
	
		});

 });