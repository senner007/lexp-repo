$(document).ready(function() {
// deferred to be resolved when shapeshift has loaded
var defShapeShiftReady = new $.Deferred();
$.getScript("js/jquery.shapeshift.js", function(data, textStatus, jqxhr) {
		defShapeShiftReady.resolve();
});
var deviceAgent = navigator.userAgent.toLowerCase();			// add left right arrows on ipad
var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);

var docWidth = window.parent.$('body').width();
if (docWidth > 1100) {
		
	$('<button id="nextButton"></button><button id="prevButton"></button>').appendTo('#container');
}

var quizTitle = window.parent.shout_text;
var saveData = window.parent.xmlDataVar;

var mustBeBound = $(saveData).find(quizTitle).find('mustBeBound').text();
mustBeBound = mustBeBound.split(",");

var stringData = $.ajax({
		url: "textFiles/" + quizTitle + '.txt',
		async: false
	 }).responseText;


function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
//removing empty elements in array
removeEmpty = function (arr) {
	var newArr = []; 		
	for (var index in arr) { 
		if( arr[index].length > 1) { 
			newArr.push( arr[index] ); 
		} 
	}  
	return newArr;	
}	
	
//split text function	
splitText = function (e, i, cutoff) {
	
	var indexChar = 0;
	var n = e.charAt(cutoff);

	while (n != ',' && n != '.' && n != '!' && n != ';' && n != '?') {
		n = e.charAt(cutoff - indexChar)
		indexChar++;
		
	}
	var rounded = Math.round(cutoff - indexChar +2);
	var firstPart = e.substr(0,rounded) + '-';
	var lastPart = '-' + e.substr(rounded,e.length);
	return [firstPart, lastPart, i];
}
	
stringData.replace(/"/g, "'")	
var stringArray = stringData.split("\n");

var count = 1;
while ( count > 0 ) {
	count = 0;
	var stext;
	$.each(stringArray, function (i,e) {
	
		//totalChar += e.length;
		if ( e.length > 470) {
			var cutOff = e.length/2;
			count = 1;
			stext =  splitText(e,i, cutOff);
			
		}	
	
	})
	if (count == 1) {
	// insert split text, remove from array then run above again
	stringArray.splice(stext[2],1,stext[0],stext[1]);  

	}

}	
	stringArray = removeEmpty(stringArray);

	var completeString = ''
	// create a complete string with broken paragraphs
	$.each(stringArray, function (i,e) {
		var trimmed = $.trim(stringArray[i]);
		completeString += trimmed;
	});

	
	var newTotal =  Math.round((stringArray.length / 3.5));	  //count number of lis to make (roughly)
	
	var conId = 1;
	for (var i=0;i<(newTotal -1);i++) {   			// assign ids to containers
		$("<li><div class='conLi'><div class='container' id='"+ conId + "'></div><div class='container' id='" + (conId + 1) +"'></div></div></li>").appendTo('ul'); 
		conId = conId + 2;
	}

	
	var textToBeBound = []; // array to contain each mustbebound text + next element
	var newStringArray = []; // array to hold all text elements with ( mustbebound + next element ) bound as one.
	var ignoreIndex;
	$.each(stringArray, function (index,el) {
	
		if (index != ignoreIndex) {
			var found = false;
			$.each(mustBeBound, function (i,e) {
				
				var trimBound = $.trim(mustBeBound[i]);
				
				if ( stringArray[index].indexOf(trimBound) >= 0 && mustBeBound != "") {
					found = true;
					textToBeBound.push(stringArray[index])
					textToBeBound.push(stringArray[index +1])
					newStringArray.push(stringArray[index] + stringArray[index + 1])
					ignoreIndex = index + 1;
				}
				
			});
				if  ( found == false ) {
					newStringArray.push(stringArray[index])
				}			
		}
	});
		
	// layout items, calculate height, remove, shuffle array of items, layout again. 
	var textToBeBoundIndex = 0;
	var indexes = 0;
	$('.conLi').each(function (ind,elm) {
		
		var myHtml = [];
		var $self = $(this);
		
		$self.find('.container').each(function (i,e) {
			
			var containerHeight = 0;
			while ( containerHeight < 230 && indexes < newStringArray.length) { 			
					
					var found = false;
					var trimBound = $.trim(mustBeBound[i]);
					
					// if current element is matched with mustbebound element
					if ( newStringArray[indexes].indexOf(textToBeBound[textToBeBoundIndex]) >= 0) {
						//insert element to measure height
						$("<div class='other obj'></div>").html("<div class='hello'>" + textToBeBound[textToBeBoundIndex] + "</div><div class='hello'>" + textToBeBound[textToBeBoundIndex +1] + "</div>").appendTo(e);
						//push element to array
						myHtml.push("<div class='other obj'><div class='hello'>" + textToBeBound[textToBeBoundIndex] + "</div><div class='hello'>" + textToBeBound[textToBeBoundIndex +1] + "</div></div>");
						
						textToBeBoundIndex = textToBeBoundIndex +2;
	
						containerHeight = e.clientHeight;
						found = true;
						indexes++;
					
					}
			
					if (found == false ) {
						//insert element to measure height
						$("<div class='obj'></div>").text(newStringArray[indexes]).appendTo(e);
						//push element to array
						myHtml.push("<div class='obj'>" + newStringArray[indexes] + "</div>");
						
						indexes++;
						containerHeight = e.clientHeight;
					}
				
			} 
			
		});
		
		
		
		var myHtmlIndex = 0;
		
		if (typeof myHtml !== 'undefined' && myHtml.length > 0 && myHtmlIndex < myHtml.length) {
			
			// shuffle array of elements from both containers
			myHtml = shuffle(myHtml);
			
			$self.find('.container').each(function (i,e) {
				
				var $this = $(this);
				$this.children().remove();
				var containerHeight = 0;
		
				if ($this.index() == 0) {
					while ( containerHeight < 260 && myHtmlIndex < myHtml.length) { 			
							
							$(myHtml[myHtmlIndex]).appendTo($this);
							myHtmlIndex++; 
							containerHeight = e.clientHeight;
					} 
				}
				else {
					while ( myHtmlIndex < myHtml.length) { 			
							
							$(myHtml[myHtmlIndex]).appendTo($this);
							myHtmlIndex++; 							
					} 
				}
				
			}); 
		}	
		
	});
	
	$('#container')
		.find('.obj').addClass('object').removeClass('obj')
	.end()
		.find(".container:empty").remove();
		
	$('#frame').find(".conLi:empty").parent().remove();

    var frame = $('#frame');
    var items = frame.find('ul > li');
    var sly = new Sly(frame, {
        horizontal: 1,
        itemNav: 'forceCentered',
        scrollBy: 1,
        speed: 400,
		startAt: 0,
		activateMiddle: 1,
		touchDragging: 0,
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

	sly.on('load change', function () {	// listen for when sly is at biginning and end and add class to prev/next buttons
        // Check whether Sly is at the start
        $('#prevButton')[this.pos.start === this.pos.dest ? 'addClass' : 'removeClass']('ButtonDisabled');
        // Check whether Sly is at the end
        $('#nextButton')[this.pos.end === this.pos.dest ? 'addClass' : 'removeClass']('ButtonDisabled');

        // Check whether the first item is active
       $('#prevButton')[this.rel.activeItem === 0 ? 'addClass' : 'removeClass']('ButtonDisabled');
        // Check whether the last item is active
        $('#nextButton')[this.rel.activeItem === this.items.length - 1 ? 'addClass' : 'removeClass']('ButtonDisabled');
			
	});

    sly.init();
	
	
    
 $.when(defShapeShiftReady).done(function () { // wait for shapeshift script to load to ensure ui preload dependency
	
	  $("#container").find(".container").shapeshift({
		paddingY: 0,
		paddingX: 0,
		gutterY: 6,
		gutterX: 0,
		minHeight: 499,
		animateSpeed: 120
		
	  });
	  objPrepApp();
});	

$.fn.shuffle2 = function() {

	var allElems = this.get(),
		getRandom = function(max) {
			return Math.floor(Math.random() * max);
		},
		shuffled = $.map(allElems, function(){
			var random = getRandom(allElems.length),
				randEl = $(allElems[random]).clone(false)[0];
			allElems.splice(random, 1);
			return randEl;
	   });

		this.each(function(i){
			$(this).replaceWith($(shuffled[i]));
		});

		return $(shuffled);
	};  
	

$('#prevButton').addClass('ButtonDisabled');	// prev button hidden by default
	
$('#prevButton').on('tapclick', function (e) {
e.preventDefault();
	sly.prevPage();
	
 }); 	
  
$('#nextButton').on('tapclick', function (e) {
  e.preventDefault();
	sly.nextPage();
	
}); 
sly.set('touchDragging',1);	

var $saved;
var answerSwitch = 0;
$('#puzzleOnOff').on('tapclick', function () {
	answerSwitch = 1;
	$(this).toggleClass("readModeOn");
	var $slidee = $('.slidee');
	$slidee.css({opacity: 0});
	if (  $(this).hasClass("readModeOn") ) {
	
		sly.destroy().init(); // or else fail
		$('#checkButton,#shuffleButton').css('text-decoration','line-through');
		$('#shuffleButton').off();
		$(this).css('background',"rgb(187, 187, 187) url('css/cssImg/book_open-24.png') 50% center no-repeat");
		$saved = $slidee.contents().clone();
		
		$('.object').remove();
		$('.container').removeClass('ui-droppable');   
	  
		var completeArray = stringData.split("\n");
		completeArray = removeEmpty(completeArray);
	
	 
		var indexes = 0;
		$('.container').each(function (i,el) {
	
			var containerHeight = 0;
			while ( containerHeight < 380 && indexes < completeArray.length) { 
				
					containerHeight = 0;
					$("<div class='object2'></div>").text(completeArray[indexes]).appendTo(el);
					indexes++;
			 
					$(el).children().each(function () {
						containerHeight += $(this).height();
					})
					
			} 
			
			if (containerHeight > 420 ) { 
		
				var cutOff = $(el).children().last().text().length - ((containerHeight - 420) * 3)
				var tsplit = splitText( $(el).children().last().text(), i ,cutOff )
				
				$(el).children().last().remove();
				$("<div class='object2'></div>").text(tsplit[0]).appendTo(el);
				$("<div class='object2'></div>").text(tsplit[1]).appendTo( $('.container').eq(i + 1) );
		
			}
		
		});
		
		$('#container').find(".container:empty").remove();
		$('#frame').find(".conLi:empty").parent().remove(); 
		sly.destroy().init();
	
	
	}
	else {
		
		recallShuffled = 0;
		$(this).css('background',"rgb(68, 68, 68) url('css/cssImg/puzzle.png') 60% center no-repeat");
		  
		$slidee.contents().remove()
		$slidee.append( $saved ).end().find('.container')
		sly.destroy().init();
		sly.reload();
					   
		$("#container").find(".container").shapeshift({
			paddingY: 0,
			paddingX: 0,
			gutterY: 6,
			gutterX: 0,
			minHeight: 499,
			animateSpeed: 120
		}).on('touchend touchstart','.object', function(e) { 
			 e.preventDefault();
		}, false).on('mousewheel','.ss-moving', function(e) { 
			e.preventDefault();
		}, false);
		
		objPrepApp();
		
		$('#shuffleButton').css('text-decoration','none').on('tapclick', actions.shuffleFunction)
		
		 if ( $(".object").hasClass('tobeChecked')  == false ) {
			$('#checkButton').css('text-decoration','none');
			answerSwitch = 0;
		}
	  	
	  }
	$slidee.transition({opacity:1},700);
	
});

	// prevent background movement on object drag
	  $('.container').on('touchend touchstart','.object', function(e) { 
	 e.preventDefault();
	}, false);  
	
	// prevent mousewheel on object drag
	$('.container').on('mousewheel','.ss-moving', function(e) { 
	 e.preventDefault();
	}, false);  
	


function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}

preload([
    'css/cssImg/check2.png',
    'css/cssImg/orangeCheck2.png',
    'css/cssImg/cancel.png'
]);
 
			
var quoteText = $(saveData).find(quizTitle).find('quoteText').text();

$('#quoteText').text(quoteText);


var actions = {

	checkFunction: function () {		// check function

		$('.object').draggable('disable');
		
		var easingOut = 'ease';
		if (!$.support.transition) {
			$.fn.transition = $.fn.animate;
			easingOut = 'easeInQuad';
		}
		var easingIn = 'easeOutQuad';

		$('.container').find('.object').removeClass('preValid');

		var i = 0;
		var preValidIndex = 0;
		var	blaLength = 0;
		
		var correctNumber = 0;
		var myArr = [];
		
		
		$('.hello').addClass('tobeChecked');
		$('.object').not('.other').addClass('tobeChecked');

		var activeSlyPage = 0;
		var slideToNextDelay = 0;
		function slideToPage ($this) {
				
			var conClose = $this.closest('.container');
		
			if ((conClose.attr('id'))%2 == 0 && $this.text() == conClose.find('.tobeChecked').last().text() ) {
				sly.activatePage(activeSlyPage + 1)
				activeSlyPage++;
				slideToNextDelay = 700;
			}
		
		};
		function checkIfLast ($this) {
		
			var conClose = $this.closest('.container');
		
			if ((conClose.attr('id'))%2 == 0 && $this.text() == conClose.find('.tobeChecked').last().text() ) {
					slideToNextDelay += 900;
			}
				
		};
		
		$('.container').find('.tobeChecked').each(function (i, e) {		// get array with div's in the dom
					myArr.push($.trim($(this).text()));
				
		});
		
		
		
			$('.container').find('.tobeChecked').each(function (index2, e) {
				
				var $this = $(this); 			
				stringArray[i] = $.trim(stringArray[i]);					
			
				if (myArr[i] == stringArray[i]) {
					$this.append("<img class='imgCheck' src='css/cssImg/check2.png'/>");
								
					var options = {
							marginTop: 10,
							color: '#006400'
						}									
										
				$this.delay((index2 * 200) + slideToNextDelay)
						.transition(options,130, easingOut)
						.animate({
							marginTop: 0
					}, 100, easingIn,function () {
					
				 
					var thisPos =  $this.find('img').position()
					
					if ( (thisPos.left > 450 && thisPos.left < 480) || (thisPos.left > 820 && thisPos.left < 830) ) {
						$this.find('img').css({ x: -26, y: 5 })
					}
						$this.find('img').transition({opacity: 1});
						slideToPage($this);
						
						correctNumber++;
										
				});
				checkIfLast($this);
				
					
				}
				else if (myArr[i] != stringArray[i]) {
				
				
					var blabla = 0;
					
					var blabla3 = "";
					for (var inc=0;inc<3;inc++) { 
						blabla3 += myArr[i + inc]	
						
					}
				
					var blabla4 = "";
					for (var inc=0;inc<4;inc++) { 
						blabla4 += myArr[i + inc]
					}
					
					var blabla5 = "";
					for (var inc=0;inc<5;inc++) { 
						blabla5 += myArr[i + inc]
					}
					
					var blabla6 = "";
					for (var inc=0;inc<6;inc++) { 
						blabla6 += myArr[i + inc]
					}
					
					var blabla7 = "";
					for (var inc=0;inc<7;inc++) { 
						blabla7 += myArr[i + inc]
					}
					
					var blabla8 = "";
					for (var inc=0;inc<8;inc++) { 
						blabla8 += myArr[i + inc]
					}
					
					var blabla9 = "";
					for (var inc=0;inc<9;inc++) { 
						blabla9 += myArr[i + inc]
					}
					
					var blabla10 = "";
					for (var inc=0;inc<10;inc++) { 
						blabla10 += myArr[i + inc]
					}
					
					var blabla11 = "";
					for (var inc=0;inc<11;inc++) { 
						blabla11 += myArr[i + inc]
					}
					
					var blablaArr = [blabla3,blabla4,blabla5,blabla6,blabla7,blabla8,blabla9,blabla10,blabla11];	
				
							
					for (var incN=3;incN<12;incN++) {
						if (completeString.indexOf(blablaArr[incN -3]) >= 0) {
						blabla = incN;
						}
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
					
		
					if ( (stringArray.indexOf(blabla) >= 0) && blaLength > 2 || preValidIndex != 0) {
					
						$this.append("<img class='imgCheck' src='css/cssImg/orangeCheck2.png'/>");
					
						var options = {
								marginTop: 10,
								color: '#CD6600'
							}
					
				
						$this.delay((index2 * 200) + slideToNextDelay)
						.transition(options,130,easingOut)
						.animate({
							marginTop: 0
						}, 100,easingIn,function () {

						
						var thisPos =  $this.find('img').position()
					
						if ( (thisPos.left > 450 && thisPos.left < 480) || (thisPos.left > 820 && 	thisPos.left < 830) ) {
							$this.find('img').css({ x: - 26 })
						} 
						$this.find('img').transition({opacity: 1});
						slideToPage($this);
						
						})
						checkIfLast($this);
						 
					}
					else {
						$this.append("<img class='imgCheck' src='css/cssImg/cancel.png'/>");
						
							var options = {
								marginTop: 10,
								color: '#A80000'
							}
					
				
						$this.delay((index2 * 200) + slideToNextDelay)
						.transition(options,130,easingOut)
						.animate({
							marginTop: 0
						}, 100,easingIn,function () {
					
						
						var thisPos =  $(this).find('img').position()
						
						$this.find('img').css({ y: +2,marginLeft: '4px' })
							if ( (thisPos.left > 450 && thisPos.left < 480) || (thisPos.left > 820 && thisPos.left < 830) ) {
							
							$this.find('img').css({ x: - 5 })
						} 
						$this.find('img').transition({opacity: 1});
						slideToPage($this);
						})
						checkIfLast($this);
					}
				
					
				}
				i++;
				
			}).promise().done(function () {
				
				var $object = $('.object');
						
				$object.last().append("<div id='endText'></div>");
				
				if (correctNumber != myArr.length) { 
					$object.find('#endText').text('Hit shuffle and try again')
				}
				if ((correctNumber + 5) >= myArr.length) { 
					$object.find('#endText').text('Almost!') 
				}
				if (correctNumber == myArr.length) { 
					$object.find('#endText').text('Well Done!') 
				} 
				if ($object.last().parents('.slidee li').css('backgroundColor') != 'rgb(72, 72, 72)') { 	$object.find('#endText').css('color','black'); 
				}
				
				$object.find('#endText').transition({opacity: 1}, function () {
						sly.set({ speed: 400, easing: 'easeInOutCirc'});
						$('#checkButton').css({background: "rgba(68, 68, 68,1) url('css/cssImg/checkButtonSmall.png') 10% center no-repeat", color: 'rgb(204, 204, 204)'});
						$('#shuffleButton').css('text-decoration','none').on('tapclick', actions.shuffleFunction)
						
				});					
			

			});
	
	},	
	shuffleFunction: function () { 
		answerSwitch = 0;
		$('#checkButton').css('text-decoration','none');
	  
		$('.container').find('div').each(function () {
			$(this).css('color','rgb(51, 51, 51)');			
		})
		$('img').remove();
		$('#endText').remove();
		$('.container').find('div').find('span').contents().unwrap();
		
		$('.conLi').each(function () {
			
			$(this).find('.container').children().removeClass('tobeChecked').shuffle2();
					
			$(this).find('.container').each(function () {
				var combinedHeight = 0;
				var $this = $(this);
				var thisId =  $this.attr('id')
					
					$this.find('.object').each(function () {
						combinedHeight += $(this).height()
					});
				if (combinedHeight > 450 && thisId%2 == 0) {
					var firstObject = $this.find('.object').first()
					firstObject.appendTo( $this.prev() )
				}
				if (combinedHeight > 450 && thisId%2 != 0) {
					var firstObject = $this.find('.object').last()
					firstObject.appendTo( $this.next() )
				}
			})
			
			
			
		})
		
		  $('.conLi').children().trigger("ss-event-arrange");
		  $('.conLi').children().trigger("ss-event-dragreset");

	}
}


$('#checkButton').on('tapclick',function () {
	if (answerSwitch == 1) { 	
			return; 
	}	
	answerSwitch = 1;
	$('#shuffleButton').css('text-decoration','line-through').off();
	$(this).css({background: "rgb(68, 68, 68) url('../img/ajax-loaderSmall.gif') 13% center no-repeat"})
							 
		sly.set({ speed: 1000, easing: 'easeInOutCubic'});
		activeSlyPage = 0;
		slideToNextDelay = 0;
		
		if (sly.rel.activeItem != 0) {
			sly.one('moveEnd', actions.checkFunction);
			sly.toStart();
		}
		else {
			actions.checkFunction();
		}	
 
});
 
 
$('#shuffleButton').on('tapclick',actions.shuffleFunction); 

 
function objPrepApp() {
	var $containers = $('.conLi').children();
	 
	$containers.on("ss-event-dropped", function(e, selected) {

		var $this = $(this); 
		var $containers = $('.active').find(".container");
		var lastText = $containers.not(".ss-prev-container").children().last().text();
		if ( $containers.not(".ss-prev-container").children().last().children().length > 0 ) {
			var textArray = [];
			$containers.not(".ss-prev-container").children().last().children().each(function (i,e) {
				textArray.push($(this).text());
			});
		}				
		var $thisCon = $containers.not(".ss-prev-container");
		var conHeight = $thisCon.height();
		while (conHeight > 500) {
			
				var divHeight = $thisCon.children().last().height();
				if ( $containers.not(".ss-prev-container").children().last().children().length > 0  ) {
				     var myHtml = "<div class='other object'>";
				     $thisCon.children().last().children().each(function (i,e) {
						myHtml += "<div class='hello'>" + textArray[i] +  "</div>";  
				     });
				     myHtml += "</div>";
				     $(myHtml).addClass('newToList').prependTo($containers.not($this));				    
				}
				else {
					$("<div class='object'></div>").text(lastText).addClass('newToList').prependTo($containers.not($this));
				}
				$thisCon.children().last().remove();		
				
				if ( $containers.not(".ss-prev-container").children().last().children().length > 0  ) {
					var textArray = [];
					$containers.not(".ss-prev-container").children().last().children().each(function (i,e) {
					textArray.push($(this).text());
					});
				}
				else {
					lastText = $thisCon.children().last().text();
							
				}
				conHeight = $thisCon.height()  - divHeight;
				$containers.trigger("ss-event-arrange");
						
			
		};
		$('.newToList').parent().trigger("ss-event-dragreset");
		
	}); 
	
	$containers.on("ss-event-dragreset", function(e, selected) {
	  	  
		$('.newToList').each(function () {
			$(this).css({y : '-=400'}).removeClass('newToList').transition({opacity:1, y : '+=400'});						
		});
	});
	
 }
 



});