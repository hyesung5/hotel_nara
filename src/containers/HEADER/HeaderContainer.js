import React, { Component } from "react";
import { connect } from "react-redux";
import header_page from "../../components/header/header";

class HeaderContainer extends Component {
  render() {
    return (
        <div>
            <header_page />
        </div>
    )
  }
}

const mapSateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default connect(mapSateToProps, mapDispatchToProps)(HeaderContainer);
