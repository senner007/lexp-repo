(function ( $ ) {                 			    // Compliant with jquery.noConflict()
$.fn.jMyPuzzle = function(o) {  

	return this.each(function() { 
	
		var div = $(this), ul = $("ul", div), li = $("li", ul);		// Variables declaration
		var left=0, eltPos = 0;		
		this.elts = new Array(li.size());
		var elts = this.elts, n = 0, ulSize = 0;						
		var autoValidate;
		
		initPos();				// init the li position (left position)
		
		if (!o.isHorizontal) {			
			ul.css({width:ulSize, height: li.outerHeight(true) + 'px' });	 	// Update the ul size	
		}
		

		li.each(function(){ 
			var elt = $(this);									// currentelement														
																	// collect information about the element and store 
																	// them into the object itself
			elt.completeWidth = elt.outerWidth(true);						// its size (with the margin)
			elt.completeHeight = elt.outerHeight(true);						// its height (with the margin)
			elt.pos = getOffset(elt);								// its position (left and top position)
			elt.initialN = n;										// its initial position (as per the other elements)
			elt.n = n;												// its current position (as per the other elements)
			if (o.isHorizontal ? axis = 'y' : axis = 'false')
				

			elt.draggable({											// make the element draggable
				iframeFix: true,
				addClasses: false,
				axis: axis,
				containment: div,
				drag: function(evt, ui){ onDrag(evt, ui, elt, elts); }, // event on drag
				start: function(evt, ui){	
					
					if (o.isHorizontal) { 
						  elt.css({'box-shadow': '0px 2px 10px rgba(0,0,0,.7)'});
					}
					else {
						elt.css({'opacity': 0.4, 'z-index':200});
					}

				},
				stop:function(evt, ui){		
				 
					
					var outAnim;
						if (o.isHorizontal) { 
							outAnim = { x: 0, y: 0, 'box-shadow': '0px 0px 0px' };
						}
						else {
							outAnim = { x: 0, y: 0, 'opacity': 1.0, 'z-index':5 };
						}
					
				 	
					if (!!o.setChars) {
						o.setChars();
					}
						// re-align lis after uppercase/lowercase - Senner
						// for difficulty setting  2
					if (o.reAlign == 2)	{
							outAnim = { x: 0, y: 0, 'opacity': 1.0, 'z-index':5 };
							elt.transition({'left': elt.pos.left + 'px', top : elt.pos.top, x:  ui.position.left - elt.pos.left, y:  ui.position.top - elt.pos.top },0, function () {
						
								$(this).transition(outAnim,270);
								
								var left=0;			
								div.find('li').each(function(){ 	
									var $this = $(this)
									$this.transition({left: left + 'px',top : 0}, 100);
									left += $this.outerWidth(true);
								});

							});
							
							
							
					}
						// for difficulty setting 0
					else {
						
										
					 	elt.transition({
							left: elt.pos.left + 'px', 
							top : elt.pos.top, 
							x:  ui.position.left - elt.pos.left, 
							y:  ui.position.top - elt.pos.top,
						
							},0, function () {
						
							$(this).transition(outAnim,240, function () {
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
				move = (thisElt.eltPos.left > oldPos.left ? 'forward' : 'backward');			// check whether the move is forward or backward
			if (o.isHorizontal) {
				move = (thisElt.eltPos.top > oldPos.top ? "down" : "up");				// move up or down for horizontal
			};
		
			 if(move == 'forward'){					//  move forward
				if(elt.n < elts.length-1){
					var eltNext = elts[elt.n + 1];
					var eltNextBound = eltNext.pos.left + parseInt(eltNext.completeWidth / 2);
					if(thisElt.eltPos.left + elt.completeWidth > eltNextBound){
						if (eltNext.hasClass('locked') ){ return; } 
						elt.insertAfter(eltNext);
						eltNext.pos.left = elt.pos.left;
						elt.pos.left += eltNext.completeWidth;																					//invert datas in the correspondence array
						elts[elt.n] = eltNext;
						elts[elt.n + 1] = elt;																					//update the n of the elements
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
						// don't move beyond green colored items 
						// for difficulty setting 0
						if (eltPrev.hasClass('locked') ){ return; } 
						else {
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
			} 
			if(move == 'up'){						//  move up
			
				if(elt.n > 0){
					var eltPrev = elts[elt.n - 1];
					
					var eltPrevBound = eltPrev.pos.top + parseInt(eltPrev.completeHeight / 2);
					if(thisElt.eltPos.top < eltPrevBound){	
						// don't move beyond green colored items 
						// for difficulty setting 0
						if (eltPrev.hasClass('locked') ){ return; } 
							elt.insertBefore(eltPrev);							
							elt.pos.top = eltPrev.pos.top;
							eltPrev.pos.top += elt.completeHeight;			
							elts[elt.n] = eltPrev;
							elts[elt.n - 1] = elt;																						// update the n of the elements
							elts[elt.n].n = elt.n; 
							elt.n = elt.n - 1;
							eltPrev.transition({'top': eltPrev.pos.top + 'px', y: '-=' + elt.completeHeight},0, function () {	
								$(this).transition({y: 0}, 250);							
							});																		// invert datas in the array
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
						elt.pos.top += eltNext.completeHeight;																					//invert datas in the correspondence array
						elts[elt.n] = eltNext;
						elts[elt.n + 1] = elt;																//update the n of the elements
						elts[elt.n].n = elt.n; 
						elt.n = elt.n + 1;
						eltNext.transition({'top': eltNext.pos.top + 'px', y: '+=' + elt.completeHeight},0, function () {		
							$(this).transition({y: 0}, 250);						
						});
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
			var left=0;	
			var top = 0;			// the first element will be put inside the main div
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
				
				var $thisWidth = $this.outerWidth(true);
				
				ulSize += $thisWidth; 				// calculate the size of the ul element
				
				
				if (o.isHorizontal) {
					$this.css('top', top + 'px');
					top += $this.outerHeight(true);
				}
				else {
					$this.css('left', left + 'px');
					left += $thisWidth;
				}
				
			});
		}
	});
};







})(jQuery);
