$(function() {

	var quizTitle = window.parent.shout_text;
	var saveData = window.parent.xmlDataVar;
    var $ulContainer = $('#ulContainer ul');

	var rightTextArr;
	
	var isTablet = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
	
	if (!isTablet) { $('#container').css('overflow', 'visible')}			//will ensure that draggable can be seen outside container on pc
				
	var docWidth = window.parent.$('body').width();	
	if (docWidth > 1100) {	
		$('<button id="nextButton"></button><button id="prevButton"></button>').appendTo('#container');
	};
	
	function findText () {
		var textSource = $(saveData).find(quizTitle).find('textSource').text();	
		if (typeof textSource === 'string' && textSource.length > 0) { return textSource }
		else { return quizTitle }	
	}


	var stringData = $.ajax({
		url: "gapFillTextFiles/" + findText() + '.txt',
		async: false
	 }).responseText;
	 

	 var findString = stringData.search(/_[^\s]+_/i);
	
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
	
	 var textArr = newArr;	
	
		rightTextArr =  [];
		$.each(answerArr, function(i) {
			rightTextArr.push( answerArr[i] )
						
		});		


	quoteText = $(saveData).find(quizTitle).find('quote').text();
	$('#quoteText').text(quoteText);


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
	
	function enableDragandDrop () {
	
		$('.draggable').draggable({
				
			 iframeFix: true, //don't know what it does???
			//   containment: [(indent - 70),0,(indent + 950),610],

				scroll: false, 
				stack: ".draggable",
				start: function () {
					var $this = $(this);
					//$h1.html(quizHeadline + "<span class='bolder'> " + $this.text() + "</span><br><span class='shrink'>" + subTitle + "</span>");
				   $this.css({
					opacity: 1,
					/* zIndex: '9999', */
					}).attr('class','draggable ui-draggable');
					}
				
			});
			

			$( ".suffixes" ).droppable({
			out: function (event, ui) {
				var $this = $(this);
				//$this.removeClass('occupado');
				//var thisParentTime = $this.parent().parent();
				//prevSuffix = $(this);
				if ( $li.hasClass( $this.attr('id') ) == false ) {
					 $this.css({
					background: 'transparent',
					color: 'rgb(72, 72, 72)'
					}); 
					$this.removeClass('occupado');
					//alignLis(thisParentTime);
					 //$( ".suffixes" ).droppable( "disable" );
					 // $( ".suffixes" ).droppable( "enable" );
				}
				
				
				
				ui.draggable.css({'background-image':"url('../img/3_lighter2.jpg')", color: 'rgb(72,72,72)'});	
				//$li.css({background: 'rgba(187, 187, 187,1)',color: 'rgba(68, 68, 68,1)'});
			},
			drop: function( event, ui ) {
				var $this = $(this);
				if ( $this.hasClass('occupado') ) { return; }; 
				$this.addClass('occupado');
								
				$suffixes.each(function (i) {
					var $this = $(this);
				
					if (($this.css('background-color') == 'transparent' || $this.css('background-color') == 'rgba(0, 0, 0, 0)') && $this.text() != '???' ) {			
						$this.text('???').css('color','rgb(72, 72, 72)');						
					}
									
				});
				$this
				.html( "<nobr>" + ui.draggable.text() + "</nobr>")
				.css({
					background:'rgb(72, 72, 72)',
					color: 'rgba(187, 187, 187,1)'
				});
			   
				var position = $this.offset();
								
				ui.draggable.css({

					opacity: 0,
							
				});
				ui.draggable.addClass($this.attr('id'));
				alignLis($suffixes);
		
			},
			over: function( event, ui ) {
				if ( $(this).hasClass('occupado') ) { return; };
			//	var thisColor = ui.draggable.css('background-color');  // will only respond if css is saved to a var  
				ui.draggable.css({background: 'rgb(72, 72, 72)', color: 'rgba(187, 187, 187,1)'});
			}
		});
	}
	
	alignLis = function ($suffixes) {	// alignLis function
		var $ul = $ulContainer;
		$.each($suffixes, function(i,e) {
			var $this = $(this);
			if ($this.text() != '???') {
				var thisOffset = $this.offset()
				var liToMove =  $ul.find("." + $this.attr('id'));
				
				var liToMoveParentLiIndex = $this.parents(':eq(2)').index();

				var diff = 0;
				// code if li is not on current page (+-1000) to offset (width of slide in frame)
				if ( liToMoveParentLiIndex < sly.rel.activeItem) {
					diff = -(liToMoveParentLiIndex - sly.rel.activeItem) * 1000;
				}
				if ( liToMoveParentLiIndex > sly.rel.activeItem) {
					diff = (sly.rel.activeItem - liToMoveParentLiIndex) * 1000;
				}		
				liToMove.offset({ top: thisOffset.top - 6, left: thisOffset.left - 5 + diff })
				
			};

		});
	};

var init = function () {

	
	shuffle(answerArr);

	var indexes = 0;
	
	var origTextArr = []
	$.each(textArr, function (i,e) {
		origTextArr.push(e);
	})

	
	var lastPart;
	var setLastPart = 0;
	var cutOffLimit = 600
	
	$('.slidee').find('.time').each(function (i,e) {
		
		var $this = $(this);
		

		var hello = 0;
		
		if (setLastPart == 1) {
		
			$("<div class='object'></div>").text(lastPart).appendTo($this);
			setLastPart = 0;
			hello += $this.children().last().text().length + 50;
			
			nDroppables = ($this.children().last().text().match(/\.\.\./g) || []).length;				//account for number of droppables in text object
			nDroppablesSize = nDroppables * 12
			hello += nDroppablesSize
		}
			
				
		while ( hello < cutOffLimit && indexes < textArr.length) {
			
			$("<div class='object'></div>").text(textArr[indexes]).appendTo($this);
			indexes++;
			hello += $this.children().last().text().length + 50;

			nDroppables = ($this.children().last().text().match(/\.\.\./g) || []).length;				//account for number of droppables in text object
			nDroppablesSize = nDroppables * 12
			hello += nDroppablesSize
	
		}
		
	
		if (hello > (cutOffLimit + 140)) {
			
			
			var charactersAboveLimit = hello - cutOffLimit;
					
			var $thisLastObject = $this.find('.object').last();
			var characters = 0;
			
			
			var prevsHeight = 0;

			characters = $thisLastObject.text().length;
		
		
			var splitNumber = characters - charactersAboveLimit;
			if (splitNumber < 100) {
				
				splitNumber = 55;
			}
	
			var indexChar = 0;
			var e = $thisLastObject.text();
			var n = e.charAt(splitNumber);
			
			while (n != " ") {
				n = e.charAt((splitNumber) + indexChar)
				indexChar = indexChar -1;
				
			}
			
			var rounded = Math.round((splitNumber) + (indexChar +1));
			firstPart = e.substr(0,rounded)
			firstPart = firstPart + ' -';
			lastPart = e.substr(rounded,e.length);
			lastPart = ' -' + lastPart;
			arrRemovePos = i;
			
			$thisLastObject.remove();
			$("<div class='object'></div>").text(firstPart).appendTo($this);
			
			hello = 1000;
			setLastPart = 1;
				
		}
	
	});
	// remove li pages in slidee that are empty
	 $('.time:empty').remove();
	 $('li:empty').remove();
		
	
	var myHtml = '';
	$.each(answerArr, function(i,e) {									// create answer lis
		myHtml +=  "<li id='drag" + i +"' class='draggable ui-widget-content'>" + e + "</li>";
	})
	$('#ulContainer ul').append(myHtml)
	
	$li = $('#ulContainer li');
	
		var widthIndex = 0;
		var liTop = $('#ulContainer').outerHeight() - $li.outerHeight();
		var anumber;
		
		// layout li draggable in ul container
		$.each(answerArr, function(i, e) {	
			
			divWidth = $li.eq(i).width();
			var cssObject;
				cssObject = {
					left: widthIndex + 'px',
					top: liTop
				}
			
			$li.eq(i).css(cssObject);
				
			widthIndex = (widthIndex + divWidth) + 25 ;
			if (widthIndex > 850) {
				widthIndex = 0;
				liTop = liTop - $li.outerHeight() - 4;
				
			}
		}); 
		
	var indexSuffix = 0;
	$('.time').each(function () {
	var $this = $(this);

		while (indexSuffix < answerArr.length && $this.text().indexOf("...") >= 0) {					// replace ... with drop frame
		  var newMarkup = $this.html().replace(/\.\.\./, '<span class="suffixes" id="' + 'suffix' +indexSuffix + '">???</span>')
		indexSuffix++;
		  $this.html(newMarkup);
		};
	
	});
	
//$("body").css("overflow", "hidden");

if (!$.support.transition) {							
	$.fn.transition = $.fn.animate;
} 

		
$suffixes = $(".suffixes");	
			
}							//////////////// init function end /////////////

init();

$( window ).resize(function() {
	alignLis($suffixes);
});

enableDragandDrop (); 

function changeCode () {
	
		var visibleSuffixes = frameSlidee.find('.active').find('.suffixes');					//disable draggable behavior when not visible on ipad
    
			$suffixes.not(visibleSuffixes).each(function (i,e) {
				var thisClass = $(this).attr('id');
				if ( $li.hasClass( thisClass ) ) { 
				  $('.' + thisClass).draggable('disable').css('pointer-events','none');
				
				}
			
			});
   
		   visibleSuffixes.each(function (i,e) {
				var thisClass = $(this).attr('id');
				if ( $li.hasClass( thisClass ) ) {
					 $('.' + thisClass).draggable('enable').css('pointer-events', 'auto');
				}
			});		
		
		
			if (docWidth > 1100) {	
				 // Check whether Sly is at the start
				$('#prevButton')[this.pos.start === this.pos.dest ? 'addClass' : 'removeClass']('ButtonDisabled');
				// Check whether Sly is at the end
				$('#nextButton')[this.pos.end === this.pos.dest ? 'addClass' : 'removeClass']('ButtonDisabled');

				// Check whether the first item is active
				   $('#prevButton')[this.rel.activeItem === 0 ? 'addClass' : 'removeClass']('ButtonDisabled');
				// Check whether the last item is active
				$('#nextButton')[this.rel.activeItem === this.items.length - 1 ? 'addClass' : 'removeClass']('ButtonDisabled');
				
				
			};
}	
	    var frame = $('#frame');
		var frameSlidee = $('#frame').find('.slidee');
   // var items = frame.find('ul > li');
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
		dragSource:	'#frame',
	//	cycleBy:       'pages', // Enable automatic cycling by 'items' or 'pages'.
	//	cycleInterval: 1600, // Delay between cycles in milliseconds.
	//	pauseOnHover:  0,    // Pause cycling when mouse hovers over the FRAME.
	//	startPaused:   1, 
		pagesBar: $('.pages'),
		activatePageOn: 'click',
		keyboardNavBy: 'pages'		  
				
    });
	
	sly.on('change load', changeCode);
	
    sly.init();
	
	sly.set('touchDragging',1);	

	
