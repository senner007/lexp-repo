/* $('h1').text('LOADING').fadeOut(700).fadeIn(700);
$.holdReady(true);

 */
$(window).bind("load", function() {
//$(document).ready(function() {

// Delegate .transition() calls to .animate()
// if the browser can't do CSS transitions.

/* $('#container').animate({opacity:1},250) */
	


Array.prototype.removeByIndex = function(index) {
    this.splice(index, 1);
}

var $h1text;



/* if (!Modernizr.boxshadow) {	// ie 8 fix
$('.jMyPuzzle').css('height', 140);
$('#swipeArea').remove();
} */

/* if (!$.support.transition) {
  $.fn.transition = $.fn.animate;
} */

(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);

/* var docWidth = window.parent.$('body').width();						// media query setting - negative margin
			//console.log(docWidth)
			if (docWidth > 1200 ) {
			//console.log('hello')
				 $('h1').css({
				x: '-25px'
				}) 
				$('#indexText').css({
				x: '-10px'
				}) 
				
			} */

	
var a;		
var count;				
var subTitle;
var quizHeadline;
var sentencesArr = [];
var selectWords = [];
var answers = [];
var saveData; 
var answer;
var qnumber = 0;
var indexNext = 0;
var splitNumber = 0;
var $indexText = $('#indexText')
var anumber;
var noLower = [];
var lowerCaseCharacters;
var easyHard;
var quoteText;
var myHtml;
var senLength;
var uniqueNames;
var eqnumber;
var dontBindWords;
var animateBackground = false;
window.parent.globalScoreVariable = 0;
var scoreTotal;
 var friends = window.parent.shout_text;
 var saveData = window.parent.xmlDataVar

var $h1 = $('h1');
var wrongPunishLimit = 2;	
var wrongPunish = 0;
var selectWordsArr;
var colorScheme = true;

			selectWords = $(saveData).find(friends).find('selectWords').text();
			quizHeadline = $(saveData).find(friends).find('headline').text();
			inputText = $(saveData).find(friends).find('inputText').text();
			subTitle = $(saveData).find(friends).find('subTitle').text();
			quoteText = $(saveData).find(friends).find('quote').text();
			dontBindWords = $(saveData).find(friends).find('dontBindWords').text();
			lowerCaseCharacters = $(saveData).find(friends).find('lowerCaseCharacters').text();
			$(saveData).find(friends).children('sentences').each(function () {
				sentencesArr.push($(this).children('sentence').text());
			});
			
			senLength = sentencesArr.length;
			
			selectWordsArr = selectWords.replace(/ /g, " ").split(" ");
			//console.log(selectWordsArr);
			//console.log(selectWords);
	
			$splitlist = $("#splitList")		
			$ulLi = $('ul li');
			scoreTotal = 100;
			$ul = $('ul');
			$li = $('li');
			$h1.show();
			$h1.html(quizHeadline);
			$body = $('body');
			$('#indexText').text(subTitle);
			
			
			$('#quoteText').text(quoteText);
			
			$(document).bind("touchstart", function() { }); //prevent background scroll in iframe
			
			function animateProgress (qnumber, senLength) {
					$("#progressbar").progressbar({value: (qnumber * (100/senLength)) -((100/senLength) -0.01) });
					/*  if (quizHeadline == 'Theme') { 
						$("#progressbar .ui-progressbar-value").css({ 'background': '#031fc6' }); 
					}
					if (quizHeadline == 'Grammar') {
						$("#progressbar .ui-progressbar-value").css({ 'background': "#00A3D9" }); 
					}	  */			
					
					$("#progressbar .ui-progressbar-value").animate({
					  width:   "+=" + 100/senLength +  "%"
					},700 );
					
			}
						
			shuffle = function( myArray ) {
					  var i = myArray.length;
					  if ( i == 0 ) return false;
					  while ( --i ) {
						 var j = Math.floor( Math.random() * ( i + 1 ) );
						 var tempi = myArray[i];
						 var tempj = myArray[j];
						 myArray[i] = tempj;
						 myArray[j] = tempi;
					   }
					   
					};
					
			randomPrependFirst = function (unique,selectW) {		// Prepend selected words (example west if sentence: ...west and east...)
				
				var splitNumber = unique.length
					var anumber = (jQuery.inArray(selectW, unique));
					unique[anumber - 1] = unique[anumber-1] + ' ' + unique[anumber] ;	
					unique.splice(anumber,1);
				
																							
			 };				
			
			randomPrepend = function (unique,noLower) {
		
				var splitNumber = unique.length
				anumber = Math.floor((Math.random()*splitNumber * 1));
				//console.log(splitNumber -1)
					while (unique[anumber] == noLower[0] || unique[anumber] == noLower[1] || unique[anumber] == noLower[2] || unique[anumber] == noLower[3] || unique[anumber] == noLower[4] || unique[anumber] == noLower[5] ||  unique[anumber] == noLower[6] || unique[anumber] == noLower[6] || anumber == splitNumber -1) {
						anumber = Math.floor((Math.random()*splitNumber * 1));
						//console.log(unique[anumber])
					
							/*  if (anumber == splitNumber -1) {					// function to make sure that it does not pick the last word
							anumber = anumber -2;
							}   */
					}
					
				unique[anumber+1] = unique[anumber] + ' ' + unique[anumber+1];	
				unique.splice(anumber,1);																			
			 };		
			 
			 
			 function ifNextEnd() {
			 					
						if (sentencesArr.length == 0)
						{ 
							$('h1')
							.text('You have completed all the exercises!')
							.css({
								marginTop: 150,
								width: 900,
								fontSize: 40
							})
							
							$indexText
								.html('Your score is ' + window.parent.globalScoreVariable + ' out of:' + scoreTotal)
							$('#next').hide();
							$('#answer').hide();
							$('#easyHard').hide();
							$splitlist.remove();
						}
					
			 			 
			}
		
		init = function() {	
			//$('div.jMyPuzzle').css('margin-left', '0px');
			//console.log (lowerCaseCharacters);
				
			arr = sentencesArr[indexNext].replace(/ /g, " ").split(" ");
			
			/* var indexToRemove;
			arr = $.map( arr, function(val, i) {
				if (arr[i].length < 3 ) {
					indexToRemove = i +1;	
					return (arr[i] + ' ' + arr[i + 1])
				
				}
				
				if (indexToRemove != i) {
					return val;
				}
						 
			}); */
		
			
			if (lowerCaseCharacters == 'false') {
				arrMinusFirst = arr[0].slice(1,arr[0].length);
				arrFirst = arr[0].charAt(0).toUpperCase();
				arr[0] = (arrFirst + arrMinusFirst);
				//console.log ( arr[0]);
				
			}
			if (lowerCaseCharacters == 'true') {
				
				noLower = [];
				$.each(arr, function(i, el){
			
					if ( el.charAt(0) == el.charAt(0).toUpperCase() )
					//console.log (el);
					noLower.push(el)
				});	
			
			}
				
			
			uniqueNames = [];
			var uniqueNamesIndex = 0							// remove duplicates i arr
				$.each(arr, function(i, el){
				
					if($.inArray(el, uniqueNames) === -1) { 
					
					uniqueNames.push(el); //console.log( uniqueNames[uniqueNamesIndex] )
					uniqueNamesIndex++;
					}
					 else{	
					//	console.log (el)
						
						   uniqueNames[uniqueNamesIndex-1] = uniqueNames[uniqueNamesIndex-1] + ' ' + el;
					}	
				});
				
			$.each(selectWordsArr, function(i,e) {	
			if (jQuery.inArray(selectWordsArr[i], uniqueNames) != -1) { 
				randomPrependFirst(uniqueNames,selectWordsArr[i]);
				//console.log(selectWordsArr[i]);
				}
			});	
					
			
			if (uniqueNames.length > 7) {
				$('ul').css('margin-left', '-10px');
			
				if (dontBindWords != 'true') {
				
					randomPrepend(uniqueNames, noLower);
				}
			}
		
			
			if (uniqueNames.length > 9) {
			
				if (dontBindWords != 'true') {
				
					randomPrepend(uniqueNames, noLower);
				}
			
			}
			
			
			if (lowerCaseCharacters == 'false' || lowerCaseCharacters == '') {
				
				if (dontBindWords != 'true') {
				
					randomPrepend(uniqueNames, noLower);
				}
															
			}
			
		
			eqnumber = uniqueNames.length;
		
			/* for (var a=[],i=0;i<eqnumber;++i) a[i]=i + 1;  */ 

			//console.log(uniqueNames)
			//            Shuffle - begin
			

		
			var mixed = uniqueNames.slice(0);
			shuffle(mixed)
			
			answer = [];
					myHtml = "";
						$.each(uniqueNames, function(i, el){
							myHtml += "<li>" + mixed[i] + "</li>"; 	  
						});
					$splitlist.html( myHtml );
			
			var lis = $('li');
				setFirsChars = function () {	
						
					$('li').each(function(){
					var $this = $(this);
					var $thisText = $this.text();
						if ( $thisText != noLower[0] && $thisText  != noLower[1] && $thisText  != noLower[2] && $thisText != noLower[3] && $thisText != noLower[4] && $thisText != noLower[5] && $thisText != noLower[6])
							{
							allLiFirstLower = $this.text().charAt(0).toLowerCase();
							allLiTextNoFirst = $this.text().slice(1,$this.text().length);
							$this.text(allLiFirstLower + allLiTextNoFirst)
							}
					});
							
					firstLi  = $('li').eq(0).text();
					
					firstLiFirstUpper = firstLi.charAt(0).toUpperCase();
					firstLiTextNoFirst = firstLi.slice(1,firstLi.length);
					$('li').eq(0).text(firstLiFirstUpper + firstLiTextNoFirst); 
						
				}	
			//}	
			if (lowerCaseCharacters == 'true')
			{
				setFirsChars();
				wrongPunishLimit = 2;	
				wrongPunish = 0;
			}
			else {
			wrongPunishLimit = 3;	
				wrongPunish = 0;
			}
			
			lis.each(function (i,e) {
				$this = $(this);
				if ($this.text().length == 1) {
					$this.css({
					letterSpacing: '0px',
					paddingLeft: '9px',
					paddingRight: '10px'
					});
				}
				if ($this.text().length == 2) {
					$this.css({
					letterSpacing: '0px',
					paddingLeft: '7px',
					paddingRight: '8px'
					});
				}
				if ($this.text().length == 3 ) {
					$this.css({
					letterSpacing: '0px',
					paddingLeft: '5px',
					paddingRight: '6px'
					});
				}
				
			});
			
			$(function() {
					$(".jMyPuzzle").jMyPuzzle({
						visible: '100%',
						//answer:  answer,
						blabla: lowerCaseCharacters
						
					});
							
				});		
		if (!$.support.transition) {	
			$.fn.transition = $.fn.animate;	
		}
				
			//console.log (colorScheme);
		 	if (colorScheme == false) {
				lis.css({
					color: '#BBBBBB',
					borderColor: '#BBBBBB'
				});
				if (animateBackground == true) {
					$('#ulBorder').transition({
						backgroundColor: '#444444',
						borderColor: '#BBBBBB'
					},1700);
				animateBackground = null;					
				}
			}
			else {
				lis.css({
				color: '#444444',
				borderColor: '#444444'
				
				});
				if (animateBackground == true) {
					$('#ulBorder').transition({
						backgroundColor: '#BBBBBB',
						borderColor: '#444444'
					},1700);	
				animateBackground = null;
				}
			}
			
			
			
			
		/* parent.window.$('#loaderGif').remove(); */
		answerSwitch = 0;
	
		}											// Init - end
			
		init();
		
		// indent the first one
		var docWidth = window.parent.$('body').width();
		var indent = (docWidth - $('#splitList').width())/2
		$('#splitList').css({left:indent});	
		// indent the first one
		
		
		
		
		 $('body').disableSelection(); // disables text highlighting	
		$body.on('dragstop',function () {
						
					if (lowerCaseCharacters == 'true')
					{
						setFirsChars();

					}
					
					
				}); 

function setWrongCounter() {
	$('#wrongCount').text('Tries left: ' + (wrongPunishLimit - wrongPunish))
}

if (lowerCaseCharacters == 'true')
{
	$('<button/>').attr('id','easyHard').html('Hard mode is' + '<br>' + 'on').insertAfter('#next').css('color', '#A80000');
	easyHard = 'true'
	$('#easyHard').on('tapclick',function () {
		if (easyHard == 'true') { easyHard = 'false';
			$(this).css('color', '#006400').html('Hard mode is' + '<br>' + 'off');
			lowerCaseCharacters = 'false';
			wrongPunishLimit = 3;
			init();
		}
		else { 
			easyHard = 'true';
			$(this).css('color', '#A80000').html('Hard mode is' + '<br>' +  'on');
			lowerCaseCharacters = 'true';
			wrongPunishLimit = 2;
			init();
		}
		setWrongCounter();
	});
}



/*  $('#closingButton').fastClick(function (e) {
			e.preventDefault();
		parent.$.fancybox.close();
	  });  */

var answerSwitch = 0;		// to disable check button
$('#answer').on('tapclick',function (e) {
	e.preventDefault();
	if (answerSwitch == 1) { return; }

	//$answer = $('#answer');
	//$answer.hide();

	var easingOut = 'ease';
		if (!$.support.transition) {
			easingOut = 'easeInQuad';
		}
		var easingIn = 'easeOutQuad';
	wrongPunish++;
	setWrongCounter() 
	if (wrongPunish == wrongPunishLimit) {
		wrongPunish = 0;
		answerSwitch = 1;
		$( "li" ).draggable( "disable" );
		$('#easyHard').attr("disabled", "disabled");
	}

	var sent = sentencesArr[indexNext].toLowerCase();
	//console.log('index: ' + indexNext);
	//console.log('answer: ' + uniqueNames);
	$('li').removeClass('preValid');
		var i = 0;
		var preValidIndex = 0;
		var	blaLength = 0;
		//console.log(arr.length);
		
		var correctNumber = 0;
		
		$('li').each(function(index2) {
			var $this = $(this); 
			var $thisText = $this.text().toLowerCase();
			//console.log($thisText);
				
			//console.log ( '$thisText: ' + $thisText.toLowerCase() )
			//console.log ( 'arr[i]: ' + uniqueNames[i].toLowerCase() )
			 
		
			if ($thisText.toLowerCase() == uniqueNames[i].toLowerCase()) {
			correctNumber++;
				if (colorScheme == false) {
					var options = {
					backgroundColor : "#006400",
					y: '+=10' 
					}
				} else {
					var options = {
					color : "#006400",
					y: '+=10' 
					}
				}
				$this.delay(index2 * 200)
				.transition(options,130,easingOut)
				.transition({y: '-=10'},130,easingIn, function () {
					
				});
				
				
				//console.log('removedLi: ' + removedLi);
				if (correctNumber == uniqueNames.length) {
					
					$('#easyHard').attr("disabled", "disabled");
					sentencesArr.removeByIndex(indexNext);
					window.parent.globalScoreVariable += 100/senLength;
					window.parent.globalScoreVariable = Math.round(window.parent.globalScoreVariable);
					
					
					if ( senLength/2 <= qnumber && animateBackground == false) {
					
						if (colorScheme == true) { 
									colorScheme = false;
								} 
								else { 
									colorScheme = true;
								}
					animateBackground = true;
					}
					qnumber++
					answerSwitch = 1;
									
				}
				
			
			
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
			//console.log('hello from 9')
			}  
		
			
			if ( blabla > 2 && blabla > blaLength) {
				blaLength = blabla;
				preValidIndex = 0;
				//console.log(blabla);
				}
				
				//console.log('blabla.length: ' + blabla.length);
				
				if (preValidIndex < blaLength) {
					preValidIndex++;
				 }
				 else { 
					 blaLength = 0;
					 preValidIndex = 0;
				 }
			
			//console.log( preValidIndex  + ' ' + blaLength);
			if ( (sent.indexOf(blabla) >= 0) && blaLength > 2 || preValidIndex != 0) {
				
			
			if (colorScheme == false) {
					var options = {
					backgroundColor : "#CC9900",
					y: '+=10' 
					}
				} else {
					var options = {
					color : "#CC9900",
					y: '+=10' 
					}
				}
				
			//$answer.show();
				$this.addClass('preValid').delay(index2 * 200)
				.transition(options,130,easingOut)
				.transition({y: '-=10'},130,easingIn);
				 
			}
			else {
			
			if (colorScheme == false) {
					var options = {
					backgroundColor : "#A80000",
					y: '+=10' 
					}
				} else {
					var options = {
					color : "#A80000",
					y: '+=10' 
					}
				}
			//$answer.show();
				$this.delay(index2 * 200)
				.transition(options,130,easingOut)
				.transition({y: '-=10'},130,easingIn);
				
			}
			
		
			
		}
		i++;
		
	}).promise().done(function () {
		if (correctNumber == uniqueNames.length) {
			animateProgress(qnumber, senLength);
		}
	});
	
});
$('#container').mousewheel(function(event, delta, deltaX, deltaY) {
$('#easyHard').removeAttr("disabled");
$('#answer').removeAttr("disabled").show();	


	if (delta > 0) {
			
		 ifNextEnd()
				
		if (indexNext < sentencesArr.length) {
		indexNext++;
		}
		if (indexNext == sentencesArr.length) {
		indexNext = 0;
		}
		
		init();
	}
	 if (deltaY < 0)  {
		
		 ifNextEnd()
				
		if (indexNext < sentencesArr.length) {
		indexNext--;
		}
	
		if (indexNext == -1) {
		indexNext = sentencesArr.length -1;
	
		}
				
		
		init();
	}
	setWrongCounter();
    }); 


$('#next').on('tapclick',function (e) {	
$('#easyHard').removeAttr("disabled");
$('#answer').removeAttr("disabled").show();



		 ifNextEnd()
		
		
		if (indexNext < sentencesArr.length)	
		{
		indexNext++;
		}
		
		if (indexNext == sentencesArr.length)
		{
		indexNext = 0;
		}
		
		init();
		
setWrongCounter();		
	
	});	
	
	/* $('html').on('touchmove', function(e) {
	    e.preventDefault();
	}, false); */
	


});
/* setTimeout(function() {

$.holdReady(false);
},1500); */