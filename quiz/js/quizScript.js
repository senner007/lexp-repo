(function($, window, undefined){

Array.prototype.removeByIndex = function(index) {
    this.splice(index, 1);
}

myQuiz = function(opts) {
	
	var init = {
		questArr: [],
		ansArr : [],
		headline:  $(window.parent.xmlDataVar).find(window.parent.shout_text).find('headline').text(),
		inputText: $(window.parent.xmlDataVar).find(window.parent.shout_text).find('inputText').text(),
		showAnswers: $(window.parent.xmlDataVar).find(window.parent.shout_text).find('showAnswers').text(),
		subTitle: $(window.parent.xmlDataVar).find(window.parent.shout_text).find('subTitle').text(),
		questData: function () {
			var data = window.parent.xmlDataVar;
			var quizInfo = window.parent.shout_text;
			//init = {d: data, q: quizInfo};
			
			$(data).find(quizInfo).children('questions').each(function () {
					init.questArr.push($(this).children('question').text());
					init.ansArr.push($(this).children('answer').text());
			});
		},
		highlightVar: $(window.parent.xmlDataVar).find(window.parent.shout_text).find('headline').text().toLowerCase()
	}
	init.questData();

	
	var construct = {
		
		insertUlAndInput: function () {
			var myHtml = '';
			for (var i=0;i<init.questArr.length;i++)	{
			myHtml += '<li style="display: none;" id=' + 'listItem' + i +'>' + init.questArr[i] + '</li>'
			}
			$('<ul id="ulList">' + myHtml + '</ul><input type="text" id="inField"/>').appendTo('#container');
			
			if  (init.showAnswers == 'True') {
				var myHtml = '';
				for (var i=0;i<init.ansArr.length;i++) {
					myHtml += '<li class="liAnswers">' + init.ansArr[i] + '</li>';
				}
				$('<ul id="ulAnswers">' + myHtml + '</ul>').appendTo('#container');
			}
			else  {
				$('<ul id="ulAnswers"></ul>').appendTo('#container');
			}
		}
		
		
	}
	
	var operation = {
		getRandom: function () {
			var random = Math.floor((Math.random()*init.questArr.length))
			return random;
		},
		setRandom: '',
		showQuest: function (ranNum) {
			$('#ulList').find('li').eq(ranNum).show().addClass('showLi');			
		},
		insTextFunc: function (ranNum) {
		var ansArray = init.ansArr[ranNum].replace(/[^\w\s]/ig, "").split(" "); // must be rewritten so that it can handle more words
		var $thisLi = $('#container').find('.showLi');
		$thisLi.fadeOut(300, function () {
			for (var i=0;i<ansArray.length;i++) {
				$thisLi.replaceText( /\.\.\./, ansArray[i] )
				.highlight(ansArray[i], { element: 'em', wordsOnly: true, className: init.highlightVar});
			}
		}).fadeIn()
		}
	
	}
	
	construct.insertUlAndInput();
	operation.setRandom = operation.getRandom();
	operation.showQuest(operation.setRandom);	
	$('#inField').on('keydown',function (e) {
	
			if ($('.showLi').hasClass('done')) {				// if question has answered - question had a class of done
				$('.showLi').remove();
				init.questArr.removeByIndex(operation.setRandom);
				init.ansArr.removeByIndex(operation.setRandom);
				operation.setRandom = operation.getRandom();
				operation.showQuest(operation.setRandom);
				console.log(init.questArr.length);
				if (init.questArr.length == 0) {				// if all done
					alert('all done')
					}
				return;
			}
	
			if (e.which == 13) {				// if input is enter
			$thisVal = $(this).val()
				if ($thisVal.toLowerCase() == init.ansArr[operation.setRandom].toLowerCase()) {
					console.log('correct');
					$(this).val('');
					$('.showLi').addClass('done');
					operation.insTextFunc(operation.setRandom);
					
					return;
				}
				else {
					console.log('wrong');
					return;
				}
							
			}
			else {
				return;
			}
		
	});
	
	
		
}
})(jQuery, window);

myQuiz();
