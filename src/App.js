import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Main_Page from "./containers/OTHER/MainContaioner";
import Agressment from "./containers/OTHER/AgressmentContainer";
import Register_Page from "./containers/OTHER/RegisterContainer";
import Login_Page from "./containers/OTHER/LoginContainer";
import Profile_Page from './containers/OTHER/ProfileContainer';

import Companyregist_Page from './containers/OTHER/BtnContainer';
import Hotelslist_Page from './containers/BUSINESS/HotelsContainser';
import Hotelsregist_Page from './containers/BUSINESS/HotelRegistContainer';
import Hotelroom_Page from './containers/BUSINESS/HotelRoomContainer';
import Uhotellist from './containers/USER/HotellistContainer';
import Uroomlist_Page from './containers/USER/UserRLContianer';
import Uroominfo_Page from './containers/USER/UserRInforContainer';
import Reservation_Page from './containers/USER/RoomreservationContainer';
import UserRes_Page from './containers/USER/UserReservInfoContainer';
import Customer_Page from './containers/CUSTOMER/CustomerContainer';


class App extends Component {
  render() {
    
    return (
      <div>
        <Router  >
          <Switch>
          <Route exact path={"/"} component={Main_Page} />
          <Route  path={"/agressment"} component={Agressment} />
          <Route  path={"/register"} component={Register_Page} />
          <Route  path={"/login"} component={Login_Page} />
          <Route  path={"/profile"} component={Profile_Page} />
          <Route  path={"/Companyregist"} component={Companyregist_Page} />
          <Route  path={"/Company/:key1"} component={Hotelslist_Page} />
          <Route  path={"/HotelRegist"} component={Hotelsregist_Page} />
          <Route  path={"/Room/:key1"} component={Hotelroom_Page} />
          <Route  path={"/list/:key1"} component={Uhotellist} />
          <Route path={"/hotel/rooms/:key1"} component={Uroomlist_Page} />
          <Route path={"/hotel/room_info/:id"} component={Uroominfo_Page} />
          <Route path={"/reserv"} component={Reservation_Page} />
          <Route path={"/userReservation"} component={UserRes_Page} />
          <Route path={"/Customer"} component={Customer_Page} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
