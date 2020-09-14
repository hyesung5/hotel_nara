import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderPage from "../../components/header/header";
import HotesListpage from "../../components/buisness/hotel_list";
import {
  modifyEditor,
  filedelete,
  modifyfile,
  hotelInfomodify,
  changeCheck,
  getHootellist,
  openView,
  closeView,
  infomodify,
  closeModify,
  changeValue,
  listpageChange,
  hoteldelete,
  getHotellist_admin,
  search_hotelname_value,
  updateStartEndPage,
  stateClean
} from "../../store/moudules/BUSINESS/Hotels";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import HotelListDialog from "../../components/buisness/hotel_list_dialog";
import Pagination from "../../components/util/Pagination";
import { paginate } from "../../components/util/paginate";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";

class HotelsContainser extends Component {
  
  componentDidMount() {
    const data = localStorage.getItem("userInfo");

    if (data !== null) {
      if (JSON.parse(localStorage.getItem("userInfo")).user_kind === "0") {
        alert("일반사용자는 이용이 불가능합니다.");
        this.props.history.push("/");
      } else if (
        JSON.parse(localStorage.getItem("userInfo")).user_kind === "1"
      ) {
        this.gatList();
      } else if(
        JSON.parse(localStorage.getItem("userInfo")).user_kind === "2"
      ){
        this.getList_admin();
      }
    } else {
      alert("로그인후 이용이 가능합니다.");
      this.props.history.push("/");
    }
  }


  componentDidUpdate(prevProps) {
    const { hotel_delate_data } = this.props;
    if (hotel_delate_data !== prevProps.hotel_delate_data) {
      this.gatList();
    }
  }

  componentWillUnmount(){
    const {stateClean}= this.props;

    stateClean();
  }

  gatList = () => {
    const { getHootellist } = this.props;
    const param = new URLSearchParams();
    const { params } = this.props.match;
    param.append("register", JSON.parse(localStorage.getItem("userInfo")).id);
    param.append("type", params.key1);
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    getHootellist(param, config);
  };

  getList_admin = () => {
    const { getHotellist_admin } = this.props;
    const param = new URLSearchParams();
    const { params } = this.props.match;

    param.append("type", params.key1);
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    getHotellist_admin(param, config);
  };

  viewData = (name) => {
    const params = new URLSearchParams();
    params.append("hotelName", name);
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const { openView } = this.props;
    openView(params, config);
  };

  handleChangecalue = (e) => {
    const { name, value } = e.target;

    const { changeValue } = this.props;

    changeValue({ key: name, value });
  };

  oneditorChange = (data) => {
    const { modifyEditor } = this.props;

    modifyEditor(data);
  };

  onCheckchange = (e) => {
    const { name, checked } = e.target;
    const { changeCheck } = this.props;

    changeCheck({ key: name, checked });
  };

  onInfoMoidify = (params, config) => {
    const { hotelInfomodify } = this.props;
    hotelInfomodify(params, config).then((res) => {
      if (res === 1) {
        alert("수정이 완료되었습니다.");
        this.gatList();
      } else {
        alert("수정에 실패했습니다.");
      }
    });
  };

  onFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    const { modifyfile } = this.props;

