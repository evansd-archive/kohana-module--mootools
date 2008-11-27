/* <?php echo '*','/';

	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'Core.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'Browser.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'Array.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'Function.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'Number.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'String.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'Hash.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'Event.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'Class.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'Class.Extras.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'Element.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'Element.Event.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'Element.Style.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'Element.Dimensions.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'Selectors.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'DomReady.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'JSON.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'Cookie.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'Swiff.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'Fx.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'Fx.CSS.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'Fx.Tween.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'Fx.Morph.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'Fx.Transitions.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'Request.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'Request.HTML.js');
	require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'Request.JSON.js');

echo '/*';?> */

/*
Script: Fx.Scroll.js
	Effect to smoothly scroll any element, including the window.

License:
	MIT-style license.
*/

Fx.Scroll = new Class({

	Extends: Fx,

	options: {
		offset: {'x': 0, 'y': 0},
		wheelStops: true
	},

	initialize: function(element, options){
		this.element = this.subject = $(element);
		this.parent(options);
		var cancel = this.cancel.bind(this, false);

		if ($type(this.element) != 'element') this.element = $(this.element.getDocument().body);

		var stopper = this.element;

		if (this.options.wheelStops){
			this.addEvent('start', function(){
				stopper.addEvent('mousewheel', cancel);
			}, true);
			this.addEvent('complete', function(){
				stopper.removeEvent('mousewheel', cancel);
			}, true);
		}
	},

	set: function(){
		var now = Array.flatten(arguments);
		this.element.scrollTo(now[0], now[1]);
	},

	compute: function(from, to, delta){
		var now = [];
		var x = 2;
		x.times(function(i){
			now.push(Fx.compute(from[i], to[i], delta));
		});
		return now;
	},

	start: function(x, y){
		if (!this.check(arguments.callee, x, y)) return this;
		var offsetSize = this.element.getSize(), scrollSize = this.element.getScrollSize();
		var scroll = this.element.getScroll(), values = {x: x, y: y};
		for (var z in values){
			var max = scrollSize[z] - offsetSize[z];
			if ($chk(values[z])) values[z] = ($type(values[z]) == 'number') ? values[z].limit(0, max) : max;
			else values[z] = scroll[z];
			values[z] += this.options.offset[z];
		}
		return this.parent([scroll.x, scroll.y], [values.x, values.y]);
	},

	toTop: function(){
		return this.start(false, 0);
	},

	toLeft: function(){
		return this.start(0, false);
	},

	toRight: function(){
		return this.start('right', false);
	},

	toBottom: function(){
		return this.start(false, 'bottom');
	},

	toElement: function(el){
		var position = $(el).getPosition(this.element);
		return this.start(position.x, position.y);
	}

});
