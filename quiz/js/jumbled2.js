
var answers = [];
var questions = [];
var saveData; 
var answer;
var indexNext = 0;
var splitNumber = 0;
var $indexText;

var arr;
var arrBegin;
var removedLi;

var eqnumber;
window.parent.globalScoreVariable = 0;
var scoreTotal;

if (!$.support.transition) {	
	$.fn.transition = $.fn.animate;	
}

var friends = window.parent.shout_text;
var saveData = window.parent.xmlDataVar;

var stringData = $.ajax({
		url: "gapFillTextFiles/aliceChapter2a.txt",
		async: false
	 }).responseText;
	 
	
	var answerArr = [];
	while ( stringData.match(/_[^_]+_*/i) != null ) {
		var blabla = stringData.match(/_[^_]+_*/i)
		var myString = blabla[0].substring(1)
		myString = myString.substring(0, myString.length - 1);
		answerArr.push(myString)
		
		 stringData = stringData.replace(blabla[0], '...');
	}

	var stringArray = stringData.split("\n");
	var newArr = []; 											//removing empty elements in array - begin
	for (var index in stringArray) { 
		if( stringArray[index].length > 1) { 
			newArr.push( stringArray[index] ); 
		} 
	} 
	console.log(answerArr);

					
			questions = ["They have been ... for five years","The store also had a section with ...","question number 3"]
			
			answers = answerArr;
		
			/* $splitlist = $("#splitList")	 */
			$container = $('#container');			
				
			scoreTotal = answers.length * 10;
			$ul = $('.noSwipe ul');
			$li = $('.noSwipe li');
	/* 		$h1.show();
			$h1.html(quizHeadline); */
			
			$('#questionText').text(questions[0]);
			
			var shuffle = function( myArray ) {
				  var i = myArray.length;
				  if ( i == 0 ) return false;
				  while ( --i ) {
					 var j = Math.floor( Math.random() * ( i + 1 ) );
					 var tempi = myArray[i];
					 var tempj = myArray[j];
					 myArray[i] = tempj;
					 myArray[j] = tempi;
				   }
				}
console.time(name)
			removedLi = 0;
			var myHtmlLis = '';
			$.each(answers, function (i,e) {
				var arr = e.split("");
				//console.log(arr);
				
			 	$.each(arr, function(index, value) {
						if (arr[index] == ' ') {
						arr[index] = '_' 
						//console.log( arr[index] );
						}
				}); 
								
				shuffle(arr);
			
				var myHtml = "";
				
				for (var i=0;i<arr.length;i++) { 
					myHtml += "<li>" + arr[i] + "</li>"; 
				}
				myHtmlLis += "<li class='lis'><div class='jMyPuzzle'><ul class='splitList'>" + myHtml + "</ul></div></li>"
				
				
			});
			$('.slidee').append(myHtmlLis);
			
var frame = $('#frame');
    var items = frame.find('ul > li');
    var sly = new Sly(frame, {
        horizontal: 1,
        itemNav: 'forceCentered',
        scrollBy: 1,
        speed: 400,
		startAt: 0,
		activateMiddle: 1,
		touchDragging: 1,
		releaseSwing:  1,
		elasticBounds: 1,
		easing: 'easeInOutCirc', 
		dynamicHandle: 1,
		clickBar: 1,
		dragSource:	$('#frame'),
		cycleBy:       'pages', // Enable automatic cycling by 'items' or 'pages'.
		cycleInterval: 1600, // Delay between cycles in milliseconds.
		pauseOnHover:  0,    // Pause cycling when mouse hovers over the FRAME.
		startPaused:   1, 
		pagesBar: $('.pages'),
		activatePageOn: 'click',
		keyboardNavBy: 'pages'
			
    });


    sly.init();
	
	init = function(){		
					
				/* $(".jMyPuzzle").find('li').each(function(i) {
					if ($(this).text() == '_') {
					//console.log ($(this).text()) 
					
					$(this).css('color','#031fc6');
				
					}
			}); */
	/* 				
			$(function() {
				$(".jMyPuzzle").jMyPuzzle({
								visible: '100%'
														
				});
			
			}); */
		$(".jMyPuzzle").css({opacity: 0, y: -200})
		$(".jMyPuzzle").each(function(i){
		console.log(i)
				var row = $(this);
			  setTimeout(function() {
					  row.jMyPuzzle({	visible: '100%'		}).transition({opacity : 1, y: 0});
			}, 200*i);
  
		});
		console.timeEnd(name)		
			/* $(".jMyPuzzle").each(function () {
				
							
				 if ($.support.transition) {
	 				var indent = (1000 - $(this).find('.splitList').width())/2
					$(this).find('.splitList').css({left:indent});	
			
				} 
					
			}); */	
		}
		init();
		
		$('.jMyPuzzle').on('touchend touchstart','li', function(e) {
	//sly.set('touchDragging', 0);
	 e.preventDefault();
	}, false); 
	
