Function.prototype.debounce = function (milliseconds) {
    var baseFunction = this,
        timer = null,
        wait = milliseconds;

    return function () {
        var self = this,
            args = arguments;

        function complete() {
            baseFunction.apply(self, args);
            timer = null;
        }

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(complete, wait);
    };
};

Function.prototype.throttle = function (milliseconds) {
    var baseFunction = this,
        lastEventTimestamp = null,
        limit = milliseconds;

    return function () {
        var self = this,
            args = arguments,
            now = Date.now();

        if (!lastEventTimestamp || now - lastEventTimestamp >= limit) {
            lastEventTimestamp = now;
            baseFunction.apply(self, args);
        }
    };
};



  var sortable = {
    node: $('.smooth-sortable')[0],
    items: [],
    transitionDuration: 130,  // revert speed
    init: function(options) {
      sortable.transitionDuration = (function() {
        var item = $(sortable.node).children(':first');
        var duration =
          item.css('-webkit-transition-duration') ||
          item.css('-moz-transition-duration') ||
          item.css('-ms-transition-duration') ||
          item.css('-o-transition-duration') ||
          item.css('transition-duration');
        if (duration) {
          return parseInt(duration.substring(2, 5));
        } else {
          return sortable.transitionDuration;
        }
      })()
    },
    start: function(event, ui) {
     
      sortable.running = false;

      $('.smooth-sortable li').each(function(i) {
        $this = $(this);
        if (this == event.target){
          sortable.dragItemIndex = i;
        }
        sortable.items[i] = {};
        sortable.items[i].top = $this.offset().top;
        sortable.items[i].height = $this.outerHeight();
        sortable.items[i].bottom = sortable.items[i].top + sortable.items[i].height;
        sortable.items[i].node = this;
        sortable.items[i].displacement = 0;
        $this.css({
          'top': '0px',
          'position': 'relative'
        });
      });

      //TODO: inconsistency in how we get sortable.top and sortable.height, will get borked if sortable.node has padding
      sortable.top = sortable.items[0].top;
      sortable.bottom = sortable.items[sortable.items.length - 1].bottom;
      sortable.height = $(sortable.node).outerHeight();

     // console.log('dragstart with item ' + sortable.dragItemIndex);
    },
    drag: function(event, ui) {
     
      if (sortable.running){
       // console.log('throttle');
      } else {
        //TODO: sortable.running feels inelegant, using .throttle for functions feels more readable
        sortable.running = Date.now();

        var dragItem = sortable.items[sortable.dragItemIndex];

        while (sortable.running) { 

          if (sortable.dragItemIndex != 0){
            var topItem = sortable.items[sortable.dragItemIndex - 1];
          } else {
            var topItem = {};
            topItem.bottom = sortable.top;
            topItem.top = sortable.top-sortable.height;
            topItem.height = sortable.height;
          }

          if (sortable.dragItemIndex != sortable.items.length - 1) {
            var bottomItem = sortable.items[sortable.dragItemIndex + 1];
          } else {
            var bottomItem = {};
            bottomItem.top = sortable.bottom;
            bottomItem.bottom = sortable.bottom + sortable.height;
            bottomItem.height = sortable.height;
          }

          var dragMiddle = $(event.target).offset().top + ($(event.target).outerHeight() / 2);

          var topThreshold = (topItem.top + bottomItem.top) / 2;
          var bottomThreshold = (topItem.bottom + bottomItem.bottom) / 2;

          if (dragMiddle >= bottomThreshold) {

            bottomItem.displacement -= dragItem.height;
            $(bottomItem.node).css('top', bottomItem.displacement);

            sortable.items[sortable.dragItemIndex] = bottomItem;
            sortable.items[sortable.dragItemIndex].top = dragItem.top;
            sortable.items[sortable.dragItemIndex].bottom = sortable.items[sortable.dragItemIndex].top + bottomItem.height;

            sortable.items[sortable.dragItemIndex + 1] = dragItem;
            sortable.items[sortable.dragItemIndex + 1].top = bottomItem.bottom ;
            sortable.items[sortable.dragItemIndex + 1].bottom = sortable.items[sortable.dragItemIndex + 1 ].top + sortable.items[sortable.dragItemIndex + 1].height;
            sortable.items[sortable.dragItemIndex + 1].displacement += bottomItem.height;

            sortable.dragItemIndex++;

          } else if (dragMiddle < topThreshold){

            topItem.displacement += dragItem.height;
            $(topItem.node).css('top', topItem.displacement);

            var tempTop = topItem.top;

            sortable.items[sortable.dragItemIndex] = topItem;
            sortable.items[sortable.dragItemIndex].bottom = dragItem.bottom;
            sortable.items[sortable.dragItemIndex].top = dragItem.bottom - topItem.height;

            sortable.items[sortable.dragItemIndex - 1] = dragItem;
            sortable.items[sortable.dragItemIndex - 1].top = tempTop;
            sortable.items[sortable.dragItemIndex - 1].bottom = tempTop + dragItem.height;
            sortable.items[sortable.dragItemIndex - 1].displacement -= topItem.height;

            sortable.dragItemIndex--;

          } else {
            sortable.running = false;
          }
        }
      }
    },
    finish: function(event, ui) {
      // Disable dragging while animating.        
      $('.smooth-sortable li').draggable('disable');

      $(sortable.items[sortable.dragItemIndex].node).css({
        'top': sortable.items[sortable.dragItemIndex].displacement,
        'z-index': 9999
      });

      setTimeout(function() {
        // Keep the dragged item on top of other items during transition and then reset the Z-Index
        $(sortable.items[sortable.dragItemIndex].node)[0].style.zIndex = '';

        // Rewrite the dom to match the new order after everthing else is done.
        sortable.items.forEach(function(item, i, items) {
          $(item.node).css('top', 0);
          $('.smooth-sortable').append(item.node);
        });

        // Re-enable dragging.
        $('.smooth-sortable li').draggable('enable');
      }, sortable.transitionDuration);
    }
  };