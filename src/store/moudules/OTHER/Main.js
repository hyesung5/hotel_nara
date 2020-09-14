import { createAction, handleActions } from "redux-actions";
import axios from "axios";

//메인 페이지 호텔목록 출력
const MAIN_LOADING = "MAIN_LOADING";
const MAIN_SUCCESS = "MAIN_SUCCESS";
const MAIN_FAILE = "MAIN_FAILE";

const loading = createAction(MAIN_LOADING, (bool) => bool);
const success = createAction(MAIN_SUCCESS, (data) => data);
const faile = createAction(MAIN_FAILE, (err) => err);

export const DataThunk = () => async (dispatch) => {
  dispatch(loading(true));
  try {
    const { data } = await axios.get("/main");
    dispatch(success(data));
  } catch (e) {
    dispatch(faile(e));
  }
  dispatch(loading(false));
};

const initialState = {
  loging: false, //호텔 목록 bool 값
  error: null, //목록 출력 실패시 에러
  Seoul_list: [], // 서울지역 호텔 목록
  Busan_list: [], // 부산지역 호텔 목록
  Incheon_list: [], // 인천지역 호텔 목록
  Gangwon_list: [], // 강원지역 호텔 목록
  Gyeongsang_list: [], // 경상도지역 호텔 목록
  Jeolla_list: [], // 전라도지역 호텔 목록
  Chungcheong_list: [], // 충청도지역 호텔 목록
  Jeju_list: [], // 제주도지역 호텔 목록
};
export default handleActions(
  {
    [MAIN_LOADING]: (state, action) => ({
      ...state,
      loading: action.payload,
    }),
    [MAIN_SUCCESS]: (state, action) => ({
      ...state,
      loading: false,
      Seoul_list: action.payload.filter((c) => c.LOCATION === "Seoul"),
      Busan_list: action.payload.filter((c) => c.LOCATION === "Busan"),
      Incheon_list: action.payload.filter((c) => c.LOCATION === "Incheon"),
      Gangwon_list: action.payload.filter((c) => c.LOCATION === "Gangwon"),
      Gyeongsang_list: action.payload.filter(
        (c) => c.LOCATION === "Gyeongsang"
      ),
      Jeolla_list: action.payload.filter((c) => c.LOCATION === "Jeolla"),
      Chungcheong_list: action.payload.filter(
        (c) => c.LOCATION === "Chungcheong"
      ),
      Jeju_list: action.payload.filter((c) => c.LOCATION === "Jeju"),
      error: null,
    }),
    [MAIN_FAILE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },
  initialState
);
