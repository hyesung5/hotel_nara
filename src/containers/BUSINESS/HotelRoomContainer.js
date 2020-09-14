import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderPage from "../../components/header/header";
import HotelRoom from "../../components/buisness/room_list";
import RoomDialog from "../../components/buisness/room_dialog";
import {
  roommodalopen,
  roommodalclose,
  roomvaluechange,
  roominfochange,
  roomreservchange,
  roomcanclechange,
  roomfilechange,
  roomRegist,
  getHotellist,
  getRoomlist,
  selectHotelvalue,
  roomInfo,
  infomodalopen,
  infomodalclose,
  modymodalopen,
  modymodalclose,
  roomInfomody,
  imgFiledelete,
  newImgdelete,
  pageChange,
  roomInfodelete,
  reslistopen,
  reslistclose,
  RV_list,
  search_room_value,
  getHotellistAdmin,
  getRoomlistAdmin,
  updateStartEndPage,
  stateClean
} from "../../store/moudules/BUSINESS/HotelRoom";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Pagination from "../../components/util/Pagination";
import { paginate } from "../../components/util/paginate";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";

class HotelRoomContainer extends Component {

  componentDidMount() {
    const data = localStorage.getItem("userInfo");
    if (data !== null) {
      if (JSON.parse(localStorage.getItem("userInfo")).user_kind === "0") {
        alert("일반사용자는 이용이 불가능합니다.");
        this.props.history.push("/");
      } else if (
        JSON.parse(localStorage.getItem("userInfo")).user_kind === "1"
      ) {
        this.getData();
      } else {
        this.getDataAdmin();
      }
    } else {
      alert("로그인후 이용이 가능합니다.");
      this.props.history.push("/");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { regist, room_delete_data } = this.props;
    if (regist !== prevProps.regist) {
    if (
        JSON.parse(localStorage.getItem("userInfo")).user_kind === "1"
      ) {
        this.getData();
      } else if( JSON.parse(localStorage.getItem("userInfo")).user_kind === "2"){
        this.getDataAdmin();
      }
    } else if (room_delete_data !== prevProps.room_delete_data) {
      if (
        JSON.parse(localStorage.getItem("userInfo")).user_kind === "1"
      ) {
        this.getData();
      } else if( JSON.parse(localStorage.getItem("userInfo")).user_kind === "2"){
        this.getDataAdmin();
      }
    }
  }

  componentWillUnmount(){
    const{stateClean}= this.props;

    stateClean();
  }

  getData = () => {
    const { getHotellist, getRoomlist } = this.props;
    const param = new URLSearchParams();
    const { params } = this.props.match;

    param.append("register", JSON.parse(localStorage.getItem("userInfo")).id);
    param.append("type", params.key1);

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    getHotellist(param, config);
    getRoomlist(param, config);
  };

  getDataAdmin = () => {
    const { getHotellistAdmin, getRoomlistAdmin } = this.props;
    const param = new URLSearchParams();
    const { params } = this.props.match;

    param.append("type", params.key1);

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };


    getHotellistAdmin(param, config);
    getRoomlistAdmin(param, config);
  };

  getRoominfo = (id) => {
    const { roomInfo } = this.props;
    const params = new URLSearchParams();
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    params.append("id", id);
    roomInfo(params, config);
  };


  handleModalopen = () => {
    const { roommodalopen } = this.props;

    roommodalopen();
  };
  handleModalclose = () => {
    const { roommodalclose } = this.props;

    roommodalclose();
  };
  handleValuechange = (e) => {
    const { name, value } = e.target;
    const { roomvaluechange } = this.props;
    roomvaluechange({ key: name, value });
  };
  handleChangeFile = ({ files, fileName }) => {
    const { roomfilechange } = this.props;

    roomfilechange({ files, fileName });
  };

  handleSubmitRoom = (formData, config) => {
    const { roomRegist } = this.props;
    roomRegist(formData, config);
  };

  handleInfochange = (data) => {
    const { roominfochange } = this.props;

    roominfochange(data);
  };

  handleReservchange = (data) => {
    const { roomreservchange } = this.props;

    roomreservchange(data);
  };

  handleCanclechange = (data) => {
    const { roomcanclechange } = this.props;

    roomcanclechange(data);
  };

  handelSelectValue = (e) => {
    const { selectHotelvalue } = this.props;
    const { name, value } = e.target;
    selectHotelvalue({ key: name, value });
  };
  handleDelete = (file) => {
    const { imgFiledelete } = this.props;

    imgFiledelete(file);
  };

  handleModifySubmit = (formData, config) => {
    const { roomInfomody } = this.props;
    roomInfomody(formData, config).then((res) => {
      if (res === 1) {
        this.getData();
      } else {
      }
    });
  };

