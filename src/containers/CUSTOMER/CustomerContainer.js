import React, { Component } from "react";
import HeaderPage from "../../components/header/header";
import {
  getHootelslist,
  customer_change_value,
  addCustomer,
  addIdchk,
  addDialogopen,
  addDialogclose,
  postDialogopen,
  postDialogclose,
  set_address,
  info_open,
  info_close,
  CustomerInfo,
  modify_open,
  modify_close,
  Customermodify,
  passwordmodify,
  pwd_open,
  pwd_close,
  pageChange,
  updateStartEndPage,
  cusrtomer_clean
} from "../../store/moudules/CUSTOMER/Customers";
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
import { connect } from "react-redux";
import CustomerList from "../../components/customers/customer_list";
import CustomerDialog from "../../components/customers/dialog";

class CustomerContainer extends Component {
  componentDidMount() {
    if (JSON.parse(localStorage.getItem("userInfo")).user_kind !== "2") {
      alert("일반사용자는 이용이 불가능합니다.");
      this.props.history.push("/");
    } else if (JSON.parse(localStorage.getItem("userInfo")).user_kind === "2") {
      this.getCustomerData();
    }
  }

  componentWillUnmount(){
    const{cusrtomer_clean}=this.props;

    cusrtomer_clean();
  }
  
  getCustomerData = () => {
    const { getHootelslist } = this.props;

    getHootelslist();
  };

  handleCustomerValue = (e) => {
    const { customer_change_value } = this.props;
    const { name, value } = e.target;

    customer_change_value({ key: name, value });
  };

  handleInfoView = (id) => {
    const { info_open, CustomerInfo } = this.props;
    const param = new URLSearchParams();
    param.append("user_id", id);
    // 파일이 있는 데이터를 보낼때는 파ㅏ일 형식에 맞는 타입을 지정해 주어야 한다.
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    CustomerInfo(param, config);
    info_open();
  };

  handelPageChange= (page)=> {
    const {pageChange}= this.props;

    pageChange(page)
}

handleMovePage=(s,e)=>{

  const {updateStartEndPage}= this.props;
  updateStartEndPage({start:s, end:e});
}


