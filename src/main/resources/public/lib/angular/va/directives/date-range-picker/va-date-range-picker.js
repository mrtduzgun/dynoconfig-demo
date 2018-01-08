/**
 * @author Murat Duzgun
 * @license ng-bs-daterangepicker v0.0.5
 * @see Luis Farzati http://github.com/luisfarzati/ng-bs-daterangepicker
 * License: MIT
 */
function VADateRangePicker($rootScope) {

	return {
		restrict: 'EA',
		replace: true,
		template: '<div class="table-group-action-input form-control input-inline input-midddle"><i class="fa fa-calendar"></i>&nbsp;<span>{{rangeLabel}}</span><b class="caret"></b></div>',
		scope: {
			conf: '=',
			val: '='
		},
		link: function(scope, $element, $attr) {

			var defaults = {
				maxDate: moment(),
				timePicker: true,
				timePicker24Hour: true,
				opens: 'left',
				locale: {
					format: 'lll' // moment date format
				},
				ranges: {
					'This Hour': ["moment().startOf('hour')", "moment()"],
					'Today': ["moment().startOf('day')", "moment()"],
					'Yesterday': ["moment().subtract(1, 'days').startOf('day')", "moment().subtract(1, 'days').endOf('day')"],
					'This Week': ["moment().startOf('week')", "moment()"],
					'Last Week': ["moment().subtract(1, 'weeks').startOf('week')", "moment().subtract(1, 'weeks').endOf('week')"],
					'This Month': ["moment().startOf('month')", "moment()"],
					'Last Month': ["moment().subtract(1, 'months')", "moment()"],
					'Last 1 Hour': ["moment().subtract(1, 'hours')", "moment()"],
					'Last 12 Hour': ["moment().subtract(12, 'hours')", "moment()"],
					'Last 1 Day': ["moment().subtract(1, 'days')", "moment()"]
				}
			};

			var options = $.extend(true, {}, defaults, scope.conf);
			var rangeFound = false;
			var ngModelVal = scope.val;

			// set initial data as formatted
			for (var range in options.ranges) {
				if (options.ranges.hasOwnProperty(range)) {
					if (options.ranges[range][0] == ngModelVal[0] && options.ranges[range][1] == ngModelVal[1]) {
						setValAsFormatted(ngModelVal[0], ngModelVal[1], range);
						rangeFound = true;
					}
				}
			}

			// convert ranges to moment objects
			var dateRangePickerOptions = $.extend(true, {}, options);

			for (var range in dateRangePickerOptions.ranges) {
				if (dateRangePickerOptions.ranges.hasOwnProperty(range)) {
					dateRangePickerOptions.ranges[range] = [eval(dateRangePickerOptions.ranges[range][0]), eval(dateRangePickerOptions.ranges[range][1])];
				}
			}

			if (!rangeFound) {
				setValAsFormatted(eval(ngModelVal[0]), eval(ngModelVal[1]), null);
			}

			dateRangePickerOptions.startDate = eval(ngModelVal[0]);
			dateRangePickerOptions.endDate = eval(ngModelVal[1]);

			$($element[0]).daterangepicker(dateRangePickerOptions, function(start, end, label) {
				if (options.ranges.hasOwnProperty(label))
					setValAsFormatted(options.ranges[label][0], options.ranges[label][1], label);
				else
					setValAsFormatted(start, end, null);

				scope.$apply();
			});

			function setValAsFormatted(startDate, endDate, label) {

				if (!label) {
					label = startDate.format(options.locale.format) + ' - ' + endDate.format(options.locale.format);
				}

				scope.rangeLabel = label;
				$rootScope.$broadcast('vaDateRange:valChanged', [startDate, endDate], label);
			}

			function consoleLog(str) {
				console.log('VaDateRangePicker: ', str);
			}
		}

	};

}