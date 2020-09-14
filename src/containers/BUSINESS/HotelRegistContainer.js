import React , {Component} from 'react';
import {connect} from 'react-redux';
import HotelregistPage from '../../components/buisness/hotel_regist';
import HeaderPage from "../../components/header/header";
import {valuechange, filechnage, editorChange, checkedChange, modalchangeOpen, daumaddress, modalchangeClose, hotelRegist, stateClean} from '../../store/moudules/BUSINESS/Hotelregist';

class HotelRegistContainer extends Component {

    componentWillUnmount(){
        const{stateClean}=this.props;

        stateClean();
    }
    //value 변경
    handleChenge=(e) => {
        const {valuechange}= this.props;
        const { name, value } = e.target;

        console.log(name);
        console.log(value);
        valuechange({key: name, value});
    };
    //체크값 변경
    checkboxChange=(e)=>{
        const {checkedChange}= this.props;
        const { name, checked } = e.target;
         checkedChange({key: name, checked});
    }
    //에디터값 변경
    handleEditorchange =(data) => {
        const {editorChange} = this.props;

        editorChange(data);
    }
    //모달창 열기
    handleModalopen=()=> {
        const {modalchangeOpen}= this.props;
        modalchangeOpen();
    }
    //모달창 닫기
    handleModalclose=()=> {
        const {modalchangeClose}= this.props;
        modalchangeClose();
    }
    //주소값 입력
    handleDaumaddress= (address, zonecode) => {
        const {daumaddress}= this.props;

        daumaddress({address, zonecode});

    }

    //업체 등록
    handleHotelreg=(formData, config)=> {
    const url= "/hotel_reg";
        const {hotelRegist} = this.props;
        hotelRegist(url ,formData, config).then((res)=>{
            if (res === 1) {
                alert("호텔정보 등록이 완료되었습니다.");
                this.props.history.push("/");
              } else {
                alert("호텔 등록에 실패했습니다.");
              }
    });};


    //뒤로가기
    goBack = ()=> {
        this.props.history.goBack();
    }
    
    render(){
        const {hotelName, hotelInfo, addRess,
            spa,
            restaurant,
            banquethall,
            parkinglot,
            buffet,
            desk,
            bar,
            Luggage,
            fitness,
            sauna,
            wifi,
            CoffeeShop,
            Paidlaundry,
            Smokingarea,
            Amenities,
            business,
            Breakfast,
            Modalopen,
            zonecode,
            addRess2,
            location,
            accommodation_type,
            register,
            thumbnail,
            filechnage
        }= this.props;
        return(
            <div style={{background:"antiquewhite"}}>
            <HeaderPage />

          
            <HotelregistPage 
            onhandleChenge={this.handleChenge}
            hotelName={hotelName}
            hotelInfo={hotelInfo} 
            addRess={addRess}
            spa={spa}
            restaurant={restaurant}
            banquethall={banquethall}
            parkinglot={parkinglot}
            buffet={buffet}
            desk={desk}
            bar={bar}
            Luggage={Luggage}
            fitness={fitness}
            sauna={sauna}
            wifi={wifi}
            CoffeeShop={CoffeeShop}
            Paidlaundry={Paidlaundry}
            Smokingarea={Smokingarea}
            Amenities={Amenities}
            business={business}
            Breakfast={Breakfast}
            Modalopen={Modalopen}
            zonecode={zonecode}
            addRess2={addRess2}
            location={location}
            register={register}
            thumbnail={thumbnail}
            accommodation_type={accommodation_type}
            oneditorChange={this.handleEditorchange}
            oncheckChange={this.checkboxChange}
            onModalopen={this.handleModalopen}
            onModalclose={this.handleModalclose}
            onaddressChange={this.handleDaumaddress}
            onHotelsubmit={this.handleHotelreg}
            filechnage={filechnage}
            goBack={this.goBack}
            />
            </div>
        );
    }
}

const mapStateToProps =(state) => ({
    hotelName: state.Hotelregist.hotelName,
    hotelInfo: state.Hotelregist.hotelInfo,
    addRess: state.Hotelregist.addRess,
    spa:state.Hotelregist.spa,
      restaurant:state.Hotelregist.restaurant,
      banquethall:state.Hotelregist.banquethall,
      parkinglot:state.Hotelregist.parkinglot,
      buffet:state.Hotelregist.buffet,
      desk:state.Hotelregist.desk,
      bar:state.Hotelregist.bar,
      Luggage:state.Hotelregist.Luggage,
      fitness:state.Hotelregist.fitness,
      sauna:state.Hotelregist.sauna,
      wifi:state.Hotelregist.wifi,
      CoffeeShop:state.Hotelregist.CoffeeShop,
      Paidlaundry:state.Hotelregist.Paidlaundry,
      Smokingarea:state.Hotelregist.Smokingarea,
      Amenities:state.Hotelregist.Amenities,
      business:state.Hotelregist.business,
      Breakfast:state.Hotelregist.Breakfast,
      Modalopen:state.Hotelregist.Modalopen,
      zonecode: state.Hotelregist.zonecode,
      addRess2: state.Hotelregist.addRess2,
      location: state.Hotelregist.location,
      accommodation_type: state.Hotelregist.accommodation_type,
      register:state.Hotelregist.register,
      thumbnail:state.Hotelregist.thumbnail

});

const mapDispatchToProps = {
    valuechange,
    editorChange,
    checkedChange,
    modalchangeOpen,
    modalchangeClose,
    daumaddress,
    hotelRegist,
    filechnage,
    stateClean
};

export default connect(mapStateToProps, mapDispatchToProps)(HotelRegistContainer);