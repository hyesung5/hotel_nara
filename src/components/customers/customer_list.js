import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

class room_list extends Component {

 
  render() {
    const {user_id,
        name,
        phone,
        onView,
        pwd_open
    } = this.props;

    return (
      <TableRow>
        <TableCell>{user_id}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{phone}</TableCell>
        <TableCell><Button  variant="contained" color="primary" onClick={ (e) => { e.preventDefault(); onView(user_id)}}>상세보기</Button></TableCell>
        <TableCell><Button variant="contained" color="primary" onClick={(e) => { e.preventDefault(); pwd_open( user_id )}}> 비민번호 변경</Button> </TableCell>

      </TableRow>
    );
  }
}

export default room_list;
