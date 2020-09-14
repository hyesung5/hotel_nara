import { createAction, handleActions } from "redux-actions";
import axios from "axios";

//호텔 방 목록
const ROOMS_LOAD = "ROOMS_LOAD";
const ROOMS_LOAD_SUCCCESS = "ROOMS_LOAD_SUCCCESS";
const ROOMS_LOAD_FAIL = "ROOMS_LOAD_FAIL";
const loading = createAction(ROOMS_LOAD, (bool) => bool);
const loadsuccess = createAction(ROOMS_LOAD_SUCCCESS, (data) => data);
const loadfail = createAction(ROOMS_LOAD_FAIL, (err) => err);

//리뷰등록 모달
const REVIEW_MODAL_OPEN = "REVIEW_MODAL_OPEN";
const REVIEW_MODAL_CLOSE = "REVIEW_MODAL_CLOSE";
export const reviewmodalopen = createAction(REVIEW_MODAL_OPEN);
export const reviewmodalclose = createAction(REVIEW_MODAL_CLOSE);

//전체 리뷰 목록 모달
const ALL_REVIEW_MODAL_OPEN = "ALL_REVIEW_MODAL_OPEN";
const ALL_REVIEW_MODAL_CLOSE = "ALL_REVIEW_MODAL_CLOSE";
export const allreviewopen = createAction(ALL_REVIEW_MODAL_OPEN);
export const allreviewclose = createAction(ALL_REVIEW_MODAL_CLOSE);

//value 체인지
const REVIEW_VALUE_CHANGE = "REVIEW_VALUE_CHANGE";
const REVIEW_CHANG_STAR = "REVIEW_CHANG_STAR";
export const reviewValuechange = createAction(
  REVIEW_VALUE_CHANGE,
  ({ key, value }) => ({ key, value })
);
export const changestar = createAction(REVIEW_CHANG_STAR, (data) => data);

//리뷰 등록처리
const REVIEW_INSERT_LOAD = "REVIEW_INSERT_LOAD";
const REVIEW_INSER_SUCCESS = "REVIEW_INSER_SUCCESS";
const REVIEW_INSERT_FAIL = "REVIEW_INSERT_FAIL";
const reviewloading = createAction(REVIEW_INSERT_LOAD, (bool) => bool);
const reviewinsertsuccess = createAction(REVIEW_INSER_SUCCESS, (data) => data);
const reviewinsertfail = createAction(REVIEW_INSERT_FAIL, (err) => err);

// 예약건수 출력처리
const RES_DATA_LOAD = "RES_DATA_LOAD";
const RES_DATA_SUCCESS = "RES_DATA_SUCCESS";
const RES_DATA_FAIL = "RES_DATA_FAIL";
const resdataload = createAction(RES_DATA_LOAD, (bool) => bool);
const resdatasuccess = createAction(RES_DATA_SUCCESS, (data) => data);
const resdatafail = createAction(RES_DATA_FAIL, (err) => err);

//리뷰 목록 출력처리
const REVIEW_DATA_LOAD = "REVIEW_DATA_LOAD";
const REVIEW_DATA_SUCCESS = "REVIEW_DATA_SUCCESS";
const REVIEW_DATA_FAIL = "REVIEW_DATA_FAIL";
const reviewDataLoad = createAction(REVIEW_DATA_LOAD, (bool) => bool);
const reviewDataSuccess = createAction(REVIEW_DATA_SUCCESS, (data) => data);
const reviewDataFail = createAction(REVIEW_DATA_FAIL, (err) => err);

//호텔정보
export const getRooms = (Uparam, config) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const { data } = await axios.post("/getUserRooms", Uparam);
    dispatch(loadsuccess(data));
    if (data !== null) {
      dispatch(loading(false));
      return data;
    }
  } catch (e) {
    dispatch(loadfail(e));
  }
  dispatch(loading(false));
};

//리뷰등록
export const insertReview = (params, config) => async (dispatch) => {
  dispatch(reviewloading(true));
  try {
    const { data } = await axios.post("/savereview", params);

    dispatch(reviewinsertsuccess(data));
  } catch (e) {
    dispatch(reviewinsertfail(e));
  }
  dispatch(reviewloading(false));
};

