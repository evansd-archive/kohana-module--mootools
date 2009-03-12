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
Script: Assets.js
	Provides methods to dynamically load JavaScript, CSS, and Image files into the document.

License:
	MIT-style license.
*/

var Asset = new Hash({

	javascript: function(source, properties){
		properties = $extend({
			onload: $empty,
			document: document,
			check: $lambda(true)
		}, properties);

		var script = new Element('script', {'src': source, 'type': 'text/javascript'});

		var load = properties.onload.bind(script), check = properties.check, doc = properties.document;
		delete properties.onload; delete properties.check; delete properties.document;

		script.addEvents({
			load: load,
			readystatechange: function(){
				if (['loaded', 'complete'].contains(this.readyState)) load();
			}
		}).setProperties(properties);


		if (Browser.Engine.webkit419) var checker = (function(){
			if (!$try(check)) return;
			$clear(checker);
			load();
		}).periodical(50);

		return script.inject(doc.head);
	},

	css: function(source, properties){
		return new Element('link', $merge({
			'rel': 'stylesheet', 'media': 'screen', 'type': 'text/css', 'href': source
		}, properties)).inject(document.head);
	},

	image: function(source, properties){
		properties = $merge({
			'onload': $empty,
			'onabort': $empty,
			'onerror': $empty
		}, properties);
		var image = new Image();
		var element = $(image) || new Element('img');
		['load', 'abort', 'error'].each(function(name){
			var type = 'on' + name;
			var event = properties[type];
			delete properties[type];
			image[type] = function(){
				if (!image) return;
				if (!element.parentNode){
					element.width = image.width;
					element.height = image.height;
				}
				image = image.onload = image.onabort = image.onerror = null;
				event.delay(1, element, element);
				element.fireEvent(name, element, 1);
			};
		});
		image.src = element.src = source;
		if (image && image.complete) image.onload.delay(1);
		return element.setProperties(properties);
	},

	images: function(sources, options){
		options = $merge({
			onComplete: $empty,
			onProgress: $empty
		}, options);
		if (!sources.push) sources = [sources];
		var images = [];
		var counter = 0;
		sources.each(function(source){
			var img = new Asset.image(source, {
				'onload': function(){
					options.onProgress.call(this, counter, sources.indexOf(source));
					counter++;
					if (counter == sources.length) options.onComplete();
				}
			});
			images.push(img);
		});
		return new Elements(images);
	}

});