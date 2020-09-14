import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderPage from "../../components/header/header";
import FooterPage from "../../components/footer/footer";
import HotelroomsPage from "../../components/user/hotelrooms";
import ReviewPage from "../../components/user/hotelreview";
import {
  getRooms,
  reviewmodalopen,
  reviewmodalclose,
  reviewValuechange,
  changestar,
  insertReview,
  resdata,
  reviewData,
  allreviewopen,
  allreviewclose,
} from "../../store/moudules/USER/UserHotelrooms";
import "../../components/css/UserRLContainer.css";

class UserRLContainer extends Component {
  componentDidMount() {
    this.getRoomList();
  }

  componentDidUpdate(prevProps) {
    if (this.props.review_text !== prevProps.review_text) {
      this.getRoomList();
    }
  }

  //방목록
  getRoomList = () => {
    const { getRooms } = this.props;
    const { params } = this.props.match;
    const Uparam = new URLSearchParams();
    Uparam.append("room_id", params.key1);
    const config = {
      headers: {"content-type": "application/json",},
    };
    getRooms(Uparam, config).then((res) => {
      if (res !== null) {
        this.getReviewData();
      }
    });
  };

  getReviewData = () => {
    const { reviewData } = this.props;
    const { params } = this.props.match;
    const param = new URLSearchParams();
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    param.append("hotel_id", params.key1);
    reviewData(param, config).then((res) => {
      if (res !== null) {
        this.getResdata();
      }
    });
  };

  getResdata = () => {
    const { resdata } = this.props;
    const { params } = this.props.match;
    const params_DATA = new URLSearchParams();
    params_DATA.append("hotel_id", params.key1);
    if (localStorage.getItem("userInfo") !== null) {
      params_DATA.append(
        "user_id",
        JSON.parse(localStorage.getItem("userInfo")).id
      );
    }
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    resdata(params_DATA, config);
  };

  handleValueCahnge = (e) => {
    const { name, value } = e.target;
    const { reviewValuechange } = this.props;
    reviewValuechange({ key: name, value });
  };

  handelInserReview = (params, config) => {
    const { insertReview } = this.props;
    insertReview(params, config);
  };

  render() {
    const {
      room_information,
      review_text,
      review_star,
      review_modal,
      reviewmodalopen,
      reviewmodalclose,
      review_register,
      hotel_id,
      res_data,
      review_Data,
      allreviewopen,
      allreviewclose,
      all_review_modal,
    } = this.props;

    return (
      <div>
        <HeaderPage />
        <div className="user_hotel_room_list">
          <div>
            {room_information &&
              room_information.map((room, i) => (
                <HotelroomsPage
                  ROOM_ID={room.ID}
                  ROOM_NAME={room.ROOM_NAME}
                  CHECK_IN={room.CHECK_IN}
                  CHECK_OUT={room.CHECK_OUT}
                  PRICE={room.PRICE}
                  IMAGE_FILES={
                    room.IMAGE_FILES === "" ? "" : room.IMAGE_FILES.split(",")
                  }
                />
              ))}

            <ReviewPage
              review_Data={review_Data}
              reviewmodalclose={reviewmodalclose}
              review_register={review_register}
              review_text={review_text}
              review_star={review_star}
              review_modal={review_modal}
              hotel_id={hotel_id}
              res_data={res_data}
              allreviewopen={allreviewopen}
              allreviewclose={allreviewclose}
              all_review_modal={all_review_modal}
              onValuechange={this.handleValueCahnge}
              onChangestar={this.props.changestar}
              onSubmit={this.handelInserReview}
              reviewmodalopen={reviewmodalopen}
            />
          </div>
        </div>
        <FooterPage />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  room_information: state.UserHotelRooms.room_information,
  imagefiles: state.UserHotelRooms.imagefiles,
  review_text: state.UserHotelRooms.review_text,
  review_star: state.UserHotelRooms.review_star,
  review_modal: state.UserHotelRooms.review_modal,
  review_register: state.UserHotelRooms.review_register,
  hotel_id: state.UserHotelRooms.hotel_id,
  res_data: state.UserHotelRooms.res_data,
  review_Data: state.UserHotelRooms.review_Data,
  all_review_modal: state.UserHotelRooms.all_review_modal,
});
const mapDispatchToProps = {
  getRooms,
  reviewmodalopen,
  reviewmodalclose,
  reviewValuechange,
  changestar,
  insertReview,
  resdata,
  reviewData,
  allreviewopen,
  allreviewclose,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRLContainer);
