$(document).ready(function() {

var initCalc = {

	xmlData:	function () {
			var saveData = window.parent.xmlDataVar;
			return saveData;
	},
	xmlTrue : function (xmlData, thisQuiz) {
					var trueArray = [];
					
					$(xmlData).find(thisQuiz).find('true').children().each(function () {		
						trueArray.push($(this).text());
					});
					return trueArray;	
	},
	xmlFalse : function (xmlData, thisQuiz) {
					var falseArray = [];
					
					$(xmlData).find(thisQuiz).find('false').children().each(function () {		
						falseArray.push($(this).text());
					});
					return falseArray;	
	},
	thisQuiz:	function () {
			var quiz = window.parent.shout_text;
			return quiz;
	},
	textfile:	function (xmlData, thisQuiz) {		
				
					var textfile = $(xmlData).find(thisQuiz).find('textFile').text();
					return textfile;	
	},

	stringArr: 	function ( textfile ) { 
				var string = $.ajax({
					url: "textFiles/" + textfile + '.txt',
					async: false
				}).responseText;
			string = string.replace(/"/g, "'");
			stringArr = string.split("\n");
			return stringArr;
	 
	},
	removeEmpty: 	function (arr) {
				var newArr = []; 		
				for (var index in arr) { 
					if( arr[index].length > 1) { 
						newArr.push( arr[index] ); 
					} 
				}  
			return newArr;		 
	},
		
	splitArrHelper: function (e, i, cutoff) {	

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
	},
	/* splitArr:	function (arr) {
	
			var count = 1;
			while ( count > 0 ) {
				count = 0;
				var stext;
				$.each(arr, function (i,e) {
				
					//totalChar += e.length;
					if ( e.length > 470) {
						count = 1;
						stext =  initCalc.splitArrHelper(e,i);
												
					}	
				
				})
				if (count == 1) {
				// insert split text, remove from array then run above again
				arr.splice(stext[2],1,stext[0],stext[1]);  

				}

			}
			return arr;
	
	}, */
	countLi:	function (arr) {
			var newTotal =  Math.round((arr.length / 3.5));	
			return newTotal;
	
	},
};
var app = {};
app.textfile = initCalc.textfile ( initCalc.xmlData(), initCalc.thisQuiz() );
app.quoteText = $( initCalc.xmlData() ).find( initCalc.thisQuiz() ).find('quoteText').text();
app.array = initCalc.stringArr ( app.textfile );
app.cleanArray = initCalc.removeEmpty( app.array );
app.numberOfPages = initCalc.countLi( app.cleanArray );
app.trueArray = initCalc.xmlTrue(initCalc.xmlData(), initCalc.thisQuiz());


app.falseArray = initCalc.xmlFalse(initCalc.xmlData(), initCalc.thisQuiz());




 var initActions = {
 
	
	
	createLis:	function (countedLis) {
	
			for (var i=1;i <((countedLis * 2) + 2);i = i +2) {   			// assign id's to containers
				$("<li class='lis'><div class='conLi'><div class='container' id='"+ i + "'></div><div class='container' id='" + (i + 1) +"'></div></div></li>").appendTo('.slidee'); 
				
			}
	
	},
	placeObjects:	function (arr) {
	
			var indexes = 0;
			$('.container').each(function (i,el) {
		
				var cHeight = 0;
				while ( cHeight < 380 && indexes < arr.length) { 
					
						cHeight = 0;
						$("<div class='object'></div>").text(arr[indexes]).appendTo(el);
						indexes++;
		
						$(el).children().each(function () {
							cHeight += $(this).height();
						})
						
				} 
				
				if (cHeight > 420 ) { 
					var cutOff = $(el).children().last().text().length - ((cHeight - 420) * 3)
					var tsplit = initCalc.splitArrHelper( $(el).children().last().text(), i, cutOff )
					
					
					
					$(el).children().last().remove();
					$("<div class='object'></div>").text(tsplit[0]).appendTo(el);
				
					$("<div class='object'></div>").text(tsplit[1]).appendTo( $('.container').eq(i + 1) );
			
				}
			
			});
	
	},
	placeQnA:	function (q,a) {
	
		
			
				var myHtmlq = '';
				var myHtmla = '';
				for (var i=0;i < q.length; i++) {		
					myHtmlq += "<div class='object tr'>" + q[i] + "</div>";			
								
				}
				for (var i=0;i < a.length; i++) {		
					myHtmlq += "<div class='object fls'>" + a[i] + "</div>";			
								
				}		
				$(myHtmlq).appendTo( $('#frame').find('.lis').last().find('.container').first() );
				$(myHtmla).appendTo( $('#frame').find('.lis').last().find('.container').last() );				
		
		
	
	}

 }
 
initActions.createLis ( app.numberOfPages );
initActions.placeObjects ( app.cleanArray );

// remove empty pages
 $('#container').find(".container:empty").remove();
$('#frame').find(".conLi:empty").parent().remove(); 
// insert a new page for true and False 
$('.slidee').append("<li class='lis'><div class='conLi'><div class='container' id='trueFalse'></div><div class='container' id='trueFalse2'></div></div></li>");

 initActions.placeQnA ( app.trueArray , app.falseArray );
$('#frame').find('.lis').last().find('.container').first().addClass('tr');
$('#frame').find('.lis').last().find('.container').last().addClass('fls');
 
//remove empty pages 



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
$('.object.tr, .object.fls').shuffle2();

var deviceAgent = navigator.userAgent.toLowerCase();			// add left right arrows on ipad
var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
			
var docWidth = window.parent.$('body').width();	
if (docWidth > 1100) {
		
	$('<button id="nextButton"></button><button id="prevButton"></button>').appendTo('#container');
}

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
		//cycleBy:       'pages', // Enable automatic cycling by 'items' or 'pages'.
		//cycleInterval: 1600, // Delay between cycles in milliseconds.
		//pauseOnHover:  0,    // Pause cycling when mouse hovers over the FRAME.
	//	startPaused:   1, 
		pagesBar: $('.pages'),
		activatePageOn: 'click',
		keyboardNavBy: 'pages',
		},
		{
		moveEnd: function () {
			if (this.pos.end == this.pos.dest ) {
				if ( $('.active').css('backgroundColor') != 'rgb(72, 72, 72)' ) { 
		
				$('#trueFalseBox').css('color', 'rgb(72, 72, 72)') };
				$('#trueFalseBox').show().transition({opacity: 1}, 500);
			}
			else {
				if ( $('#trueFalseBox').css('opacity') != 0 ) {
				$('#trueFalseBox').transition({opacity: 0}, 200, function () {
					$(this).hide();
				});
				}
			}
			
		
		
		
		}
			
    }).init(); 
	
	
	
	  $("#container").find('.lis').last().find(".container").shapeshift({
	paddingY: 0,
	paddingX: 0,
	gutterY: 6,
	gutterX: 0,
	minHeight: 499,
	animateSpeed: 120
	
  });
  
 
$('#quoteText').text( app.quoteText ); 



  sly.on('change', function () {	// listen for when sly is at biginning and end and add class to prev/next buttons
        // Check whether Sly is at the start
        $('#prevButton')[this.pos.start === this.pos.dest ? 'addClass' : 'removeClass']('ButtonDisabled');
        // Check whether Sly is at the end
        $('#nextButton')[this.pos.end === this.pos.dest ? 'addClass' : 'removeClass']('ButtonDisabled');

        // Check whether the first item is active
       $('#prevButton')[this.rel.activeItem === 0 ? 'addClass' : 'removeClass']('ButtonDisabled');
        // Check whether the last item is active
        $('#nextButton')[this.rel.activeItem === this.items.length - 1 ? 'addClass' : 'removeClass']('ButtonDisabled');
}); 

frame.find('.container').on('touchend touchstart','.tr', function(e) {
	 e.preventDefault();
	}, false);

frame.find('.container').on('touchend touchstart','.fls', function(e) {
	 e.preventDefault();
	}, false);	
	
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
 
			


var actions = {

	checkFunction: function () {	
		
	
		$('#shuffleButton').css('text-decoration','line-through').off();
		$('#checkButton').css('text-decoration','line-through').off();
		
		 $('.object.tr,.object.fls').draggable('disable');
		 sly.toEnd();
		 sly.set({ speed: 1000, easing: 'easeInOutCubic'});


		var easingOut = 'ease';
		if (!$.support.transition) {
			$.fn.transition = $.fn.animate;
			easingOut = 'easeInQuad';
		}
		var easingIn = 'easeOutQuad';
		var correctNumber = 0;

		
		$('.object.tr,.object.fls').each(function (index2, e) {
			
		
		
			var $this = $(this);
			var $thisText = $(this).text();
			
			if ( ($this.hasClass('tr') && $this.parent().hasClass('tr'))  || ($this.hasClass('fls') && $this.parent().hasClass('fls')) ) {
	/* 		console.log('yes') */
			
				$this.append("<img class='imgCheck' src='css/cssImg/check2.png'/>");
				
				if ( $this.parents('.slidee li').css('backgroundColor') == 'rgb(72, 72, 72)') {
					var highLightThis = true;
					var options = {
						marginTop: 10
					}
				}
				else {
					var options = {
							marginTop: 10,
							color: '#006400'
						}
				}
					
					$this.delay(index2 * 250)
					.transition(options,130, easingOut)
					.animate({
						marginTop: 0
				}, 100, easingIn,function () {
				if (highLightThis == true) { 
					
					$this.highlight($thisText, { className: 'greenColor'})
					
				}
			 
				var thisPos =  $this.find('img').position()
				
				if ( (thisPos.left > 468 && thisPos.left < 480) || (thisPos.left > 820 && thisPos.left < 830) ) {
					$this.find('img').css({ x: -26, y: 5 })
				}
					$this.find('img').transition({opacity: 1});
					correctNumber++;
		
				});	
			}
			else {
			
			/* console.log('no') */
					$this.append("<img class='imgCheck' src='css/cssImg/cancel.png'/>");
					if ( $this.parents('.slidee li').css('backgroundColor') == 'rgb(72, 72, 72)') {
						var highLightThis = true;
						var options = {
							marginTop: 10
						}
					}
					else {
						var options = {
							marginTop: 10,
							color: '#A80000'
						}
					}
			
					$this.delay(index2 * 250)
					.transition(options,130,easingOut)
					.animate({
						marginTop: 0
					}, 100,easingIn,function () {
					if (highLightThis == true) { 
						$thisText = $.trim($thisText);
						$this.highlight($thisText, { className: 'redColor'}) 
					} 
					
					
					var thisPos =  $(this).find('img').position()
					
					$this.find('img').css({ y: +2,marginLeft: '4px' })
						if ( (thisPos.left > 468 && thisPos.left < 480) || (thisPos.left > 820 && thisPos.left < 830) ) {
						
						$this.find('img').css({ x: - 15 })
					} 
					$this.find('img').transition({opacity: 1});
					
					})
			
				
			}
		
			
		}).promise().done(function () {
			$('#shuffleButton').css('text-decoration','none').on('tapclick', actions.shuffleFunction);
			var $object = $('.object');
					
			$object.last().append("<div id='endText'></div>");
			
		/* 	if (correctNumber != myArr.length) { 
				$object.find('#endText').text('Hit shuffle and try again')
			}
			if ((correctNumber + 5) >= myArr.length) { 
				$object.find('#endText').text('Almost!') 
			}
			if (correctNumber == myArr.length) { 
				$object.find('#endText').text('Well Done!') 
			} 
			if ($object.last().parents('.slidee li').css('backgroundColor') != 'rgb(72, 72, 72)') { 	$object.find('#endText').css('color','black'); 
			} */
			
			$object.find('#endText').transition({opacity: 1});
			setTimeout(function(){						
				sly.set({ speed: 400, easing: 'easeInOutCirc'});
			},1300);						
		

		});
	
	},	
	shuffleFunction: function () { 
	/* 	console.log('shuffle clicked');  */

		$('#checkButton').css('text-decoration','none').off().on('tapclick', actions.checkFunction);
	  
		 $('#frame').find('.lis').last().find('.container').find('div').each(function () {
		/*  console.log('fdfddfd'); */
		$this = $(this)
			if ( $this.parents('.slidee li').css('backgroundColor') != 'rgb(72, 72, 72)'){
			
			$this.css('color','rgb(68, 68, 68)');
			}
			$this.unhighlight();
			
		})
		$('img').remove();
		$('#endText').remove();
		 $('#frame').find('.lis').last().find('.container').find('div').find('span').contents().unwrap();
			
			
			$('.object.tr,.object.fls').shuffle2();
	
		
		  $('.object.tr,.object.fls').trigger("ss-event-arrange");
		$('.object.tr,.object.fls').trigger("ss-event-dragreset");
		// sly.destroy().init(); 
	
			
	}
}




 $('#checkButton').on('tapclick',actions.checkFunction);
 $('#shuffleButton').on('tapclick',actions.shuffleFunction); 




});