    modifyfile({ key: name, file });
  };
  handelPageChange = (page) => {
    const { listpageChange } = this.props;

    listpageChange(page);
  };

  handleHotelDelete = (id) => {
    const { hoteldelete } = this.props;
    const param = new URLSearchParams();
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    param.append("hotel_id", id);
    hoteldelete(param, config);
  };

  handleSearch = (e) => {
    const { search_hotelname_value } = this.props;
    const { name, value } = e.target;

    search_hotelname_value({ key: name, value });
  };

  handleMovePage = (s, e) => {
    const { updateStartEndPage } = this.props;
    updateStartEndPage({ start: s, end: e });
  };
  render() {
    const {
      hotellist: List,
      closeView,
      infoView,
      closeModify,
      thumbnail,
      filechk,
      currentPage,
      pageSize,
      search,
      start,
      end,
    } = this.props;

    const { length: count } = this.props.hotellist;

    if (count === 0)
      return (
        <div>
          <HeaderPage />
          <div style={{ width: "80% !importanr", margin: "0 auto !importanr" }}>
            <Paper>
              <Button
                variant="contained"
                color="primary"
                to="/HotelRegist"
                component={Link}
              >
                추가하기
              </Button>
              <div style={{ textAlign: "center", width: "80%" }}></div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>호텔이름</TableCell>
                    <TableCell>상세보기</TableCell>
                    <TableCell>삭제</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ textAlign: "center" }} colSpan="3">
                      데이터가 없습니다.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPgaeChange={this.handelPageChange}
              />
            </Paper>
          </div>
        </div>
      );
    const hotellist = paginate(List, currentPage, pageSize);
    return (
      <div>
        <HeaderPage />
        <div style={{ width: "80%", margin: "0 auto" }}>
          <Paper>
            <div style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                to="/HotelRegist"
                component={Link}
              >
                추가하기
              </Button>

              <InputBase
                style={{
                  border: "2px solid cadetblue",
                  marginLeft: "10px",
                }}
                placeholder="Search…"
                name="search"
                onChange={this.handleSearch}
              />
            </div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>호텔이름</TableCell>
                  <TableCell>상세보기</TableCell>
                  <TableCell>삭제</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* filter((c) => { 
          return c.HOTEL_NAME.indexOf(search) > -1;
        }) */}
                {hotellist
                  .filter((c) => {
                    return c.HOTEL_NAME.indexOf(search) > -1;
                  })
                  .map((c, i) => (
                    <HotesListpage
                      key={i}
                      p_id={c.ID}
                      onOpen={this.viewData}
                      name={c.HOTEL_NAME}
                      info={c.HOTEL_INFO}
                      onHotelDelete={this.handleHotelDelete}
                    />
                  ))}
              </TableBody>
            </Table>
            <HotelListDialog
              infoView={infoView}
              onClose={closeView}
              closeModify={closeModify}
              onChangeValue={this.handleChangecalue}
              onChangeEditor={this.oneditorChange}
              onChangeCheck={this.onCheckchange}
              hotelInfomodify={this.onInfoMoidify}
              onFileChange={this.onFileChange}
              filedelete={this.props.filedelete}
              hotel_id={this.props.hotel_id}
              hotelNm={this.props.hotelNm}
              hotelIf={this.props.hotelIf}
              hotelTel={this.props.hotelTel}
              hotelZip={this.props.hotelZip}
              hotelAdd1={this.props.hotelAdd1}
              hotelAdd2={this.props.hotelAdd2}
              spa={this.props.spa}
              restaurant={this.props.restaurant}
              banquethall={this.props.banquethall}
              parkinglot={this.props.parkinglot}
              buffet={this.props.buffet}
              desk={this.props.desk}
              bar={this.props.bar}
              luggage={this.props.luggage}
              fitness={this.props.fitness}
              sauna={this.props.sauna}
              wifi={this.props.wifi}
              coffeeshop={this.props.coffeeshop}
              paidlaundry={this.props.paidlaundry}
              smokingarea={this.props.smokingarea}
              amenities={this.props.amenities}
              business={this.props.business}
              breakfast={this.props.breakfast}
              onMody={this.props.onMody}
              infomodify={this.props.infomodify}
              thumbnail={thumbnail}
              filechk={filechk}
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
  hotellist: state.HotelList.hotellist,
  infoView: state.HotelList.infoView,
  hotelNm: state.HotelList.hotelNm,
  hotelIf: state.HotelList.hotelIf,
  hotelTel: state.HotelList.hotelTel,
  hotelZip: state.HotelList.hotelZip,
  hotelAdd1: state.HotelList.hotelAdd1,
  hotelAdd2: state.HotelList.hotelAdd2,
  spa: state.HotelList.spa,
  restaurant: state.HotelList.restaurant,
  banquethall: state.HotelList.banquethall,
  parkinglot: state.HotelList.parkinglot,
  buffet: state.HotelList.buffet,
  desk: state.HotelList.desk,
  bar: state.HotelList.bar,
  luggage: state.HotelList.luggage,
  fitness: state.HotelList.fitness,
  sauna: state.HotelList.sauna,
  wifi: state.HotelList.wifi,
  coffeeshop: state.HotelList.coffeeshop,
  paidlaundry: state.HotelList.paidlaundry,
  smokingarea: state.HotelList.smokingarea,
  amenities: state.HotelList.amenities,
  business: state.HotelList.business,
  breakfast: state.HotelList.breakfast,
  onMody: state.HotelList.onMody,
  hotel_id: state.HotelList.hotel_id,
  thumbnail: state.HotelList.thumbnail,
  filechk: state.HotelList.filechk,
  pageSize: state.HotelList.pageSize,
  currentPage: state.HotelList.currentPage,
  hotel_delate_data: state.HotelList.hotel_delate_data,
  search: state.HotelList.search,

  start: state.HotelList.start,
  end: state.HotelList.end,
});

const mapDispatchToProps = {
  getHootellist,
  openView,
  closeView,
  infomodify,
  closeModify,
  changeValue,
  modifyEditor,
  changeCheck,
  hotelInfomodify,
  modifyfile,
  filedelete,
  listpageChange,
  hoteldelete,
  getHotellist_admin,
  search_hotelname_value,
  updateStartEndPage,
  stateClean
};

export default connect(mapStateToProps, mapDispatchToProps)(HotelsContainser);
