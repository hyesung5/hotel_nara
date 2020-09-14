import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";

class reservinfo extends Component {
  render() {
    const {
      key,
      id,
      p_num,
      re_hotel,
      re_room,
      re_check_in,
      re_check_out,
      re_payment,
      re_account,
      re_price,
      re_name,
      onDelete,
    } = this.props;
    return (
      <TableRow key={p_num} >
        <TableCell >{p_num}</TableCell>
        <TableCell>{re_hotel}</TableCell>
        <TableCell>{re_room}</TableCell>
        <TableCell>
          {re_check_in} ~ {re_check_out}
        </TableCell>
        <TableCell>
          {re_payment === "virtualaccount"
            ? "계좌이체 (" + re_account + ")"
            : "현장접수"}{" "}
        </TableCell>
        <TableCell>{re_price}</TableCell>
        <TableCell>{re_name}</TableCell>
        <TableCell>
          {" "}
          <Button
            onClick={(e) => {
              e.preventDefault();
              onDelete(id);
            }}
            variant="contained"
            color="secondary"
          >
            취소
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default reservinfo;
