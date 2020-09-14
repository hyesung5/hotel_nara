import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";

class hotel_list extends Component {

  conf=(id) =>{

    const {onHotelDelete}= this.props;
    let result = window.confirm("삭제 하시겠습니까?");
      if(result){
          onHotelDelete(id);
      }else{
        
      }
  }

  render() {
    const {
      name,
      onOpen,
      p_id,
      key
    } = this.props;
    return (

      <TableRow key={key} >
        <TableCell>{name}</TableCell>
        <TableCell>
        <Button variant="contained" color="secondary" 
            onClick={(e) => {
              e.preventDefault();
              onOpen(name);
            }}
          >
            상세보기
          </Button>
        </TableCell>
          <TableCell><Button variant="contained" color="secondary" n onClick={(e) => {e.preventDefault(); this.conf(p_id)}}>삭 제</Button></TableCell>
      </TableRow>
    );
  }
}

export default hotel_list;
