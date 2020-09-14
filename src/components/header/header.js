import React, { Component } from "react";
import {
  Link,
  withRouter
} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import HomeImg from "../../icons/home.png";
import InformationImg from "../../icons/information.png";
import LoginImg from "../../icons/login.png";
import LogoutImg from "../../icons/logout.png";
import ReservationImg from "../../icons/reservation.png";
import SignImg from "../../icons/sign.png";
import HotelImg from "../../icons/hotel.png";
import MotelImg from "../../icons/motel.png";
import GuesthouseImg from "../../icons/guest_house.png";
import PansionImg from "../../icons/pansion.png";
import "../css/header.css";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});
class header extends Component {
  handleLogout = () => {
    const { history } = this.props;
    localStorage.clear();
    history.push("/");
  };
  render() {
    return (
      <div>
        <AppBar position="static" style={{ background: "#513fb5" }}>
          <ul
            style={{ textAlign: "right", color: "white", marginRight: "100px" }}
          >
            <li>
              <Link className="header_icon" to="/">
                <img style={{ filter: "invert(100%)" }} src={HomeImg} alt="" /><br/>
                HOME
              </Link>
            </li>
            {localStorage.getItem("userInfo") === null ? (
              ""
            ) : (
              <li>
                <Link className="header_icon" to="/userReservation">
                  <img
                    src={ReservationImg}
                    style={{ filter: "invert(100%)" }}
                    alt=""
                  /><br/>
                  예약내역
                </Link>
              </li>
            )}
            <li>
              {localStorage.getItem("userInfo") === null ? (
                <Link className="header_icon" to="/agressment">
                  <img
                    src={SignImg}
                    alt=""
                    style={{ filter: "invert(100%)" }}
                  /><br/>
                 회원가입
                </Link>
              ) : (
                <Link className="header_icon" to="/profile">
                  <img
                    src={InformationImg}
                    alt=""
                    style={{ filter: "invert(100%)" }}
                  /><br/>
                  개인정보
                </Link>
              )}
            </li>

            <li>
              {localStorage.getItem("userInfo") === null ? (
                <Link className="header_icon" to="/login">
                  <img
                    src={LoginImg}
                    alt=""
                    style={{ filter: "invert(100%)" }}
                  /><br/>
                  로그인
                </Link>
              ) : (
                <Link to="" className="header_icon" onClick={this.handleLogout}>
                  <img
                    src={LogoutImg}
                    alt=""
                    style={{ filter: "invert(100%)" }}
                  /><br/>
                  로그아웃
                </Link>
              )}
            </li>
          </ul>

          <ul style={{ textAlign: "center" }}>
            <li className="header_icon">
              <Button
                style={{ width: "120px" }}
                component={Link}
                to={"/list/HOTEL"}
              >
                <img
                  src={HotelImg}
                  style={{ filter: "invert(100%)" }}
                  alt=""
                  title="호텔"
                />
              </Button>
              <br/>
                호텔
            </li>
            <li className="header_icon">
              <Button
                style={{ width: "120px" }}
                component={Link}
                to={"/list/MOTEL"}
              >
                <img src={MotelImg} style={{ filter: "invert(100%)" }} alt="" />
              </Button>
              <br/>
                모텔
            </li>
            <li className="header_icon">
              <Button
                style={{ width: "120px" }}
                component={Link}
                to={"/list/GUEST_HOUSE"}
              >
                <img
                  src={GuesthouseImg}
                  style={{ filter: "invert(100%)" }}
                  alt=""
                />
              </Button>
              <br/>
                게스트하우스
            </li>
            <li className="header_icon">
              <Button
                style={{ width: "120px" }}
                component={Link}
                to={"/list/PANSION"}
              >
                <img
                  src={PansionImg}
                  style={{ filter: "invert(100%)" }}
                  alt=""
                />
              </Button>
              <br/>
                팬션
            </li>

            {localStorage.getItem("userInfo") === null ? (
              ""
            ) : JSON.parse(localStorage.getItem("userInfo")).user_kind ===
              "0" ? (
              ""
            ) : (
              <li>
                <Button
                  style={{ width: "120px", color: "white" }}
                  component={Link}
                  to={"/Companyregist"}
                >
                  업체등록
                </Button>
              </li>
            )}
            {localStorage.getItem("userInfo") === null ? (
              ""
            ) : JSON.parse(localStorage.getItem("userInfo")).user_kind ===
              "2" ? (
              <li>
                <Button
                  style={{ width: "120px", color: "white" }}
                  component={Link}
                  to={"/Customer"}
                >
                  회원관리
                </Button>
              </li>
            ) : (
              ""
            )}
          </ul>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(withStyles(useStyles)(header));
