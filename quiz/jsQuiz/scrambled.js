$(document).ready(function() {
var deviceAgent = navigator.userAgent.toLowerCase();			
var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
// remove left right arrows on ipad		
if (!agentID) {
	$('<button id="nextButton"></button><button id="prevButton"></button>').prependTo('#bottomContainer');
}

if (agentID) {
	$("<link/>", {
	   rel: "stylesheet",
	   type: "text/css",
	   href: "css/scrambledIpad.css"
	}).appendTo("head");
}


$('.initButton').css({opacity: 0});
$.getScript("js/jquery-ui-1.10.2.custom.min.js", function(data, textStatus, jqxhr) {
	$('.initButton').transition({opacity: 1});
	$.getScript("js/touchPunchPointer.min.js");	
});



var difficulty = {
	setting: 0,
	wrongPunishLimit: 0,
	multiply: 0,
	easy: function () {
			$('#wrongCount').remove();
			$('#checkButton').remove();
			difficulty.setting = 0;
			difficulty.multiply = 3
			//aler('help')
	},
	normal : function () {
			difficulty.multiply = 2
			difficulty.setting =1;
	},
	hard: function () {
			difficulty.multiply = 1
			difficulty.setting =2;
			
	}

}

$('.initButton').one('tapclick', function  () {


	switch( $(this).attr('id') )
	{
	case 'easy':
		difficulty.easy()
	  break;
	case 'normal':
		difficulty.normal()

	  break;
	case 'hard':
		difficulty.hard()

	  break;
	}


	$(this).transition({backgroundColor: 'transparent', color: 'rgb(68, 68, 68)'},200, function () {
		initAll();
	})
	
})

initAll = function () {

			if (!$.support.transition) {	
						$.fn.transition = $.fn.animate;	
					}
			var $checkButton = $('#checkButton');
			var sentencesArr = [];
			var friends = window.parent.shout_text;
			var saveData = window.parent.xmlDataVar
			var wrongPunish = 0;
			var selectWordsArr;
			var prependedSentences = [];

			var selectWords = $(saveData).find(friends).find('selectWords').text();
		
			inputText = $(saveData).find(friends).find('inputText').text();
			var quoteText = $(saveData).find(friends).find('quote').text();
			var dontBindWords = $(saveData).find(friends).find('dontBindWords').text();
			var lowerCaseCharacters = $(saveData).find(friends).find('lowerCaseCharacters').text();
			$(saveData).find(friends).find('sentences').children().each(function () {
				sentencesArr.push($(this).text());
			});
			
			var senLength = sentencesArr.length;
			var frame = $('#frame');
			selectWordsArr = selectWords.replace(/ /g, " ").split(" ");
			
			if (quoteText.length > 0) {
			$('#quoteText').text(quoteText);
			}
			else {
			$('#quoteText').remove();
			}
			
			
			difficulty.wrongPunishLimit = (senLength * difficulty.multiply );
			
			$("#progressbar").progressbar({value:  0.001});	
			var animateProgress = function(senLength) {
				
					var progWidth = $("#progressbar").outerWidth();
				
					$("#progressbar .ui-progressbar-value").transition({
						width:   "+=" +  progWidth/senLength
					}, 1200,'easeInOutQuad');
					
			};
						
			function shuffle(o){ //v1.0
				for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
				return o;
			};
			
			// Prepend selected words 
			// (example west if sentence: ...west and east...)		
			prependSelect = function (arr,selectW) {		
				
				var splitNumber = arr.length
					var anumber = (jQuery.inArray(selectW, arr));
						// if the selected must be bound word is the
						// first in the sentence ( arr[0] ), then append 
						// next word. Else prepend previous word.						
						if (anumber == 0) {	
							  arr.splice(anumber,2, (arr[anumber] + ' ' + arr[anumber + 1])) ;
						}
						else {
						//arr[anumber - 1] = arr[anumber-1] + ' ' + arr[anumber] ;	
							 arr.splice((anumber - 1),2, (arr[anumber-1] + ' ' + arr[anumber])) ;
						}	
				return arr;
																							
			 };				
			
			randomPrepend = function (arr) {
		
				var splitNumber = arr.length
				var anumber = Math.floor((Math.random()*splitNumber * 1));
					if (anumber == splitNumber -1) {
						arr.splice((anumber - 1),2, (arr[anumber - 1] + ' ' + arr[anumber]) );
					}
					else {
						arr.splice(anumber,2, (arr[anumber] + ' ' + arr[anumber+1]) );	
					}	
				return arr;
			 };	
			autoValidate = function () {	
				if (difficulty.setting == 0) {
					
					var activeIndex = $('.slidee').find('.active').index();
					var uniqueNames = prependedSentences[activeIndex];
					$('.active').find('.jMyPuzzle').find('li').not('.locked').each(function (ins,spqr) {
											
						var elIndex = $(this).index();

						if ( $(spqr).text() == uniqueNames[elIndex] ) { 
							// delay is needed or else the css will not be applied
							$(spqr).addClass('locked').draggable('disable').delay(100 * ins).transition({color: '#006400'}, 300);
							
						};
						if (elIndex == uniqueNames.length -1 ) {
							$(spqr).parent().addClass('solved');
							animateProgress( prependedSentences.length );	
							$(this).parent().delay(700).transition({y: -140},900, 'easeInOutCubic',function () {
								$(this).html( "<p class='solvedToString'>" + uniqueNames.join(' ') + "</p>" + "<img class='solvedImg' src='css/cssImg/check2.png'/>").delay(200).transition({y: 0}, 800,'easeOutQuad');
								
							});
							
						}; 
						if (frame.find('.solved').size() == prependedSentences.length ) {
							finalFeedback();
						}
						if ( $(spqr).text() != uniqueNames[elIndex] ) {
							return false;
						};
					});

				};
			};
			// set lowerCase/UpperCase chars for setting 2
			setChars = function () {
				if (difficulty.setting == 2 ) {
				
					$('.active').find('.jMyPuzzle').find('li').each(function (i,e) {
						
						var v = $(this).text();
						if ( $(this).hasClass('lower') ) {
								// v = v.replace( v.charAt(0), v.charAt(0).toLowerCase()); 
								 $(this).text( v.replace( v.charAt(0), v.charAt(0).toLowerCase() ) );
							};
						if (i == 0) {
							//v = v.replace( v.charAt(0), v.charAt(0).toUpperCase() );
							$(this).text(v.replace( v.charAt(0), v.charAt(0).toUpperCase() ) );
						};			
					});	
				};
				//$('.active').find('.jMyPuzzle').find('li').first().draggable( "disable" ).addClass('locked')
			
			};
			finalFeedback = function () {
					$checkButton.remove();
					var items = frame.find('.lis').size();
					var thisIndex = $('.active').index();
					var solved = frame.find('.solved').size();
					
					appendSly = function () {
						var myHtml = "<p id='feedback'>You finished: " + solved + "<br>" + "Your score is: " + Math.round((100/items) * solved) + " out of 100" + "</p>" ;
						sly.add("<li class='lis'><div class='jMyPuzzle'><div class='ulBorder'><ul class='splitList'></ul></div></div></li>");
						frame.find('li').last().find('.splitList').append(myHtml);
						setTimeout(function(){
							sly.nextPage();
							sly.off('moveEnd');
							sly.on('moveEnd', function () { 
								sly.set('speed', 400);
							});
					
						},300);		
					};
					
					sly.set('speed', 1500);
					
					if (items == thisIndex + 1) {
						appendSly();	
					
					}
					else {
						sly.on('moveEnd', function () {
							appendSly();
						});	
						sly.toEnd();
					};
				
					
			};	
		
						
			var myHtmlLis = '';
			$.each(sentencesArr, function (i,e) {
			
				var arr = e.split(" ");
				
				// Uppercase the correct first word for setting 1,2
				if (difficulty.setting != 2 ) {
					var arrMinusFirst = arr[0].slice(1,arr[0].length);
					var arrFirst = arr[0].charAt(0).toUpperCase();
					arr[0] = (arrFirst + arrMinusFirst);
				} 
				
				var noLower = [];	
				if (lowerCaseCharacters == 'true') {	
					$.each(arr, function(i, el){
						if ( el.charAt(0) == el.charAt(0).toUpperCase() ) {
							noLower.push(el)
						}
					});
				};
				
				$.each(selectWordsArr, function(i,e) {	
					if (jQuery.inArray(selectWordsArr[i], arr) != -1) { 
						// while loop if there are more than one
						// of the selected word in the sentence
						// ex. (I) : I looked and I walked...
						while (jQuery.inArray(selectWordsArr[i], arr) != -1) { 
							arr = prependSelect(arr,selectWordsArr[i]);
						}
					}
				});
				
				for (var i=0;i<(difficulty.multiply +1);i++) { 
				
					if (arr.length > 7) {
						arr = randomPrepend(arr);
				/* 		console.log('randomP'); */
						
					}
				}
				
				// prepend modified arr in correct order
				// to storage array for checking				
				prependedSentences.push(arr);
				
				
				// create shuffled array and add class 'lower'
				// to items where the first letter is to be
				// lowercased or uppercased when shifting pos.
				var mixed =  shuffle ( arr.slice(0) ) ;
				var myHtml = "";
				$.each(mixed, function(index, elem){
					var array = elem.split(' ');
					var myClass = 'lower';
					$.each(noLower, function (i,e) {			
						if (array[0] == e) {
							myClass = 'dontLower';					
						}							
					})
					
					myHtml += "<li class=" + myClass + ">" + mixed[index] + "</li>";
									
				});
							
				myHtmlLis += "<li class='lis'><div class='jMyPuzzle'><div class='ulBorder'><ul class='splitList'>" + myHtml + "</ul></div></div></li>";
					
					
			});
							
			
			frame.find('.slidee').append(myHtmlLis);
			
			
			

  //  var items = frame.find('ul > li');
    var sly = new Sly(frame, {
        horizontal: 1,
		itemNav: 'forceCentered',
        scrollBy: 1,
        speed: 400,
		startAt: 0,
		activateMiddle: 1,
		touchDragging: 1,
		mouseDragging: 1,
		interactive: '.jMyPuzzle ul li',
		releaseSwing:  1,
		elasticBounds: 1,
		easing: 'easeInOutCirc', 
		dynamicHandle: 1,
		clickBar: 1,
		dragSource:	$('#frame'),
		//cycleBy:       'pages', // Enable automatic cycling by 'items' or 'pages'.
		//cycleInterval: 1600, // Delay between cycles in milliseconds.
		//pauseOnHover:  0,    // Pause cycling when mouse hovers over the FRAME.
	//	startPaused:   1, 
		pagesBar: $('.pages'),
		activatePageOn: 'click',
		keyboardNavBy: 'pages'
		
	
			
    }).init();	
    
	/* 	$(".jMyPuzzle").css({opacity: 0})
		frame.find(".jMyPuzzle").each(function(i){
			var row = $(this);
			  setTimeout(function() {
				  row.jMyPuzzle({
					visible: '100%',
					//answer:  answer,
					reAlign: difficulty.setting,
					autoValidate: autoValidate,
					setChars: setChars	
				}).transition({opacity : 1});
			}, 500*i);
		}); */
	
 	$(function() {
					frame.find(".jMyPuzzle").jMyPuzzle({
						visible: '100%',
						//answer:  answer,
						reAlign: difficulty.setting,
						autoValidate: autoValidate,
						setChars: setChars
						
						
					});
							
				}); 

				
		frame.find(".lis:first-child").find('li').each(function(index2) {
				$(this).css({y: 100}).delay(160 * index2).transition({y: 0, opacity: 1}, 400);
				
			}).promise().done(function () {
				$('#quoteText,#progressbar,#checkButton,#wrongCount').transition({opacity: 1}, 800);
				if (difficulty.setting == 0 ) {
					autoValidate();
				}
			});
			
			$('#initButtonContainer').transition({opacity: 0}, 1300,function () {
				$(this).remove();
			})	
			
			
/* 		
	frame.find('.jMyPuzzle').on('touchend touchstart','li', function(e) {
	 e.preventDefault();
	}, false); */

var wrongCount = $('#wrongCount');
function setWrongCounter() {
	$('#wrongCount').text('Tries left: ' + (difficulty.wrongPunishLimit - wrongPunish))

}
setWrongCounter()



sly.on('change', function () {	// listen for when sly is at beginning and end and add class to prev/next buttons
	autoValidate();		

	// Check whether Sly is at the start
	$('#prevButton')[this.pos.start === this.pos.dest ? 'addClass' : 'removeClass']('ButtonDisabled');
	// Check whether Sly is at the end
	$('#nextButton')[this.pos.end === this.pos.dest ? 'addClass' : 'removeClass']('ButtonDisabled');

	// Check whether the first item is active
   $('#prevButton')[this.rel.activeItem === 0 ? 'addClass' : 'removeClass']('ButtonDisabled');
	// Check whether the last item is active
	$('#nextButton')[this.rel.activeItem === this.items.length - 1 ? 'addClass' : 'removeClass']('ButtonDisabled');
});

sly.on('active', function () {	// listen for when sly is at beginning and end and add class to prev/next buttons
	

	if ( !$('.active').find('.splitList').hasClass('solved') ) {
		$checkButton.css('text-decoration','none');
		answerSwitch = 0;
	}
	else {
		$checkButton.css('text-decoration','line-through');
		
	}

});



// prev button hidden by default
$('#prevButton').addClass('ButtonDisabled');	
	
$('#prevButton').on('tapclick', function (e) {
e.preventDefault();
	sly.prevPage();
}); 	
  
$('#nextButton').on('tapclick', function (e) {
  e.preventDefault();
	sly.nextPage();
}); 
//var docBody = $(document.body);	

var answerSwitch = 0;		// to disable check button
$('#checkButton').on('tapclick',function (e) {

	e.preventDefault();
	
	if (answerSwitch == 1 || $('.active').find('.splitList').hasClass('solved')) { 
		return; 
	}

	var lis = $('.active').find('.splitList').find('li');	

	var easingOut = 'easeInQuad';
	if (!$.support.transition) {
		easingOut = 'easeInQuad';
	}
	var easingIn = 'easeOutQuad';

	answerSwitch = 1;
	$checkButton.css('text-decoration','line-through');
	
	
	var activeIndex = $('.slidee').find('.active').index()
	var sent = sentencesArr[activeIndex].toLowerCase();
	var uniqueNames = prependedSentences[activeIndex];
		
		var i = 0;
		var preValidIndex = 0;
		var	blaLength = 0;
		var correctNumber = 0;

		wrongPunish++;
		wrongCount.html('Tries left: ' + Math.abs((difficulty.wrongPunishLimit - wrongPunish))).transition({display : 'block'}, 100,function () {
		
		lis.each(function(index2) {
			var $this = $(this); 
			var $thisText = $this.text().toLowerCase();
				
			if ($thisText.toLowerCase() == uniqueNames[i].toLowerCase()) {
				correctNumber++;
				
				var options = {
					color : "#006400",
					y: '+=10' 
				}
				
				$this.delay(index2 * 180)
				.transition(options,130,easingOut)
				.transition({y: '-=10'},130,easingIn, function () {
					
				});
				
	
					
			
			}
			else if ($thisText.toLowerCase() != uniqueNames[i].toLowerCase() || preValidIndex != 0  ) {
			
	
				var blabla = 0;
				var $thisNextText = $this.next().text().toLowerCase()
				var $thisNext2Text = $this.next().next().text().toLowerCase();
				var $thisNext3Text = $this.next().next().next().text().toLowerCase();
				var $thisNext4Text = $this.next().next().next().next().text().toLowerCase();
				var $thisNext5Text = $this.next().next().next().next().next().text().toLowerCase();
				var $thisNext6Text = $this.next().next().next().next().next().next().text().toLowerCase();
				var $thisNext7Text = $this.next().next().next().next().next().next().next().text().toLowerCase();
				var $thisNext8Text = $this.next().next().next().next().next().next().next().next().text().toLowerCase();
				
				var blabla3 = $thisText + " " + $thisNextText + " " + $thisNext2Text;
				
				var blabla4 = $thisText +  " " + $thisNextText  +  " " + $thisNext2Text  +  " " + $thisNext3Text;
				
				var blabla5 = $thisText +  " " + $thisNextText  +  " " + $thisNext2Text  +  " " + $thisNext3Text  + " " + $thisNext4Text;
				
				var blabla6 = $thisText +  " " + $thisNextText  +  " " + $thisNext2Text  +  " " + $thisNext3Text  + " " + $thisNext4Text  + " " + $thisNext5Text; 
				
				var blabla7 = $thisText +  " " + $thisNextText  +  " " + $thisNext2Text  +  " " + $thisNext3Text  + " " + $thisNext4Text  + " " + $thisNext5Text  + " " + $thisNext6Text; 
				
				var blabla8 = $thisText +  " " + $thisNextText  +  " " + $thisNext2Text  +  " " + $thisNext3Text  + " " + $thisNext4Text  + " " + $thisNext5Text  + " " + $thisNext6Text + " " + $thisNext7Text; 
				 
				var blabla9 = $thisText +  " " + $thisNextText  +  " " + $thisNext2Text + " " + $thisNext3Text + " " + $thisNext4Text  + " " + $thisNext5Text  + " " + $thisNext6Text + " " + $thisNext7Text + " " + $thisNext8Text;

			
				if (sent.indexOf(blabla3) >= 0) {
				blabla = 3;
				}
				if (sent.indexOf(blabla4) >= 0) {
				blabla = 4;
				}
				if (sent.indexOf(blabla5) >= 0) {
				blabla = 5;
				}
				if (sent.indexOf(blabla6) >= 0) {
				blabla = 6;
				}
				if (sent.indexOf(blabla7) >= 0) {
				blabla = 7;
				}
				if (sent.indexOf(blabla8) >= 0) {
				blabla = 8;
				}
				 if (sent.indexOf(blabla9) >= 0) {
				blabla = 9;
				
				}  
			
				
				if ( blabla > 2 && blabla > blaLength) {
					blaLength = blabla;
					preValidIndex = 0;
			
				}
				
		
				
				if (preValidIndex < blaLength) {
					preValidIndex++;
				}
				else { 
					 blaLength = 0;
					 preValidIndex = 0;
				}
			
		
				if ( (sent.indexOf(blabla) >= 0) && blaLength > 2 || preValidIndex != 0) {
				
				var options = {
					color : "#CC9900",
					y: '+=10' 
				}
				
				$this.delay(index2 * 180)
				.transition(options,130,easingOut)
				.transition({y: '-=10'},130,easingIn);
				 
			}
			else {
			
				var options = {
					color : "#A80000",
					y: '+=10' 
				}
					$this.delay(index2 * 180)
					.transition(options,130,easingOut)
					.transition({y: '-=10'},130,easingIn);
				
			}
		
		}
		i++;
		
		if (correctNumber == uniqueNames.length) {
			$this.parent().children().draggable('disable');
			$this.parent().addClass('solved');
		}
		
	}).promise().done(function () {
		answerSwitch = 0;		
		$this = $(this);
		
		if (correctNumber == uniqueNames.length) {
			animateProgress(prependedSentences.length);
			var arr = uniqueNames;
			if (difficulty.setting == 2 ) {
					var arrMinusFirst = arr[0].slice(1,arr[0].length);
					var arrFirst = arr[0].charAt(0).toUpperCase();
					arr[0] = (arrFirst + arrMinusFirst);
				} 
			$(this).parent().delay(300).transition({y: -130},500, 'easeInOutCubic',function () {
				$(this).html( "<p class='solvedToString'>" + arr.join(' ') + "</p>" + "<img class='solvedImg' src='css/cssImg/check2.png'/>").delay(250).transition({y: 0}, 500,'easeOutQuad');		
			});				
		}
		else {
			if ( !$('.active').find('.splitList').hasClass('solved') && activeIndex == sly.rel.activePage) {

				$checkButton.css('text-decoration','none');
			}
		}
	
		if (wrongPunish == difficulty.wrongPunishLimit || frame.find('.solved').size() == prependedSentences.length ) {
			answerSwitch = 1;
			frame.find('.splitList').find('li').draggable('disable');
			$checkButton.css('text-decoration','line-through');
			finalFeedback();
		}
		
	});
	});
	
});
}

});
