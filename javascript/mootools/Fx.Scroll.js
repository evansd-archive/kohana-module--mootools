/* <?php echo '*','/';

	$this->requires('mootools/Core.js');
	$this->requires('mootools/Browser.js');
	$this->requires('mootools/Array.js');
	$this->requires('mootools/Function.js');
	$this->requires('mootools/Number.js');
	$this->requires('mootools/String.js');
	$this->requires('mootools/Hash.js');
	$this->requires('mootools/Event.js');
	$this->requires('mootools/Class.js');
	$this->requires('mootools/Class.Extras.js');
	$this->requires('mootools/Element.js');
	$this->requires('mootools/Element.Event.js');
	$this->requires('mootools/Element.Style.js');
	$this->requires('mootools/Element.Dimensions.js');
	$this->requires('mootools/Selectors.js');
	$this->requires('mootools/DomReady.js');
	$this->requires('mootools/JSON.js');
	$this->requires('mootools/Cookie.js');
	$this->requires('mootools/Swiff.js');
	$this->requires('mootools/Fx.js');
	$this->requires('mootools/Fx.CSS.js');
	$this->requires('mootools/Fx.Tween.js');
	$this->requires('mootools/Fx.Morph.js');
	$this->requires('mootools/Fx.Transitions.js');
	$this->requires('mootools/Request.js');
	$this->requires('mootools/Request.HTML.js');
	$this->requires('mootools/Request.JSON.js');

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