import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "../css/hotelrooms.css";

class hotelrooms extends Component {
  render() {
    const {
      ROOM_ID,
      ROOM_NAME,
      CHECK_IN,
      CHECK_OUT,
      PRICE,
      IMAGE_FILES,
    } = this.props;
    return (
      <div>
        <Link to={"/hotel/room_info/" + ROOM_ID}>
          <Card>
            <div>
              {IMAGE_FILES !== "" ? (
                <CardMedia
                  className="hotelrooms_CardMedia"
                  height="152"
                  width="267"
                  component="img"
                  src={IMAGE_FILES[0]}
                />
              ) : (
                ""
              )}
            </div>
            <div className="hotelrooms_CardContent">
              <CardContent>
                <Typography component="h5" variant="h5">
                  {ROOM_NAME}
                </Typography>
                <Typography
                  className="hotelrooms_checkin"
                  variant="subtitle1"
                  color="textSecondary"
                >
                  체크인 : {CHECK_IN} <br />
                  체크아웃 : {CHECK_OUT}
                </Typography>
              </CardContent>
              <Typography
                className="hotrelrooms_price"
                variant="subtitle8"
                color="textSecondary"
              >
                {PRICE}원
              </Typography>
            </div>
          </Card>
        </Link>
      </div>
    );
  }
}

export default hotelrooms;
