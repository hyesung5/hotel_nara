import React, { Component } from "react";
import LoginPage from "../../components/other/login";
import { connect } from "react-redux";
import {
  LoginUser,
  changeValue,
  loginsuccess,
  login_chk_id,
  idModalopen,
  idModalclose,
  passModalopen,
  passModalclose,
  findID,
  findPASS,
  find_input_clean,
  login_clean,
} from "../../store/moudules/OTHER/Login";
import HeaderPage from "../../components/header/header";
import FooterPage from "../../components/footer/footer";
import DialogPage from "../../components/other/logindialog";

class LoginContainer extends Component {
  componentDidMount() {
    this.props.login_clean();
  }
  componentDidUpdate(prevProps, prevState) {
    // 하단에 AuthContainer를 withRouter로 감쌌기 때문에, history를 props로 이용할수 있습니다.
    const { loginsuccess } = this.props;

    if (prevProps.login_data !== this.props.login_data) {
      // logged가 true가 되면 localStorage에 값을 저장합니다.
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          id: this.props.login_data.USER_ID,
          user_kind: this.props.login_data.USER_KINDS,
        })
      );
      // 값을 저장후, main페이지로 이동시켜줍니다.
      loginsuccess();
      this.props.history.push("/");
    }
  }

  //로그인
  handleLogin = (id, password) => {
    const { LoginUser, login_chk_id } = this.props;
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const params = new URLSearchParams();
    params.append("user_id", id);
    params.append("password", password);

    //아이디 체크
    login_chk_id(params, config).then((res) => {
      if (res >= 1) {
        LoginUser(params, config).then((res) => {
          if (res === 0) {
            alert("비밀번호가 일치 하지 않습니다.");
          }
        });
      } else {
        alert("존재하지 않는 아이디입니다.");
      }
    });
  };

  //value값 변경
  handleChange = (e) => {
    const { changeValue } = this.props;
    const { name, value } = e.target;
    changeValue({ key: name, value });
  };

  //아이디 찾기
  handleFindId = (params, config) => {
    const { findID, find_input_clean } = this.props;

    findID(params, config).then((res) => {
      if (res === 0) {
        alert("존재하지 않는 사용자정보입니다.");
        find_input_clean();
      }
    });
  };
  
  //비밀번호 찾기
  handleFindPass = (params, config) => {
    const { findPASS, find_input_clean } = this.props;

    findPASS(params, config).then((res) => {
      if (res === 0) {
        alert("존재하지 않는 사용자정보입니다.");
        find_input_clean();
      }
    });
  };
  
  render() {
    const {
      login_id,
      login_password,
      idModalopen,
      passModalopen,
      find_id_modal,
      find_id_password,
      f_id,
      f_password,
      f_name,
      f_number,
      idModalclose,
      passModalclose,
      find_id_data,
      find_pw_data,
    } = this.props;
    return (
      <div>
        <HeaderPage />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginLeft: "-145px",
          }}
        >
          <LoginPage
            id={login_id}
            password={login_password}
            onLogin={this.handleLogin}
            handleChange={this.handleChange}
            idModalopen={idModalopen}
            passModalopen={passModalopen}
          />
          <DialogPage
            find_id_modal={find_id_modal}
            find_id_password={find_id_password}
            idModalclose={idModalclose}
            passModalclose={passModalclose}
            find_id_data={find_id_data}
            find_pw_data={find_pw_data}
            f_id={f_id}
            f_password={f_password}
            f_name={f_name}
            f_number={f_number}
            onChange={this.handleChange}
            handleFindId={this.handleFindId}
            handleFindPass={this.handleFindPass}
          />
        </div>
        <FooterPage />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  login_password: state.Login.login_password,
  user_kind: state.Login.user_kind,
  login_id: state.Login.login_id,
  login_data: state.Login.login_data,
  find_id_modal: state.Login.find_id_modal,
  find_id_password: state.Login.find_id_password,
  f_id: state.Login.f_id,
  f_password: state.Login.f_password,
  f_name: state.Login.f_name,
  f_number: state.Login.f_number,
  find_id_data: state.Login.find_id_data,
  find_pw_data: state.Login.find_pw_data,
});
const mapDispatchToProps = {
  LoginUser,
  changeValue,
  loginsuccess,
  login_chk_id,
  idModalopen,
  idModalclose,
  passModalopen,
  passModalclose,
  findID,
  findPASS,
  find_input_clean,
  login_clean,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