$('#answer').fastClick(function () {

$('#answer').hide();
$('li').stop().removeClass('preValid');
	var $indexText = $('#indexText');
	var i = 0;
	var easingOut = 'ease';
	if (!$.support.transition) {
	 	easingOut = 'easeInQuad';
	}
	var easingIn = 'easeOutQuad';
	
	var preValidIndex = 0;
	var	blaLength = 0;
	//console.log(arr.length);
	removedLi = 0;
	var correctNumber = 0;
	$li = $('li');
	$li.each(function(index2) {
		var $this = $(this); 
		var $thisText = $this.text();
		 	
		if ($this.text() == '_') {				//remove li if text is '_' and count removedLi
		$this.css({backgroundColor: "#031fc6"})
		removedLi++;
		}
		 
	
		if ($thisText == arrBegin[i] && $thisText != '_' && preValidIndex == 0) {
				$this.addClass('valid').delay(index2 * 200)
				.transition({
					backgroundColor: "#009900",
					marginTop: 1
				},130,easingOut)
				.animate({
					marginTop: -10
				}, 100, easingIn,function () {
				correctNumber++;
				
				if (i == arr.length && correctNumber + removedLi == arr.length) {
					$('#answer').attr("disabled", "disabled");
					$( "li" ).draggable( "disable" );
					answers.removeByIndex(indexNext)
					questions.removeByIndex(indexNext)
					
					window.parent.globalScoreVariable = window.parent.globalScoreVariable +10
					$indexText.animate({
						opacity: 0
						
					}, function (){
					$(this).text('Jumbled words: ' + answers.length + ' score: ' + window.parent.globalScoreVariable + ' out of: ' + scoreTotal).animate({
							
							opacity: 1
						});
					
					
					})
					
					
				}
				});
			
		}
		else if ($thisText != arrBegin[i] && $thisText != '_' || preValidIndex != 0  ) {
		
			var blabla = 0;
			
			var blabla3 = $thisText +  $this.next().text() +  $this.next().next().text();
			var blabla4 = $thisText +  $this.next().text() +  $this.next().next().text() +  $this.next().next().next().text();
			
			var blabla5 = $thisText +  $this.next().text() +  $this.next().next().text() +  $this.next().next().next().text() + $this.next().next().next().next().text();
			
			var blabla6 = $thisText +  $this.next().text() +  $this.next().next().text() +  $this.next().next().next().text() + $this.next().next().next().next().text() + $this.next().next().next().next().next().text()
			
			var blabla7 = $thisText +  $this.next().text() +  $this.next().next().text() +  $this.next().next().next().text() + $this.next().next().next().next().text() + $this.next().next().next().next().next().text() + $this.next().next().next().next().next().next().text()
			
			 var blabla8 = $thisText +  $this.next().text() +  $this.next().next().text() +  $this.next().next().next().text() + $this.next().next().next().next().text() + $this.next().next().next().next().next().text() + $this.next().next().next().next().next().next().text() 
			 + $this.next().next().next().next().next().next().next().text()
			 
			 var blabla9 = $thisText +  $this.next().text() +  $this.next().next().text() +  $this.next().next().next().text() + $this.next().next().next().next().text() + $this.next().next().next().next().next().text() + $this.next().next().next().next().next().next().text() 
			 + $this.next().next().next().next().next().next().next().text()
			  + $this.next().next().next().next().next().next().next().next().text()
			
		
			if (answers[indexNext].indexOf(blabla3) >= 0) {
			blabla = blabla3;
			}
			if (answers[indexNext].indexOf(blabla4) >= 0) {
			blabla = blabla4;
			}
			if (answers[indexNext].indexOf(blabla5) >= 0) {
			blabla = blabla5;
			}
			if (answers[indexNext].indexOf(blabla6) >= 0) {
			blabla = blabla6;
			}
			if (answers[indexNext].indexOf(blabla7) >= 0) {
			blabla = blabla7;
			}
			if (answers[indexNext].indexOf(blabla8) >= 0) {
			blabla = blabla8;
			}
			 if (answers[indexNext].indexOf(blabla9) >= 0) {
			blabla = blabla9;
			}  
			
			if ( blabla.length > 2 && blabla.length > blaLength) {
				blaLength = blabla.length;
				preValidIndex = 0;
				
				}
				
				
				if (preValidIndex < blaLength) {
				 preValidIndex++;
				 }
				 else { 
				 blaLength = 0;
				 preValidIndex = 0;
				 }
			
			
			if ( (answers[indexNext].indexOf(blabla) >= 0)  && blaLength > 2 || preValidIndex != 0) {
			$('#answer').show();
				$this.addClass('preValid').delay(index2 * 200)
				.transition({
					backgroundColor: '#CC9900',
					marginTop:1
					},130,easingOut)
				.animate({
					marginTop: -10
				}, 100,easingIn);
				 
			}
			else {
				$('#answer').show();
				$this.addClass('notValid').delay(index2 * 200)
				.transition({
					backgroundColor: "#DF0F11",
					marginTop:1
					},130,easingOut)
				.animate({
					marginTop: -10
				}, 100,easingIn);
			}
			
		
			
		}
		i++;
	});
	
});

				
});