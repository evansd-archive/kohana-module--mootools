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
Script: Scroller.js
	Class which scrolls the contents of any Element (including the window) when the mouse reaches the Element's boundaries.

License:
	MIT-style license.
*/

var Scroller = new Class({

	Implements: [Events, Options],

	options: {
		area: 20,
		velocity: 1,
		onChange: function(x, y){
			this.element.scrollTo(x, y);
		}
	},

	initialize: function(element, options){
		this.setOptions(options);
		this.element = $(element);
		this.listener = ($type(this.element) != 'element') ? $(this.element.getDocument().body) : this.element;
		this.timer = null;
		this.coord = this.getCoords.bind(this);
	},

	start: function(){
		this.listener.addEvent('mousemove', this.coord);
	},

	stop: function(){
		this.listener.removeEvent('mousemove', this.coord);
		this.timer = $clear(this.timer);
	},

	getCoords: function(event){
		this.page = (this.listener.get('tag') == 'body') ? event.client : event.page;
		if (!this.timer) this.timer = this.scroll.periodical(50, this);
	},

	scroll: function(){
		var size = this.element.getSize(), scroll = this.element.getScroll(), pos = this.element.getPosition(), change = {'x': 0, 'y': 0};
		for (var z in this.page){
			if (this.page[z] < (this.options.area + pos[z]) && scroll[z] != 0)
				change[z] = (this.page[z] - this.options.area - pos[z]) * this.options.velocity;
			else if (this.page[z] + this.options.area > (size[z] + pos[z]) && size[z] + size[z] != scroll[z])
				change[z] = (this.page[z] - size[z] + this.options.area - pos[z]) * this.options.velocity;
		}
		if (change.y || change.x) this.fireEvent('change', [scroll.x + change.x, scroll.y + change.y]);
	}

});