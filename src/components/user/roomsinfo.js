import React, {Component} from 'react';
import Calendar from "react-date-range-calendar";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import '../css/calendar/dialog.css';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import '../css/user/roomsinfo.css';
import MapContent from '../daum/MapContent';
import {Link} from 'react-router-dom';
import moment from 'moment';


class roomsinfo extends Component {

  componentWillUnmount(){
    console.log("unmount")
  }
  state ={
    disabledates:[]
  }
  createMarkup = () => {
    return { __html: this.props.room_info };
  };
  createMarkup_reserv = () => {
    return { __html: this.props.reservation_notice };
  };

  createMarkup_cancel = () => {
    return { __html: this.props.cancellation_policy };
  };
  getDates=(startDate, stopDate) => {
    let dateArray = [];
    let currentDate = moment(startDate);
    let stopDt = moment(stopDate);
    while (currentDate <= stopDt) {
        dateArray.Push( moment(currentDate).format('YYYY-MM-DD') )
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
}
  
render(){

    const {start_Date, end_Date, selectdays, imgfiles, calendarmodal,onModalopen, onModalclose,reserv_days, reserv_data, room_id,
      room_name,
      hotel_name,
      check_in,
      check_out,
      price,
      hotel_id,
      address} =this.props;
    return(
<div className="info_view_div" >

<div class="f1e5lflt" style={{paddingBottom:"1px"}}>
    <header class="_32XMb4">
        <h2><span class="_3AzxJQ">{room_name}</span></h2>
    </header>
    <section class="glQsXM">
    <Carousel showThumbs={false}>
        {imgfiles &&imgfiles.map((image, i)=> (
            <span class="_7vbhSS">
            <img className="room_info_img" key={i} alt=""  src={image} />
            </span>
        ))}
    </Carousel>
    </section>

    <div class="f7sw4ne">
    <Dialog className="res_calrandal_modal" style={{width: "100%"}}
     
           open={calendarmodal}
        >
          <DialogTitle>체크인 / 체크아웃</DialogTitle>
          <DialogContent>
<Calendar 
disablePrevDates= {true}
onChange={(selectedDate) => {
  if(this.props.setDate === false){
        this.props.setStartdate(selectedDate)
      }else{
        this.props.setEnddate(selectedDate)
      }}}
onSelect= {(startDate, endDate,validDateRange ) => { 


  const moment = require('moment');
  const date1 = moment(endDate);
  const date2 = moment(startDate);
  const date3 = date1.diff(date2, 'days');



  selectdays(validDateRange);

}}
selectedRange= {[start_Date,end_Date]}


disabledDates= {() => {return reserv_data === ""? []:reserv_data }} 


/>
</DialogContent>
<DialogActions>

            <Link style={{filter:"invert(0%)"}} to={"/reserv?HOTEL_NM="+hotel_name+"&ROOM_NM="+room_name+"&CHECK_IN="+start_Date+"&CHECK_OUT="+end_Date+"&PRICE="+price+"&ROOM_ID="+room_id+"&HOTEL_ID="+hotel_id+"&RESERV_DAYS="+reserv_days}>

            <Button
              variant="contained"
              color="primary"
              onClick={onModalclose}
            >예약하기
            </Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              onClick={onModalclose}
            >닫기
            </Button>
          </DialogActions>
        </Dialog>

        <div class="SZOH9J">
          <button onClick={onModalopen} class="_1tgxO7 _3zO7ol" as="button">
            <span class="UGW3mj">날짜 선택 및 예약</span>
          </button>
        </div>
    </div>
    <section class="_3Y1nYu">
        <ul class="_5WZGV9">
            <li class="_2DgjOm"><h4>숙박</h4>
                <div class="_1SOuA3">
                    <span>
                        <strong>체크인</strong>
                        <em>{check_in} 부터</em>
                    </span>
                    <span>
                        <strong>체크아웃</strong>
                        <em>{check_out} 까지</em>
                    </span>
                </div>
                <div>
                    <div class="_1hjo1x fgk86s8">
                        <span class="price">
                        {price}<small>원</small>
                        </span>
                    </div>
                </div>
            </li>
        </ul>
    </section>
    <section class="_3t9Fdw">
        <h3>기본정보</h3>

 
<span className="InnerHtml" style={{fontSize:"medium"}}
  dangerouslySetInnerHTML={this.createMarkup()}
/>
    </section>
    <section class="_3t9Fdw">
        <h3>예약공지</h3>
        <span className="InnerHtml" style={{fontSize:"medium"}}
  dangerouslySetInnerHTML={this.createMarkup_reserv()}
/>
    </section>
    <section class="_3t9Fdw">
        <h3>취소규정</h3>
        <span className="InnerHtml" style={{fontSize:"medium"}}
  dangerouslySetInnerHTML={this.createMarkup_cancel()}
/>
    </section>
<div  className="daumMap_div">
<MapContent className="daumMap" address={address}/>
</div>
</div>
        </div>
    )
}

}

export default roomsinfo;