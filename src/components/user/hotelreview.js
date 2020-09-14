import React, { Component } from "react";
import ReactStars from "react-rating-stars-component";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogContentText from '@material-ui/core/DialogContentText';
import "../css/hotelreview.css";

class hotelreview extends Component {
  handleSubmit = () => {
    const params = new URLSearchParams();

    const { onSubmit } = this.props;

    if (this.props.review_text === "") {
      alert("리뷰 내용을 입력해주세요");
    } else {
      if (localStorage.getItem("userInfo") !== null) {
        params.append(
          "register",
          JSON.parse(localStorage.getItem("userInfo")).id
        );
      }
      params.append("review_text", this.props.review_text);
      params.append("star", this.props.review_star);
      params.append("hotel_id", this.props.hotel_id);
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      onSubmit(params, config);
    }
  };
  render() {
    const ratingChanged = (newRating) => {
      const { onChangestar } = this.props;

      onChangestar(newRating);
    };

    const {
      review_text,
      review_star,
      review_modal,
      reviewmodalopen,
      reviewmodalclose,
      review_register,
      hotel_id,
      onValuechange,
      review_Data,
      res_data,
      allreviewopen,
allreviewclose,
all_review_modal,
    } = this.props;
    const { length: count } = this.props.review_Data;

    return (
      <div>
        <div>
          <section class="_2w7Uud _3JLhaP">


            {review_Data &&
              review_Data.filter((review) => (review.ROWNUM <= 3)).map((review) => (
                <article class="tUdPZa">
                    <div className="review_resize_div">
                  <div class="_3KZ1w7">
                    <span
                      class="_2ezf5Q"
                      style={{
                        backgroundImage:
                          "url(&quot;//yaimg.yanolja.com/joy/sunny/static/images/ico-emoji-5.svg&quot;)",
                      }}
                    ></span>
                    <div class="_1X3CDo">
                      <div class="_3PdmGK">
                        <ReactStars
                          className="review_stars"
                          // count={5}
                          value={review.STAR}
                          edit={false}
                          Readonly
                        />
                      </div>
                      <div class="_1mdZFY">
                        {review.REGISTER}
                      </div>
                    </div>
                  </div>
                  <div class="_2z8CVX">{review.TEXT}</div>
                  </div>
                </article>
              ))}
          </section>
          </div>
          <div>
          <section class="_2tdU0T">
            <Button onClick={allreviewopen}>
              전체 후기 보기
            </Button>

<div className="btn_section">
    {res_data > 0 ?

<Button variant="contained" className="review_btn" onClick={reviewmodalopen}  color="primary" disableElevation>
리뷰 작성하기

</Button> : "" }

</div>
          </section>
        </div>

        <div>
          <Dialog className="dialog_Modify" open={review_modal}>
            <DialogTitle>리뷰 작성</DialogTitle>
            <DialogContent>
              <TextField
                className="review_text"
                label="리뷰 내용"
                type="text"
                name="review_text"
                onChange={onValuechange}
                value={review_text}
                multiline
                rows={10}
                defaultValue="Default Value"
                variant="outlined"
              />

              <ReactStars
                className="review_stars"
                count={5}
                onChange={ratingChanged}
                size={24}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />
              <DialogActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleSubmit}
                >
                  저장
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={reviewmodalclose}
                >
                  닫기
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </div>
        <div>

        <Dialog
         open={all_review_modal}
         onClose={allreviewclose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Subscribe
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
           {review_Data &&
              review_Data.map((review) => (
                <article class="tUdPZa">
                    <div className="review_resize_div">
                  <div class="_3KZ1w7">
                    <span
                      class="_2ezf5Q"
                      style={{
                        backgroundImage:
                          "url(&quot;//yaimg.yanolja.com/joy/sunny/static/images/ico-emoji-5.svg&quot;)",
                      }}
                    ></span>
                    <div class="_1X3CDo">
                      <div class="_3PdmGK">
                        <ReactStars
                          className="review_stars"
                          // count={5}
                          value={review.STAR}
                          edit={false}
                          Readonly
                        />
                      </div>
                      <div class="_1mdZFY">
                        {review.REGISTER}
                      </div>
                    </div>
                  </div>
                  <div class="_2z8CVX">{review.TEXT}</div>
                  </div>
                </article>
              ))}
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={allreviewclose}>
            Cancel
          </Button>
          <Button  color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
        </div>

        <div> </div>
      </div>
    );
  }
}

export default hotelreview;
