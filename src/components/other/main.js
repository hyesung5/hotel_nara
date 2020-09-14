import React, { Component } from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import { Link } from "react-router-dom";

class main extends Component {
  state = { username: null };

  render() {
    const {
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
      <div style={{ margin: "0 auto", width: "55%" }}>
        <GridList cellHeight={180}>
          {/* 서울 */}
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">서울</ListSubheader>
          </GridListTile>
          {Seoul_list.map((tile, i) =>
            i > 1 ? (
              ""
            ) : (
              <GridListTile key={i}>
                <Link
                  to={`/hotel/rooms/${tile.id}`}
                  style={{ filter: "invert(0)" }}
                >
                  <img
                    src={tile.THUMBNAIL}
                    alt={tile.HOTEL_NAME}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Link>
                <GridListTileBar title={tile.HOTEL_NAME} />
              </GridListTile>
            )
          )}
        </GridList>
        <GridList cellHeight={180}>
          {/* 부산 */}
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">부산</ListSubheader>
          </GridListTile>
          {Busan_list.map((tile, i) =>
            i > 1 ? (
              ""
            ) : (
              <GridListTile key={i}>
                <Link
                  to={`/hotel/rooms/${tile.id}`}
                  style={{ filter: "invert(0)" }}
                >
                  <img
                    src={tile.THUMBNAIL}
                    alt={tile.HOTEL_NAME}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Link>
                <GridListTileBar title={tile.HOTEL_NAME} />
              </GridListTile>
            )
          )}
        </GridList>
        <GridList cellHeight={180}>
          {/* 인천 */}
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">인천</ListSubheader>
          </GridListTile>
          {Incheon_list.map((tile, i) =>
            i > 1 ? (
              ""
            ) : (
              <GridListTile key={i}>
                <Link
                  to={`/hotel/rooms/${tile.id}`}
                  style={{ filter: "invert(0)" }}
                >
                  <img
                    src={tile.THUMBNAIL}
                    alt={tile.HOTEL_NAME}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Link>
                <GridListTileBar title={tile.HOTEL_NAME} />
              </GridListTile>
            )
          )}
        </GridList>
        <GridList cellHeight={180}>
          {/* 강원 */}
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">강원</ListSubheader>
          </GridListTile>
          {Gangwon_list.map((tile, i) =>
            i > 1 ? (
              ""
            ) : (
              <GridListTile key={i}>
                <Link
                  to={`/hotel/rooms/${tile.id}`}
                  style={{ filter: "invert(0)" }}
                >
                  <img
                    src={tile.THUMBNAIL}
                    alt={tile.HOTEL_NAME}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Link>
                <GridListTileBar title={tile.HOTEL_NAME} />
              </GridListTile>
            )
          )}
        </GridList>
        <GridList cellHeight={180}>
          {/* 경상 */}
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">경상</ListSubheader>
          </GridListTile>

          {Gyeongsang_list.map((tile, i) =>
            i > 1 ? (
              ""
            ) : (
              <GridListTile key={i}>
                <Link
                  to={`/hotel/rooms/${tile.id}`}
                  style={{ filter: "invert(0)" }}
                >
                  <img
                    src={tile.THUMBNAIL}
                    alt={tile.HOTEL_NAME}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Link>
                <GridListTileBar title={tile.HOTEL_NAME} />
              </GridListTile>
            )
          )}
        </GridList>
        <GridList cellHeight={180}>
          {/* 전라 */}
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">전라</ListSubheader>
          </GridListTile>
          {Jeolla_list.map((tile, i) =>
            i > 1 ? (
              ""
            ) : (
              <GridListTile key={i}>
                <Link
                  to={`/hotel/rooms/${tile.id}`}
                  style={{ filter: "invert(0)" }}
                >
                  <img
                    src={tile.THUMBNAIL}
                    alt={tile.HOTEL_NAME}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Link>
                <GridListTileBar title={tile.HOTEL_NAME} />
              </GridListTile>
            )
          )}
        </GridList>
        <GridList cellHeight={180}>
          {/* 충청 */}
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">충청</ListSubheader>
          </GridListTile>
          {Chungcheong_list.map((tile, i) =>
            i > 1 ? (
              ""
            ) : (
              <GridListTile key={i}>
                <Link
                  to={`/hotel/rooms/${tile.id}`}
                  style={{ filter: "invert(0)" }}
                >
                  <img
                    src={tile.THUMBNAIL}
                    alt={tile.HOTEL_NAME}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Link>
                <GridListTileBar title={tile.HOTEL_NAME} />
              </GridListTile>
            )
          )}
        </GridList>
        <GridList cellHeight={180}>
          {/* 제주 */}
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">제주</ListSubheader>
          </GridListTile>
          {Jeju_list.map((tile, i) =>
            i > 1 ? (
              ""
            ) : (
              <GridListTile key={i}>
                <Link
                  to={`/hotel/rooms/${tile.id}`}
                  style={{ filter: "invert(0)" }}
                >
                  <img
                    src={tile.THUMBNAIL}
                    alt={tile.HOTEL_NAME}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Link>
                <GridListTileBar title={tile.HOTEL_NAME} />
              </GridListTile>
            )
          )}
        </GridList>
      </div>
    );
  }
}

export default main;
