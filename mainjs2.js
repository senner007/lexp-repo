var xmlDataVar;var globalScoreVariable;var shout_text;$(document).ready(function(){function l(t,n,r,i,s,o,u,a,f){$.fancybox({href:o,type:"iframe",padding:0,margin:[0,0,0,0],keys:{close:null},closeBtn:false,maxWidth:i,maxHeight:s,width:"100%",height:"100%",iframe:{scrolling:"no",preload:a},autoSize:false,openSpeed:0,openEffect:"none",closeEffect:"none",openOpacity:false,closeOpacity:false,closeSpeed:0,mouseWheel:false,closeEasing:"none",afterLoad:function(){var n=this.content;var r=n.contents();c.forAll(r,u,n,t);e.hide();var i=$("#container").width()-10;if(u.hasClass("appended")){u.parent().children().not(u).not(".hL").hide();u.parent().css({width:i,height:f+"px",border:"none"});u.css({width:i,border:"none"}).find(".boldedSub").css({borderBottom:"1px solid black"});u=u.parent()}else{u.find(".appended").hide();u.css({width:i,height:f+"px",border:"none"}).find(".boldedSub").first().css({borderBottom:"1px solid black"})}if($("#container").data("isotope").$filteredAtoms.length>1){$("#container").isotope("reLayout",function(){var e=u.data("isotope-item-position");$("body, html").animate({scrollTop:e.y+140},500+(e.y-t)/5,"easeOutExpo").promise().then(function(){$.fancybox.reposition();n.addClass("opacityIn")})})}else{var s=u.data("isotope-item-position");$("body, html").animate({scrollTop:s.y+140},200,"easeOutQuint").promise().then(function(){$.fancybox.reposition();n.addClass("opacityIn")})}},afterClose:function(){$(".isotope-item").css({"-webkit-transition-duration":"0.7s","-moz-transition-duration":"0.7s","-ms-transition-duration":"0.7s","-o-transition-duration":"0.7s","transition-duration":"0.7s"});$("html, body").off("touchstart touchmove")},helpers:{title:null,overlay:null,overlay:{locked:true}}})}function h(e){$(e).each(function(){$("<img/>")[0].src=this})}var e=$("#loaderGif");var t=new $.Deferred;var n=new $.Deferred;var r=navigator.userAgent.toLowerCase();var i=r.match(/(iphone|ipod|ipad)/);if(i){$("<link/>",{rel:"stylesheet",type:"text/css",href:"ipad.css"}).appendTo("head")}Array.prototype.removeByIndex=function(e){this.splice(e,1)};$.ajax({url:"quiz/quiz.xml",dataType:"xml",cache:true,success:function(n){xmlDataVar=n;$(".item.coltext1,.item.coltext2,.item.coltext3,.item.colRules1,.item.colRules2").css("visibility","visible");var r="";var s;var o;var u;var a;setHeadlineClass=function(e){if(e=="Theme"){return"<span class='highlight'>Theme</span>"}if(e=="Grammar"){return"<em class='grammarHl'>Grammar</em>"}if(e=="Text/Grammar"){return"<span class='blackWhite'>Text</span><em class='grammarHl'>Grammar</em>"}if(e=="Text"){return"<span class='blackWhite'>Text</span>"}if(e=="Vocabulary"){return"<span class='vocabHl'>Vocabulary</span>"}if(e=="Theme/Grammar"){return"<span class='highlight'>Theme</span><em class='grammarHl'>Grammar</em>"}};splitSubtitle=function(e){var t=e.split(" - ");var n=t[0].charAt(0);if(t.length>1){return"<span class='boldedSub'><span class='someclass'>"+n+"</span>"+t[0].substring(1,t[0].length)+"</span>"+" - "+t[1]}else{return"<span class='boldedSub'><span class='someclass'>"+n+"</span>"+t[0].substring(1,t[0].length)+"</span>"}};alignQuiz=function(){$(n).find("quizes").children().each(function(e,t){var n=$(this);var i=n.find("subTitle").text();var f=n.find("headline").text();var l=n.find("title").text();var c=setHeadlineClass(f);var h=splitSubtitle(i);if(i.charAt(i.length-1)!="I"&&i.charAt(i.length-1)!="V"){r+='<div data-abc="'+i+'" '+"class='item exc "+this.tagName+" isotope-brick' data-fancybox-type='iframe' title='"+l+"'><div class='hL'>"+c+"</div>"+'<span class="shrink">'+h+"</span>"}else{r+="<div class='"+this.tagName+" "+"appended"+"' data-fancybox-type='iframe' title='"+l+"'><span class='shrink'>"+h+"</span></div>"}var p=$(t).next().find("subTitle").text();if(p.charAt(p.length-1)!="I"&&p.charAt(p.length-1)!="V"){r+="</div>"}if(f.indexOf("Grammar")>=0){s=l}if(f.indexOf("Vocabulary")>=0){o=l}if(f.indexOf("Theme")>=0){u=l}if(f.indexOf("Text")>=0){a=l}})};alignQuiz();$("#containerOuter").css({opacity:1});$("#container").append(r);var f="";f+='<a data-abc="Nouns" rel="gallery" id="NounsImg" href="img/nouns2.png" class="item colimg2 fancybox" title="Legendary Nouns"><img src="img/nouns3.png" /></a>';f+='<a data-abc="Adverbs" rel="gallery" id="AdverbImg" href="img/adverbs2.png" class="item colimg1 fancybox" title="I study my adverbs..."><img src="img/adverbs3.png" /></a>';f+='<a data-abc="Adjectives" rel="gallery" id="AdjectImg" href="img/adjectives2.png" class="item colimg2 fancybox" title="Are you?"><img src="img/adjectives3.png" /></a>';f+='<a data-abc="Verbs" rel="gallery" id="VerbsIrrImg" href="img/wordleVerbsIrr.jpg" class="item colimg2 fancybox" title="Ring rang rung"><img src="img/wordleVerbsIrrSmall.jpg" /></a>';f+='<a data-abc="Prepositions" rel="gallery" id="PrepImg" href="img/preps2.png" class="item colimg2 fancybox" title="Prepositions"><img src="img/preps3.png" /></a>';$(f).appendTo("#container");h(["img/adjectives2.png","img/nouns2.png","img/adverbs2.png","img/preps2.png","img/wordleVerbsIrr.jpg","img/uncountableNouns.jpg"]);var l=$("#container");l.find("div[title='"+s+"']").addClass("recent").end().find("div[title='"+o+"']").addClass("recent").end().find("div[title='"+u+"']").addClass("recent").end().find("div[title='"+a+"']").addClass("recent");recentParent=l.find(".recent").parents(".item").add(".item.recent");var c=$(".item");e.hide();$(".colimg2").css("visibility","visible");l.isotope({itemSelector:".item",itemPositionDataEnabled:true,masonry:{columnWidth:5},resizesContainer:false,resizable:false,hiddenStyle:{opacity:0},getSortData:{category:function(e){return e.attr("data-abc")}},sortBy:"category",animationEngine:"best-available",transformsEnabled:true}).isotope({filter:recentParent},function(){$itemGrammar=l.find($(".exc:contains('Grammar')"));$itemVocab=l.find($(".exc:contains('Vocabulary')"));$itemTrueFalseTheme=l.find($(".exc:contains('Theme')"));$itemI=l.find(".item.colimg1,.item.colimg2");$itemRules=l.find(".colRules1,.colRules2,.coltext1,.coltext2,.coltext3,.exc:contains('Text')");$itemsAll=l.find(".item").not("#introText");$.when($.getScript("fancybox/jquery.fancybox215Mod.js"),$.getScript("quiz/js/jquery.easing.1.3.min.js"),$.Deferred(function(e){$(e.resolve)})).done(function(){t.resolve()})});$("#site-nav").find("#showInit").addClass("siteNavClass");if(i){$("#subtitleText").text("Tablet device must be rotated to landscape mode").animate({opacity:1},600).animate({opacity:0},600).animate({opacity:1},600);$("#introSearch").remove()}else{$("#subtitleText").text("Use menu to filter and sort items alphabetically. Press Ctrl + mousescroll or +/- to zoom").animate({opacity:1},600).animate({opacity:0},600).animate({opacity:1},600)}},error:function(){$("h1").text("Site under construction.")}});$.fn.disableSelection=function(){return this.attr("unselectable","on").css("user-select","none").on("selectstart",false)};$("body").disableSelection();jQuery.extend(jQuery.fn,{search:function(e){jQuery.expr[":"].icontains=function(e,t,n){var r=jQuery(e).text().toUpperCase().indexOf(n[3].toUpperCase())>=0;var i=jQuery(e).data("abc").toUpperCase().indexOf(n[3].toUpperCase())>=0;if(r==true){return r}else{return i}};if(e.match(/.+/g)==null)return this;var t=$(this).filter(":icontains("+e+")");return t}});$("#site-nav").on("keyup","#searchM",function(){var e=$("#container");var t=$(this).val();e.find(".hideItem").removeClass("hideItem").show();var n=$itemsAll.search(t);var r=["transition","sortable","quiz","scrambled","gapFill","doubleTrouble","trueFalse","jumbled"];$.each(r,function(r,i){if(t.toUpperCase()==i.toUpperCase()){var s=e.find("."+i+".appended").parent().not("."+i);var o=e.find("."+i);s.find(".appended").not("."+i).addClass("hideItem");s.children().not("."+i).not(".hL").addClass("hideItem");o.find(".appended").not("."+i).addClass("hideItem");n=s.add(o)}});if(t!=""){e.isotope({filter:n})}});var s=$("body").width();var o=$("body").height();var u=$(document);var a;$("#container").on("tapclick","div",function(n){var r=u.scrollTop();u.scrollTop(r);var i=$(this);if(i.data("fancybox-type")!="iframe"){return}n.preventDefault();n.stopPropagation();if(i.hasClass("isotope-hidden")||i.parent().hasClass("isotope-hidden")){return}e.show();if(i.hasClass("hL")){i=i.parent()}if(i.find(".shrink").hasClass("hideItem")){i=i.find(".appended").not(".hideItem")}o=$("body").height();s=$("body").width();var a=true;var f=$(window).scrollTop();window.shout_text=i.attr("title");$(".isotope-item").css({"-webkit-transition-duration":"0.5s","-moz-transition-duration":"0s","-ms-transition-duration":"0s","-o-transition-duration":"0s","transition-duration":"0.5s"});$.when(t).done(function(){var e=0;var t=0;var n=3e3;var r=3e3;var s=0;if(i.hasClass("quiz")){t=[0,0,0,0];var o="quiz/quizIndex_old.html";var u=$(xmlDataVar).find(i.attr("title")).find("multiChoice").text();if(u=="True"){s=450}else{s=280}}if(i.hasClass("scrambled")){var o="quiz/scrambleIndex.html";s=325}if(i.hasClass("sortable")){var o="quiz/indexSortable.html";s=580}if(i.hasClass("trueFalse")){var o="quiz/trueFalse.html";s=640}if(i.hasClass("jumbled")){var o="quiz/jumbleIndex.html";s=630}if(i.hasClass("doubleTrouble")){var o="quiz/doubleTrouble.html";s=570}if(i.hasClass("gapFill")){var o="quiz/gapFill.html";s=640}if(i.hasClass("recall")){var e=[10,10,10,10];var t=-20;var o="quiz/recall.html"}if(i.hasClass("transition")){var o="quiz/transition.html";s=630}if(i.hasClass("variousRules")){var o=i.attr("href");s=630}l(f,e,t,n,r,o,i,a,s)})});var f=$("#secondContainer");var c={forAll:function(e,t,n,r){var i=$(xmlDataVar).find(t.attr("title")).find("headline").text();var s=$(xmlDataVar).find(t.attr("title")).find("subTitle").text();if(!t.hasClass("variousRules")){e.find("h1").remove()}e.find("#indexText").remove();e.on("touchmove mousewheel",function(e){e.preventDefault()},false);$("html, body").on("touchstart touchmove",function(e){e.preventDefault()});e.disableSelection();n.focus();e.find("html").focus();closingFunction=function(){n.hide();$("body, html").delay(10).animate({scrollTop:r},150).promise().then(function(){$.fancybox.close();if(t.hasClass("appended")){t.parent().children().not(".hideItem").show();t.closest(".item").css({width:"190px",height:"auto",borderTop:"5px solid rgba(68, 68, 68,1)"}).find(".boldedSub").first().css({borderBottom:"none"});t.css({width:"190px",borderTop:"2px dashed rgba(68, 68, 68,1)"}).find(".boldedSub").first().css({borderBottom:"none"})}else{t.find(".appended").not(".hideItem").show();t.css({width:"190px",height:"auto",borderTop:"5px solid rgba(68, 68, 68,1)",borderBottom:"none"}).find(".boldedSub").first().css({borderBottom:"none"}).not(".hideItem").show()}$("#container").isotope("reLayout")})};e.on("keyup","html",function(e){e.preventDefault();if(e.which==27){closingFunction()}});e.find("#container").one("tapclick","#closingButton",function(){closingFunction()})}};$.support.transition=function(){var e=document.body||document.documentElement,t=e.style,n=t.transition!==undefined||t.WebkitTransition!==undefined||t.MozTransition!==undefined||t.MsTransition!==undefined||t.OTransition!==undefined;return n}();TypeWriteFirst=function(e){e.each(function(){var e=$.trim($(this).text());var t=e.charAt(0);$(this).html('<span class="someclass">'+t+"</span>"+e.substring(1,e.length))})};categorySwitch=function(e,t){e.each(function(){$this=$(this);if($this.find(".hL").children().size()>1){var e=$this.find(t).index();if(e!=0){var n=$.trim($this.find(".hL").children().first().text());var r=$.trim($this.find(".hL").children().last().text());if(n.length+r.length>15){$this.find(t).html($.trim($this.find(t).text())+" ")}else{$this.find(t).html($.trim($this.find(t).text()))}$this.find(t).prependTo($this.find(".hL"));var i=$this.find(".boldedSub").text().split(",");$this.find(".boldedSub").text($.trim(i[e]+", "+i[e-1]));$this.attr("data-abc",$.trim($this.find(".shrink").text()));TypeWriteFirst($this.find(".boldedSub"))}}})};$("#site-nav").on("tapclick","li",function(e){e.preventDefault();var t=$("#container");t.find(".hideItem").removeClass("hideItem").show();var n=$(this);$("#searchM").val("");if(n.hasClass("siteNavClass")){return}n.addClass("siteNavClass").siblings().removeClass("siteNavClass");switch(n.attr("id")){case"showInit":t.isotope({filter:recentParent});break;case"showAll":t.isotope({filter:$itemsAll});break;case"navRules":categorySwitch($itemRules,".blackWhite");$("#container").isotope("updateSortData",$itemRules).isotope({filter:$itemRules});break;case"navImages":t.isotope({filter:$itemI});break;case"navGrammar":categorySwitch($itemGrammar,".grammarHl");$("#container").isotope("updateSortData",$itemGrammar).isotope({filter:$itemGrammar});break;case"navVocab":categorySwitch($itemVocab,".vocabHl");t.isotope("updateSortData",$itemVocab).isotope({filter:$itemVocab});break;case"navThemesTrueFalse":categorySwitch($itemTrueFalseTheme,".highlight");t.isotope("updateSortData",$itemTrueFalseTheme).isotope({filter:$itemTrueFalseTheme});break}});$("#topHeader").find("a").on("tapclick",function(e){e.preventDefault();var t=$(this);switch(t.attr("id")){case"navChangelog":$.fancybox({href:"history/history.html",type:"iframe",fitToView:false,maxWidth:700,maxHeight:700,autoSize:false,padding:0,margin:0,topRatio:.1,width:"100%",height:"100%",closeClick:false,openEffect:"elastic",openSpeed:400,closeEffect:"elastic",afterLoad:function(){this.content.css({opacity:1})}});break;case"quizMenu":$.fancybox({href:"quizMenu/quizMenu.html",type:"iframe",fitToView:false,maxWidth:900,maxHeight:700,autoSize:false,padding:0,margin:0,topRatio:.1,width:"100%",height:"100%",closeClick:false,openEffect:"elastic",openSpeed:400,closeEffect:"elastic",afterLoad:function(){this.content.css({opacity:1})}});break}});$("#container").on("click",function(e){e.preventDefault()},false);$(window).on("orientationchange",function(e){var t=$(window).width();if(t<1024){alert("please rotate device to landscape mode")}});$("#container").on("tapclick","a img",function(e){e.preventDefault();e.stopPropagation();var t=$(this);titleIndex=0;var n=$("#container").find("img").map(function(e,n){var r=$(n);if(r.parent().attr("href")==t.parent().attr("href")){return{href:r.parent().attr("href"),title:r.parent().attr("title")}}}).get();var r=$("#container").find("img").map(function(e,n){var r=$(n);if(r.parent().attr("href")!=t.parent().attr("href")){return{href:r.parent().attr("href"),title:r.parent().attr("title")}}}).get();var i=$.merge(n,r);isStart=true;$.fancybox.open(t.parent().attr("href"),{padding:0,openSpeed:0,closeSpeed:0,afterLoad:function(){if(isStart==true){$(".fancybox-overlay").css("opacity",0);isStart=false}$(".fancybox-iframe").contents().find(".fancybox-close").attr("id","helloClose").unbind();$(".fancybox-outer").css("background-image","url('img/3.jpg')")},afterClose:function(){$(".fancybox-overlay").animate({opacity:0},300,function(){$(this).hide()})},beforeShow:function(){$(".fancybox-image").css({opacity:1})},afterShow:function(){$(".fancybox-overlay").animate({opacity:1},500)},helpers:{overlay:{closeClick:false}}});return false})})