//예약건수
export const resdata = (params_DATA, config) => async (dispatch) => {
  dispatch(resdataload(true));
  try {
    const { data } = await axios.post("/countreservdata", params_DATA);

    dispatch(resdatasuccess(data));
  } catch (e) {
    dispatch(resdatafail(e));
  }
  dispatch(resdataload(false));
};

//리뷰목록
export const reviewData = (param, config) => async (dispatch) => {
  dispatch(reviewDataLoad(true));
  try {
    const { data } = await axios.post("/getReview", param);
    dispatch(reviewDataSuccess(data));
    if (data !== null) {
      dispatch(reviewDataLoad(false));
      return data;
    }
  } catch (e) {
    dispatch(reviewDataFail(e));
  }
  dispatch(reviewDataLoad(false));
};

const initialState = {
  load_change: false, //방목록 출력 bool값
  room_information: [], // 방목록
  load_err: "", // 방목록 출력실패시 에러
  review_text: "", // 리뷰내용
  review_star: "", //리뷰 별점
  review_modal: false, //리뷰 모달창 열기/ 닫기
  hotel_id: "", //호텔 아이디
  review_load: false, // 리뷰 출력 bool 값
  review_success: "", //리뷰등록 성공
  reiview_fail: "", //리뷰 등록 실패시 에러
  res_load: false, //예약건수 출력 bool값
  res_data: "", //예약전수 데이터
  res_fail: "", // 예약건 출력 실패시 에러
  review_Data: [], // 리뷰 목록
  review_data_load: false, //리뷰 목록 출력 bool값
  review_data_fail: "", //리뷰목록 풀력 실패시 에러
  all_review_modal: false, //전체 리뷰목록 모달 열기/닫기
};

export default handleActions(
  {
    //방목록
    [ROOMS_LOAD]: (state, action) => ({
      ...state,
      load_change: action.payload,
    }),
    [ROOMS_LOAD_SUCCCESS]: (state, action) => ({
      ...state,
      room_information: action.payload,
    }),
    [ROOMS_LOAD_FAIL]: (state, action) => ({
      ...state,
      load_err: action.payload,
    }),

    //리뷰 등록 모달창
    [REVIEW_MODAL_OPEN]: (state, action) => ({
      ...state,
      review_modal: true,
      hotel_id: state.room_information[0].HOTEL_ID,
    }),

    [REVIEW_MODAL_CLOSE]: (state, action) => ({
      ...state,
      review_modal: false,
    }),

    //리뷰 등록 value 변경
    [REVIEW_VALUE_CHANGE]: (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.value,
    }),

    //리뷰 별점
    [REVIEW_CHANG_STAR]: (state, action) => ({
      ...state,
      review_star: action.payload,
    }),

    //리뷰 등록
    [REVIEW_INSERT_LOAD]: (state, action) => ({
      ...state,
      review_load: action.payload,
    }),
    [REVIEW_INSER_SUCCESS]: (state, action) => ({
      ...state,
      review_success: action.payload,
      hotel_id: "",
      review_modal: false,
      review_text: "",
    }),
    [REVIEW_INSERT_FAIL]: (state, action) => ({
      ...state,
      reiview_fail: action.payload,
    }),

    //예약건수 출력
    [RES_DATA_LOAD]: (state, action) => ({
      ...state,
      res_load: action.payload,
    }),
    [RES_DATA_SUCCESS]: (state, action) => ({
      ...state,
      res_data: action.payload.count,
    }),
    [RES_DATA_FAIL]: (state, action) => ({
      ...state,
      res_fail: action.payload,
    }),

    //리뷰목록 출력
    [REVIEW_DATA_LOAD]: (state, action) => ({
      ...state,
      review_data_load: action.payload,
    }),
    [REVIEW_DATA_SUCCESS]: (state, action) => ({
      ...state,
      review_Data: action.payload,
    }),
    [REVIEW_DATA_FAIL]: (state, action) => ({
      ...state,
      review_data_fail: action.payload,
    }),

    //전체 리뷰목록 모달
    [ALL_REVIEW_MODAL_OPEN]: (state, action) => ({
      ...state,
      all_review_modal: true,
    }),
    [ALL_REVIEW_MODAL_CLOSE]: (state, action) => ({
      ...state,
      all_review_modal: false,
    }),
  },

  initialState
);
