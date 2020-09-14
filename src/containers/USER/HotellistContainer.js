import React , {Component} from 'react';
import {connect} from 'react-redux';
import HotellistPage from '../../components/user/hotel';
import HeaderPage from "../../components/header/header";
import FooterPage from "../../components/footer/footer";
import {getHootelslist, clean,location_change, kindchange, search_value_change} from '../../store/moudules/USER/UserHotelList';


class HotellistContainer extends Component {
    
    componentDidMount(){
        console.log("componentDidMount");
        this.getHotellist();
    }

    componentWillUnmount(){

      
        const {clean}= this.props;
        clean();
    }

    componentDidUpdate(prevProps){
          const { params } = this.props.match;
          let sectors = params.key1;
      
          if (this.props.kind !==  prevProps.kind) {
            this.props.clean();
        this.getHotellist();
            }else if(this.props.kind !== sectors){
                this.props.clean();
                this.getHotellist();
            }
            
            console.log("componentDidUpdate33333");
    }

    //호텔목록
    getHotellist =()=>{
        const {getHootelslist}= this.props;
        const { params } = this.props.match;
        const param = new URLSearchParams();
        const config = {
            headers: {
              "content-type": "application/json",
            },
          };
        if (params.key1 !== null) {
            param.append("kind", params.key1);
            this.props.kindchange(params.key1);
            getHootelslist(param, config);
        }
    }


    handlelocation=(name)=> {
        const {location_change}= this.props;

       
         location_change(name);
    }

    handleValueChange =(e)=> {

        const{name, value}= e.target;
        const {search_value_change}= this.props; 

        search_value_change({key:name, value})
    }

    render(){


        const {user_hotels_list, hotel_image , hotel_location, search_text}=this.props;

        return(
            <div>
            <HeaderPage/>

            <HotellistPage 
            hotel_image={hotel_image} 
            user_hotels_list={user_hotels_list} 
            hotel_location={hotel_location} 
            onLocation_change={this.handlelocation}
            search_text={search_text}
            valueChange={this.handleValueChange}
             />
             <FooterPage />

            </div>
        )
    }
}

const mapStateToProps =(state)=> ({
    user_hotels_list: state.UserHotellist.user_hotels_list,
    hotel_location: state.UserHotellist.hotel_location,
    hotel_image: state.UserHotellist.hotel_image,
    search_keyword: state.UserHotellist.search_keyword,
    kind: state.UserHotellist.kind,
    search_text: state.UserHotellist.search_text
});
const mapDispatchToProps ={
    getHootelslist,
    clean,
    location_change,
    kindchange,
    search_value_change
}



export default connect(mapStateToProps, mapDispatchToProps )(HotellistContainer);