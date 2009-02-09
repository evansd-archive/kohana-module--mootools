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
Script: Group.js
	Class for monitoring collections of events

License:
	MIT-style license.
*/

var Group = new Class({

	initialize: function(){
		this.instances = Array.flatten(arguments);
		this.events = {};
		this.checker = {};
	},

	addEvent: function(type, fn){
		this.checker[type] = this.checker[type] || {};
		this.events[type] = this.events[type] || [];
		if (this.events[type].contains(fn)) return false;
		else this.events[type].push(fn);
		this.instances.each(function(instance, i){
			instance.addEvent(type, this.check.bind(this, [type, instance, i]));
		}, this);
		return this;
	},

	check: function(type, instance, i){
		this.checker[type][i] = true;
		var every = this.instances.every(function(current, j){
			return this.checker[type][j] || false;
		}, this);
		if (!every) return;
		this.checker[type] = {};
		this.events[type].each(function(event){
			event.call(this, this.instances, instance);
		}, this);
	}

});
