(function ( $ ) {                 			    // Compliant with jquery.noConflict()

	var transSupport = $.support.transition = (function(){			
		var thisBody = document.body || document.documentElement,
		thisStyle = thisBody.style,
		support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;
		return support;
	})();
	
	function setChars (div) {
		div.find('li').each(function (i,e) {	
			var $this = $(this);
			var v = $this.text();
			if ( $this.hasClass('lower') ) {
					// v = v.replace( v.charAt(0), v.charAt(0).toLowerCase()); 
					 $this.text( v.replace( v.charAt(0), v.charAt(0).toLowerCase() ) );
				};
			if (i == 0) {
					//v = v.replace( v.charAt(0), v.charAt(0).toUpperCase() );
				$this.text(v.replace( v.charAt(0), v.charAt(0).toUpperCase() ) );							
			};			
		});							
	};
	
	function onStart(elt, o) {																// Start			
		var	inAnim = ( o.isHorizontal && transSupport ? ({'box-shadow': '0px 2px 10px rgba(0,0,0,.7)'}) : ({'opacity': 0.4, 'z-index':200}) );				
		elt.css(inAnim);
	};
			
	function onDrag(e, ui, elt, elts, o){													// Drag
		var thisElt = this;																//must be saved to a variable to avoid random 
																						//occurrences of non-moving elements in safari iPad.
		var oldPos = (thisElt.eltPos != null ? thisElt.eltPos : ui.position); 			//find the old position stored on the $object 
		thisElt.eltPos = ui.position;													//its current position derived from $draggable object				
				
		if(thisElt.eltPos.left != oldPos.left) { 
			move = (thisElt.eltPos.left > oldPos.left ? 'forward' : 'backward');		// check whether the move is forward or backward
		} 
		else if (o.isHorizontal && thisElt.eltPos.top != oldPos.top) {	
			move = (thisElt.eltPos.top > oldPos.top ? "down" : "up");					// check whether the move is down or up													
		}
		else {
			return;																		// Not moving = doing nothing
		}

		if(move == 'forward'){					//  move forward
			if(elt.n < elts.length-1){
				var eltNext = elts[elt.n + 1];
				var eltNextBound = eltNext.pos.left + parseInt(eltNext.completeWidth / 2);
				if(thisElt.eltPos.left + elt.completeWidth > eltNextBound){
					if (eltNext.hasClass('locked') ){ return; }  						// don't move beyond green colored items for difficulty setting 0
					elt.insertAfter(eltNext);
					eltNext.pos.left = elt.pos.left;
					elt.pos.left += eltNext.completeWidth;												//invert datas in the correspondence array
					elts[elt.n] = eltNext;
					elts[elt.n + 1] = elt;																	//update the n of the elements
					elts[elt.n].n = elt.n; 
					elt.n = elt.n + 1;
					eltNext.transition({'left': eltNext.pos.left + 'px', x: '+=' + elt.completeWidth},0, function () {	
						$(this).transition({x: 0}, 250);						
					});
				}
			}
		}
		else if(move == "backward"){			//  move backward	
			if(elt.n > 0){
				var eltPrev = elts[elt.n - 1];
				var eltPrevBound = eltPrev.pos.left + parseInt(eltPrev.completeWidth / 2);				
				if(thisElt.eltPos.left < eltPrevBound){								
					if (eltPrev.hasClass('locked') ){ return; } 
					elt.insertBefore(eltPrev);						
					elt.pos.left = eltPrev.pos.left;
					eltPrev.pos.left += elt.completeWidth;
					elts[elt.n] = eltPrev;
					elts[elt.n - 1] = elt;																						// update the n of the elements
					elts[elt.n].n = elt.n; 
					elt.n = elt.n - 1;
					eltPrev.transition({'left': eltPrev.pos.left + 'px', x: '-=' + elt.completeWidth},0, function () {						
						$(this).transition({x: 0}, 250);							
					});								
				}
			}
		} 
		if(move == 'up'){						//  move up
			if(elt.n > 0){
				var eltPrev = elts[elt.n - 1];				
				var eltPrevBound = eltPrev.pos.top + parseInt(eltPrev.completeHeight / 2);
				if(thisElt.eltPos.top < eltPrevBound){	
					if (eltPrev.hasClass('locked') ){ return; } 
					elt.insertBefore(eltPrev);							
					elt.pos.top = eltPrev.pos.top;
					eltPrev.pos.top += elt.completeHeight;			
					elts[elt.n] = eltPrev;
					elts[elt.n - 1] = elt;																						
					elts[elt.n].n = elt.n; 
					elt.n = elt.n - 1;
					eltPrev.transition({'top': eltPrev.pos.top + 'px', y: '-=' + elt.completeHeight},0, function () {	
						$(this).transition({y: 0}, 250);							
					});																	
				}
			}
		}
		else if(move == 'down'){ 				//  move down
			if(elt.n < elts.length-1){
				var eltNext = elts[elt.n + 1];
				var eltNextBound = eltNext.pos.top + parseInt(eltNext.completeHeight / 2);
				if(thisElt.eltPos.top + elt.completeHeight > eltNextBound){
					if (eltNext.hasClass('locked') ){ return; } 
					elt.insertAfter(eltNext);
					eltNext.pos.top = elt.pos.top;
					elt.pos.top += eltNext.completeHeight;																					
					elts[elt.n] = eltNext;
					elts[elt.n + 1] = elt;																
					elts[elt.n].n = elt.n; 
					elt.n = elt.n + 1;
					eltNext.transition({'top': eltNext.pos.top + 'px', y: '+=' + elt.completeHeight},0, function () {		
						$(this).transition({y: 0}, 250);						
					});
				}
			}
		}
	};
	
	function onStop(evt, ui, elt, div, o)	{									// Stop
		var	outAnim = ( o.isHorizontal && transSupport ? ({x: 0, y: 0, 'box-shadow': 'none'}) : ({ x: 0, y: 0, 'opacity': 1.0, 'z-index':5 }) );

		if (o.setChars) {	 setChars(div);	}			// calls the setChars function	
		
		elt.transition({'left': elt.pos.left + 'px', top : elt.pos.top, x:  ui.position.left - elt.pos.left, y:  ui.position.top - elt.pos.top },0, function () {
		
		if (o.setChars)	{										// re-align lis after uppercase/lowercase for difficulty setting  2	
		
			outAnim = { x: 0, y: 0, 'opacity': 1.0, 'z-index':5 };
		
			$(this).transition(outAnim,270);
			
			var left=0;			
			div.find('li').each(function(ind, elem){ 	
				var $this = $(this)
				$this.transition({left: left + 'px',top : 0}, 100);
				left += $this.outerWidth(true);
			});
					
		}		
		else {  													// for difficulty setting 0
				
			$(this).transition(outAnim,240, function () {       // auto color lis when difficulty set to 0 - Senner
				if (!!o.autoValidate) {
					o.autoValidate();	 						// calls the autovalidate function in the plugin calling script
				}
			});
		}
		});
	}
	
	
	
	var defaults = {
		isHorizontal: false,
		setChars: false
	}
	
	function JumbleScramble(element, options) {
		this.element = element;
		this.options = $.extend( {}, defaults, options) ;
		this.init();
				
	};																				// constructor function end
	
	JumbleScramble.prototype.init = function () {
		
		var o = this.options; 
		var div = $(this.element), ul = $("ul", div), li = $("li", ul);						// Variables declaration
		var left=0, top = 0, eltPos = 0;		
		this.element.elts = new Array(li.size());
		var elts = this.element.elts, n = 0, ulSize = 0;						
		var autoValidate;
		var liWidths = [];
		var liHeights = [];
		var parentContainment = ( $('#frame').length ? $('#frame') : div )			// use '.#frame' if it exists

		/*
		 * modified offset function to handle the local position
		 * @param elt: the jquery element
		 */
		function getOffset(elt){												
			return {left : parseInt(elt.css('left')), top : elt.css('top') == 'auto' ? 0 : parseInt(elt.css('top'))};
		}
		
		li.each(function(liInd, liElem){ 											// Loop over each li, position, store object data and bind draggable handlers. 
			var elt = $(this);	
			if (o.isHorizontal) {
				elt.css('top', top + 'px');											// get each li height in case of individual heights.
				var $thisHeight = elt.outerHeight(true);
				liHeights.push($thisHeight)
				top += $thisHeight;			
			}
			else {
				elt.css('left', left + 'px');										// get each li width in case of individual widths. (default)
				var $thisWidth = elt.outerWidth(true);
				liWidths.push($thisWidth);
				left += $thisWidth;
					
				ulSize += $thisWidth; 												// calculate the size of the ul element				
			}														
																					// collect information about the element and store 
																					// them into the object itself
			elt.completeWidth = liWidths[liInd] || 0;								// its size (with the margin)
			elt.completeHeight = liHeights[liInd] || 0;								// its height (with the margin)
			elt.pos = getOffset(elt);												// its position (left and top position)
			elt.initialN = n;														// its initial position (as per the other elements)
			elt.n = n;																// its current position (as per the other elements)
			if (o.isHorizontal ? axis = 'y' : axis = 'false')
								
			elt.draggable({															// make the element draggable
				iframeFix: true,
				addClasses: false,
				axis: axis,
				containment: parentContainment,
				cancel: '.locked',
				drag: function(evt, ui){ onDrag(evt, ui, elt, elts, o); }, 			
				start: function(evt, ui){ onStart(elt, o); },								
				stop:function(evt, ui){ onStop(evt, ui, elt, div, o);}
			});
		
			elts[n++] = elt;		
		});
		
		if (!o.isHorizontal) {	
			ul.css({width:ulSize, height: li.outerHeight(true) + 'px' });	 		// Update the ul size	
		}		
		
	};
			
	$.fn.jumbleScramble = function(options) { 											// jumbleScramble fn begin
		return this.each(function () {
			new JumbleScramble(this, options) 	
		}).promise().done(function (){
			options.layoutComplete();													// layoutComplete callback
		});
	};																					// jumbleScramble fn end

})(jQuery);
