import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import ic_back from './ic_back.svg';
import ic_forward from './ic_forward.svg';

const config = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  month_subs: ['Jan', 'Feb', 'Apr', 'Mar', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
  weeks: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  week_subs: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
  today: () => new Date(),
}
const TODAY = config.today();

class Calendar extends Component {

  constructor(props) {
    super(props);

    const currentDate = props.value ? new Date(props.value) : config.today();
    this.state = {
      current: currentDate,
      selected: currentDate,
      ldom: 30
    };
  }

  componentWillMount() {
    this.updateMonth(0);
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    if (value && prevProps.value !== value) {
      this.setState({
        current: new Date(value),
        selected: new Date(value),
      });
    }
  }

  updateYear(add) {
    var d = this.state.current;
    d.setYear(d.getFullYear() + add);
    var eom = new Date(d.getYear(), d.getMonth() + 1, 0).getDate();
    this.setState({
      current: d,
      ldom: eom
    });
  }

  updateMonth(add) {
    var d = this.state.current;
    d.setMonth(d.getMonth() + add);
    var eom = new Date(d.getYear(), d.getMonth() + 1, 0).getDate();
    this.setState({
      current: d,
      ldom: eom
    });
  }

  prevYear = () => {
    this.updateYear(-1);
  };

  nextYear = () => {
    this.updateYear(1);
  };

  prev = () => {
    this.updateMonth(-1);
  };

  next = () => {
    this.updateMonth(1);
  };

  _onDatePicked(month, day) {
    var d = new Date(this.state.current.getTime());
    d.setMonth(d.getMonth() + month);
    d.setDate(day);
    this.props.onDatePicked(d);
    this.setState({
      selected: d
    });
  }

  renderDay(opts = {}) {
    var baseClasses = "day noselect";
    var today = "";
    var todayStyle = {};
    var containerStyle = {};
    if (opts.today) {
      today = "current";
      todayStyle = {
        borderColor: `${this.props.accentColor} !important`,
      };
    }

    var selected = "";
    var selectedStyle = {};
    if (opts.selected) {
      selected = "selected";
      selectedStyle = {
        backgroundColor: `${this.props.accentColor} !important`
      }
      containerStyle = {
        color: '#ffffff'
      }
    }

    baseClasses += opts.current ? "" : " non-current";

    return (
      <div className={baseClasses} style={containerStyle}>
        <div className={today} style={todayStyle}></div>
        <div className={selected} style={selectedStyle}></div>
        <div className='day'
          onClick={(ev) => {
            var day = ev.target.innerHTML;
            this._onDatePicked(opts.month, day);
          }}>
          {opts.date.getDate()}
        </div>
      </div>
    );
  }

  renderDays(copy) {
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
      var isSelected = (sel.getFullYear() === copy.getFullYear() &&
        sel.getDate() === copy.getDate() &&
        sel.getMonth() === copy.getMonth());

      var isToday = (TODAY.getFullYear() === copy.getFullYear() &&
        TODAY.getDate() === copy.getDate() &&
        TODAY.getMonth() === copy.getMonth());

      days.push(this.renderDay({
        today: isToday,
        selected: isSelected,
        current: inMonth,
        month: (inMonth ? 0 : (lastMonth ? -1 : 1)),
        date: copy
      }));
    }

    return days;
  }

  renderHeaders() {
    var header = [];

    for (var i = 0; i < config.week_subs.length; i++) {
      header.push(<p className='day-headers noselect'>
        {config.week_subs[i]}
      </p>);
    }

    return header;
  }

  render() {
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
      upperDate = (<div className='flex-2 header center' style={{
        backgroundColor: this.props.accentColor
      }}>
        <p className="header-month">{tYear}</p>
        <p className="header-month">{tMonth.toUpperCase()}</p>
        <p className="header-day">{tDate}</p>
      </div>);
    }
    return (<div className={this.props.orientation}>
      {upperDate}
      <div className="padding">
        <div className='year'>
          <img className="year-arrow-left" src={ic_back} alt="back" onClick={this.prevYear}></img>
          <p className="year-title">{year}</p>
          <img className="year-arrow-right" src={ic_forward} alt="forward" onClick={this.nextYear}></img>
        </div>
        <div className='month'>
          <img className="month-arrow-left" src={ic_back} alt="back" onClick={this.prev}></img>
          <p className="month-title">{month}</p>
          <img className="month-arrow-right" src={ic_forward} alt="forward" onClick={this.next}></img>
        </div>
        <div className='footer'>
          {header}
          {days}
        </div>
      </div>
    </div>);
  }

};

Calendar.propTypes = {
  accentColor: PropTypes.string,
  onDatePicked: PropTypes.func,
  showHeader: PropTypes.bool,
  orientation: PropTypes.string,
  value: PropTypes.any,
};

Calendar.defaultProps = {
  accentColor: '#00C1A6',
  onDatePicked: function () { },
  showHeader: true,
  orientation: 'flex-col',
  value: undefined,
};

export default Calendar;
