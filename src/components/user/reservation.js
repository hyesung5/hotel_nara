import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/user/reservation.css";

class reservation extends Component {

  oninitSubmit = () => {
    const { onSubmit } = this.props;
    const params = new URLSearchParams();
    const {
      reserv_name,
      reserv_phone_number,
      HOTEL_NM,
      ROOM_NM,
      CHECK_IN,
      CHECK_OUT,
      payment,
      account,
      PRICE,
      RESERV_DAYS,
      HOTEL_ID,
      ROOM_ID,
    } = this.props;
    const {
      TermsofUse_1,
      TermsofUse_2,
      TermsofUse_3,
      TermsofUse_4,
      TermsofUse_5,
      TermsofUse_6,
    } = this.props;

    params.append("re_name", reserv_name);
    params.append("re_number", reserv_phone_number);
    params.append("re_hotel", HOTEL_NM);
    params.append("re_room", ROOM_NM);
    params.append("re_checkin", CHECK_IN);
    params.append("re_checkout", CHECK_OUT);
    params.append("re_payment", payment);
    params.append("re_account", account);
    params.append("re_price", PRICE);
    params.append("re_dates", RESERV_DAYS);
    params.append("re_hotel_id", HOTEL_ID);
    params.append("re_room_id", ROOM_ID);

    if (localStorage.getItem("userInfo") !== null) {
      params.append(
        "re_user_id",
        JSON.parse(localStorage.getItem("userInfo")).id
      );
    }

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    if (reserv_name === "") {
      alert("예약자 성명란을 채워주세요");
    } else if (reserv_phone_number === "") {
      alert("예약자 번호란을 채워주세요");
    } else if (payment === "") {
      alert("결제방법을 선택해주세요");
    } else if (payment === "virtualaccount" && account === "") {
      alert("계좌번호를 선택해주세요");
    } else if (TermsofUse_1 !== true) {
      alert("만 14세 이상 이용동의 에 체크해주세요");
    } else if (TermsofUse_2 !== true) {
      alert("이용규칙 동의 에 체크해주세요");
    } else if (TermsofUse_3 !== true) {
      alert("취소환불 규정 에 체크해주세요");
    } else if (TermsofUse_4 !== true) {
      alert("개인정보 수집 및 이용 동의에 체크해주세요");
    } else if (TermsofUse_5 !== true) {
      alert("개인정보 제3자 제공동의에 체크해주세요");
    } else if (TermsofUse_6 !== true) {
      alert("기준인원 2명 초과시 현장결제에 체크해주세요");
    } else {
      onSubmit(params, config);
    }
  };
  render() {
    const {
      HOTEL_NM,
      CHECK_IN,
      CHECK_OUT,
      PRICE,
      reserv_name,
      reserv_phone_number,
      changeValue,
      changeChk,
      changechkall,
      TermsofUse_All,
      TermsofUse_1,
      TermsofUse_2,
      TermsofUse_3,
      TermsofUse_4,
      TermsofUse_5,
      TermsofUse_6,
      choicePayment,
      payment,
      account,
      changeAccount,
    } = this.props;
    return (
      <div className="back_ground">
        <div className="reservation_page">
          <div className="nuxt-container">
            <section className="payment-page-content">
              <section className="toolbar-content">
                <div className="toolbar-wrapper sticky-to-top">
                  <div className="toolbar-top">
                    <div className="toolbar-title-content">
                      <div className="toolbar-title">숙소 예약</div>
                    </div>
                    <div className="toolbar-items postfix">
                      <div className="float"></div>
                    </div>
                  </div>
                </div>
                <div className="toolbar-empty-space"></div>
              </section>
              <div className="reservation-room-container">
                <section className="reservation-room-content">
                  <h1 className="place-name">{HOTEL_NM}</h1>
                </section>
              </div>
              <div className="reservation-period-container block-divider ">
                <section className="reservation-period-content date-border">
                  <div className="period-item">
                    <div className="period-txt">체크인</div>
                    <div className="period-date-txt">{CHECK_IN} (금)</div>
                    <div className="period-time-txt"></div>
                  </div>
                  <div className="arrow-icon">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAuCAYAAAB04nriAAACO0lEQVRogeXa2VIUQRCF4W9G3tQVFRdAQRGRfV9ERCR8Ax7Et3K8OD1CEAgzzIx0lyeiIi+6Orv/yIzqrqxsdTodvejs7KyneQPqHk7xEz9G8YD2KJwOoF/VOMWDUTxgbBROB1AHj5xDtys7NNUNmEA/qewJWvg+LOd1BCaw45X9JtAnw3BcV2AC+1TS+1jS+3hQp3UGJtDPK3skkf46iMO6AxPYicp+Eeij2zprAjCBfSHpfSjpfXgbR00BJtCvKnsgkf7cr5MmARPY15XdF+iDfhw0DZirofd7vbmJwF1NCvSeQO/1clOTgWFKFrJdWch2brqh6cDwRiK9LZHevm5yCcDwVqC3BHrrbxNLAYYZSe9NSe+NqyaVBAzvJNLrEun1yxNKA4b3Ar0m0GsXL5YIDHOS3quS3ivdC2P/qFZ1F5qv7HJlVyg3wl3NS6SXJdJLY5Lv/4MW0a5b1XLUarVlJSt5LFawn7DQqlkhfthaxEcsYImyF61lfJCF6/yzdGevM1qtyLf4g3yL/6hE4FX525pz6S+L8oDXMSv/1MVvHjZkxzQrO6YrVQrwpuyJZ1yzF6YM4G1MS+Wj+BLPjtS1pqWudaOaDLwrlcspPVYsaSZwtyT7UurTfRXim7Z5uAg7qU9YmhXh7rHKhJwxFX2Y1hLAZ3KKeOvj0iak9NBgqX+Eu4ff49IJUHTLQ0sAH0uvx1CaWuqa0iOBpZ4R7rYoPZR+raIb01oCeF868obeb1m3lG5XYySw8BsypnnsSvGYqwAAAABJRU5ErkJggg=="
                      width="30"
                      height="23"
                      alt="연박 표기 아이콘"
                    />
                  </div>
                  <div className="period-item">
                    <div className="period-txt">체크아웃</div>
                    <div className="period-date-txt">{CHECK_OUT} (토)</div>
                    <div className="period-time-txt"></div>
                  </div>
                </section>
              </div>
              <div className="customer-input-container block-divider customer-border">
                <section className="customer-input-content">
                  <div className="title-container">
                    <div className="title-txt">예약정보</div>
                  </div>
                  <ul className="input-row-container">
                    <li className="input-row input-li">
                      <label for="customer-name">예약자 이름</label>
                      <section className="text-field-content input-text-field">
                        <div className="text-field-input-wrapper input-username">
                          <div className="text-field-prefix"></div>
                          <input
                            id="customer-name"
                            placeholder="체크인 시 필요합니다"
                            type="text"
                            maxlength="8"
                            name="reserv_name"
                            className="text-filed"
                            onChange={changeValue}
                            value={reserv_name}
                          />
                          <div className="text-field-postfix"></div>
                          <div className="bottom-line"></div>
                        </div>
                      </section>
                    </li>
                    <li className="input-row input-li">
                      <label for="customer-phone">예약자 번호</label>
                      <section className="text-field-content input-text-field">
                        <div className="text-field-input-wrapper">
                          <div className="text-field-prefix"></div>
                          <input
                            id="customer-phone"
                            placeholder="예약문자 발송 시 필요합니다"
                            type="tel"
                            pattern="[0-9]*"
                            name="reserv_phone_number"
                            className="text-filed"
                            onChange={changeValue}
                            value={reserv_phone_number}
                          />
                          <div className="text-field-postfix">
                            <div className="change-phone-container"></div>
                          </div>
                          <div className="bottom-line"></div>
                        </div>
                      </section>
                    </li>
                  </ul>
                </section>
              </div>

              <div className="reservation-payment-container block-divider payment-border">
                <section
                  pg-amount="65000"
                  className="reservation-payment-content"
                >
                  {/* <div className="payment-banner-container" >
                        <img src="https://image6.yanolja.com/payment/n2pzVwDKs8HsGKj2" alt="결제수단 혜택 배너" style={{height: "40px"}} />
                    </div> */}
                  <div className="payment-method-container">
                    <section className="payment-gateway-content">
                      <div className="current-payment-item">
                        <span className="select-pg-method-txt">
                          결제 수단 선택
                        </span>
                        {/* <span className="current-pg-method-txt" >카카오페이</span>
                                <div className="pg-item-description" > 은행 점검시간인 23:30~00:30 까지 이용 불가한 계좌이체 결제수단이 포함되어 있습니다.  </div> */}
                      </div>
                      <div>
                        <section>
                          <label className="virtualaccount-label">
                            가상계좌{" "}
                            <input
                              type="radio"
                              name="virtualaccount"
                              checked={
                                payment === "virtualaccount" ? true : false
                              }
                              onChange={choicePayment}
                            />
                          </label>
                          <select
                            name="account"
                            value={account}
                            onChange={changeAccount} 
                            
                            className={ payment === "virtualaccount" ? "account_view": "account_hidden" }

                          >
                            <option>선택하세요</option>
                            <option value="111-1111-11111">
                              국민은행 (111-1111-11111)
                            </option>
                            <option value="222-2222-22222">
                              신한은행 (222-2222-22222)
                            </option>
                            <option value="333-3333-33333">
                              농협중앙회 (333-3333-33333)
                            </option>
                            <option value="333-3333-33333">
                              카카오뱅크 (444-4444-44444)
                            </option>
                            <option value="555-5555-55555">
                              토스 (555-5555-55555)
                            </option>
                          </select>
                        </section>
                        <section>
                          <label>
                            현장결제{" "}
                            <input
                              type="radio"
                              name="onsitepayment"
                              checked={
                                payment === "onsitepayment" ? true : false
                              }
                              onChange={choicePayment}
                            />
                          </label>
                        </section>
                      </div>
                    </section>
                  </div>
                </section>
              </div>

              <div className="reservation-terms-container terms-border">
                <section className="reservation-terms-content">
                  <div className="order-terms-title">규정 및 약관 동의</div>
                  <div>
                    <section className="checkbox-content agree-item total">
                      <section>
                        <label>
                          <input
                            type="checkbox"
                            name="TermsofUse_All"
                            checked={TermsofUse_All === true ? true : false}
                            onChange={changechkall}
                          />{" "}
                          전체 동의
                        </label>
                      </section>
                    </section>
                    <section className="checkbox-content agree-item">
                      <section>
                        <label>
                          <input
                            type="checkbox"
                            name="TermsofUse_1"
                            checked={TermsofUse_1 === true ? true : false}
                            onChange={changeChk}
                          />{" "}
                          [필수] 만 14세 이상 이용 동의
                        </label>
                      </section>
                    </section>
                    <section className="checkbox-content agree-item">
                      <section>
                        <label>
                          <input
                            type="checkbox"
                            name="TermsofUse_2"
                            checked={TermsofUse_2 === true ? true : false}
                            onChange={changeChk}
                          />{" "}
                          [필수] 이용규칙 동의{" "}
                        </label>
                      </section>
                    </section>
                    <section className="checkbox-content agree-item">
                      <section>
                        <label>
                          <input
                            type="checkbox"
                            name="TermsofUse_3"
                            checked={TermsofUse_3 === true ? true : false}
                            onChange={changeChk}
                          />{" "}
                          [필수] 취소 및 환불 규칙 동의
                        </label>
                        <div className="modal_btn">
                          <Link>보기</Link>
                        </div>
                      </section>
                    </section>
                    <section className="checkbox-content agree-item">
                      <section>
                        {" "}
                        <label>
                          <input
                            type="checkbox"
                            name="TermsofUse_4"
                            checked={TermsofUse_4 === true ? true : false}
                            onChange={changeChk}
                          />{" "}
                          [필수] 개인정보 수집 및 이용 동의
                        </label>
                        <div className="modal_btn">
                          <Link>보기</Link>
                        </div>
                      </section>
                    </section>
                    <section className="checkbox-content agree-item">
                      <section>
                        <label>
                          <input
                            type="checkbox"
                            name="TermsofUse_5"
                            checked={TermsofUse_5 === true ? true : false}
                            onChange={changeChk}
                          />{" "}
                          [필수] 개인정보 제 3자 제공 동의
                        </label>
                        <div className="modal_btn">
                          <Link>보기</Link>
                        </div>
                      </section>
                    </section>
                    <section className="checkbox-content agree-item">
                      <section>
                        <label>
                          <input
                            type="checkbox"
                            name="TermsofUse_6"
                            checked={TermsofUse_6 === true ? true : false}
                            onChange={changeChk}
                          />{" "}
                          [필수] 기준인원 2명 초과시 현장결제
                        </label>
                        <div className="modal_btn">
                          <Link>보기</Link>
                        </div>
                      </section>
                    </section>
                  </div>
                </section>
              </div>

              <div className="payment-btn-container">
                <button
                  type="button"
                  onClick={this.oninitSubmit}
                  className="disabled button-content"
                >
                  <span>
                    <span>{PRICE}원 결제하기</span>
                  </span>
                </button>
              </div>

              <div className="yanolja-terms-container">
                <p className="under-aged">
                  ※ 미성년자는 법정대리인 동행없이 투숙 불가
                </p>
                <section className="yanolja-terms-content">
                  <span>
                    호텔나라는 통신판매중개자로서, 통신판매의 당사자가
                    아니라는 사실을 고지하며 상품의 예약, 이용 및 환불 등과
                    관련한 의무와 책임은 각 판매자에게 있습니다.
                  </span>
                </section>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default reservation;