var activeSlyPage = 0;
var slideToNextDelay = 0;

function slideToPage ($this) {						// check if last object on page
		sly.activatePage(activeSlyPage + 1)
		activeSlyPage++;
		slideToNextDelay = 700;						
};
function checkIfLast ($this) {						// check if last droppable on page
	var conClose = $this.closest('.time');
	if (conClose.is(':last-child') && $this.attr('id') == conClose.find('.suffixes').last().attr('id') ) {
			slideToNextDelay += 1000;	
	}	
};

function checking () {
		
	$('.ui-droppable').each(function(index2) {
		
					
		var $this = $(this);			
	
		if ($this.text() == rightTextArr[index2])	{
			
			$this.delay((index2 * 200) + slideToNextDelay)
				.transition({
					backgroundColor: "transparent",
					color: '#006400'
					
					
				},0, function () {
				$this.append("<img class='imgCheck' src='css/cssImg/check2Small.png'/>");
					//console.log($this.parent().parent().parent());
					if ($this.attr('id') == $('.active').find('.suffixes').last().attr('id')) {
						slideToPage($this);
						
					}
					
				$this.find('img').transition({opacity: 1});
				}).addClass('solved');
				
			checkIfLast($this);
					
		}
		else {
		
			if ($this.text() == '???') { 
								
				$this.delay((index2 * 200) + slideToNextDelay).transition({
				backgroundColor: 'transparent',
				color: '#a80000'
				
				}, 0,function () {
						$this.append("<img class='imgCheckCancel' src='css/cssImg/cancel.png'/>");
						if ($this.attr('id') == $('.active').find('.suffixes').last().attr('id')) {
							slideToPage($this);
						}
						
					
					$this.find('img').transition({opacity: 1});
					});
				checkIfLast($this);
			
			} 
			else {
							
				$this.delay((index2 * 200) + slideToNextDelay)
					.transition({
						backgroundColor: 'transparent',
						color: '#a80000'	
						
						},0, function () {
						$this.append("<img class='imgCheckCancel' src='css/cssImg/cancel.png'/>");	
						if ($this.attr('id') == $('.active').find('.suffixes').last().attr('id')) {
							slideToPage($this);
						}
					$this.find('img').transition({opacity: 1});
					});
				checkIfLast($this);
			}		
		}
		//alignLis();

	}).promise().done(function () {
		
		
		$('#checkButton').css({background: "rgba(68, 68, 68,1) url('css/cssImg/checkButtonSmall.png') 10% center no-repeat", color: 'rgb(204, 204, 204)'}).removeAttr("disabled");
		
		var solved = $('.time').find('.solved').size();
		var suffixes =  $('.time').find('.suffixes').size();
		
		if (solved <= suffixes ) {
		var myHtml = "<div class='object feedback'>Well done! You solved: " + solved + " Out of: " + suffixes + "</div>";
		}
		if (solved < suffixes/1.5 ) {
		var myHtml = "<div class='object feedback'>You could do better! You solved: " + solved + " Out of: " + suffixes + "</div>";
		}
		if (solved < suffixes/3 ) {
		var myHtml = "<div class='object feedback'>Try again! You solved: " + solved + " Out of: " + suffixes + "</div>";
		}
		
		$('.time').last().append(myHtml);
		
		
		$('.feedback').css({x: 116}).transition({opacity: 1, scale: 1.5}, 500, function () {
			sly.set({speed: 400, easing: 'easeInOutCirc'});
		});
	
	
	});
};	// end of checking function

