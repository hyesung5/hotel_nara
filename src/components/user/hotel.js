import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import InputBase from '@material-ui/core/InputBase';

import '../css/hotels.css';

class hotel extends Component {
render(){
    const{user_hotels_list, onLocation_change, hotel_location, search_text, valueChange }=this.props;

    const filterComponents=(data) => {
      if(search_text === ""){
        data = data.filter((c) => { 
          return c.LOCATION.indexOf(hotel_location) > -1;
        });
      }else{
        data = data.filter((c) => { 
          return c.HOTEL_NAME.indexOf(search_text) > -1;
        });
      }

      return data.map((hotel, i)=>{

       return <div key={i} style={{width: "25%", marginRight:"2px", display:"inline-block", marginBottom:"5px"}}>
        <Link to={"/hotel/rooms/"+hotel.id }>
          <Card>
          <CardHeader
        className="hotel_CardHead"
          avatar={
            <Avatar aria-label="recipe" >
              H
            </Avatar>
          }
          title={hotel.HOTEL_NAME}
          subheader={hotel.ADDRESS1}
        />
        <CardMedia
        className="hotel_CardMedia"
         component="img"
         alt={hotel.HOTEL_NAME+"_thumbnail"}
         src={hotel.THUMBNAIL}
         title={hotel.HOTEL_NAME+"_thumbnail"}
        /> 
            </Card>
            </Link>
        </div>
                    
        })
    }

    return(


        <div  className="user_hotel_list" style={{textAlign:"center", paddingBottom:"20px"}}>

                <div style={{marginBottom:"20px"}}>

         <Button variant="outlined" size="large" color="primary" name="Seoul" onClick={() => { onLocation_change("") }}>
              전체
          </Button>
          <Button variant="outlined" size="large" color="primary" name="Seoul" onClick={() => { onLocation_change("Seoul") }}>
              서울
          </Button>

        
          <Button variant="outlined" size="large" color="primary" onClick={() => { onLocation_change("Gyeonggi") }}>
          경기
          </Button>
      
          <Button variant="outlined" size="large" color="primary" onClick={() => { onLocation_change("Incheon") }}>
          인천
          </Button>
     
          <Button variant="outlined" size="large" color="primary"onClick={() => { onLocation_change("Busan") }}>
          부산
          </Button>
     
          <Button variant="outlined" size="large" color="primary" onClick={() => { onLocation_change("Gangwon") }}>
          강원
          </Button>
  
          <Button variant="outlined" size="large" color="primary" onClick={() => { onLocation_change("Gyeongsang") }}>
          경상
          </Button>
     
          <Button variant="outlined" size="large" color="primary" onClick={() => { onLocation_change("Jeolla") }}>
          전라
          </Button>
    
          <Button variant="outlined" size="large" color="primary" onClick={() => { onLocation_change("Chungcheong") }}>
          충청
          </Button>
    
          <Button variant="outlined" size="large" color="primary" onClick={() => { onLocation_change("Jeju") }}>
             제주
          </Button>
   

    <InputBase style={{
      border: "2px solid cadetblue",
      marginLeft:"10px"
    }}
placeholder="Search…"
name="search_text"
value={search_text}
onChange={valueChange}
/> 

    </div>
      <div>
{user_hotels_list ? filterComponents(user_hotels_list):""}
</div>
        </div>
    )
}

}


export default hotel; 