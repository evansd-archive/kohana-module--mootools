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
Script: Hash.Cookie.js
	Class for creating, reading, and deleting Cookies in JSON format.

License:
	MIT-style license.
*/

Hash.Cookie = new Class({

	Extends: Cookie,

	options: {
		autoSave: true
	},

	initialize: function(name, options){
		this.parent(name, options);
		this.load();
	},

	save: function(){
		var value = JSON.encode(this.hash);
		if (!value || value.length > 4096) return false; //cookie would be truncated!
		if (value == '{}') this.dispose();
		else this.write(value);
		return true;
	},

	load: function(){
		this.hash = new Hash(JSON.decode(this.read(), true));
		return this;
	}

});

Hash.Cookie.implement((function(){
	
	var methods = {};
	
	Hash.each(Hash.prototype, function(method, name){
		methods[name] = function(){
			var value = method.apply(this.hash, arguments);
			if (this.options.autoSave) this.save();
			return value;
		};
	});
	
	return methods;
	
})());