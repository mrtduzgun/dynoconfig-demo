

(function(angular) {

	'use strict';

	angular
		.module('va.filters', [])
		.filter('crop', function () {
			return function (text, maxLength, glue) {
				var urlLen = text.length;
				glue = glue || '...';

				if (maxLength > 3 && maxLength < urlLen) {
					var len = maxLength - glue.length;
					text = text.substr(0, Math.floor(len * 0.5)) + glue + text.substr(len - 1, Math.floor(maxLength * 0.5));
				}

				return url;
			};
		})
		.filter('epochToDate', function () { // lang is only supports "en" and "tr" languages
			return function (date, lang) {

				if (!date)
					return '-';

				var format = 'MM/DD/YYYY - HH:mm:ss';

				if (lang == 'tr')
					format = 'DD/MM/YYYY - HH:mm:ss';

				return moment.unix(date / 1000).format(format);
			};
		})
		.filter('dateDiff', function () { //
			return function (startDate, endDate) {
				if (startDate && endDate)
					return moment.utc(moment(endDate).diff(moment(startDate))).format("mm");
				return '-';
			};
		})
	;

})(angular);