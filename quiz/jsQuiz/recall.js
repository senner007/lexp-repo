$(document).ready(function() {
		
	if(document.addEventListener) {
			window.addEventListener('load', function() {		// fastclicking
			new FastClick(document.body);
		}, false);
	}	
	else {
			window.attachEvent('load', function() {		// fastclicking
			new FastClick(document.body);
		}, false);
	}
	
	
window.parent.globalScoreVariable = 0;

	getVars = function () {
		var memDataVar = window.parent.shout_text;
		var memSaveData = window.parent.xmlDataVar;
				
		return [memDataVar,memSaveData]
	}
		
	alignHeader = function() {


		var hello = getVars();
		
		var memDataVar = hello[0];
		var memSaveData = hello[1];
		
		var quizHeadline = $(memSaveData).find(memDataVar).find('headline').text();
		var subTitle = $(memSaveData).find(memDataVar).find('subTitle').text();

		$('h1').html(quizHeadline + '<br><span class="shrink">' + subTitle + '</span>');

	}
	alignHeader();
	

	(function($){
		$.fn.disableSelection = function() {
			return this
					 .attr('unselectable', 'on')
					 .css('user-select', 'none')
					 .on('selectstart', false);
		};
	})(jQuery);

	prepareItems = function() {
	
		var textArr = [];
		var answerArr = [];
		
		var hello = getVars();
		
		var memDataVar = hello[0];
		var memSaveData = hello[1];

		$(memSaveData).find(memDataVar).children('questions').each(function () {
			textArr.push($(this).children('question').text());
			answerArr.push($(this).find('answer').text());
		});
					
		var myHtml;
		for (var i=0;i<textArr.length;i++) { 
			var toLower = answerArr[i].toLowerCase();
			myHtml += "<li class=match" + i + "><p class='text-style1'>" + textArr[i] + "</p></li>"; 
			myHtml += "<li class=match" + i + '><img src="img/' + toLower + '.png"></li>'
			
		}
		return myHtml;
	}

	init = function(htmlList) {
			
		$('<ul id="ulList"></ul>').appendTo('#tutorial-memorygame');

		$('#ulList').html(htmlList);;	// will make a string and then append an thus only touch the dom once 
			
		$('#tutorial-memorygame').quizyMemoryGame({
			itemWidth: 100, 
			itemHeight: 100, 
			itemsMargin:10, 
			colCount:5, 
			animType:'flip', 
			flipAnim:'rl', 
			animSpeed:250, 
			resultIcons:true 
		});
	}	
	init(prepareItems);
	
	

	$('#shuffleButton').fastClick(function () {
			$this = $(this);
			$this.attr('disabled', 'disabled').css('color','grey');
		
			$('#tutorial-memorygame').empty();
			init(prepareItems);
			if (!$.support.transition) {
				$('#tutorial-memorygame').fadeOut(800).fadeIn(800, function() {
					$this.removeAttr('disabled').css('color','black');
				});
			}
			$('#tutorial-memorygame').transition({opacity:0}, 600).transition({opacity:1},600, function() {
				$this.removeAttr('disabled').css('color','black');
			});
		
	});
	/* if(document.addEventListener) {
		document.addEventListener('touchmove', function(e) {
			e.preventDefault();
		}, false);	
	}	
	else {
		document.attachEvent('touchmove', function(e) {
			e.preventDefault();
		}, false);	
	}
 */
	
	
});