  render() {
    const {
      customer_list:List,
      customer_search,
      user_id,
      password,
      password_check,
      gender,
      birthday,
      phone_number,
      user_name,
      message,
      checked,
      year,
      month,
      day,
      user_kinds,
      address_search,
      zipcode,
      address1,
      address2,
      addDialogopen,
      addDialogclose,
      add_modal,
      addIdchk,
      postDialogopen,
      postDialogclose,
      post_modal,
      set_address,
      addCustomer,
      info_modal,
      info_close,
      customer_modify,
      modify_open,
      modify_close,
      Customermodify,
      passwordmodify,
      pwd_modify,
      pwd_open,
      pwd_close,
      pw_id,
      change_pw,
      change_pw_chk,
      pageSize,
currentPage,
start, 
end
    } = this.props;

    const customer_list = paginate(List, currentPage, pageSize);

    const {length: count}= this.props.customer_list;

   
    if(count === 0)
    return <div>
    <HeaderPage />
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Paper>
        <div style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={addDialogopen}
          >
            추가
          </Button>
          <InputBase
            style={{
              border: "2px solid cadetblue",
              marginLeft: "10px",
            }}
            placeholder="Search…"
            name="customer_search"
            value={customer_search}
            onChange={this.handleCustomerValue}
          />
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>아이디</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>전화번호</TableCell>
              <TableCell>상세보기</TableCell>
              <TableCell>비밀번호 변경</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          <TableCell  style={{textAlign:"center"}} colSpan="5">데이터가 없습니다.</TableCell>
          </TableBody>
        </Table>
        <CustomerDialog
              addCustomer={addCustomer}
              user_id={user_id}
              password={password}
              password_check={password_check}
              gender={gender}
              birthday={birthday}
              phone_number={phone_number}
              user_name={user_name}
              message={message}
              checked={checked}
              year={year}
              month={month}
              day={day}
              user_kinds={user_kinds}
              address_search={address_search}
              zipcode={zipcode}
              address1={address1}
              address2={address2}
              addDialogopen={addDialogopen}
              addDialogclose={addDialogclose}
              handleChange={this.handleCustomerValue}
              add_modal={add_modal}
              addIdchk={addIdchk}
              postDialogopen={postDialogopen}
              postDialogclose={postDialogclose}
              post_modal={post_modal}
              set_address={set_address}
              info_modal={info_modal}
              info_close={info_close}
              customer_modify={customer_modify}
              modify_open={modify_open}
              modify_close={modify_close}
              Customermodify={Customermodify}
              passwordmodify={passwordmodify}
              pwd_modify={pwd_modify}
              pwd_close={pwd_close}
              pw_id={pw_id}
              change_pw={change_pw}
              change_pw_chk={change_pw_chk}
            />
        <Pagination
    itemsCount={count}
    pageSize={pageSize}
    currentPage={currentPage}
    onPgaeChange={this.handelPageChange}

  /> 
      </Paper>
    </div>
  </div>
    return (
      <div>
        <HeaderPage />
        <div style={{ width: "80%", margin: "0 auto" }}>
          <Paper>
            <div style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={addDialogopen}
              >
                추가
              </Button>
              <InputBase
                style={{
                  border: "2px solid cadetblue",
                  marginLeft: "10px",
                }}
                placeholder="Search…"
                name="customer_search"
                value={customer_search}
                onChange={this.handleCustomerValue}
              />
            </div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>아이디</TableCell>
                  <TableCell>이름</TableCell>
                  <TableCell>전화번호</TableCell>
                  <TableCell>상세보기</TableCell>
                  <TableCell>비밀번호 변경</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customer_list === "" ? (
                  <TableCell style={{ textAlign: "center" }} colSpan="4">
                    데이터가 없습니다.
                  </TableCell>
                ) : (
                  customer_list
                    .filter((c) => {
                      return c.NAME.indexOf(customer_search) > -1;
                    })
                    .map((user, i) => (
                      <CustomerList
                        user_id={user.USER_ID}
                        name={user.NAME}
                        phone={user.PHONE}
                        onView={this.handleInfoView}
                        pwd_open={pwd_open}
                      />
                    ))
                )}

                <CustomerDialog
                  addCustomer={addCustomer}
                  user_id={user_id}
                  password={password}
                  password_check={password_check}
                  gender={gender}
                  birthday={birthday}
                  phone_number={phone_number}
                  user_name={user_name}
                  message={message}
                  checked={checked}
                  year={year}
                  month={month}
                  day={day}
                  user_kinds={user_kinds}
                  address_search={address_search}
                  zipcode={zipcode}
                  address1={address1}
                  address2={address2}
                  addDialogopen={addDialogopen}
                  addDialogclose={addDialogclose}
                  handleChange={this.handleCustomerValue}
                  add_modal={add_modal}
                  addIdchk={addIdchk}
                  postDialogopen={postDialogopen}
                  postDialogclose={postDialogclose}
                  post_modal={post_modal}
                  set_address={set_address}
                  info_modal={info_modal}
                  info_close={info_close}
                  customer_modify={customer_modify}
                  modify_open={modify_open}
                  modify_close={modify_close}
                  Customermodify={Customermodify}
                  passwordmodify={passwordmodify}
                  pwd_modify={pwd_modify}
                  pwd_close={pwd_close}
                  pw_id={pw_id}
                  change_pw={change_pw}
                  change_pw_chk={change_pw_chk}
                />
              </TableBody>
            </Table>
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
  customer_list: state.Customer.customer_list,
  customer_search: state.Customer.customer_search,
  user_id: state.Customer.user_id,
  password: state.Customer.password,
  password_check: state.Customer.password_check,
  gender: state.Customer.gender,
  birthday: state.Customer.birthday,
  phone_number: state.Customer.phone_number,
  user_name: state.Customer.user_name,
  message: state.Customer.message,
  checked: state.Customer.checked,
  year: state.Customer.year,
  month: state.Customer.month,
  day: state.Customer.day,
  user_kinds: state.Customer.user_kinds,
  address_search: state.Customer.address_search,
  zipcode: state.Customer.zipcode,
  address1: state.Customer.address1,
  address2: state.Customer.address2,
  add_modal: state.Customer.add_modal,
  post_modal: state.Customer.post_modal,
  info_modal: state.Customer.info_modal,
  customer_modify: state.Customer.customer_modify,
  pwd_modify: state.Customer.pwd_modify,
  pw_id: state.Customer.pw_id,
  change_pw: state.Customer.change_pw,
  change_pw_chk: state.Customer.change_pw_chk,
  pageSize: state.Customer.pageSize,
  currentPage:state.Customer.currentPage,
  start:state.Customer.start,
end:state.Customer.end
});

const mapDispatchToProps = {
  getHootelslist,
  customer_change_value,
  addCustomer,
  addIdchk,
  addDialogopen,
  addDialogclose,
  postDialogopen,
  postDialogclose,
  set_address,
  info_open,
  info_close,
  CustomerInfo,
  modify_open,
  modify_close,
  Customermodify,
  passwordmodify,
  pwd_open,
  pwd_close,
  pageChange,
  updateStartEndPage,
  cusrtomer_clean

};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerContainer);
