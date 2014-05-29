/* 
 * 
 * Copyright (c) 2007 e-nova technologies pvt. ltd. (kevin.muller@enova-tech.net || http://www.enova-tech.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *            __             ___      ___    __  __     __     
 *          /'__`\    __   /' _ `\   / __`\ /\ \/\ \  /'__`\   
 *         /\  __/  /\__\  /\ \/\ \ /\ \_\ \\ \ \_/ |/\ \_\.\_ 
 *  (o_    \ \____\ \/__/  \ \_\ \_\\ \____/ \ \___/ \ \__/.\_\    _o)
 *  (/)_    \/____/         \/_/\/_/ \/___/   \/__/   \/__/\/_/   _(\)
 *       
 *           L'ère du stup !  
 *  
 *
 * $LastChangedDate: 2007-01-04 18:10:42 -0500 (Fri, 04 Jan 2007) $
 * $Rev: 08 $
 *
 * Version: 0.1
 */

(function ( $ ) {                 			    // Compliant with jquery.noConflict()
$.fn.jMyPuzzle = function(o) {  
	o = $.extend({
        answer:"7,2,1,3,8,5,6,4",				// right answer's order
        
        maxTrials:3,							// maximum number of trials, 0 for unlimited
        classOnValid:'valid',					// class to apply to the element when valid
        classOnNotValid:'notValid',				// class to apply to the element when not valid
        classOnMiValid:'miValid',				// class to apply to the element when mi valid
        			
        fnOnCheck:null,							// To call its custom callback function at the end of the check. The function will be provided with the results variables of the exercise.
        										// example : function(jSonResults){ alert("Your success rate : " + jSonResults.success_rate + "%") }
        										
        ajaxResultUrl:'',						// Ajax url where to send the results. The results will be sent by post with the following variables :
        										// nb_words : The total number of words
        										// nb_valid : The number of valid elements (where the user is right)
        										// nb_not_valid : The number of non valid elements (where the user is not right)
        										// nb_mi_valid : The number of mi valid elements (at least 3 consecutive right elements, but not at the right place)
        										// success_rate : The success rate for the trial
        										// trial_nb : The trial number
        										// max_trials : The maximum number of trials allowed 
        										// answer : The answer given by the user
        										
		fnOnAjax:null,							// custom function to call at the end of the ajax treatment. enables to get the data sent back from the server : example function(data){ alert(data); }
        fnOnReset:null,
		
		blabla: 'false',							// Min Function // SENNER ----------------------------
        //private datas
        
        elts: new Array()
    }, o || {});

	
	return this.each(function() { 
		var div = $(this), ul = $("ul", div), li = $("li", ul);		// Variables declaration
		var left=0, move=null, forward = 1, backward=2, eltPos = 0;		
		this.elts = new Array(li.size());
		var elts = this.elts, n = 0, ulSize = 0, nbTrials = 0, nbValid=0, nbNotValid=0, nbMiValid=0;						

		
		ul.css({display:'block', position:'absolute'});				// ul style
		li.css({													// li style
				'float':'left',
				"list-style-type":"none",
				'display':'block',
				'position':'absolute'
				});
		
		if(o.maxTrials > 0 && $('#trials').length){					// initial filling of the trial layer 
			$('#trials').html(0 + '/' + o.maxTrials);
		}
		

		li.each(function(){ ulSize += width($(this)); });			// calculate the size of the ul element

		//div.css('width', ulSize);									// set the div size
		ul.css({width:ulSize, height: ((li.height() + parseInt(li.css('marginTop')) + parseInt(li.css('marginBottom')) + parseInt(li.css('paddingBottom')) * 2 + parseInt(li.css('paddingTop')) * 2) + 'px') });	 	// Update the ul size
		ul.css('left', div.offset().left + ((div.width() - ulSize) / 2)); // Center the ul in the main div
		
		initPos();													// init the li position (left position) 
		
		li.each(function(){ 
			var elt = $(this);										// current element														
																	// collect information about the element and store them into the object itself
			elt.outerWidth = width($(this));						// its size (with the margin)
			elt.pos = getOffset(elt);								// its position (left and top position)
			elt.initialN = n;										// its initial position (as per the other elements)
			elt.n = n;												// its current position (as per the other elements)

			elt.draggable({	
				iframeFix: true,
				containment: div,
				drag: function(evt, ui){ onDrag(evt, ui, elt, elts); }, // event on drag
				start: function(evt, ui){								// even on start dragging
					var e = elts[elt.n];
				 	e.css({'opacity': 0.4, 'z-index':200});
									
				},
							
				stop:function(evt, ui){								// event on stop dragging
				 	var e = elts[elt.n];
				 	e.css({'opacity': 1.0, 'z-index':5});
				 	e.transition({left: e.pos.left, top : e.pos.top}, 300, function () {
					
						
						if (o.blabla == 'true')						// MIN FUNCTION // SENNER -------------------------
						
						{
						
							left=0;	
							$li = $('li');
							$li.each(function(){ 									
								$(this).css('left', left + 'px');
								left += width($(this));
							});
						}

					});
									
				}

			});
			
			elts[n++] = elt;
		});
		
		if($('#check').length){
			$('#check').fastClick(function(){							// on check event
				nbValid=0;
				nbNotValid=0;
				nbMiValid=0;
				
				if(o.maxTrials > 0){								// set the trials counter and display update
					if(nbTrials >= o.maxTrials){ return; }
					nbTrials ++;
					$('#trials').html(nbTrials + '/' + o.maxTrials);
				}
				var answerTab = o.answer.split(",");				// check error in case the given answer doesn't match properly with the set answer
				if(answerTab.length != li.size()){ alert("error - answer doesn't match !"); }
				return check(0, answerTab);							// call the check function
			});
		}
		
		
		/**
		 * recursive function. check the elements one by one and show whether it is true, false, or mi false
		 * @param n: the round
		 * @param answerTab: the given answer array
		 */
		function check(n, answerTab){
			if(n >= answerTab.length){									// LAST ROUND : everything has been checked. finalization
				var nbWords = answerTab.length;
				var successPercent = ((nbValid  * 1 + nbMiValid * 0.5) / nbWords) * 100;
				var trialNb = nbTrials;
				var answer = '';
				for(i=0;i<nbWords;i++)	{								// Put all the elements at the right place
					answer += ((elts[i].initialN + 1) + ",");
				}
				answer = answer.replace(/,+$/, "");
				
				jSonResults = {											// build the JSON result object
					 nb_words		:nbWords,
					 nb_valid		:nbValid,
					 nb_not_valid	:nbNotValid,
					 nb_mi_valid	:nbMiValid,
					 success_rate	:successPercent,
					 trial_nb		:trialNb,
					 max_trials		:o.maxTrials,
					 answer			:answer	
				};
				
				if(o.fnOnCheck !== null){								// call the function onCheck in case it is set in the params
					return o.fnOnCheck(jSonResults);
				}
				
				if(o.ajaxResultUrl !== ''){								// Send the results through ajax
					$.post(o.ajaxResultUrl, jSonResults, 
					function(data){
						if(o.fnOnAjax !== null){
							o.fnOnAjax(data);
						}
					});
				}
				return;
			}
			
			elts[n].removeClass(o.classOnValid + ' ' + o.classOnMiValid + ' ' + o.classOnNotValid);			// remove all previous classes that can interfer
			var posTop = parseInt(elts[n].pos.top);
			
			return elts[n].transition({'top': (posTop +7) + "px", duration:85, complete:function(){ 			// animation according the the veracity of the element    
			// -----------(Senner: removed curly braces after "px" and before duration) -------------
					if(elts[n].initialN + 1 == answerTab[n]){ 
						elts[n].addClass(o.classOnValid); 
						nbValid++;
					}
					else if(elts[n+2] && o.answer.indexOf((elts[n].initialN + 1) + ',' + (elts[n+1].initialN + 1) + ',' + (elts[n+2].initialN + 1)) >= 0){
		    			var j=0;
		    			for(j=0; j<answerTab.length; j++){
		    				if(elts[n].initialN + 1 == answerTab[j]){ break; }
		    			}
		    			for(var i=0; i < answerTab.length; i++){
				    			if(elts[n+i] && answerTab[i+j] == elts[n+i].initialN + 1){
				    				if(i>0){
				    					elts[n+i].transition({'top': (posTop +7) + "px"}, 75).addClass(o.classOnMiValid).transition({'top': posTop + "px"}, 100);
				    				}
				    				else{
				    					elts[n+i].addClass(o.classOnMiValid);
				    				}
				    				nbMiValid++;
				    			}
				    			else{ n += (i-1); return; }
		    			}
    				}
					else{
						elts[n].addClass(o.classOnNotValid); 
						nbNotValid++;
					}
				}
			}).transition({top: posTop + "px", duration:120, complete:function(){
			// -----------(Senner: removed curly braces after "px" and before duration) -------------
					return check(n+1, answerTab);
				}
			});
			
			
		}
		
		function onDrag(e, ui, elt, elts){
			var oldPos = (this.eltPos !== null ? this.eltPos : getOffset(elt));
			this.eltPos = getOffset(elt);
			if(this.eltPos.left == oldPos.left) { return; }							// Not moving = doing nothing
			move = (this.eltPos.left > oldPos.left ? forward : backward);			// check whether the move is forward or backward

			if(move == forward){
				if(elt.n < elts.length-1){
					var eltNext = elts[elt.n + 1];
					var eltNextBound = eltNext.pos.left + parseInt(eltNext.outerWidth / 2);
					if(this.eltPos.left + elt.outerWidth > eltNextBound){
						elt.insertAfter(eltNext);
						eltNext.pos.left = elt.pos.left;
						elt.pos.left += eltNext.outerWidth;
						
																					//invert datas in the correspondence array
						elts[elt.n] = eltNext;
						elts[elt.n + 1] = elt;
																					//update the n of the elements
						elts[elt.n].n = elt.n; 
						elt.n = elt.n + 1;
						eltNext.transition({'left': eltNext.pos.left + 'px'}, 300);
					}
				}
			}
			else if(move == backward){
				if(elt.n > 0){
					var eltPrev = elts[elt.n - 1];
					var eltPrevBound = eltPrev.pos.left + parseInt(eltPrev.outerWidth / 2);
					
					if(this.eltPos.left < eltPrevBound){
						elt.insertBefore(eltPrev);
						
						elt.pos.left = eltPrev.pos.left;
						eltPrev.pos.left += elt.outerWidth;
						
																					// invert datas in the array
						elts[elt.n] = eltPrev;
						elts[elt.n - 1] = elt;
																					// update the n of the elements
						elts[elt.n].n = elt.n; 
						elt.n = elt.n - 1;
						
						eltPrev.transition({'left': eltPrev.pos.left + 'px'}, 300);
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
			left=0;													// the first element will be put inside the main div
			li.each(function(){ 									// put all the elements at the right place
				$(this).css('left', left + 'px');
				left += width($(this));
				$(this).removeClass(o.classOnValid + ' ' + o.classOnMiValid + ' ' + o.classOnNotValid);
				$(this).addClass('normal');
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

function debug(str){
	$('.debug').html($('.debug').html() + str + "<br/>");
}

})(jQuery);
