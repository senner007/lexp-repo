var xmlDataVar;
var globalScoreVariable;
var shout_text;					// Global var to send information about exercise title to iframe
$(document).ready(function(){

var $loaderGif = $('#loaderGif');

var isTablet = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

if ( isTablet ) {	// if tablet then bring in tablet.css

	$("<link/>", {
	   rel: "stylesheet",
	   type: "text/css",
	   href: "tablet.css"
	}).appendTo("head");

}

/* Array.prototype.removeByIndex = function(index) {
    this.splice(index, 1);
}
 */
	
$.ajax({    	// ------------------------------------Beginning of Ajax function------------------------

	url: 'quiz/quiz.xml',
	dataType: 'xml',
	cache: true,
	success: function (data) {

	xmlDataVar = data;

	$('.item.coltext1,.item.coltext2,.item.coltext3,.item.colRules1,.item.colRules2').css('visibility', 'visible');
	
		var myHtml = "";

		var lastGrammar;
		var lastVocab;
		var lastTheme;
		var lastText;

		setHeadlineClass = function ($thisHeadline) {
			
			if ( $thisHeadline == 'Theme' ) {
				return "<span class='highlight'>Theme</span>";
			}
			if ( $thisHeadline == 'Grammar' ) {
				return "<em class='grammarHl'>Grammar</em>";
			}
			if ( $thisHeadline == 'Text/Grammar' ) {
				return "<span class='blackWhite'>Text</span><em class='grammarHl'>Grammar</em>";
			}
			if ( $thisHeadline == 'Text' ) {
				return "<span class='blackWhite'>Text</span>";
			}
			if ( $thisHeadline == 'Vocabulary' ) {
				return "<span class='vocabHl'>Vocabulary</span>";
			}
			if ( $thisHeadline == 'Theme/Grammar' ) {
				return "<span class='highlight'>Theme</span><em class='grammarHl'>Grammar</em>";
			}
		
		};
		splitSubtitle = function ($thisSubTitle) {
			var hello = $thisSubTitle.split(" - ");
			var firstChar = hello[0].charAt(0);
			if (hello.length > 1) {
				return "<span class='boldedSub'><span class='someclass'>" + firstChar + '</span>' + hello[0].substring(1, hello[0].length) +"</span>" + ' - ' + hello[1];
			}
			else {
				return "<span class='boldedSub'><span class='someclass'>" + firstChar + '</span>' + hello[0].substring(1, hello[0].length) +"</span>";
			}
		
		}
					
		alignQuiz = function() {
			
			
			$(data).find('quizes').children().each(function (i,elem) {	
			
				var $this = $(this);
				var $thisSubTitle = $this.find('subTitle').text();
				
				var $thisHeadline = $this.find('headline').text()
				var $thisTitle = $this.find('title').text();
				
				var higlightVar = setHeadlineClass($thisHeadline);
				var $thisSubTitleSplit = splitSubtitle($thisSubTitle);

				if ($thisSubTitle.charAt($thisSubTitle.length-1) != 'I' && $thisSubTitle.charAt($thisSubTitle.length-1) != 'V') {
					
					myHtml += '<div data-abc="' + $thisSubTitle + '" '  + "class='item exc " +  this.tagName + " isotope-brick' data-fancybox-type='iframe' title='" + $thisTitle + "'><div class='hL'>" + higlightVar + "</div>" + '<span class="shrink">' + $thisSubTitleSplit + '</span>'				
				
				}
				
				else  { // the appended divs must come right after main div in xml file
			
					 myHtml += "<div class='" + this.tagName + ' ' + 'appended' + "' data-fancybox-type='iframe' title='" + $thisTitle + "'><span class='shrink'>" + $thisSubTitleSplit + '</span></div>'
				
				}
				
				var $nextElemText = $(elem).next().find('subTitle').text();	
					
					if  ($nextElemText.charAt($nextElemText.length-1) != 'I' && $nextElemText.charAt($nextElemText.length-1) != 'V') {
					
			
						myHtml += '</div>'
					}
			
				
			/* if ( $thisHeadline.indexOf("Esl") >= 0 ) {lastEsl = $thisTitle} */
			if ( $thisHeadline.indexOf("Grammar") >= 0 ) {lastGrammar = $thisTitle}	
			if ( $thisHeadline.indexOf("Vocabulary") >= 0 ) {lastVocab = $thisTitle}
			if ( $thisHeadline.indexOf("Theme") >= 0 ) {lastTheme = $thisTitle; }
			if ( $thisHeadline.indexOf("Text") >= 0 ) {lastText = $thisTitle}			
			//if ( $thisHeadline.indexOf("True/False") >= 0 ) {lastTrueFalse = $thisTitle}
			
			});	
		
		}
		alignQuiz();
		$('#containerOuter').css({opacity: 1});
			/* console.log(lastTheme ) */
	
								
			$('#container').append(myHtml);	
		
			var imgVar = '';
					 	
				imgVar += '<a data-abc="Nouns" rel="gallery" id="NounsImg" href="img/nouns2.png" class="item colimg2 fancybox" title="Legendary Nouns"><img src="img/nouns3.png" /></a>';
				
				imgVar += '<a data-abc="Adverbs" rel="gallery" id="AdverbImg" href="img/adverbs2.png" class="item colimg1 fancybox" title="I study my adverbs..."><img src="img/adverbs3.png" /></a>';
			
				imgVar += '<a data-abc="Adjectives" rel="gallery" id="AdjectImg" href="img/adjectives2.png" class="item colimg2 fancybox" title="Are you?"><img src="img/adjectives3.png" /></a>';
				
				imgVar += '<a data-abc="Verbs" rel="gallery" id="VerbsIrrImg" href="img/wordleVerbsIrr.jpg" class="item colimg2 fancybox" title="Ring rang rung"><img src="img/wordleVerbsIrrSmall.jpg" /></a>';
				
				imgVar += '<a data-abc="Prepositions" rel="gallery" id="PrepImg" href="img/preps2.png" class="item colimg2 fancybox" title="Prepositions"><img src="img/preps3.png" /></a>';

					
				$(imgVar).appendTo('#container');
				
				preload([
					"img/adjectives2.png",
					"img/nouns2.png",
					"img/adverbs2.png",
					"img/preps2.png",
					"img/wordleVerbsIrr.jpg",
					"img/uncountableNouns.jpg"
				]);

			
			var $container = $('#container');										
									
				$container.find("div[title='" + lastGrammar  + "']").addClass('recent')
				.end().find("div[title='" + lastVocab  + "']").addClass('recent')
				.end().find("div[title='" + lastTheme  + "']").addClass('recent')
				.end().find("div[title='" + lastText + "']").addClass('recent');	
				//.end().find("div[title='" + lastTrueFalse  + "']").addClass('recent');
				//.end().find("div[title='" + lastEsl  + "']").addClass('recent');
													
				recentParent = $container.find('.recent').parents('.item').add('.item.recent');

			var $items = $('.item');
			
	   		$loaderGif.hide();
					
			$('.colimg2').css('visibility','visible');
						 
			$container.isotope({ 		
				itemSelector: '.item',
				layoutMode: 'packery',
				resizesContainer: false,
				resizable: false,
				hiddenStyle: { opacity : 0},
				 getSortData: {
						category: '[data-abc]'
				}, 
				sortBy: 'category',		
				transitionDuration: '0.7s'
				}).isotope({ filter: recentParent });
				
				$itemGrammar = $container.find($(".exc:contains('Grammar')"));
				$itemVocab = $container.find($(".exc:contains('Vocabulary')"));
				$itemTrueFalseTheme = $container.find($(".exc:contains('Theme')"));
				$itemI = $container.find('.item.colimg1,.item.colimg2');
				$itemRules = $container.find(".colRules1,.colRules2,.coltext1,.coltext2,.coltext3,.exc:contains('Text')");
				$itemsAll = $container.find('.item').not('#introText');
				
				window.defScripts = new $.Deferred();
				$.when(
					$.getScript( "fancybox/jquery.fancybox215Mod.js" ),
					$.getScript( "quiz/js/jquery.easing.1.3.min.js" ),
				$.Deferred(function( deferred ){
					$( deferred.resolve );
					})
					).done(function(){
					defScripts.resolve();
				}); 
			
		
			$('#site-nav').find('#showInit').addClass('siteNavClass');

			if (isTablet) {
				$('#subtitleText').text('Tablet device must be rotated to landscape mode').animate({opacity: 1},600).animate({opacity: 0},600).animate({opacity: 1},600);
				$('#introSearch').remove();
			} 
			else {
				$('#subtitleText').text('Use menu to filter and sort items alphabetically. Press Ctrl + mousescroll or +/- to zoom').animate({opacity: 1},600).animate({opacity: 0},600).animate({opacity: 1},600);
				
			}
		

	},			// ajax succes function end 
	
	error: function () {
	$("body").text('Site under construction.');
	
	}
	
	
});         				 // ------------------------------End of Ajax function-------------------------------



$.fn.disableSelection = function() {
	return this
	 .attr('unselectable', 'on')
	 .css('user-select', 'none')
	 .on('selectstart', false);
};

$('body').disableSelection();				
	
jQuery.extend( jQuery.fn, {
	search: function(p) {
		jQuery.expr[':'].icontains = function(a, i, m) {// :icontains is a case insensitive selector
			var v1 = jQuery(a).text().toUpperCase()
			.indexOf(m[3].toUpperCase()) >= 0;
			var v2 = jQuery(a).data('abc').toUpperCase()
			.indexOf(m[3].toUpperCase()) >= 0;
			if ( v1 || v2 == true ) { 
				return true;
			}
		};
		if (p.match(/.+/g) == null) return this;
		var t1 =  $(this).filter(':icontains(' + p + ')');
		return t1;
	}
});


 $('#site-nav').on('keyup','#searchM',function() {
	var $container = $('#container');
	var v = $(this).val();
	
	$container.find('.hideItem').removeClass('hideItem').show();
	
	var s =  $itemsAll.search(v);
	
	var quizTypes = ['transition','sortable','quiz','scrambled','gapFill','doubleTrouble','trueFalse','jumbled']
	
	$.each(quizTypes, function (i,e) {
		if (v.toUpperCase() == e.toUpperCase()) {
		
			var bla = $container.find('.' + e + '.appended').parent().not('.' + e);
			var bla2 = $container.find('.' + e);
			bla.find('.appended').not('.' + e).addClass('hideItem');
			bla.children().not('.' + e).not('.hL').addClass('hideItem');
			bla2.find('.appended').not('.' + e).addClass('hideItem');
			s = bla.add(bla2);
		}
	})
	
	if ( v != '') {
		$container.isotope({ filter: s })
	}
	
});  
/* $('#container').hammer({drag_block_horizontal: true}); */


								
$('#container').on('tapclick','div',function(ev) {
	
	// lock to scroll position because ipad needs to stop before loading of Transiton quiz
	var $document = $(document);
	$document.scrollTop($document.scrollTop());
	
	// don't know if they are needed
	ev.preventDefault();
	ev.stopPropagation();
	
	$('#topHeader a').addClass('tempDisable');
	
	var $this = $(this);
	
	//make entire div clickable
	if ( $this.hasClass('hL') ) { $this = $this.parent();} 

	//load the right quiz if hL is clicked when span.shrink is filtered out
	if ($this.find('.shrink').hasClass('hideItem')) { $this = $this.find('.appended').not('.hideItem'); };
	
	// return if not iframe
	if ($this.data('fancybox-type') != 'iframe') { return; }
	
	// back out if hidden item
	if ( $this.hasClass('isotope-hidden') || $this.parent().hasClass('isotope-hidden')) { return;}
	
	// add the spinner
	$loaderGif.show();
	
	// set new iframe instance from LoadIframe constructor
	var loadIframe = new LoadIframe($this);
	
	// set deferred for fancybox
	window.fancyDeferred = new $.Deferred();
	
	 // wait for scripts to load and then call fancybox
	$.when(defScripts).done(function () { 
			loadIframe.loadFancy(); 
	});
	
	// callback on fancybox loaded with deferred
	$.when(fancyDeferred).done(function (fancyInstance) { 
	
			// hide the spinner
		
			$loaderGif.hide();
			loadIframe.addListeners(fancyInstance);
			loadIframe.animateIn(fancyInstance);
			
			
	});
	
			
});	

function LoadIframe($div) {

	this.$div = $div

	this.theBody = document.getElementsByTagName('body')[0];
	this.listener = function (event) { event.preventDefault(); };	
		 
	// current scroll position
	this.scrollPos = $(window).scrollTop();

	// same title in global var used inside iframe
	window.shout_text = this.$div.attr('title');

	this.quizHeight = 0;
	this.qhref = '';

	if (this.$div.hasClass('quiz') ){		//input Quiz	
		
		this.qhref = 'quiz/quizIndex_old.html';
		var multiChoice = $(xmlDataVar).find(this.$div.attr('title')).find('multiChoice').text();
		if (multiChoice == 'True') { this.quizHeight = 450; } else { this.quizHeight = 280; }
		
	}
	if (this.$div.hasClass('scrambled') ){					//scrambled
		this.qhref = 'quiz/scrambleIndex.html';
		this.quizHeight = 325;						
	}
	if (this.$div.hasClass('sortable') ){						// sortable
		this.qhref = 'quiz/indexSortable.html';		
		this.quizHeight = 580;
	}
	if (this.$div.hasClass('trueFalse') ){					// truefalse
		this.qhref = 'quiz/trueFalse.html';	
		this.quizHeight = 640;						
	}
	if (this.$div.hasClass('jumbled') ){				// jumbled
		this.qhref = 'quiz/jumbleIndex.html';
		this.quizHeight = 630;
	}
	if (this.$div.hasClass('doubleTrouble') ){				// doubleTrouble
		this.qhref = 'quiz/doubleTrouble.html';
		this.quizHeight = 570;
	}
	if (this.$div.hasClass('gapFill') ){					// gapfill
		this.qhref = 'quiz/gapFill.html';
		this.quizHeight = 640;
	}
	if (this.$div.hasClass('transition') ){			//transition
		this.qhref = 'quiz/transition.html';
		this.quizHeight = 630;
	}
	if (this.$div.hasClass('variousRules') ){			//rules text	
		this.qhref = this.$div.attr('href');
		this.quizHeight = 630;
	}
	$container = $('#container')
	
	$container.append("<div id='stamped'></div>"); // add the stamp
	this.stampedItem = $container.find('#stamped');
	this.stampedItem.css({
		height: this.quizHeight,
		top: this.scrollPos -140
	})
	if (this.$div.hasClass('appended')) {
		this.stampedItem.append(this.$div.parent().find('.hL').clone()).append(this.$div.find('.shrink').first().clone());
		this.isotopeItem = $container.isotope( 'getItem', this.$div.parent()[0] ) //get isotope item and hide/reveal when animating
	}
	else {
		this.stampedItem.append(this.$div.find('.hL').clone()).append(this.$div.find('.shrink').first().clone());
		if (this.$div.hasClass('variousRules')) { 
			this.stampedItem.find('.shrink').css({
				'margin-top':'-27px',
				'float': 'left',
				marginLeft: '67px'				
			}) 
		};
		this.isotopeItem = $container.isotope( 'getItem', this.$div[0] )
	}

}
								
LoadIframe.prototype.loadFancy = function () {
   
	$.fancybox({
		href: this.qhref,
		type: 'iframe',
		padding: 0,
		margin: [0,0,0,0],
		keys : {
			close  : null
		},
		 closeBtn: false,	
		 maxWidth	: 3000,
		maxHeight	:3000, 
		//fitToView	: false,
						
		width		: '100%',
		height		: '100%',
		iframe : {
				scrolling : 'no',
				preload   : true
			},
		autoSize	:false,	
		openSpeed: 0,
		openEffect	: 'none',
		closeEffect	: 'none',
		openOpacity: false,
		closeOpacity: false,
		closeSpeed: 0,
		mouseWheel: false,
		closeEasing: 'none',
		helpers     : { 
			title: null,
			overlay: null,
			 overlay: {
				locked: !isTablet 
				// is set to false for tablet devices because of iframe diplacement when activating keyboard in input quiz
				// if true (default), the content will be locked into overlay
			}, 
			// prevents closing when clicking OUTSIDE fancybox
		},
		afterLoad:  function () {	window.fancyDeferred.resolve(this);	}
	});
}

LoadIframe.prototype.animateIn = function (fancyInstance) {


		var stampedItem = this.stampedItem;
		var thisItem = this.isotopeItem
	
		this.$div.css('opacity',0);
		// the isotope hide method breaks layoutComplete event in IE10/11
		//$container.isotope( 'hide',  [thisItem] )		
		
		if (this.scrollPos < 140 ) {
			$('#mainHeader').addClass('opacityOut');
		}
				
		$container.isotope( 'once', 'layoutComplete', function() {
			
		 	stampedItem.addClass('opacityIn');
			fancyInstance.content.addClass('opacityIn');

		}); 
	
		$container.isotope( 'stamp', stampedItem).isotope('layout');
};

LoadIframe.prototype.addListeners = function(fancyInstance) {		
	var theIframe = fancyInstance.content.contents();

	/* var htmlElement = document.getElementsByTagName("html")[0]; */

	// event handlers to prevent iframe move after init

	theIframe[0].addEventListener(eMove, this.listener, false);  		
	this.theBody.addEventListener(eMove, this.listener, false);  
	this.theBody.addEventListener(eStart, this.listener, false);  
	theIframe[0].addEventListener('mousewheel', this.listener, false); 

	// To-do : disable text selection for ie with vanilla JS
	
	// focus to iframe to allow keyboard navigation on sly.
	fancyInstance.content.focus(); 
	theIframe.find('html').focus(); 

	// setup event handlers for the closing button ( must be native js to prevent memory leak )
	theIframe[0].addEventListener('keyup',function (e) { 
		if(e.which == 27) {
			this.closingFunction(fancyInstance);
		}
	}.bind(this));
	
	theIframe.find('#closingButton')[0].addEventListener(eStart,function (e) {
		this.closingFunction(fancyInstance);
	}.bind(this)); 

};
	
LoadIframe.prototype.closingFunction = function(fancyInstance) {

		this.theBody.removeEventListener(eMove, this.listener , false);  
		this.theBody.removeEventListener(eStart, this.listener , false); 

		var stampedItem = this.stampedItem
	
		stampedItem.remove();
				$.fancybox.close();
		
		if (this.scrollPos < 140 ) {
				$('#mainHeader').addClass('opacityIn').removeClass('opacityOut');			
		}
		// hide method not working with layoutcomplete
		this.$div.css('opacity',1);
		
		$container.isotope( 'once', 'layoutComplete', function() {
				
				$('#mainHeader').removeClass('opacityIn');
				$('#topHeader a').removeClass('tempDisable');	
		});
		//$container.isotope( 'reveal',  [this.isotopeItem] ).
		$container.isotope( 'unstamp', stampedItem).isotope('layout');
			
};

$.support.transition = (function(){
    var thisBody = document.body || document.documentElement,
        thisStyle = thisBody.style,
        support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;
    return support;
})();

// get supported event type 
function getEventType () {

	var eventType = {};
	if (window.navigator.pointerEnabled) {
		eventType.start = "pointerdown";
		eventType.move = "pointermove";
		eventType.end = "pointerup";
	} 
	else if (window.navigator.msPointerEnabled) {
		eventType.start = "MSPointerDown";
		eventType.move = "MSPointerMove";
		eventType.end = "MSPointerUp";
	}
	else if ( 'ontouchend' in document ) {
		eventType.start = "touchstart";
		eventType.move = "touchmove";
		eventType.end = "touchend";
	}
	else {
		eventType.start = 'mousedown';
		eventType.move = "mousemove";
		eventType.end = "mouseup";
	}
	return eventType;

};
var eStart = getEventType().start;
var eMove = getEventType().move;
var eEnd = getEventType().end;

TypeWriteFirst = function(el) {  // ought to be build into category switcher function
		el.each(function() {   // will wrap .someclass around first letter 
		    var h = $.trim( $(this).text() );
			var n = h.charAt(0);
		   $(this).html('<span class="someclass">' + n + '</span>' + h.substring(1, h.length));
		});
	};

categorySwitch = function(category, catHilight) {
	
	category.each(function () {
		$this = $(this);
	

		if (  $this.find('.hL').children().size() > 1 ) { // if there is more than one headline
				
			var headIndex =  $this.find(catHilight).index() 
			if (headIndex != 0) {  // if headlines are not already switched
				var v1 = $.trim($this.find('.hL').children().first().text())
				var v2 = $.trim($this.find('.hL').children().last().text())
	
				if ((v1.length + v2.length) > 15) {
				
					$this.find(catHilight).html($.trim($this.find(catHilight).text()) + ' ')
					
				}
				else {
					$this.find(catHilight).html($.trim($this.find(catHilight).text()))
				}
				$this.find(catHilight).prependTo( $this.find('.hL') )
				
				var subtitles = $this.find('.boldedSub').text().split(",");
				$this.find('.boldedSub').text($.trim(subtitles[headIndex] + ', ' + subtitles[headIndex - 1]));
				$this.attr('data-abc', $.trim($this.find('.shrink').text()));
				TypeWriteFirst($this.find('.boldedSub'));
			}
				
		}
	});

}

$('#site-nav').on('tapclick','li',function(e){
	e.preventDefault();
	var $container = $('#container');
	$container.find('.hideItem').removeClass('hideItem').show();
	
	var $this = $(this);
	$('#searchM').val('');
	if ($this.hasClass('siteNavClass')) { return; };
		
	$this.addClass('siteNavClass').siblings().removeClass('siteNavClass');	

	switch( $this.attr('id') ) {
		case 'showInit':
			$container.isotope({ filter: recentParent })	
			break;
		case 'showAll':	
			$container.isotope({ filter:  $itemsAll });		
			break;
		case 'navRules':
			categorySwitch($itemRules, '.blackWhite' );
			$container.isotope( 'updateSortData', $itemRules ).isotope({ filter: $itemRules });
			
			break;
		case 'navImages':
			$container.isotope({ filter: $itemI });
			break;
		case 'navGrammar':
			categorySwitch($itemGrammar, '.grammarHl' );
			$container.isotope( 'updateSortData', $itemGrammar ).isotope({ filter: $itemGrammar });
			break;
		case 'navVocab':
			categorySwitch($itemVocab, '.vocabHl' );
			$container.isotope( 'updateSortData', $itemVocab ).isotope({ filter: $itemVocab });
			break;
		case 'navThemesTrueFalse':
			categorySwitch($itemTrueFalseTheme, '.highlight' );
			$container.isotope( 'updateSortData', $itemTrueFalseTheme ).isotope({ filter: $itemTrueFalseTheme });
			break;
	}
});


 
$('#topHeader').find('a').on('tapclick',function(e){
e.preventDefault();
var $this = $(this);
if ( $this.hasClass('tempDisable') ) { return; }; 
$loaderGif.show();	
	$.when(defScripts).done(function () { // wait for fancyScript
		switch( $this.attr('id') ) {
			case 'navChangelog':
				$.fancybox({
					href: 'history/history.html',
					type: 'iframe',
					fitToView	: false,
					maxWidth		: 700,
					maxHeight		: 700,
					autoSize	: false,
					padding: 0,
					margin: 0,
					topRatio: 0.1,
					width		: '100%',
					height		: '100%',
					closeClick	: false,
					openEffect	: 'elastic',
					openSpeed: 400,
					closeEffect	: 'elastic',
					afterLoad:  function () {		
						this.content.css({opacity:1});	
						$loaderGif.hide();
					}
				});
			break;
			case 'quizMenu':
				$.fancybox({
					href: 'quizMenu/quizMenu.html',
					type: 'iframe',
					fitToView	: false,
					maxWidth		: 900,
					maxHeight		: 700,
					autoSize	: false,
					padding: 0,
					margin: 0,
					topRatio: 0.1,
					width		: '100%',
					height		: '100%',
					closeClick	: false,
					openEffect	: 'elastic',
					openSpeed: 400,
					closeEffect	: 'elastic',
					afterLoad:  function () {
						this.content.css({opacity:1});
						$loaderGif.hide();
						}
				});
			break;	  
		}
	});	
});

$('#container').on('click', function(e) { 
	 e.preventDefault();
	}, false);  
	
/* $.Finger.preventDefault = true;	 */

								
/* $('img').hammer().on("swipe", function(event) {
        console.log(this, event);
	  event.gesture.preventDefault();

	event.stopPropagation();
	
	
    }); */
    

/* $('#container').hammer({
drag_block_horizontal: true



}).on("swipe",function(event) {

event.gesture.preventDefault();
event.stopPropagation(); 
event.gesture.stopDetect()
if ( event.gesture.distance > 100 ) {
	
	if(event.gesture.direction == 'right' ) {
		
		if ( $('.siteNavClass').attr('id') == "showInit" ) {
			$('#site-nav').find('#navThemesTrueFalse').trigger('click')
		}
		else {
			$('.siteNavClass').prev().trigger('click')
		}
	} 
	
	
	if (event.gesture.direction == 'left'){ 

		if ( $('.siteNavClass').attr('id') == "navThemesTrueFalse" ) {
		
		$('#site-nav').find('#showInit').trigger('click')
		}
		else {
			$('.siteNavClass').next().trigger('click')
		}
			
	}	
}
	

    }); */
	
	
    
/*    $('#container').on('flick', function(e) {

	  if ('vertical' == e.orientation) {
		return;
	  }
	e.preventDefault();


    if ('horizontal' == e.orientation) {
	
        if (1 == e.direction) {
		if ( $('.siteNavClass').attr('id') == "showInit" ) {
			$('#site-nav').find('#navThemesTrueFalse').trigger('click')
		}
		else {
			$('.siteNavClass').prev().trigger('click')
		}
        }
        else {
		if ( $('.siteNavClass').attr('id') == "navThemesTrueFalse" ) {
		
		$('#site-nav').find('#showInit').trigger('click')
		}
		else {
			$('.siteNavClass').next().trigger('click')
		}
        }
    }
    
}); */
 

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}


$(window).on('orientationchange', function(event) {
	var windowsize = $(window).width();
	if(windowsize < 1024) {
		alert('please rotate device to landscape mode')
	}
});
	
	
$('#container').on('tapclick','a img',function(e){
		
	e.preventDefault();
	e.stopPropagation();			
	var $this = $(this); 			
	$.when(defScripts).done(function () { // wait for fancyScript
		
		$.fancybox.open($this.parent().attr('href'), { // disabled gallery
			padding : 0,
			openSpeed: 0,
			closeSpeed: 0,	
			afterLoad: function () {

				$('.fancybox-overlay').css('opacity',0);
				$('.fancybox-iframe').contents().find('.fancybox-close').attr('id', 'helloClose').unbind();
				$('.fancybox-outer').css('background-image',"url('img/3.jpg')");     
				  
			},
			afterClose: function () {
			
				$('.fancybox-overlay').animate({opacity: 0},300, function () {
					$(this).hide();
				});  
			},	
			beforeShow: function () {
				$('.fancybox-image').css({opacity:1});
			},
			afterShow: function () {						
				$('.fancybox-overlay').animate({opacity:1},500);				
			},			
			helpers     : { 
				overlay : {
					closeClick: false,	
				}
			}
		
		});
		
	});	
});

});