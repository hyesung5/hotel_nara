import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import '../css/Companyregit.css';

class Companyregistration extends Component {
  render() {
    const { onHotel, onRoom } = this.props;
    return (
      <div>
        <Table className="Btn_Table">
<TableHead>
            <TableRow>
              <TableCell className="Btn_Cell">사업체등록</TableCell>
              <TableCell className="Btn_Cell">방등록</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="Btn_Cell">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    onHotel("HOTEL");
                  }}
                >
                  호텔 등록
                </Button>
              </TableCell>
              <TableCell className="Btn_Cell">
                <Button
                  variant="contained"
                  onClick={() => {
                    onRoom("HOTEL");
                  }}
                  color="secondary"
                >
                  호텔 방등록
                </Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="Btn_Cell">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    onHotel("MOTEL");
                  }}
                >
                  모텔 등록
                </Button>
              </TableCell>
              <TableCell className="Btn_Cell">
                <Button
                  variant="contained"
                  onClick={() => {
                    onRoom("MOTEL");
                  }}
                  color="secondary"
                >
                  모텔 방등록
                </Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="Btn_Cell">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    onHotel("GUEST_HOUST");
                  }}
                >
                  게스트하우스 등록
                </Button>
              </TableCell>
              <TableCell className="Btn_Cell">
                <Button
                  variant="contained"
                  onClick={() => {
                    onRoom("GUEST_HOUST");
                  }}
                  color="secondary"
                >
                  게스트하우스 방등록
                </Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="Btn_Cell">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    onHotel("PENSION");
                  }}
                >
                  펜션 등록
                </Button>
              </TableCell>
              <TableCell className="Btn_Cell">
                <Button
                  variant="contained"
                  onClick={() => {
                    onRoom("PENSION");
                  }}
                  color="secondary"
                >
                  펜션 방등록
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Companyregistration;
