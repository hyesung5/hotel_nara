import React, { Component } from "react";
import { connect } from "react-redux";
import ProfilePage from "../../components/other/profile";
import PasswordChkPage from "../../components/other/password_chk";
import { ProFileData, changeValue, modifiedInfo,chkPassword, profileclean,   setaddress,
  mody_modal_open,
  mody_modal_close } from "../../store/moudules/OTHER/Profile";
import HeaderPage from "../../components/header/header";
import FooterPage from "../../components/footer/footer";

class ProfileContainer extends Component {
  
  componentDidMount() {
    const {pschk, profileclean} = this.props;
    if(pschk !== false){
      profileclean();
      if (localStorage.getItem("userInfo") !== null) {
      this.callData();
    } else {
      alert("로그인후에 이용이 가능합니다.");
      this.props.history.push("/");
    }
  }};


  componentDidUpdate(prevProps){
 // 전형적인 사용 사례 (props 비교를 잊지 마세요)
 if (this.props.pschk !== prevProps.pschk) {
  this.callData();
}
  }


  callData = () => {
    const { ProFileData } = this.props;

    const params = new URLSearchParams();
    if (localStorage.getItem("userInfo") !== null) {
      params.append("user_id", JSON.parse(localStorage.getItem("userInfo")).id);
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      ProFileData(params, config);
    } else {
      alert("로그인후에 이용이 가능합니다.");
      this.props.history.push("/");
    }
  };

  handleChange = (e) => {
    const { changeValue } = this.props;
    const { name, value } = e.target;
    changeValue({ key: name, value });
  };

  //회원정보수정
  handleModified = (params, config) => {
    const{modifiedInfo}= this.props;
    modifiedInfo(params, config).then((res) => {
        if(res === 1 ){
          alert("정상적으로 수정되었습니다.");
            this.props.history.push('/');
        }else{
            alert("수정에 실패했습니다.");
        }
    });
  };


  handleBack=()=>{
      this.props.history.push('/');
  }

  
  handleChkPass=(param, config)=>{
    const {chkPassword} = this.props;
     chkPassword(param, config);
  }


  render() {
    const {
      user_id,
      gender,
      phone_number,
      user_name,
      year,
      month,
      day,
      user_kinds,
      pschk,
      chk_password,
      set_address,
zipcode,
address1,
address2,
setaddress,
mody_modal_open,
mody_modal_close,
    } = this.props;
    return (
      <div>
          <HeaderPage />
          {pschk === false ? 
          <PasswordChkPage     
          onhandleChange={this.handleChange}  
          chk_password={chk_password}
          onChkPassword={this.handleChkPass}
          /> 
          :
        <ProfilePage
          user_id={user_id}
          gender={gender}
          phone_number={phone_number}
          user_name={user_name}
          year={year}
          month={month}
          day={day}
          user_kinds={user_kinds}
          set_address={set_address}
zipcode={zipcode}
address1={address1}
address2={address2}
setaddress={setaddress}
mody_modal_open={mody_modal_open}
mody_modal_close={mody_modal_close}
          onhandleChange={this.handleChange}
          onModified={this.handleModified}
          onBack={this.handleBack}
        />
      }
      <FooterPage/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user_id: state.Profile.user_id,
  gender: state.Profile.gender,
  phone_number: state.Profile.phone_number,
  user_name: state.Profile.user_name,
  year: state.Profile.year,
  month: state.Profile.month,
  day: state.Profile.day,
  user_kinds: state.Profile.user_kinds,
  pschk: state.Profile.pschk,
  chk_password: state.Profile.chk_password,
  set_address: state.Profile.set_address ,
zipcode: state.Profile.zipcode,
address1:state.Profile.address1 ,
address2: state.Profile.address2,
});

const mapDispatchToProps = {
  ProFileData,
  changeValue,
  modifiedInfo,
  chkPassword,
  profileclean,
  setaddress,
mody_modal_open,
mody_modal_close

};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
