import React, { Component } from "react";
import { connect } from "react-redux";
import RegisterPage from "../../components/other/register";

import {
  changeValue,
  Memberregistration,
  User_idCheck,
  kindpluse,
  kindminus,
  getaddress,
  add_modal_open,
  add_modal_close,
  stateClean
} from "../../store/moudules/OTHER/Regist";
import HeaderPage from "../../components/header/header";
import FooterPage from "../../components/footer/footer";

class RegisterContainer extends Component {

  //언마운트
  componentWillUnmount(){
    const{stateClean}= this.props;

    stateClean();
  }

  //회원가입
  handleRegist = (params, config) => {
    const { Memberregistration } = this.props;

    Memberregistration(params, config).then((res) => {
      if (res === 1) {
        alert("가입을 축하드립니다.");
        this.props.history.push("/");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    });
  };

  //value 체인지
  handleChange = (e) => {
    const { changeValue } = this.props;
    const { name, value } = e.target;
    changeValue({ key: name, value });
  };

  //아이디 체크
  handleUser_idcheck = (id, config) => {
    const { User_idCheck } = this.props;

    User_idCheck(id, config).then((res) => {
      if (res > 0) {
        alert("중복되는 아이디가 존재합니다.");
      } else {
        alert("사용 가능한 아이디 입니다.");
      }
    });
  };

  render() {
    const {
      user_id,
      password,
      gender,
      birthday,
      phone_number,
      user_name,
      password_check,
      message,
      checked,
      year,
      month,
      day,
      user_kinds,
      kindpluse,
      kindminus,
      address_search,
      zipcode,
      address1,
      address2,
      getaddress,
      add_modal_open,
      add_modal_close,
    } = this.props;
    return (
      <div>
        <HeaderPage />
        <div>
          <RegisterPage
            onRegist={this.handleRegist}
            handleChange={this.handleChange}
            user_id={user_id}
            password={password}
            password_check={password_check}
            gender={gender}
            birthday={birthday}
            phone_number={phone_number}
            user_name={user_name}
            message={message}
            onCheckId={this.handleUser_idcheck}
            checked={checked}
            year={year}
            month={month}
            day={day}
            user_kinds={user_kinds}
            kindpluse={kindpluse}
            kindminus={kindminus}
            address_search={address_search}
            zipcode={zipcode}
            address1={address1}
            address2={address2}
            getaddress={getaddress}
            add_modal_open={add_modal_open}
            add_modal_close={add_modal_close}
          />
        </div>
        <FooterPage />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user_id: state.Regist.user_id,
  password: state.Regist.password,
  gender: state.Regist.gender,
  birthday: state.Regist.birthday,
  phone_number: state.Regist.phone_number,
  user_name: state.Regist.user_name,
  password_check: state.Regist.password_check,
  checked: state.Regist.checked,
  year: state.Regist.year,
  month: state.Regist.month,
  day: state.Regist.day,
  user_kinds: state.Regist.user_kinds,
  address_search: state.Regist.address_search,
  zipcode: state.Regist.zipcode,
  address1: state.Regist.address1,
  address2: state.Regist.address2,
});

const mapDispatchToProps = {
  changeValue,
  Memberregistration,
  User_idCheck,
  kindpluse,
  kindminus,
  getaddress,
  add_modal_open,
  add_modal_close,
  stateClean
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
