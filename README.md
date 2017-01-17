# react-calendar-material

This component borrows heavily from the material design of google. While it is not a 1-1 look, it looks very similar to the one used in Android.

### Screenshots

_base look_
![Base look](https://github.com/icarus-sullivan/react-calendar-material/blob/master/images/base.jpg)

_selection_
![Base look](https://github.com/icarus-sullivan/react-calendar-material/blob/master/images/selection.jpg)

_no header_
![Base look](https://github.com/icarus-sullivan/react-calendar-material/blob/master/images/no-header.jpg)

_horizontal_
![Base look](https://github.com/icarus-sullivan/react-calendar-material/blob/master/images/horizontal.jpg)


### Installation
```
npm install --save react-calendar-material
```

### Options
The current list of propTypes.

 - **_accentColor (String)_** - the theme color of the calendar
 - **_orientation_ (String)** - whether to show the calendar to the right of the header or below it
	 - **_'flex-row'_** show the calendar after the date
	 - **_'flex-col'_** show the calendar below the date
 - **_showHeader (Boolean)_** - whether to show the header for the calendar
 - **_onDatePicked (Function)_** - a callback for when a date is picked

### Usage

The following example shows a use case to test for valid data. Provided are some dummy form data, and a schema to check against.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar-material';

ReactDOM.render(
  <Calendar
    accentColor={'blue'}
    orientation={'flex-col'}
    showHeader={false}
    onDatePicked={(d) => {
      console.log('onDatePicked', d);
    }}/>,
  document.getElementById('root')
);

```