var answerSwitch = 0;
		
$('#checkButton').fastClick(function (event) {
		event.preventDefault();
		
		if (answerSwitch == 1)  { 
			return; 
		}
		answerSwitch = 1;
		
		$('.ui-droppable').css({border: 'none'})
		$('.draggable').transition({opacity: 0},180,function () {
			$(this).remove();
		});
		$(this).css({background: "rgb(68, 68, 68) url('../img/ajax-loaderSmall.gif') 13% center no-repeat"})
		setTimeout(function() {
							 
			sly.set({ speed: 1000, easing: 'easeInOutCubic'});
			activeSlyPage = 0;
			slideToNextDelay = 0;

			if (sly.rel.activeItem != 0) {
				sly.one('moveEnd', checking);
				sly.off('change');
				sly.toStart();
			}
			else {
				checking();
			}
		
		}, 250);

});
  
	
$('#shuffleButton').fastClick(function (event) {
	event.preventDefault();
	answerSwitch = 0;
	sly.set({speed: 400, easing: 'easeInOutCirc'});
	$('.object').remove();
	$li.remove();
	$('#checkButton').css({background: "rgba(68, 68, 68,1) url('css/cssImg/checkButtonSmall.png') 10% center no-repeat", color: 'rgb(204, 204, 204)'}).removeAttr("disabled");
	//sly.on('change', changeCode);    // Don't know if rebind is needed
	
	init();
	enableDragandDrop (); 

});


$('#prevButton').addClass('ButtonDisabled');	// prev button hidden by default
	
$('#prevButton').fastClick(function (e) {
	e.preventDefault();
	sly.prevPage();
}); 	
  
$('#nextButton').fastClick(function (e) {
	e.preventDefault();
	sly.nextPage();	
}); 	
	 
});