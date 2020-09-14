import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeCheck,
  AllCheck,
  chkclean,
} from "../../store/moudules/OTHER/Agressment";
import Agressmenet from "../../components/other/agressment";
import HeaderPage from "../../components/header/header";
import FooterPage from "../../components/footer/footer";
class AgressmentContainer extends Component {
  componentWillUnmount() {
    const { chkclean } = this.props;

    chkclean();
  }

  //체크 값 변경
  handleCheck = (e) => {
    const { name, checked } = e.target;

    const { changeCheck } = this.props;

    changeCheck({ key: name, checked });
  };

  //전체 체크값 변경
  handleAllchecke = (e) => {
    const { AllCheck } = this.props;
    const { name, checked } = e.target;

    console.log("chkecked", checked);
    AllCheck({ key: name, checked });
  };

  //회원가입 페이지 이동
  handleUrl = () => {
    this.props.history.push("/register");
  };

  render() {
    const {
      Terms_of_Use,
      Collection_of_personal_information,
      Location_information,
      Collection_of_personal_information2,
      All_chekced,
    } = this.props;
    return (
      <div>
        <HeaderPage />

        <Agressmenet
          onhandleCheck={this.handleCheck}
          onhandAgree={this.handAgree}
          onUrl={this.handleUrl}
          Terms_of_Use={Terms_of_Use}
          Collection_of_personal_information={
            Collection_of_personal_information
          }
          Location_information={Location_information}
          Collection_of_personal_information2={
            Collection_of_personal_information2
          }
          All_chekced={All_chekced}
          onAllChkeck={this.handleAllchecke}
        />
        <FooterPage />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dis: state.Agressment.dis,
  Terms_of_Use: state.Agressment.Terms_of_Use,
  Collection_of_personal_information:
    state.Agressment.Collection_of_personal_information,
  Location_information: state.Agressment.Location_information,
  Collection_of_personal_information2:
    state.Agressment.Collection_of_personal_information2,
  All_chekced: state.Agressment.All_chekced,
});

const mapDispatchToProps = {
  changeCheck,
  AllCheck,
  chkclean,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgressmentContainer);
