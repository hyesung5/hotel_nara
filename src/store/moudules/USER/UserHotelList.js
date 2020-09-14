import {createAction, handleActions} from 'redux-actions';
import axios from 'axios';


//호텔 목록 출력
const USER_PAGE_LIST_LOAD= "USER_PAGE_LIST_LOAD";
const USER_PAGE_LIST_LOAD_SUCCESS="USER_PAGE_LIST_LOAD_SUCCESS";
const USER_PAGE_LIST_LOAD_FAIL="USER_PAGE_LIST_LOAD_FAIL";
const userpageload =createAction(USER_PAGE_LIST_LOAD, (bool)=> bool);
const userpagesuccess=createAction(USER_PAGE_LIST_LOAD_SUCCESS, (data)=> data);
const userpagefail=createAction(USER_PAGE_LIST_LOAD_FAIL, (err)=> err);

//초기화
const CLEAN="CLEAN";
export const clean = createAction(CLEAN);

//지역 변경
const LOCATION_CHANGE="LOCATION_CHANGE";
export const location_change=createAction(LOCATION_CHANGE, (data)=> data);

//업종 변경
const KIND_CHANGE ="KIND_CHANGE";
export const kindchange = createAction(KIND_CHANGE, (data)=> data);

//검색어
const SEARCH_VALUE_CHANGE="SEARCH_VALUE_CHANGE";
export const search_value_change= createAction(SEARCH_VALUE_CHANGE, ({key, value}) => ({key, value}));


//호텔목록 출력
export const getHootelslist =(param, conmfig) => async (dispatch) =>{
    dispatch(userpageload(true));
    try{
        const {data} = await axios.post('/userHotelslist', param);
        dispatch(userpagesuccess(data));
    }catch( e){
        dispatch(userpagefail(e));
    }
    dispatch(userpageload(false));
};



const initalState ={
    user_hotels_list:[], //호텔 목록
    user_hotels_load:false, //호텔 목록 bool값
    user_hotels_fail:'', //호텔목록 출력 에러
    hotel_location:'', //호텔 지역
    hotel_image: [], //호텔 이미지
    kind:'', //업종
    search_text:'' //검색어
};


export default handleActions ({
    [USER_PAGE_LIST_LOAD]:(state, action)=>({
        ...state,
        user_hotels_load: !state.user_hotels_load
    }),
    [USER_PAGE_LIST_LOAD_SUCCESS]: (state, action)=>({
        ...state,
        user_hotels_list: action.payload,
    }),
    [USER_PAGE_LIST_LOAD_FAIL]: (state, action)=>({
        ...state,
        user_hotels_fail: action.payload
    }),
    [CLEAN]: (state, action)=>({
        ...state,
        user_hotels_list:[],
        user_hotels_load:false,
        user_hotels_fail:'',
        hotel_location:'',
        search_text:'',
    }),
    [LOCATION_CHANGE]: (state, action) => ({
        ...state,
        hotel_location: action.payload
    }),
    [KIND_CHANGE]: (state, action) => ({
        ...state,
        kind: action.payload
    }),
    [SEARCH_VALUE_CHANGE]:(state, action) => ({
        ...state,
        [action.payload.key]:action.payload.value
    })
}
,initalState

);