(function ( $ ) {                 			    // Compliant with jquery.noConflict()
$.fn.jMyPuzzle = function(o) {  

	return this.each(function() { 
	
		var div = $(this), ul = $("ul", div), li = $("li", ul);		// Variables declaration
		var left=0, move=null, forward = 1, backward=2, eltPos = 0;		
		this.elts = new Array(li.size());
		var elts = this.elts, n = 0, ulSize = 0, nbTrials = 0, nbValid=0, nbNotValid=0, nbMiValid=0;						
		var autoValidate;
		
		ul.css({display:'block', position:'absolute'});				// ul style
		li.css({													// li style
				//'float':'left',
				"list-style-type":"none",
				'display':'block',
				'position':'absolute'
				});
		
		
		li.each(function(){ ulSize += width($(this)); });			// calculate the size of the ul element

		//div.css('width', ulSize);									// set the div size
		ul.css({width:ulSize, height: ((li.height() + parseInt(li.css('marginTop')) + parseInt(li.css('marginBottom')) + parseInt(li.css('paddingBottom')) * 2 + parseInt(li.css('paddingTop')) * 2) + 'px') });	 	// Update the ul size
		ul.css('left', div.offset().left + (  (div.width() - ulSize) / 2  )   - $('#frame').offset().left  ); // Center the ul in the main div
	
		initPos();				// init the li position (left position) 
		
		
		 /*  if ($.support.transition) {		// must be set when container is not absolute pos.(not for IE) - SENNER
	 				var indent = (1000 - div.find('.splitList').width())/2
					div.find('.splitList').css({left:indent});	
			
			}   */

		li.each(function(){ 
			var elt = $(this);									// currentelement														
																	// collect information about the element and store 
																	// them into the object itself
			elt.outerWidth = width($(this));						// its size (with the margin)
			elt.pos = getOffset(elt);								// its position (left and top position)
			elt.initialN = n;										// its initial position (as per the other elements)
			elt.n = n;												// its current position (as per the other elements)

			elt.draggable({											// make the element draggable
				iframeFix: false,
				addClasses: false,
				containment: div,
				drag: function(evt, ui){ onDrag(evt, ui, elt, elts); }, // event on drag
				start: function(evt, ui){	
	// $('.active').find(".jMyPuzzle").find('ul').each(function () {
					
					//	this.style.webkitTransform = 'scale(1)'
				//	});				// even on start dragging
					var e = elts[elt.n];
				 	e.css({'opacity': 0.4, 'z-index':200});
//li.css({display: 'none'}).css({display: 'block'});
				},
				stop:function(evt, ui){		
//li.css({display: 'none'}).css({display: 'block'});						// event on stop dragging
				 	var e = elts[elt.n];
				 	e.css({'opacity': 1.0, 'z-index':5});
					if (!!o.setChars) {
						o.setChars();
					}
						// re-align lis after uppercase/lowercase - Senner
						// for difficulty setting  2
					if (o.reAlign == 2)	{
							//console.log('helloThere')
							e.transition({'left': e.pos.left + 'px', top : e.pos.top, x:  ui.position.left - e.pos.left, y:  ui.position.top - e.pos.top },0, function () {
						
								$(this).transition({x: 0, y: 0},270, function () {
								
								var left=0;			
								div.find('li').each(function(){ 	
									var $this = $(this)
									$this.transition({left: left + 'px',top : 0}, 100);
									left += width($this);
								});
								
								
								
								});
							
							});
							
							
							
					}
						// for difficulty setting 0
					else {
					
					 	e.transition({'left': e.pos.left + 'px', top : e.pos.top, x:  ui.position.left - e.pos.left, y:  ui.position.top - e.pos.top },0, function () {
						
							$(this).transition({x: 0, y: 0},270, function () {
								// auto color lis when difficulty set to 0 - Senner
							//	$('<style></style>').appendTo($(document.body)).remove();
								if (!!o.autoValidate) {
									o.autoValidate();	
								}
							
							});
						
						}); 
					/* 	e.transition({left: e.pos.left, top : e.pos.top},500, function () {
						// auto color lis when difficulty set to 0 - Senner
							if (!!o.autoValidate) {
								o.autoValidate();	
							}
							
						 }); */
					}
									
				}
			});
			
			elts[n++] = elt;
			
		});
		
		
	
		/**
		 * recursive function. check the elements one by one and show whether it is true, false, or mi false
		 * @param n: the round
		 * @param answerTab: the given answer array
		 */
				
		function onDrag(e, ui, elt, elts){
			var thisElt = this;		//must be saved to a variable to avoid random occurence of nonmoving elements in safari ipad.
			var oldPos = (thisElt.eltPos != null ? thisElt.eltPos : getOffset(elt));
			thisElt.eltPos = getOffset(elt);

			if(thisElt.eltPos.left == oldPos.left) { return; }							// Not moving = doing nothing
			move = (thisElt.eltPos.left > oldPos.left ? forward : backward);			// check whether the move is forward or backward

			if(move == forward){
				if(elt.n < elts.length-1){
					var eltNext = elts[elt.n + 1];
					var eltNextBound = eltNext.pos.left + parseInt(eltNext.outerWidth / 2);
					if(thisElt.eltPos.left + elt.outerWidth > eltNextBound){
						if (eltNext.hasClass('locked') ){ return; } 
						elt.insertAfter(eltNext);
						eltNext.pos.left = elt.pos.left;
						elt.pos.left += eltNext.outerWidth;
																					//invert datas in the correspondence array
						elts[elt.n] = eltNext;
						elts[elt.n + 1] = elt;
																					//update the n of the elements
						elts[elt.n].n = elt.n; 
						elt.n = elt.n + 1;
						//console.log( width(eltNext) );
						eltNext.transition({'left': eltNext.pos.left + 'px', x: '+=' + width(elt)},0, function () {
						
							$(this).transition({x: 0}, 250);
						
						});
					}
				}
			}
			else if(move == backward){
				if(elt.n > 0){
					var eltPrev = elts[elt.n - 1];
					var eltPrevBound = eltPrev.pos.left + parseInt(eltPrev.outerWidth / 2);
					
					if(thisElt.eltPos.left < eltPrevBound){
					
						// don't move beyond green colored items 
						// for difficulty setting 0
						if (eltPrev.hasClass('locked') ){ return; } 
						else {
							//console.log('hello2')
							elt.insertBefore(eltPrev);
							
							elt.pos.left = eltPrev.pos.left;
							eltPrev.pos.left += elt.outerWidth;
							
							//console.log(elt.text())
							
							elts[elt.n] = eltPrev;
							elts[elt.n - 1] = elt;
																						// update the n of the elements
							elts[elt.n].n = elt.n; 
							elt.n = elt.n - 1;
							eltPrev.transition({'left': eltPrev.pos.left + 'px', x: '-=' + width(elt)},0, function () {
							
								$(this).transition({x: 0}, 250);
							
							});
						
						}
																					// invert datas in the array
						
						
						
					}
				}
			}
		}
		
		/*
		 * modified offset function to handle the local position
		 * @param elt: the jquery element
		 */
		function getOffset(elt){												
			return {left : parseInt(elt.css('left')), top : elt.css('top') == 'auto' ? 0 : parseInt(elt.css('top'))};
		}
		/**
		 * init the positions of the li elements as well as their styles
		 */
		function initPos(){
			var left=0;													// the first element will be put inside the main div
			li.each(function(){ 		
			
				 $this = $(this);								// ADD PADDING TO SMALL WORDS - SENNER
				/*  if ($this.text().length == 1) {
					$this.css({
					letterSpacing: '0px',
					paddingLeft: '11px',
					paddingRight: '11px'
					});
				}   */
				/* if ($this.text().length == 2) {
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
				} */
				
			// put all the elements at the right place
				
				$this.css('left', left + 'px');
				left += width($this);
				//$(this).removeClass(o.classOnValid + ' ' + o.classOnMiValid + ' ' + o.classOnNotValid);
				//$(this).addClass('normal');
			});
		}
	});
};


function css(el, prop) {
    return parseInt($.css(el[0], prop)) || 0;
}

function width(el) {
    	return el[0].offsetWidth + css(el, 'marginLeft') + css(el, 'marginRight');
}





})(jQuery);
