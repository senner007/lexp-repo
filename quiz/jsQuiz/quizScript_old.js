$(document).ready(function() {
	/* if(document.addEventListener) {
		document.addEventListener('touchmove', function(e) {
			e.preventDefault();
		}, false);	
	}	
	else {
		document.attachEvent('touchmove', function(e) {
			e.preventDefault();
		}, false);	
	} */

var $test = $('#test')

/* $.ajaxSetup({
    type: 'POST',
    headers: { "cache-control": "no-cache" }
}); */


//var transParent = parent.$('.fancybox-overlay').find('.fancybox-iframe').contents().find('#container'); // get transit library from parent window

var friends = window.parent.shout_text;
var saveData = window.parent.xmlDataVar;
var questions = [];
var answers = [];
var quizHeadline;
var subTitle;
var inputText;
var showAnswers;
var saveData;
var wrongForgive = 0;
var multiIndex = 0;
var $h1text;
var cList = $('#rightContainer').find('ul');
var anumber;
var eqnumber;
var qnumber;
var score;
window.parent.globalScoreVariable = 0;
var totalq;
var highlightVar;

	
	var isTablet = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
	if (isTablet) {	
		$('#textContainer').css({color: 'rgb(45,45,45)'});	
	}



Array.prototype.removeByIndex = function(index) {
    this.splice(index, 1);
}

		quizHeadline = $(saveData).find(friends).find('headline').text();
		inputText = $(saveData).find(friends).find('inputText').text();
		showAnswers = $(saveData).find(friends).find('showAnswers').text();
		subTitle = $(saveData).find(friends).find('subTitle').text();
		multiChoice = $(saveData).find(friends).find('multiChoice').text();
		
				$(saveData).find(friends).children('questions').each(function () {
					
					questions.push($(this).children('question').text());
					answers.push($(this).find('answer').text());
					});
					
					/* $(saveData).find(friends).find('questions').children().each(function () {
					 
					if ( this.nodeName == 'question'  ) {
						questions.push($(this).text());
					}
					else {
						answers.push($(this).text());
					}
										
				});
					
					console.log(answers) */
					
			var answersBackup = [];
			$.each(answers, function (i,e) {
				answersBackup.push(e);
			});
			
			 if (!$.support.transition) {
			  $.fn.transition = $.fn.animate;
			} 	
		
			var $question = $("#question");
			function slideInOut(slideInput) {
				var l = $question.text().length
						
				if (l > 30) {l = 110}
				$question
				.show()
				.transition({x: - 200 - (l + 25), opacity: 0.4},430, function () {
					$(this).css({x:230 + (l), opacity: 0}).text(slideInput).show()
				}).transition({x : 0, opacity: 1},400);	
			}
			
			function highlightList(correct) {
			
				if ($question.text().indexOf("...") >= 0) { 
						$("#question").highlight('...', { className: 'wrapped'})
						/* var newCorrect = correct.replace(/[^\w\s]/ig, "").split(" ");  */	
						//Don't know why I used the regex in the first place			
						var newCorrect = correct.split(" "); 
						$('.wrapped').each(function (i,e) {
							if (newCorrect[i] == undefined) {
								newCorrect[i] = newCorrect[0];
							}
							$(this).replaceText( /\.\.\./, newCorrect[i] )
							
						});
				}
/* 				if (multiChoice == 'True') {
					
				
				} */
				if (showAnswers == 'True') {
				var numberSet = 0;	
					cList.find('li').each(function () {
						var $this = $(this);
						var $thisText = $this.text().replace(',','');
						if ( !$this.find('span').hasClass(highlightVar) && numberSet == 0 && $thisText == correct) {
							$this.transition({opacity: 0}, 500,function () {
								$(this).highlight(correct, { className: highlightVar})
							}).transition({opacity: 1}, 500);
							numberSet++;
						}
					});					 
				}
				else { 
							
					cList.append($("<li></li>")).children("li").eq(qnumber).text(correct + ',')
					.css({opacity: 0, y: '30px'}).delay(100).transition({opacity: 1, y: 0});
				}
			
			}
			var $progInner = $('#progInner'),
			$progOuterWidth = $('#progOuter').outerWidth(); 
			$progInner.css({x: -$progOuterWidth});
			
			var progTransit = function (qCount) {
			
				var increment = $progOuterWidth / qCount
		
				
					/* if (frame.find('.solved').size() == prependedSentences.length ) {
							$progInner.transit({x: 0}, 1000);
					} */
			
					$progInner.transit({x: '+=' + increment}, 1000);
				

			} 
			
			
			
		/* 	var progressBarWidth = $("#progressbar").width();
			function animateProgress (qnumber, totalq) {
					
					if (qnumber == 1 ) {
						$("#progressbar").progressbar({value:  0.001});	
						
					}
					var progressbarValue = $("#progressbar .ui-progressbar-value");
					var progWidth = progressBarWidth - progressbarValue.width();
				
				
					progressbarValue.transition({
						width:   "+=" +  progWidth/(totalq - (qnumber -1) ) 
					}, 700,'easeOutQuad');
					
					
			} */
						
		
			
			if (quizHeadline == 'Vocabulary' || quizHeadline == 'Vocabulary/Esl'){ 
			highlightVar = 'vocab' 
			}
			else { 
			highlightVar = 'grammar' 
			}
			
			if (multiChoice == 'True') {
				$('<div id="buttonContainer"><button id="button1"><span class="highlighted"></span></button><button id="button2"><span class="highlighted"></span></button><button id="button3"><span class="highlighted"></span></button><button id="button4"><span class="highlighted"></span></button></div>').appendTo('#container');
				$('<button id="continueButton"><span class="highlighted">Continue</span></button>').appendTo('#buttonContainer');
				$('#test').remove();
				
				if (quizHeadline == 'Vocabulary' || quizHeadline == 'Vocabulary/Esl'){ 
				highlightVar = 'vocabButton' 
				}
				else { 
				highlightVar = 'grammarButton' 
				}
			}	
			
			
			if (showAnswers == 'True') {
				var myHtml = "";		
				$.each(answers, function(i)	{
					myHtml += "<li>" + answers[i] + ',' + "</li>"; 
				});
				cList.html( myHtml );
			}	
			var $buttonsSpan = $('button').not('#continueButton').find('.highlighted');
			function placeAnswers (anumber) {
				//console.time(name)
				var numberOfButtons = 4;
				var newRandom = Math.floor((Math.random()*questions.length));
				var randomNumbers = [];
				var limit = 0;
				var newArray = [];
				while (randomNumbers.length < numberOfButtons && limit < 100) {
					if (jQuery.inArray(newRandom, randomNumbers) == -1 && jQuery.inArray(answers[newRandom], newArray) == -1) {
						
						newArray.push(answers[newRandom]);
						randomNumbers.push(newRandom);
						newRandom = Math.floor((Math.random()*questions.length));
					}
					else {
						newRandom = Math.floor((Math.random()*questions.length));
					}
					limit = limit +1;	
				}
				var answerOnRandom = Math.floor((Math.random()*numberOfButtons));
				$buttonsSpan.text('');
				//console.log(newArray);
		 		$.each($buttonsSpan, function (i,e) {
				
					var $e = $(e);
					$e.html(answers[randomNumbers[i]]) 
					if (i == answerOnRandom && jQuery.inArray(answers[anumber], newArray) == -1) {
						$e.text(answers[anumber]) 
					}
					if ($e.text() == '') {
						var anotherRandom = Math.floor((Math.random()*answersBackup.length));
						var limiter = 0;
						while (jQuery.inArray(answersBackup[anotherRandom], newArray) != -1 && limiter < 30) {
							anotherRandom = Math.floor((Math.random()*answersBackup.length));
							limiter = limiter +1;
						}
						if (jQuery.inArray(answersBackup[anotherRandom], newArray) == -1) {
							$e.text(answersBackup[anotherRandom]) 
							newArray.push(answersBackup[anotherRandom]);
						}
					/* 	else {
							$e.remove() 
						}; */
					}
				}).promise().done(function () {
				
				$(this).transition({opacity: 1})
				})
			}
			 
			
			var $feedback = $("#feedback");
			$feedback.css({opacity: 0});
			eqnumber = questions.length;
			qnumber = 0;
			score = 100;
			anumber = Math.floor((Math.random()*eqnumber));
			totalq = eqnumber;
			//$h1.show();
			//$h1.html(quizHeadline);
			//$("#indexText").html(subTitle);
		
			$('.inputText').text(inputText).css({color: '#444444'});
			$question.text(questions[anumber]);
			
			if (multiChoice == 'True') {
				placeAnswers(anumber);
			}
			
			
			
	initQuiz = function() {
		$progInner.transit({x: '-=' + $progOuterWidth}, 1000);
		
		$(saveData).find(friends).children('questions').each(function () {
				questions.push($(this).children('question').text());
				answers.push($(this).find('answer').text());
				});
	
				
		eqnumber = questions.length;
		qnumber = 0;
		score = 100;
		anumber = Math.floor((Math.random()*eqnumber));
		totalq = eqnumber;
		$question.text(questions[anumber]);
		$test.prop('disabled', false).focus();
		
		$('#feedback').text('');
		//$h1.show();
		//$(".inputClass").show();
		//$(".inputText").show();
		$("ul").children("li").remove();
		if (multiChoice == 'True') {
			
			placeAnswers(anumber);
			unbindButtons = false;
		}	
											
	};

	/* $('#test').click(function () {
		$(this).val('').css('color','white').focus();
		
	}); */
	 
	 /*  $('#closingButton').fastClick(function (e) {
			e.preventDefault();
			e.stopPropagation();
		
				parent.$.fancybox.close();
				
		
	  });    */


	if (isTablet) {
		
		var initBodyPos = window.parent.$('body')[0].scrollTop;
	  
		$('#test').on('focus',function () {		// reposition on ipad
				//window.scrollTo(0, 0);
				//document.body.scrollTop = 0;
				
			
				setTimeout(function(){ 
					window.parent.$('body, html').animate({
						scrollTop: initBodyPos
						}, 250, function () {
							window.parent.$.fancybox.reposition();
							//fancy.addClass('opacityIn');
						});
					
						
				
					
				},200);
			
		});
	
	} else {
		
		
	 	setTimeout(function(){		// wait for IE(???)
			$('#test').focus();
		
			//window.parent.$('.fancybox-iframe').find('input').focus();

		},300);  
	}
	
	$("#test").on('keydown',function (e) {
		if (e.which == 8) {
		e.preventDefault();
		var prevVal = $(this).val();
		var hello = prevVal.slice(0,-1);
		$(this).val(hello);
		}
	});
		 
	$("#test").keypress(function (e) {
	
	// The following was coded because Chrome iOs wants to reposition
	// the iframe on every keystroke unless default prevented.
	var typed = String.fromCharCode(e.which);
	e.preventDefault();
	
	//console.log(e.which);
	
	var prevVal = $(this).val();
	$(this).val(prevVal + typed);
	
	/* if (e.which == 8) {
		var hello = prevVal.slice(0,-1);
		$(this).val(hello);
	} */
	//--------------------------------------------------
	
	
		
		//$test.css('color','white');

				if ($feedback.text() == "Right! Press Enter to continue")  {	// moves on after right answer
				e.which = 13;
				}
		
				if (e.which == 13)	{
				/* 
					if (!$.support.transition) {
						setTimeout(function(){
							$('#test').focus();
						},300);  
					} 	 */		
				
				$feedback.text("").transition({opacity:0});
				var logged = $test.val();
				
				var correct = answers[anumber];
			
				
					if ($test.val() == "") 	{
					slideInOut(questions[anumber]);
					}
					
				if (logged.toUpperCase() == correct.toUpperCase())	{
	
							
				highlightList(correct);
				questions.removeByIndex(anumber);
				answers.removeByIndex(anumber);
				eqnumber = questions.length;
				wrongForgive = 0;
				$feedback.text("Right! Press Enter to continue").css("color", "black").transition({opacity:1});
				anumber = Math.floor((Math.random()*eqnumber));
				qnumber = qnumber + 1;
				
				progTransit(totalq);
				$test.val('');
				
					
						
				if (qnumber == totalq)	{
					$("input").prop('disabled', true);
					window.setTimeout('initQuiz()', 5000);
					$feedback.transition({opacity:0});
					$test.val('');
					//$h1.hide();
					//$(".inputClass").hide();
					//$(".inputText").hide();
					
						if (showAnswers == 'True') {
							$question.text("You have completed the exercise. Your score is " + score + " out of 100. Page will reload automatically. Now try without the answers.");
							//window.parent.globalScoreVariable = score;
						}
						else {
							if (score == 100) {
								$question.text("You have completed the exercise. Your score is " + score + " out of 100. Page will reload automatically. Good job!");
								//window.parent.globalScoreVariable = score;
								}
							else {
								$question.text("You have completed the exercise. Your score is " + score + " out of 100. Page will reload automatically. Try again");
								//window.parent.globalScoreVariable = score;
								}
						}
					}
				}
				
				if (logged.toUpperCase() != correct.toUpperCase() && logged != "")
				{ 
				wrongForgive++;
				if (wrongForgive > 2) { 
					//$question.highlight(correct, { element: 'em', wordsOnly: true, className: highlightVar }); 
					$feedback.text("Wrong! answer is: " + correct).css("color", "#FF0000").transition({opacity:1});
				}
				else {
					//$question.highlight(logged, { element: 'em', className: 'error' });
					$feedback.text("Wrong!").css("color", "#FF0000").transition({opacity:1});
					score = score -5;
				}
			}
		}
					
	});
	
	
	var $continueButton = $('#continueButton').find('span');
	$continueButton.css({opacity: 0});
	var unbindButtons = false; // prevent click on buttons once correct is found
	
	 $('#buttonContainer').on('tapclick', '#button1,#button2,#button3,#button4', function (e) {
		//	e.preventDefault()
			//e.stopPropagation();
			if ( unbindButtons == true || $(this).text() == '') {return;};
		
			if ($(this).text() == answers[anumber])	{
				//this.className += highlightVar;
				$(this).transition({backgroundColor : 'rgb(0, 102, 153)'},0, function () {
				// allow class to be applied before running subsequent javascript
			
					$feedback.text("Right! Press Enter to continue").css("color", "rgb(60, 60, 60)").transition({opacity:1});
					$continueButton.transition({opacity:1});
					unbindButtons = true;
					highlightList(answers[anumber]);
			
				});
				
							
			}
			else	{ 
				this.className += 'wrongHighButton';	
				$(this).transition({backgroundColor : '#A80000'},0, function () {
					$feedback.text("Wrong!").css("color", "#FF0000").transition({opacity:1});
					score = score -5;
				});
			}

	});
	
	
	$('#buttonContainer').on('tapclick','#continueButton',function (e) {
	
		e.preventDefault()
		e.stopPropagation();
		
		if ( unbindButtons == false ) {return;};
			unbindButtons = false;

		questions.removeByIndex(anumber);
		answers.removeByIndex(anumber);
		eqnumber = questions.length;
		anumber = Math.floor((Math.random()*eqnumber));
		$feedback.transition({opacity: 0});
		
		/* qnumber = qnumber + 1; */
		progTransit(totalq);
			if (qnumber == totalq)	{
					unbindButtons = true;
					window.setTimeout('initQuiz()', 5000);
					$feedback.transition({opacity: 0});
					//$h1.hide();
					
					var slideInput = '';				
					if (showAnswers == 'True') {
					
					slideInput = "You have completed the exercise. Your score is " + score + " out of 100. Page will reload automatically. Now try without the list of answers."
						
					}
					else {
						if (score == 100) {
							slideInput = "You have completed the exercise. Your score is " + score + " out of 100. Page will reload automatically. Good job!";
						
							}
						else {
							slideInput = "You have completed the exercise. Your score is " + score + " out of 100. Page will reload automatically. Try again";
							
							}
					}
			} else {
			slideInput = questions[anumber];
			}
		slideInOut(slideInput);
		$(this).find('span').transition({opacity:0});
		//$('button').addClass('buttonClass');
		
		$('#button1,#button2,#button3,#button4').css({backgroundColor: 'rgb(68, 68, 68)'}).removeClass(highlightVar).removeClass('wrongHighButton').find('.highlighted').transition({opacity: 0},400, function () {
				/* $this = $(this).parent();
				console.log('hi');
				if ( $this.hasClass(highlightVar) ) { $this.removeClass(highlightVar); };
				if ( $this.hasClass('wrongHighButton') ) { $this.removeClass('wrongHighButton'); }; */
				

		
		}).promise().done(function () {
				//console.log('hi');
				if (qnumber != totalq) { placeAnswers(anumber); };
				//rgba(68, 68, 68,1)
				//$('button').removeClass('buttonClass');
		});

	
		
	});
	
});