import React, { Component } from 'react';
	}  else  if  (width  <  900  &&  width  >  580)  {
		setNumberOfMonth(2);
	}  else  if  (width  <  580)  {
		setNumberOfMonth(1);
	}
};

const  Day = ({  day  }) => {
	return  (
		<>
			<p  className="date">{day.format('DD')}</p>
			<p  className="date">7</p>
		</>
		);
	};
	
class calendar extends Component {

  onChange = date => console.log(date)

  render() {
    return (
      <ThemeProvider theme={theme}>
        <RangePicker


          handleChange={this.onChange}
		 // selectedDays={['2019-11-06']} //initial selected days
		  jalali={false}
		  numberOfMonths={3}
		  numberOfSelectableDays={3} // number of days you need 
		  //disabledDays={['2019-12-02']} //disabeld days
		  //responsive={handleResponsive} // custom responsive, when using it, `numberOfMonths` props not working
		  disabledBeforToday={true} 
		  disabled={false} // disable calendar 
          dayComponent={Day} //custom day component
        />
      </ThemeProvider>
    );
  }
}

export default calendar;