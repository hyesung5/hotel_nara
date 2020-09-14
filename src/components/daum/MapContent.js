/*global kakao*/
import React, { Component } from "react";
import styled from "styled-components";


class MapContent extends Component {
    componentDidMount() {
        const script = document.createElement("script");
        script.async = true;
        script.src =
          "https://dapi.kakao.com/v2/maps/sdk.js?appkey=f014a90edbbdc49ac7d1248ce2e05465&autoload=false&libraries=services";
        document.head.appendChild(script);
    
        script.onload = () => {
          kakao.maps.load(() => {
            let container = document.getElementById("Mymap");
            let options = {
              center: new kakao.maps.LatLng(37.506502, 127.053617),
              level: 7,
            
            };
    

            // 지도에 마커를 표시합니다
           

            const map = new window.kakao.maps.Map(container, options);
            let marker = new kakao.maps.Marker({ 
                // 지도 중심좌표에 마커를 생성합니다 
                position: map.getCenter() 
            }); 
            marker.setMap(map);

            var geocoder = new window.kakao.maps.services.Geocoder();

            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(this.props.address, function(result, status) {
            
                // 정상적으로 검색이 완료됐으면 
                 if (status === kakao.maps.services.Status.OK) {
            
                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            
                    // 결과값으로 받은 위치를 마커로 표시합니다
                    var marker = new kakao.maps.Marker({
                        map: map,
                        position: coords
                    });
            
                    // 인포윈도우로 장소에 대한 설명을 표시합니다
                    // var infowindow = new kakao.maps.InfoWindow({
                    //     content: '<div style="width:150px;text-align:center;padding:6px 0;"></div>'
                    // });
                    // infowindow.open(map, marker);
            
                    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                    map.setCenter(coords);
                } 
            });    

          });
        };
      }
  
    render() {
      return <MapContents id="Mymap"></MapContents>;
    }
  }

const MapContents = styled.div`
  width: 600px;
  height: 500px;
`;

export default MapContent;