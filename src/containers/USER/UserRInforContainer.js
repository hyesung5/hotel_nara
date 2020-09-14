import React, {Component} from 'react';
import {connect} from 'react-redux';
import HeaderPage from "../../components/header/header";
import RoomsInfoPage from '../../components/user/roomsinfo';
import FooterPage from "../../components/footer/footer";
import {getRoominfoData,
    seletedstartdate,
    seletedenddate,
    selectdays,
    calendaropen,
    calendarclose,
    cleaninfo,
    getReservinfoData
} from '../../store/moudules/USER/UserRoomInfo';



class UserRInforContainer extends Component {

    componentDidMount(){
        const { params } = this.props.match;
    if(params.id !== null){
        this.getRoomData(params.id);
    }

    }

    componentWillUnmount(){

        const {cleaninfo}= this.props;
        cleaninfo();
    }

    getRoomData = (id)=> {
        const param = new URLSearchParams();
        param.append('room_id', id)
        const config = {
            headers: {
              "content-type": "application/json",
            },
          };
         const {getRoominfoData, getReservinfoData} = this.props;
         getRoominfoData(param, config);
         getReservinfoData(param, config);
    }


    setStartdate =(startDate) => {
        const {seletedstartdate}= this.props;
        seletedstartdate(startDate);

    }

    setEnddate =(endDate) => {
        const {seletedenddate}= this.props;
        seletedenddate(endDate);
    }
    
    render(){

        const {room_data, startDate, endDate,setDate,selectdays,imgfiles,calendarmodal,calendaropen,calendarclose, 
            cleaninput,reserv_days, reserv_data,
            room_id,
            room_name,
            hotel_name,
            room_info,
            reservation_notice,
            cancellation_policy,
            check_in,
            check_out,
            price,
            reg_date,
            hotel_id,
            location,
            accommodation_type,
            address} = this.props;
        return (
          <div>
            <HeaderPage />
            <div style={{ width: "100%" }}>
              <RoomsInfoPage
                room_data={room_data}
                start_Date={startDate}
                end_Date={endDate}
                setDate={setDate}
                imgfiles={imgfiles}
                calendarmodal={calendarmodal}
                reserv_days={reserv_days}
                reserv_data={reserv_data}
                room_id={room_id}
                room_name={room_name}
                hotel_name={hotel_name}
                room_info={room_info}
                reservation_notice={reservation_notice}
                cancellation_policy={cancellation_policy}
                check_in={check_in}
                check_out={check_out}
                price={price}
                reg_date={reg_date}
                hotel_id={hotel_id}
                location={location}
                accommodation_type={accommodation_type}
                address={address}
                setStartdate={this.setStartdate}
                setEnddate={this.setEnddate}
                selectdays={selectdays}
                onModalopen={calendaropen}
                onModalclose={calendarclose}
                cleaninput={cleaninput}
              />
            </div>
            <FooterPage />
          </div>
        );
    }

}

const mapStateToProps =(state)=> ({
    room_data: state.UserRoomInfo.room_data,
    startDate:state.UserRoomInfo.startDate,
    endDate:state.UserRoomInfo.endDate,
    setDate:state.UserRoomInfo.setDate,
    calendarmodal: state.UserRoomInfo.calendarmodal,
    imgfiles: state.UserRoomInfo.imgfiles,
    reserv_days:state.UserRoomInfo.reserv_days,
    reserv_data:state.UserRoomInfo.reserv_data,
    room_id:state.UserRoomInfo.room_id,
    room_name:state.UserRoomInfo.room_name,
    hotel_name:state.UserRoomInfo.hotel_name,
    room_info:state.UserRoomInfo.room_info,
    reservation_notice:state.UserRoomInfo.reservation_notice,
    cancellation_policy:state.UserRoomInfo.cancellation_policy,
    check_in:state.UserRoomInfo.check_in,
    check_out:state.UserRoomInfo.check_out,
    price:state.UserRoomInfo.price,
    reg_date:state.UserRoomInfo.reg_date,
    hotel_id:state.UserRoomInfo.hotel_id,
    location:state.UserRoomInfo.location,
    accommodation_type:state.UserRoomInfo.accommodation_type,
    address:state.UserRoomInfo.address

});

const mapDispatchToProps ={
    getRoominfoData,
    seletedstartdate,
    seletedenddate,
    selectdays,
    calendaropen,
    calendarclose,
    cleaninfo,
    getReservinfoData
};


export default connect(mapStateToProps, mapDispatchToProps)(UserRInforContainer);