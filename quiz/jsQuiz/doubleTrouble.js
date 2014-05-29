$(document).ready(function() {

/* $('#container').delay(200).transition({opacity: 1},600); */


var timeVar = new Date().getTime();

//console.log(timeVar);

var questions = [];
var answers = [];
var secondAnswers = [];

var quizHeadline;
var subTitle;
var showAnswers;
var doubleTrouble;
var saveData;
var wrongForgive = 0;
var multiIndex = 0;
var $h1text;
var arr;

var cList = $('#leftContainer').find('ul');
var anumber;
var eqnumber;
var qnumber;
var score;
var totalq;
var highlightVar;
var uniqueNames;
var uniqueLength;
var answerRemoveSet;
var showAnswersNumber;
var correct;
var inputText;

var continueNumber = 0;

Array.prototype.removeByIndex = function(index) {
    this.splice(index, 1);
}

var friends = window.parent.shout_text;
var saveData = window.parent.xmlDataVar;
		


		quizHeadline = $(saveData).find(friends).find('headline').text();
		inputText = $(saveData).find(friends).find('inputText').text();
		showAnswers = $(saveData).find(friends).find('showAnswers').text();
		subTitle = $(saveData).find(friends).find('subTitle').text();
		doubleTrouble = $(saveData).find(friends).find('secondAnswers').text();
		
			
		$('<button/>').attr('id','b1').appendTo('#container');
		$('<button/>').attr('id','b2').appendTo('#container');
		$('<button/>').attr('id','b3').appendTo('#container');
		$('<button/>').attr('id','b4').appendTo('#container');
		
		$('<button/>').attr('id','c1').appendTo('#container');
		$('<button/>').attr('id','c2').appendTo('#container');
		$('<button/>').attr('id','c3').appendTo('#container');
		$('<button/>').attr('id','c4').appendTo('#container');
		
		var $allb = $('#b1,#b2,#b3,#b4');
		var $allc = $('#c1,#c2,#c3,#c4');
		
		/* var docWidth = window.parent.$('body').width();						// media query setting - negative margin
			//console.log(docWidth)
			if (docWidth > 1200 ) {
			//console.log('hello')
				 $('h1').css({
				x: '-20px'
				}) 
				$('#inputText').css({
				x: '-10px'
				}) 
				
			} */
			
		
		
		
		$b1 = $('#b1');
		$b2 = $('#b2');
		$b3 = $('#b3');
		$b4 = $('#b4');

		$c1 = $('#c1');
		$c2 = $('#c2');
		$c3 = $('#c3');
		$c4 = $('#c4');		
		
		
		
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
		
		var pickRandom = function () {	
			arr = questions[anumber];
			arr = arr.replace(/[^\w\s]/ig, "").split(" ");

			shuffle(arr);
			arr = jQuery.grep(arr, function(n){ return (n); });				//remove empty strings
			
			uniqueNames = [];											// remove duplicates i arr
			$.each(arr, function(i, el){
				if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
			});
			$.each(uniqueNames, function(i,v){
				if(v == answers[anumber] && uniqueNames.length > 4 )
				{
				
				uniqueNames.removeByIndex(i);
				
				}
			});
			
			$b1.text(uniqueNames[0]);
			$b2.text(uniqueNames[1]);
			$b3.text(uniqueNames[2]);
			$b4.text(uniqueNames[3]);
	
		    var bRandom;
			var cRandom;
			
			if ( uniqueNames[0] != answers[anumber] && uniqueNames[1] != answers[anumber] && uniqueNames[2] != answers[anumber] && uniqueNames[3] != answers[anumber])
			{
			bRandom = Math.floor( Math.random() * 4 + 1);
			$('#b' + bRandom).text(answers[anumber]);
			}
			
			cRandom = Math.floor( Math.random() * 4 + 1);
			while (cRandom == bRandom)
			{
			cRandom = Math.floor( Math.random() * 4 + 1);
			}
			
			if ( $b1.text() != secondAnswers[anumber] && $b2.text() != secondAnswers[anumber] && $b3.text() != secondAnswers[anumber] && $b4.text() != secondAnswers[anumber])
			{
			$('#b' + cRandom).text(secondAnswers[anumber]);
			}
		}
		
		var appendList = function () {
			$('<ul/>').attr('id','listAll').appendTo('#container');
			
			for (var i=0;i<questions.length;i++) {
				$('<li>' +  questions[i] + '</li>').attr('id', 'list' + (i)).appendTo('#listAll');
			}	
		}	
		
		$allc.hide();
		
		$question = $("#question");
			
		$('<button/>').attr('id','continue').appendTo('#container').text('continue').css({opacity:0}).hide();
		$continue = $('#continue');
		$feedback = $("#feedback").css('opacity',0);
		$feedback.text("Right!").css("color", "#1e90ff ");
		
		$inputText = $('#inputText');
		$inputText.text(inputText);
		$h1 = $('h1');
		
		$('<button/>').attr('id','initButton').text('Restart').appendTo('#container').hide();
		
		$(saveData).find(friends).children('questions').each(function () {
			$this = $(this);
			questions.push($this.children('question').text());
			answers.push($this.find('answer').text());
			secondAnswers.push($this.find('secondAnswer').text());
		});
		
	/* 	 $('#closingButton').fastClick(function (e) {
			e.preventDefault();
		parent.$.fancybox.close();
	  });  */
	
		
	init = function () {
	
		showAnswersNumber = 0;

		$inputText.show();
		$question.show();
		$allb.show().css({opacity: 1});;
				
		eqnumber = questions.length;
		qnumber = 0;
		score = 100;
		anumber = 0;
		
		totalq = eqnumber;
		$h1.html(quizHeadline);
		$question.html("<span id='qText'>" + questions[anumber] + "</span>");
		
		pickRandom();
		appendList();
		$('#listAll').columnize({ width: 300 });
		
		 if (!$.support.transition) {			
					
					$.fn.transition = $.fn.animate;
				} 	
		
	}																			// init end
	init();
		
	$allb.fastClick(function (e) {	// button b click
		e.preventDefault();		
		$this = $(this);
		if ($this.text() == answers[anumber]) {
			$allb.css("color", "rgb(187, 187, 187)");
			$allb.css({opacity: 0}).hide();
			$allc.css({opacity: 1}).show();
			wrongForgive = 0;
			correct = answers[anumber];
			$question.highlight(correct, { wordsOnly: true, className: 'highlightFirst'}); 
			$c1.text($b1.text());
			$c2.text($b2.text());
			$c3.text($b3.text());
			$c4.text($b4.text());
			
		}
		else {
		$this.css("color", "#FF0000");
		score = score -5;
		}
			
	});	
			
			
	$allc.fastClick(function (e) {
		e.preventDefault();	
		$this = $(this);
		if ($this.text() == secondAnswers[anumber]) 
		{
		$allc.css("color", "rgb(187, 187, 187)");		
			$allc.transition({opacity: 0},200, function () {
			$allc.hide();
			if (qnumber != totalq){
				$('#continue').show().transition({opacity:1},400);
				}
			});
			wrongForgive = 0;
			correct = secondAnswers[anumber];
			$question.highlight(correct, { wordsOnly: true, className: 'highlightSecond'}); 
			
			$feedback.delay(250).transition({opacity:1},300); 
			$feedback.highlight($feedback.text(), { className: 'textBackground' })
			qnumber = qnumber + 1;
					
			if (qnumber == totalq)
				{
					
				$('#question').hide();
				$continue.hide();
				$allc.hide();
				$('#inputText').hide();
				
				$('#initButton').show().fastClick(function () {
					$('#listAll').remove();
					$feedback.css('opacity',0);
					$(this).hide();
					init();
				})
				
				
				if (showAnswers == 'True')	{
					$inputText.html("Your score is " + score + " out of 100. Now try without the answers.");
				}
				else {
					if (score == 100) {
					$inputText.html("Your score is " + score + " out of 100. Good job!");
						}
					else {
					$inputText.html("Your score is " + score + " out of 100. Try again");
					}
				}
			}
			$('#list' + (anumber)).text( $('#list' + (anumber)).text() + '*')
			$('#list' + (anumber))
			.highlight(answers[anumber], { wordsOnly: true, className: 'highlightFirst' })
			.highlight(secondAnswers[anumber], { wordsOnly: true, className: 'highlightSecond' })
			
		}
		else 
		{
		$this.css("color", "#FF0000");
		score = score -5;
		}
			
	});	
		$('#continue').fastClick(function (e) {	
		e.preventDefault();
			$(this).finish().transition({opacity: 0},100, function () {
				$allb.show().transition({opacity: 1},700);
				$(this).hide();
				
					
			$feedback.transition({opacity: 0},200);
			eqnumber = questions.length;
			anumber++;
			
			$('#qText').transition({y: -50},400, function () {
					
					$(this).text(questions[anumber]).css({y: 50}).transition({y: 0},400);
					
				})
			pickRandom();
			});	
		});
		
	/* 	document.addEventListener('touchmove', function(e) {
	    e.preventDefault();
	}, false);
	 */
	

});