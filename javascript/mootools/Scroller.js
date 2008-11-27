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