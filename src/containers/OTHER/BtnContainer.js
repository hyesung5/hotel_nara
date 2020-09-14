import React,  {Component} from 'react';
import {connect} from 'react-redux';
import CompanyBtn from '../../components/buisness/Companyregistration';
import HeaderPage from "../../components/header/header";

class BtnComponent extends Component {


    HotelRegist = (name) =>{
        this.props.history.push("/Company/"+name);
    }

    RoomRegist = (name) =>{
        console.log("ROOM :", name);
        this.props.history.push("/Room/"+name);
    }
    render(){
        return(
            <div>
                <HeaderPage />
                <CompanyBtn onHotel={this.HotelRegist} onRoom={this.RoomRegist} />
            </div>
        )
    }
}
const mapStateToProps=(state) =>({

});

const mapDispathToProps={

};


export default connect ( mapStateToProps, mapDispathToProps )(BtnComponent);