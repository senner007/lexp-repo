$(document).ready(function() {

jQuery.extend( jQuery.fn, {

	search: function(p) {
		
	   if (p.match(/.+/g) == null) return this;
		return $(this).filter(':contains(' + p + ')');
	}
});

var deviceAgent = navigator.userAgent.toLowerCase();		
var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
if (agentID) {
		$('#inputHelper').remove();
} 
  
  var verbArray = [
  
'Abide Abode/Abided Abode/Abided Abides Abiding',
'Alight Alit/Alighted Alit/Alighted Alights Alighting',
'Arise Arose Arisen Arises Arising',
'Awake Awoke Awoken Awakes Awaking',
'Be Was/Were Been Is Being',
'Bear Bore Born/Borne Bears Bearing',
'Beat Beat Beaten Beats Beating',
'Become Became Become Becomes Becoming',
'Begin Began Begun Begins Beginning',
'Behold Beheld Beheld Beholds Beholding',
'Bend Bent Bent Bends Bending',
'Bet Bet Bet Bets Betting',
'Bid Bade Bidden Bids Bidding',
'Bid Bid Bid Bids Bidding',
'Bind Bound Bound Binds Binding',
'Bite Bit Bitten Bites Biting',
'Bleed Bled Bled Bleeds Bleeding',
'Blow Blew Blown Blows Blowing',
'Break Broke Broken Breaks Breaking',
'Breed Bred Bred Breeds Breeding',
'Bring Brought Brought Brings Bringing',
'Build Built Built Builds Building',
'Burn Burnt/Burned Burnt/Burned Burns Burning',
'Burst Burst Burst Bursts Bursting',
'Bust Bust Bust Busts Busting',
'Buy Bought Bought Buys Buying',
'Cast Cast Cast Casts Casting',
'Catch Caught Caught Catches Catching',
'Choose Chose Chosen Chooses Choosing',
'Clap Clapped/Clapt Clapped/Clapt Claps Clapping',
'Cling Clung Clung Clings Clinging',
'Clothe Clad/Clothed Clad/Clothed Clothes Clothing',
'Come Came Come Comes Coming',
'Cost Cost Cost Costs Costing',
'Creep Crept Crept Creeps Creeping',
'Cut Cut Cut Cuts Cutting',
'Dare Dared/Durst Dared Dares Daring',
'Deal Dealt Dealt Deals Dealing',
'Dig Dug Dug Digs Digging',
'Dive Dived/Dove Dived Dives Diving',
'Do Did Done Does Doing',
'Draw Drew Drawn Draws Drawing',
'Dream Dreamt/Dreamed Dreamt/Dreamed Dreams Dreaming',
'Drink Drank Drunk Drinks Drinking',
'Drive Drove Driven Drives Driving',
'Dwell Dwelt Dwelt Dwells Dwelling',
'Eat Ate Eaten Eats Eating',
'Fall Fell Fallen Falls Falling',
'Feed Fed Fed Feeds Feeding',
'Feel Felt Felt Feels Feeling',
'Fight Fought Fought Fights Fighting',
'Find Found Found Finds Finding',
'Fit Fit/Fitted Fit/Fitted Fits Fitting',
'Flee Fled Fled Flees Fleeing',
'Fling Flung Flung Flings Flinging',
'Fly Flew Flown Flies Flying',
'Forbid Forbade/Forbad Forbidden Forbids Forbidding',
'Foresee Foresaw Foreseen Foresees Foreseeing',
'Foretell Foretold Foretold Foretells Foretelling',
'Forget Forgot Forgotten Forgets Foregetting',
'Forgive Forgave Forgiven Forgives Forgiving',
'Forsake Forsook Forsaken Forsakes Forsaking',
'Freeze Froze Frozen Freezes Freezing',
'Get Got Got/Gotten Gets Getting',
'Give Gave Given Gives Giving',
'Go Went Gone/Been Goes Going',
'Grind Ground Ground Grinds Grinding',
'Grow Grew Grown Grows Growing',
'Handwrite Handwrote Handwritten Handwrites Handwriting',
'Hang Hung/Hanged Hung/Hanged Hangs Hanging',
'Have Had Had Has Having',
'Hear Heard Heard Hears Hearing',
'Hide Hid Hidden Hides Hiding',
'Hit Hit Hit Hits Hitting',
'Hold Held Held Holds Holding',
'Hurt Hurt Hurt Hurts Hurting',
'Inlay Inlaid Inlaid Inlays Inlaying',
'Input Input/Inputted Input/Inputted Inputs Inputting',
'Interlay Interlaid Interlaid Interlays Interlaying',
'Keep Kept Kept Keeps Keeping',
'Kneel Knelt/Kneeled Knelt/Kneeled Kneels Kneeling',
'Knit Knit/Knitted Knit/Knitted Knits Knitting',
'Know Knew Known Knows Knowing',
'Lay Laid Laid Lays laying',
'Lead Led Led Leads Leading',
'Lean Leant/Leaned Leant/Leaned Leans Leaning',
'Leap Leapt/Leaped Leapt/Leaped Leaps Leaping',
'Learn Learnt/Learned Learnt/Learned Learns Learning',
'Leave Left Left Leaves Leaving',
'Lend Lent Lent Lends Lending',
'Let Let Let Lets Letting',
'Lie Lay Lain Lies Lying',
'Light Lit Lit Lights Lighting',
'Lose Lost Lost Loses Losing',
'Make Made Made Makes Making',
'Mean Meant Meant Means Meaning',
'Meet Met Met Meets Meeting',
'Melt Melted Molten/Melted Melts Melting',
'Mislead Misled Misled Misleads Misleading',
'Mistake Mistook Mistaken Mistakes Mistaking',
'Misunderstand Misunderstood Misunderstood Misunderstands Misunderstanding',
'Miswed Miswed/Miswedded Miswed/Miswedded Misweds Miswedding',
'Mow Mowed Mown Mows Mowing',
'Overdraw Overdrew Overdrawn Overdraws Overdrawing',
'Overhear Overheard Overheard Overhears Overhearing',
'Overtake Overtook Overtaken Overtakes Overtaking',
'Pay Paid Paid Pays Paying',
'Preset Preset Preset Presets Presetting',
'Prove Proved Proven/Proved Proves Proving',
'Put Put Put Puts Putting',
'Quit Quit Quit Quits Quitting',
'Reprove Reproved Reproven/Reproved Reproves Reproving',
'Read Read Read Reads Reading',
'Rid Rid/Ridded Rid/Ridded Rids Ridding',
'Ride Rode Ridden Rides Riding',
'Ring Rang Rung Rings Ringing',
'Rise Rose Risen Rises Rising',
'Rive Rived Riven/Rived Rives Riving',
'Run Ran Run Runs Running',
'Saw Sawed Sawn/Sawed Saws Sawing',
'Say Said Said Says Saying',
'See Saw Seen Sees Seeing',
'Seek Sought Sought Seeks Seeking',
'Sell Sold Sold Sells Selling',
'Send Sent Sent Sends Sending',
'Set Set Set Sets Setting',
'Sew Sewed Sewn/Sewed Sews Sewing',
'Shake Shook Shaken Shakes Shaking',
'Shave Shaved Shaven/Shaved Shaves Shaving',
'Shear Shore/Sheared Shorn/Sheared Shears Shearing',
'Shed Shed Shed Sheds Shedding',
'Shine Shone Shone Shines Shining',
'Shoe Shod Shod Shoes Shoeing',
'Shoot Shot Shot Shoots Shooting',
'Show Showed Shown Shows Showing',
'Shrink Shrank Shrunk Shrinks Shrinking',
'Shut Shut Shut Shuts Shutting',
'Sing Sang Sung Sings Singing',
'Sink Sank Sunk Sinks Sinking',
'Sit Sat Sat Sits Sitting',
'Slay Slew Slain Slays Slaying',
'Sleep Slept Slept Sleeps Sleeping',
'Slide Slid Slid/Slidden Slides Sliding',
'Sling Slung Slung Slings Slinging',
'Slink Slunk Slunk Slinks Slinking',
'Slit Slit Slit Slits Slitting',
'Smell Smelt/Smelled Smelt/Smelled Smells Smelling',
'Sneak Sneaked/Snuck Sneaked/Snuck Sneaks Sneaking',
'Soothsay Soothsaid Soothsaid Soothsays Soothsaying',
'Sow Sowed Sown Sows Sowing',
'Speak Spoke Spoken Speaks Speaking',
'Speed Sped/Speeded Sped/Speeded Speeds Speeding',
'Spell Spelt/Spelled Spelt/Spelled Spells Spelling',
'Spend Spent Spent Spends Spending',
'Spill Spilt/Spilled Spilt/Spilled Spills Spilling',
'Spin Span/Spun Spun Spins Spinning',
'Spit Spat/Spit Spat/Spit Spits Spitting',
'Split Split Split Splits Splitting',
'Spoil Spoilt/Spoiled Spoilt/Soiled Spoils Spoiling',
'Spread Spread Spread Spreads Spreading',
'Spring Sprang Sprung Springs Springing',
'Stand Stood Stood Stands Standing',
'Steal Stole Stolen Steals Stealing',
'Stick Stuck Stuck Sticks Sticking',
'Sting Stung Stung Stings Stinging',
'Stink Stank Stunk Stinks Stinking',
'Stride Strode/Strided Stridden Strides Striding',
'Strike Struck Struck/Stricken Strikes Striking',
'String Strung Strung Strings Stringing',
'Strip Stript/Stripped Stript/Stripped Strips Stripping',
'Strive Strove Striven Strives Striving',
'Sublet Sublet Sublet Sublets Subletting',
'Sunburn Sunburned/Sunburnt Sunburned/Sunburnt Sunburns Sunburning',
'Swear Swore Sworn Swears Swearing',
'Sweat Sweat/Sweated Sweat/Sweated Sweats Sweating',
'Sweep Swept/Sweeped Swept/Sweeped Sweeps Sweeping',
'Swell Swelled Swollen Swells Swelling',
'Swim Swam Swum Swims Swimming',
'Swing Swung Swung Swings Swinging',
'Take Took Taken Takes Taking',
'Teach Taught Taught Teaches Teaching',
'Tear Tore Torn Tears Tearing',
'Tell Told Told Tells Telling',
'Think Thought Thought Thinks Thinking',
'Thrive Throve/Thrived Thriven/Thrived Thrives Thriving',
'Throw Threw Thrown Throws Throwing',
'Thrust Thrust Thrust Thrusts Thrusting',
'Tread Trod Trodden Treads Treading',
'Undergo Underwent Undergone Undergoes Undergoing',
'Understand Understood Understood Understands Understanding',
'Undertake Undertook Undertaken Undertakes Undertaking',
'Upset Upset Upset Upsets Upsetting',
'Vex Vext/Vexed Vext/Vexed Vexes Vexing',
'Wake Woke Woken Wakes Waking',
'Wear Wore Worn Wears Wearing',
'Weave Wove Woven Weaves Weaving',
'Wed Wed/Wedded Wed/Wedded Weds Wedding',
'Weep Wept Wept Weeps Weeping',
'Wend Wended/Went Wended/Went Wends Wending',
'Wet Wet/Wetted Wet/Wetted Wets Wetting',
'Win Won Won Wins Winning',
'Wind Wound Wound Winds Winding',
'Withdraw Withdrew Withdrawn Withdraws Withdrawing',
'Withhold Withheld Withheld Withholds Withholding',
'Withstand Withstood Withstood Withstands Withstanding',
'Wring Wrung Wrung Wrings Wringing',
'Write Wrote Written Writes Writing',
'Zinc Zinced/Zincked Zinced/Zincked Zincs/Zincks Zincking'
  
  ];

  
	var listHtml = '';
  
	$.each(verbArray, function(i,e) {
		var selectWordsArr = verbArray[i].split(" ");
		listHtml += '<li>' + selectWordsArr[0] + '</li>'
   
	})
  
	$('ul').append(listHtml);
  
	var  $topTableMid = $('#topTableMid'),
		 $bottomTableMid = $('#bottomTableMid'),
		 $wordDef = $('#wordDef');
		
	
    
	limove = function (indexFirst)  {
		

		var thisIndex = indexFirst,
			selectWordsArr = verbArray[thisIndex].split(" ");
		 
		selectWordsArr[0] =  selectWordsArr[0].toLowerCase();
		selectWordsArr[1] =  selectWordsArr[1].replace(/\//g, ' /').toLowerCase();
		selectWordsArr[2] =  selectWordsArr[2].replace(/\//g, ' /').toLowerCase();
		selectWordsArr[3] =  selectWordsArr[3].replace(/\//g, ' /').toLowerCase();
		selectWordsArr[4] =  selectWordsArr[4].replace(/\//g, ' /').toLowerCase();
			  
		$wordDef.text(selectWordsArr[0] + ' - ' + selectWordsArr[1] + ' - ' + selectWordsArr[2]);
		
		
			// exception if verb is 'be'
		if (thisIndex == 4) {
					  
			var toBeRow01 = '<tr id="topRow1"><td class="strong">I</td><td>was</td><td>was ' + selectWordsArr[4] + '</td><td>am</td><td>am ' + selectWordsArr[4] + '</td><td>will /am going to ' + selectWordsArr[0] + '</td><td>will be /am going to be ' + selectWordsArr[4] + '</td></tr>'; 
			  
			var toBeRow02 = '<tr id="topRow2"><td class="strong">You</td><td>were</td><td>were ' + selectWordsArr[4] + '</td><td>are</td><td>are ' + selectWordsArr[4] + '</td><td>will /are going to ' + selectWordsArr[0] + '</td><td>will be /are going to be ' + selectWordsArr[4] + '</td></tr>'; 
		  
			var toBeRow03 = '<tr id="topRow3"><td class="strong">He, she, it</td><td>was</td><td>was ' + selectWordsArr[4] + '</td><td>' + selectWordsArr[3] + '</td><td>is ' + selectWordsArr[4] + '</td><td>will /is going to ' + selectWordsArr[0] + '</td><td>will be /is going to be ' + selectWordsArr[4] + '</td></tr>'; 
		  
			var toBeRow04 = '<tr id="topRow4"><td class="strong">We</td><td>were</td><td>were being</td><td>are</td><td>are being</td><td>will /are going to ' + selectWordsArr[0] + '</td><td>will be /are going to be ' + selectWordsArr[4] + '</td></tr>'; 
			
			$topTableMid.html(toBeRow01 + toBeRow02 + toBeRow03 + toBeRow04); 
	 
		} 
		else {

			var topTextRow01 = '<tr id="topRow1"><td class="strong">I</td><td>' + selectWordsArr[1] + '</td><td>was ' + selectWordsArr[4] + '</td><td>' + selectWordsArr[0] + '</td><td>am ' + selectWordsArr[4] + '</td><td>will /am going to ' + selectWordsArr[0] + '</td><td>will be /am going to be ' + selectWordsArr[4] + '</td></tr>'; 
			
			var topTextRow02 = '<tr id="topRow2"><td class="strong">You</td><td><img src="arrowTop.png"/></td><td>were ' + selectWordsArr[4] + '</td><td><img src="arrowTop.png"/></td><td>are ' + selectWordsArr[4] + '</td><td><img class="toTheLeft" src="arrowTop.png"/>' + '/are going to ' + selectWordsArr[0] + '</td><td><img class="toTheLeft" src="arrowTop.png"/>' + '/are going to be ' + selectWordsArr[4] + '</td></tr>';
			  		
			var topTextRow03 = '<tr id="topRow3"><td class="strong">He, she, it</td><td><img src="arrowTop.png"/></td><td>was ' + selectWordsArr[4] + '</td><td>' + selectWordsArr[3] + '</td><td>is ' + selectWordsArr[4] + '</td><td><img class="toTheLeft" src="arrowTop.png"/>' + '/is going to ' + selectWordsArr[0] + '</td><td><img class="toTheLeft" src="arrowTop.png"/>' + '/is going to be ' + selectWordsArr[4] + '</td></tr>'
			
			var topTextRow04 = '<tr id="topRow4"><td class="strong">We</td><td><img src="arrowTop.png"/></td><td>were ' + selectWordsArr[4] + '</td><td>' + selectWordsArr[0] + '</td><td>are ' + selectWordsArr[4] + '</td><td><img class="toTheLeft" src="arrowTop.png"/>' + '/are going to ' + selectWordsArr[0] + '</td><td><img class="toTheLeft" src="arrowTop.png"/>' + '/are going to be ' + selectWordsArr[4] + '</td></tr>'
			
			$topTableMid.html(topTextRow01 + topTextRow02 + topTextRow03 + topTextRow04); 
				  
		}
		  			  
			var bottomRow4Arrows = '<td><img src="arrowTop.png"/></td><td><img src="arrowTop.png"/></td><td><img src="arrowTop.png"/></td><td><img src="arrowTop.png"/></td>'
			  						  
			var bottomTextRow01 = '<tr id="bottomRow1"><td class="strong">I</td>' + '<td>had ' + selectWordsArr[2] + '</td><td>had been ' + selectWordsArr[4] + '</td><td>have ' + selectWordsArr[2] + '</td><td>have been ' + selectWordsArr[4] + '</td><td>will have /am going to have ' + selectWordsArr[2] + '</td><td>will have been /am going to have been ' + selectWordsArr[4] + '</td></tr>'
			  
			var bottomTextRow02 = '<tr id="bottomRow2"><td class="strong">You</td>' + bottomRow4Arrows + '<td><img class="toTheLeft" src="arrowTop.png"/>' + '/are going to have ' + selectWordsArr[2] + '</td><td><img class="toTheLeft" src="arrowTop.png"/>' + '/are going to have been ' + selectWordsArr[4] + '</td></tr>'
			
			var bottomTextRow03 = '<tr id="bottomRow3"><td class="strong">He, she, it</td><td><img src="arrowTop.png"/></td><td><img src="arrowTop.png"/></td><td>has ' + selectWordsArr[2] + '</td><td>has been ' + selectWordsArr[4] + '</td><td><img class="toTheLeft" src="arrowTop.png"/>' + '/is going to have ' + selectWordsArr[2] + '</td><td><img class="toTheLeft" src="arrowTop.png"/>' + '/is going to have been ' + selectWordsArr[4] + '</td></tr>';
			
			var bottomTextRow04 = '<tr id="bottomRow4"><td class="strong">We</td><td><img src="arrowTop.png"/></td><td><img src="arrowTop.png"/></td><td>have ' + selectWordsArr[2] + '</td><td>have been ' + selectWordsArr[4] + '</td><td><img class="toTheLeft" src="arrowTop.png"/>' + '/are going to have ' + selectWordsArr[2] + '</td><td><img class="toTheLeft" src="arrowTop.png"/>' + '/are going to have been ' + selectWordsArr[4] + '</td></tr>'
			
			$bottomTableMid.html(bottomTextRow01 + bottomTextRow02 + bottomTextRow03 + bottomTextRow04); 
			
	  
		if (!$.support.transition) {	

			$('td').css({fontSize:'16px'});
		} 

}

	var frame = $('#frame');
	var sly = new Sly(frame, {	
		horizontal: 1,
        itemNav: 'forceCentered',
        scrollBy: 1,
		activateMiddle: 1,
        speed: 1200,
		startAt: 0,
		swingSpeed: 0.1,
		easing: 'easeOutExpo',
		releaseSwing:  1,
		touchDragging: 1,
		elasticBounds: 1,
		dragSource: $('.frame,table'),
		scrollSource: $('.frame,table'),
		keyboardNavBy: 'pages'
			
		  },
		  { 
			active: function (position, $items, relatives) {

				 var indexFirst = this.rel.activeItem;
				 limove(indexFirst );
				 
			},
			load: function (position, $items, relatives) {

				//limove(0);
				var bottomRowAllRepeat = '<td><img src="arrowTop.png"/></td><td><img src="arrowTop.png"/></td><td><img src="arrowTop.png"/></td><td><img src="arrowTop.png"/></td><td><img src="arrowTop.png"/></td><td><img src="arrowTop.png"/></td>';  
				$('#topRow5').html('<td>You</td>' + bottomRowAllRepeat); 
				$('#topRow6').html('<td>They</td>' + bottomRowAllRepeat);
				$('#bottomRow5').html('<td>You</td>' + bottomRowAllRepeat); 
				$('#bottomRow6').html('<td>They</td>' + bottomRowAllRepeat); 				
			}
		});
	sly.init();

	$('#inputSearch').keyup(function (e) { 

		var v = $(this).val();
		// Do nothing if backspace(keyCode == 8)
		if (v != '' || e.keyCode != 8) {
			 var found =  $('li').search(v);
			sly.activatePage(found.index());
		}
 
	});
	
	$('.alphabetButtons').fastClick(function (event) {
		event.preventDefault();

		 var v = $(this).text().charAt(0).toUpperCase();
		 var found =  $('li').search(v);
		 sly.activatePage(found.index());

	}); 	
	

	$('#prevButton').fastClick(function (event) {
		event.preventDefault();
		sly.activatePage(sly.rel.activeItem  -1);	
		
	}); 	
  
	$('#nextButton').fastClick(function (event) {
		event.preventDefault();
		sly.activatePage(sly.rel.activeItem  +1);
			
	}); 	

     
	$('#skipNextButton').fastClick(function (event) {
		event.preventDefault();
		sly.activatePage(sly.rel.activeItem + 10);
		
	});   
  	 
	$('#skipPrevButton').fastClick(function (event) {
		event.preventDefault();
		sly.activatePage(sly.rel.activeItem - 10);
		
	});   
  
  
 

});