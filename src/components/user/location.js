import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

class location extends Component {
  render() {
    const { onLocationchange } = this.props;
    return (
      <div>
        <Button variant="outlined" size="large" color="primary">
          <Link name="Seoul" onClick={onLocationchange}>
            서울
          </Link>
        </Button>
        <Button variant="outlined" size="large" color="primary">
          <Link name="Gyeonggi" onClick={onLocationchange}>
            경기
          </Link>
        </Button>
        <Button variant="outlined" size="large" color="primary">
          <Link name="Incheon" onClick={onLocationchange}>
            인천
          </Link>
        </Button>
        <Button variant="outlined" size="large" color="primary">
          <Link name="Busan" onClick={onLocationchange}>
            부산
          </Link>
        </Button>
        <Button variant="outlined" size="large" color="primary">
          <Link name="Gangwon" onClick={onLocationchange}>
            강원
          </Link>
        </Button>
        <Button variant="outlined" size="large" color="primary">
          <Link name="Gyeongsang" onClick={onLocationchange}>
            경상
          </Link>
        </Button>
        <Button variant="outlined" size="large" color="primary">
          <Link name="Jeolla" onClick={onLocationchange}>
            전라
          </Link>
        </Button>
        <Button variant="outlined" size="large" color="primary">
          <Link name="Chungcheong" onClick={onLocationchange}>
            충청
          </Link>
        </Button>
        <Button variant="outlined" size="large" color="primary">
          <Link name="Jeju" onClick={onLocationchange}>
            제주
          </Link>
        </Button>
        {/* <ul>
                    <li><Link name="Seoul" onClick={onLocationchange}>서울</Link></li>
                    <li><Link name="Gyeonggi" onClick={onLocationchange}>경기</Link></li>
                    <li><Link name="Incheon" onClick={onLocationchange}>인천</Link></li>
                    <li><Link name="Busan" onClick={onLocationchange}>부산</Link></li>
                    <li><Link name="Gangwon" onClick={onLocationchange}>강원</Link></li>
                    <li><Link name="Gyeongsang" onClick={onLocationchange}>경상</Link></li>
                    <li><Link name="Jeolla" onClick={onLocationchange}>전라</Link></li>
                    <li><Link name="Chungcheong" onClick={onLocationchange}>충청</Link></li>
                    <li><Link name="Jeju" onClick={onLocationchange}>제주</Link></li>
                </ul> */}
      </div>
    );
  }
}

export default location;
