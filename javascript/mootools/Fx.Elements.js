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
Script: Fx.Elements.js
	Effect to change any number of CSS properties of any number of Elements.

License:
	MIT-style license.
*/

Fx.Elements = new Class({

	Extends: Fx.CSS,

	initialize: function(elements, options){
		this.elements = this.subject = $$(elements);
		this.parent(options);
	},

	compute: function(from, to, delta){
		var now = {};
		for (var i in from){
			var iFrom = from[i], iTo = to[i], iNow = now[i] = {};
			for (var p in iFrom) iNow[p] = this.parent(iFrom[p], iTo[p], delta);
		}
		return now;
	},

	set: function(now){
		for (var i in now){
			var iNow = now[i];
			for (var p in iNow) this.render(this.elements[i], p, iNow[p], this.options.unit);
		}
		return this;
	},

	start: function(obj){
		if (!this.check(arguments.callee, obj)) return this;
		var from = {}, to = {};
		for (var i in obj){
			var iProps = obj[i], iFrom = from[i] = {}, iTo = to[i] = {};
			for (var p in iProps){
				var parsed = this.prepare(this.elements[i], p, iProps[p]);
				iFrom[p] = parsed.from;
				iTo[p] = parsed.to;
			}
		}
		return this.parent(from, to);
	}

});