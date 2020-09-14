import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "../css/RoomList.css";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

class room_list extends Component {

 
  render() {
    const {
      room_id,
      onRoomInfo,
      room_name_data,
      p_num,
      handleRoomdelete,
      hotel_name,
      handleGetRVlist,
      hotel_id
    } = this.props;

    return (
      <TableRow key={p_num}>
        <TableCell>{hotel_name}</TableCell>
        <TableCell>{room_name_data}</TableCell>
        <TableCell>
          <Button
            onClick={() => {
              onRoomInfo(room_id);
            }}
            variant="contained"
            color="secondary"
          >
            상세보기
          </Button>
        </TableCell>
        <TableCell>
        <Button
            onClick={() => {
              handleGetRVlist(hotel_id,room_id);
            }}
            variant="contained"
            color="secondary"
          >
            예약목록 보기
          </Button>
        </TableCell>
        <TableCell><Button variant="contained" color="secondary" onClick={()=> {handleRoomdelete(room_id)}} >삭제</Button></TableCell>
      </TableRow>
    );
  }
}

export default room_list;
