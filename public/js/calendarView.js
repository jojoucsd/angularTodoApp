'use strict';

angular.module('basic-auth.calendar', [])
  .directive('calendar', function (){
    return {
        restrict: "E",
        templateUrl: "templates/_calendarView.html",
        replace: false,
        scope: {
            selected: "=",
        },
        link: function(scope) {
            scope.selected = _removeTime(scope.selected || moment());
            scope.month = scope.selected.clone();

            var start = scope.selected.clone().startOf('day'); 
            start.date(1);
            _removeTime(start.day(0));

            _buildMonth(scope, start, scope.month);

            scope.select = function(day) {
                scope.selected = day.date.format("YYYY-MM-DD");
                // scope.selected = day.date
                scope.addDate =function (){
                    var date = "Date Customer picked by Directive";
                    scope.add({ date: date})
                }
                console.log('selected', day.date._d) 
            };

            scope.next = function() {
                var next = scope.month.clone();
                _removeTime(next.month(next.month()+1).date(1).day(0));
                scope.month.month(scope.month.month()+1);
                _buildMonth(scope, next, scope.month);
            };

            scope.previous = function() {
                var previous = scope.month.clone();
                _removeTime(previous.month(previous.month()-1).date(1).day(0));
                scope.month.month(scope.month.month()-1);
                _buildMonth(scope, previous, scope.month);
            };
        }
    };

    function _removeTime(date) {
        // console.log('date', date._i);
        return moment(date);
        // return date.day(0).hour(0).minute(0).second(0).millisecond(0);
        // console.log("date", date)
        // console.log('removeTime', date.startOf('day'));
        // return date.startOf('day');
    }

    function _buildMonth(scope, start, month) {
        scope.weeks = [];
        var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
        while (!done) {
            scope.weeks.push({ days: _buildWeek(date.clone(), month) });
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
    }

    function _buildWeek(date, month) {
        var days = [];
        for (var i = 0; i < 7; i++) {
            days.push({
                name: date.format("DD").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date
            });
            date = date.clone();
            date.add(1, "d");
        }
        return days;
    }
  });
