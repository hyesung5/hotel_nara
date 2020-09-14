import {combineReducers} from 'redux';
import Main from './OTHER/Main';
import Agressment from './OTHER/Agressment';
import Regist from './OTHER/Regist';
import Login from './OTHER/Login';
import Header from './OTHER/Header';
import Profile from './OTHER/Profile';
import Hotelregist from './BUSINESS/Hotelregist';
import HotelList from './BUSINESS/Hotels';
import HotelRoom from './BUSINESS/HotelRoom';
import UserHotellist from './USER/UserHotelList';
import UserHotelRooms from './USER/UserHotelrooms';
import UserRoomInfo from './USER/UserRoomInfo';
import UserReserVation from './USER/UserRevation'; 
import UserResInfor from './USER/UserReservationInfo';
import Customer from './CUSTOMER/Customers';


export default combineReducers ({
    Main,
    Agressment,
    Regist,
    Login,
    Header,
    Profile,
    Hotelregist,
    HotelList,
    HotelRoom,
    UserHotellist,
    UserHotelRooms,
    UserRoomInfo,
    UserReserVation,
    UserResInfor,
    Customer
    
})