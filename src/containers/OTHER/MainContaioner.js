import React, { Component } from "react";
import { connect } from "react-redux";
import MainPage from "../../components/other/main";
import { DataThunk } from "../../store/moudules/OTHER/Main";
import HeaderPage from "../../components/header/header";
import FooterPage from "../../components/footer/footer";

class MainContainer extends Component {
  componentDidMount() {
    const data = localStorage.getItem("userInfo");

    if (data !== null) {
      this.DataCall();
    } else {
      this.timer = setInterval(this.progress, 20);
      this.DataCall();
    }
  }

  DataCall = () => {
    const { DataThunk } = this.props;

    DataThunk();
  };
  render() {
    const {
      data,
      Seoul_list,
      Busan_list,
      Incheon_list,
      Gangwon_list,
      Gyeongsang_list,
      Jeolla_list,
      Chungcheong_list,
      Jeju_list,
    } = this.props;

    return (
      <div>
        <HeaderPage />
        <MainPage
          username={data}
          Seoul_list={Seoul_list}
          Busan_list={Busan_list}
          Incheon_list={Incheon_list}
          Gangwon_list={Gangwon_list}
          Gyeongsang_list={Gyeongsang_list}
          Jeolla_list={Jeolla_list}
          Chungcheong_list={Chungcheong_list}
          Jeju_list={Jeju_list}
        />
        <FooterPage />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  Seoul_list: state.Main.Seoul_list,
  Busan_list: state.Main.Busan_list,
  Incheon_list: state.Main.Incheon_list,
  Gangwon_list: state.Main.Gangwon_list,
  Gyeongsang_list: state.Main.Gyeongsang_list,
  Jeolla_list: state.Main.Jeolla_list,
  Chungcheong_list: state.Main.Chungcheong_list,
  Jeju_list: state.Main.Jeju_list,
});

const mapDispatchToProps = {
  DataThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
