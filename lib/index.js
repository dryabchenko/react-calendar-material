'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./index.css');

var _ic_back = require('./ic_back.svg');

var _ic_back2 = _interopRequireDefault(_ic_back);

var _ic_forward = require('./ic_forward.svg');

var _ic_forward2 = _interopRequireDefault(_ic_forward);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var config = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  month_subs: ['Jan', 'Feb', 'Apr', 'Mar', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
  weeks: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  week_subs: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
  today: function today() {
    return new Date();
  }
};
var TODAY = config.today();

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    _this.prevYear = function () {
      _this.updateYear(-1);
    };

    _this.nextYear = function () {
      _this.updateYear(1);
    };

    _this.prev = function () {
      _this.updateMonth(-1);
    };

    _this.next = function () {
      _this.updateMonth(1);
    };

    var currentDate = props.value ? new Date(props.value) : config.today();
    _this.state = {
      current: currentDate,
      selected: currentDate,
      ldom: 30
    };
    return _this;
  }

  _createClass(Calendar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.updateMonth(0);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var value = this.props.value;

      if (value && prevProps.value !== value) {
        this.setState({
          current: new Date(value),
          selected: new Date(value)
        });
      }
    }
  }, {
    key: 'updateYear',
    value: function updateYear(add) {
      var d = this.state.current;
      d.setYear(d.getFullYear() + add);
      var eom = new Date(d.getYear(), d.getMonth() + 1, 0).getDate();
      this.setState({
        current: d,
        ldom: eom
      });
    }
  }, {
    key: 'updateMonth',
    value: function updateMonth(add) {
      var d = this.state.current;
      d.setMonth(d.getMonth() + add);
      var eom = new Date(d.getYear(), d.getMonth() + 1, 0).getDate();
      this.setState({
        current: d,
        ldom: eom
      });
    }
  }, {
    key: '_onDatePicked',
    value: function _onDatePicked(month, day) {
      var d = new Date(this.state.current.getTime());
      d.setMonth(d.getMonth() + month);
      d.setDate(day);
      this.props.onDatePicked(d);
      this.setState({
        selected: d
      });
    }
  }, {
    key: 'renderDay',
    value: function renderDay() {
      var _this2 = this;

      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var baseClasses = "day noselect";
      var today = "";
      var todayStyle = {};
      var containerStyle = {};
      if (opts.today) {
        today = "current";
        todayStyle = {
          borderColor: this.props.accentColor + ' !important'
        };
      }

      var selected = "";
      var selectedStyle = {};
      if (opts.selected) {
        selected = "selected";
        selectedStyle = {
          backgroundColor: this.props.accentColor + ' !important'
        };
        containerStyle = {
          color: '#ffffff'
        };
      }

      baseClasses += opts.current ? "" : " non-current";

      return _react2.default.createElement(
        'div',
        { className: baseClasses, style: containerStyle },
        _react2.default.createElement('div', { className: today, style: todayStyle }),
        _react2.default.createElement('div', { className: selected, style: selectedStyle }),
        _react2.default.createElement(
          'div',
          { className: 'day',
            onClick: function onClick(ev) {
              var day = ev.target.innerHTML;
              _this2._onDatePicked(opts.month, day);
            } },
          opts.date.getDate()
        )
      );
    }
  }, {
    key: 'renderDays',
    value: function renderDays(copy) {
      var days = [];

      // set to beginning of month
      copy.setDate(1);

      // if we are missing no offset, include the previous week
      var offset = copy.getDay() === 0 ? 7 : copy.getDay();

      copy.setDate(-offset);

      var inMonth = false;
      var lastMonth = true;
      for (var i = 0; i < 42; i++) {
        // increase date
        copy.setDate(copy.getDate() + 1);

        // make sure we pass any previous month values
        if (i < 30 && copy.getDate() === 1) {
          inMonth = true;
          lastMonth = false;
        }
        // if we are seeing the '1' again, we have iterated over
        // the current month
        else if (i > 30 && copy.getDate() === 1) {
            inMonth = false;
          }

        var sel = new Date(this.state.selected.getTime());
        var isSelected = sel.getFullYear() === copy.getFullYear() && sel.getDate() === copy.getDate() && sel.getMonth() === copy.getMonth();

        var isToday = TODAY.getFullYear() === copy.getFullYear() && TODAY.getDate() === copy.getDate() && TODAY.getMonth() === copy.getMonth();

        days.push(this.renderDay({
          today: isToday,
          selected: isSelected,
          current: inMonth,
          month: inMonth ? 0 : lastMonth ? -1 : 1,
          date: copy
        }));
      }

      return days;
    }
  }, {
    key: 'renderHeaders',
    value: function renderHeaders() {
      var header = [];

      for (var i = 0; i < config.week_subs.length; i++) {
        header.push(_react2.default.createElement(
          'p',
          { className: 'day-headers noselect' },
          config.week_subs[i]
        ));
      }

      return header;
    }
  }, {
    key: 'render',
    value: function render() {
      // get su-sat header
      var header = this.renderHeaders();

      // copy our current time state
      var copy = new Date(this.state.current.getTime());

      // get the month days
      var days = this.renderDays(copy);

      var tMonth = config.months[this.state.selected.getMonth()];
      var tDate = this.state.selected.getDate();
      var tYear = this.state.selected.getFullYear();
      var month = config.months[this.state.current.getMonth()];
      var year = this.state.current.getFullYear();
      // var date = this.state.current.getDate();

      var upperDate = null;
      if (this.props.showHeader) {
        upperDate = _react2.default.createElement(
          'div',
          { className: 'flex-2 header center', style: {
              backgroundColor: this.props.accentColor
            } },
          _react2.default.createElement(
            'p',
            { className: 'header-month' },
            tYear
          ),
          _react2.default.createElement(
            'p',
            { className: 'header-month' },
            tMonth.toUpperCase()
          ),
          _react2.default.createElement(
            'p',
            { className: 'header-day' },
            tDate
          )
        );
      }
      return _react2.default.createElement(
        'div',
        { className: this.props.orientation },
        upperDate,
        _react2.default.createElement(
          'div',
          { className: 'padding' },
          _react2.default.createElement(
            'div',
            { className: 'year' },
            _react2.default.createElement('img', { className: 'year-arrow-left', src: _ic_back2.default, alt: 'back', onClick: this.prevYear }),
            _react2.default.createElement(
              'p',
              { className: 'year-title' },
              year
            ),
            _react2.default.createElement('img', { className: 'year-arrow-right', src: _ic_forward2.default, alt: 'forward', onClick: this.nextYear })
          ),
          _react2.default.createElement(
            'div',
            { className: 'month' },
            _react2.default.createElement('img', { className: 'month-arrow-left', src: _ic_back2.default, alt: 'back', onClick: this.prev }),
            _react2.default.createElement(
              'p',
              { className: 'month-title' },
              month
            ),
            _react2.default.createElement('img', { className: 'month-arrow-right', src: _ic_forward2.default, alt: 'forward', onClick: this.next })
          ),
          _react2.default.createElement(
            'div',
            { className: 'footer' },
            header,
            days
          )
        )
      );
    }
  }]);

  return Calendar;
}(_react.Component);

;

Calendar.propTypes = {
  accentColor: _propTypes2.default.string,
  onDatePicked: _propTypes2.default.func,
  showHeader: _propTypes2.default.bool,
  orientation: _propTypes2.default.string,
  value: _propTypes2.default.any
};

Calendar.defaultProps = {
  accentColor: '#00C1A6',
  onDatePicked: function onDatePicked() {},
  showHeader: true,
  orientation: 'flex-col',
  value: undefined
};

exports.default = Calendar;