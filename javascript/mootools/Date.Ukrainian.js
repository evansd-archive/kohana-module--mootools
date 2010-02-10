//= require "Lang"

/*
---

script: Date.Ukrainian.js

description: Date messages for Ukrainian.

license: MIT-style license

authors:
- Slik

requires:
- /Lang
- /Date

provides: [Date.Ukrainian]

...
*/

(function(){
	var pluralize = function(n, one, few, many, other){
		var d = (n / 10).toInt();
		var z = n % 10;
		var s = (n / 100).toInt();

		if(d == 1 && n > 10) return many;
		if(z == 1) return one;
		if(z > 0 && z < 5) return few;
		return many;
	};

	MooTools.lang.set('uk-UA', 'Date', {
			months: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
			days: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'],
			//culture's date order: DD/MM/YYYY
			dateOrder: ['date', 'month', 'year'],
			AM: 'до полудня',
			PM: 'по полудню',

			shortDate: '%d/%m/%Y',
			shortTime: '%H:%M',

			/* Date.Extras */
			ordinal: '',
			lessThanMinuteAgo: 'меньше хвилини тому',
			minuteAgo: 'хвилину тому',
			minutesAgo: function (delta){
				return '{delta} ' + pluralize(delta, 'хвилину', 'хвилини', 'хвилин') + ' тому';
			},
			hourAgo: 'годину тому',
			hoursAgo: function (delta){
				return '{delta} ' + pluralize(delta, 'годину', 'години', 'годин') + ' тому';
			},
			dayAgo: 'вчора',
			daysAgo: function (delta){
				return '{delta} ' + pluralize(delta, 'день', 'дня', 'днів') + ' тому';
			},
			weekAgo: 'тиждень тому',
			weeksAgo: function (delta){
				return '{delta} ' + pluralize(delta, 'тиждень', 'тижні', 'тижнів') + ' тому';
			},
			monthAgo: 'місяць тому',
			monthsAgo: function (delta){
				return '{delta} ' + pluralize(delta, 'місяць', 'місяці', 'місяців') + ' тому';
			},
			yearAgo: 'рік тому',
			yearsAgo: function (delta){
				return '{delta} ' + pluralize(delta, 'рік', 'роки', 'років') + ' тому';
			},
			lessThanMinuteUntil: 'за мить',
			minuteUntil: 'через хвилину',
			minutesUntil: function (delta){
				return 'через {delta} ' + pluralize(delta, 'хвилину', 'хвилини', 'хвилин');
			},
			hourUntil: 'через годину',
			hoursUntil: function (delta){
				return 'через {delta} ' + pluralize(delta, 'годину', 'години', 'годин');
			},
			dayUntil: 'завтра',
			daysUntil: function (delta){
				return 'через {delta} ' + pluralize(delta, 'день', 'дня', 'днів');
			},
			weekUntil: 'через тиждень',
			weeksUntil: function (delta){
				return 'через {delta} ' + pluralize(delta, 'тиждень', 'тижні', 'тижнів');
			},
			monthUntil: 'через місяць',
			monthesUntil: function (delta){
				return 'через {delta} ' + pluralize(delta, 'місяць', 'місяці', 'місяців');
			},
			yearUntil: 'через рік',
			yearsUntil: function (delta){
				return 'через {delta} ' + pluralize(delta, 'рік', 'роки', 'років');
			}
	});

})();