  handelPageChange = (page) => {
    const { pageChange } = this.props;

    pageChange(page);
  };

  handleRoomdelete = (id) => {
    const { roomInfodelete } = this.props;
    const param = new URLSearchParams();
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    let result = window.confirm("삭제 하시겠습니까?");
    if (result) {
      param.append("room_id", id);

      roomInfodelete(param, config);
    } else {
    }
  };

  handleGetRVlist = (hotel_id, room_id) => {
    const { RV_list, reslistopen } = this.props;
    const params = new URLSearchParams();
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    params.append("hotel_id", hotel_id);
    params.append("room_id", room_id);
    reslistopen();
    RV_list(params, config);
  };

  handleSearchRoom = (e) => {
    const { search_room_value } = this.props;
    const { name, value } = e.target;

    search_room_value({ key: name, value });
  };

  handleMovePage=(s,e)=>{

    const {updateStartEndPage}= this.props;
    updateStartEndPage({start:s, end:e});
  }

  render() {
    const {
      room_modal,
      room_name,
      room_info,
      reservationnotice,
      cancellationpolicy,
      checkin,
      checkout,
      price,
      imgfile,
      imgfilename,
      imgfiles,
      imgfilenames,
      hotellist,
      hotel_name,
      room_list: allList,
      roominfo_modal,
      room,
      info_img,
      mody_modal,
      room_id,
      hotel_id,
      hotel_location,
      hotel_accommodation_type,
      currentPage,
      pageSize,
      reslistclose,
      reservation_modal,
      reservation_list,
      search_room,
      start,
      end,
      pageNum
    } = this.props;
    const room_list = paginate(allList, currentPage, pageSize);

    const { length: count } = this.props.room_list;

    if (count === 0)
      return (
        <div>
          <HeaderPage />
          <div style={{ width: "80%", margin: "0 auto" }}>
            <Paper>
              <div style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleModalopen}
                >
                  추가
                </Button>
              </div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>호텔이름</TableCell>
                    <TableCell>방이름</TableCell>
                    <TableCell>상세보기</TableCell>
                    <TableCell>예약내역</TableCell>
                    <TableCell>삭제</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ textAlign: "center" }} colSpan="4">
                      데이터가 없습니다.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <RoomDialog
                onModalclose={this.handleModalclose}
                onValuechange={this.handleValuechange}
                onInfochange={this.handleInfochange}
                onReservchange={this.handleReservchange}
                onCanclechange={this.handleCanclechange}
                onFilechange={this.handleChangeFile}
                onSubmitroom={this.handleSubmitRoom}
                onSelectchange={this.handelSelectValue}
                onInfoModalopen={this.props.infomodalopen}
                onInfoModalclose={this.props.infomodalclose}
                onModyopen={this.props.modymodalopen}
                onModyclose={this.props.modymodalclose}
                onModysubmit={this.handleModifySubmit}
                onFiledelete={this.handleDelete}
                onNewimgdelete={this.props.newImgdelete}
                room_modal={room_modal}
                room_name={room_name}
                room_info={room_info}
                reservationnotice={reservationnotice}
                cancellationpolicy={cancellationpolicy}
                checkin={checkin}
                checkout={checkout}
                price={price}
                imgfile={imgfile}
                imgfilename={imgfilename}
                imgfiles={imgfiles}
                imgfilenames={imgfilenames}
                hotellist={hotellist}
                hotel_name={hotel_name}
                room_list={room_list}
                roominfo_modal={roominfo_modal}
                room={room}
                info_img={info_img}
                mody_modal={mody_modal}
                room_id={room_id}
                hotel_id={hotel_id}
                hotel_location={hotel_location}
                hotel_accommodation_type={hotel_accommodation_type}
              />
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPgaeChange={this.handelPageChange}
                pageNum={pageNum}
              />
            </Paper>
          </div>
        </div>
      );

    return (
      <div>
        <HeaderPage />
        <div style={{ width: "80%", margin: "0 auto" }}>
          <Paper>
            <div style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleModalopen}
              >
                추가
              </Button>
              <InputBase
                style={{
                  border: "2px solid cadetblue",
                  marginLeft: "10px",
                }}
                placeholder="Search…"
                name="search_room"
                value={search_room}
                onChange={this.handleSearchRoom}
              />
            </div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>호텔이름</TableCell>
                  <TableCell>방이름</TableCell>
                  <TableCell>상세보기</TableCell>
                  <TableCell>예약내역</TableCell>
                  <TableCell>삭제</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {room_list === ""
                  ? ""
                  : room_list
                      .filter((c) => {
                        return c.ROOM_NAME.indexOf(search_room) > -1;
                      }).map((room, i) => (
                        <HotelRoom
                          key={i}
                          p_num={i}
                          room_id={room.ID}
                          hotel_id={room.HOTEL_ID}
                          room_name_data={room.ROOM_NAME}
                          hotel_name={room.HOTEL_NAME}
                          onRoomInfo={this.getRoominfo}
                          handleRoomdelete={this.handleRoomdelete}
                          handleGetRVlist={this.handleGetRVlist}
                        />
                      ))}
              </TableBody>
            </Table>
            <RoomDialog
              onModalclose={this.handleModalclose}
              onValuechange={this.handleValuechange}
              onInfochange={this.handleInfochange}
              onReservchange={this.handleReservchange}
              onCanclechange={this.handleCanclechange}
              onFilechange={this.handleChangeFile}
              onSubmitroom={this.handleSubmitRoom}
              onSelectchange={this.handelSelectValue}
              onInfoModalopen={this.props.infomodalopen}
              onInfoModalclose={this.props.infomodalclose}
              onModyopen={this.props.modymodalopen}
              onModyclose={this.props.modymodalclose}
              onModysubmit={this.handleModifySubmit}
              onFiledelete={this.handleDelete}
              onNewimgdelete={this.props.newImgdelete}
              reslistclose={reslistclose}
              reservation_modal={reservation_modal}
              room_modal={room_modal}
              room_name={room_name}
              room_info={room_info}
              reservationnotice={reservationnotice}
              cancellationpolicy={cancellationpolicy}
              checkin={checkin}
              checkout={checkout}
              price={price}
              imgfile={imgfile}
              imgfilename={imgfilename}
              imgfiles={imgfiles}
              imgfilenames={imgfilenames}
              hotellist={hotellist}
              hotel_name={hotel_name}
              room_list={room_list}
              roominfo_modal={roominfo_modal}
              room={room}
              info_img={info_img}
              mody_modal={mody_modal}
              room_id={room_id}
              hotel_id={hotel_id}
              hotel_location={hotel_location}
              hotel_accommodation_type={hotel_accommodation_type}
              reservation_list={reservation_list}
            />
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPgaeChange={this.handelPageChange}
              start={start}
              end={end}
              handleMovePage={this.handleMovePage}
            />
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  room_modal: state.HotelRoom.room_modal,
  room_name: state.HotelRoom.room_name,
  room_info: state.HotelRoom.room_info,
  reservationnotice: state.HotelRoom.reservationnotice,
  cancellationpolicy: state.HotelRoom.cancellationpolicy,
  checkin: state.HotelRoom.checkin,
  checkout: state.HotelRoom.checkout,
  price: state.HotelRoom.price,
  imgfile: state.HotelRoom.imgfile,
  imgfilename: state.HotelRoom.imgfilename,
  imgfiles: state.HotelRoom.imgfiles,
  imgfilenames: state.HotelRoom.imgfilenamesm,
  hotellist: state.HotelRoom.hotellist,
  hotel_name: state.HotelRoom.hotel_name,
  room_list: state.HotelRoom.room_list,
  roominfo_modal: state.HotelRoom.roominfo_modal,
  info_img: state.HotelRoom.info_img,
  mody_modal: state.HotelRoom.mody_modal,
  room_id: state.HotelRoom.room_id,
  hotel_id: state.HotelRoom.hotel_id,
  hotel_location: state.HotelRoom.hotel_location,
  hotel_accommodation_type: state.HotelRoom.hotel_accommodation_type,
  pageSize: state.HotelRoom.pageSize,
  currentPage: state.HotelRoom.currentPage,
  room_delete_data: state.HotelRoom.room_delete_data,
  reservation_modal: state.HotelRoom.reservation_modal,
  reservation_list: state.HotelRoom.reservation_list,
  search_room: state.HotelRoom.search_room,
start: state.HotelRoom.start,
end: state.HotelRoom.end,
pageNum: state.HotelRoom.pageNum
});

const mapDispathToProps = {
  roommodalopen,
  roommodalclose,
  roomvaluechange,
  roominfochange,
  roomreservchange,
  roomcanclechange,
  roomfilechange,
  roomRegist,
  getHotellist,
  getRoomlist,
  selectHotelvalue,
  roomInfo,
  infomodalopen,
  infomodalclose,
  modymodalopen,
  modymodalclose,
  roomInfomody,
  imgFiledelete,
  newImgdelete,
  pageChange,
  roomInfodelete,
  reslistopen,
  reslistclose,
  RV_list,
  search_room_value,
  getHotellistAdmin,
  getRoomlistAdmin,
  updateStartEndPage,
  stateClean
};

export default connect(mapStateToProps, mapDispathToProps)(HotelRoomContainer);
