
import moment, { months } from "moment";
import "./css/Festval_CardList.css";
import Festval_CardItem from "./Festval_CardItem.js";

import axios from "axios";
import { useEffect, useState } from "react";

const Festval_CardList = (props) =>{
    
    // ip 값 가져오기
    const [ip,setIp] = useState(null);
    useEffect(()=> {
        axios.get("https://api64.ipify.org?format=json")
          .then(response => {setIp(response.data.ip)})
          .catch(error => {console.error("Error fetching IP adress : ",error)})
      },[]);
      
      // Naver GeoLocation. ip값으로 주소가져오기
      

      useEffect(()=> {
        axios.get(
          "/?ip="+ip+"&enc=utf8&responseFormatType=json",
          {
            headers : {
              "x-ncp-apigw-timestamp": new Date().getTime().toString(), //1970년 1월 1일 00:00:00 협정 세계시(UTC)부터의 경과 시간을 밀리초(Millisecond)로 나타내며 API Gateway 서버와 시간 차가 5분 이상 나는 경우 유효하지 않은 요청으로 간주
              
              
              
              
              
              "x-ncp-iam-access-key": "", //네이버 클라우드 플랫폼 포털에서 발급받은 Access Key ID 값
              "x-ncp-apigw-signature-v2": "" //Access Key ID 값과 Secret Key로 암호화한 서명






            }
            // CORS(다른 도메인에서의 요청을 허용하기)
            // package.json 파일에서 proxy설정  
          }
        ).then((response) => console.log(response))
        .catch(error => console.error("Naver GeoLocation error : ",error))
      },[ip])

    const [cardItems, setCardItems] = useState(null);
    
    useEffect(() => {
        const Loging = async() => { // async를 사용하는 함수 따로 선언

          const today = props.today;            
            const baseUrl = "http://apis.data.go.kr/B551011/KorService1/searchFestival1";
            //const serviceKey = "";





            const serviceKey = ""; //공공데이터 서비스key 값




            
            const MobileOS = "ETC";
            const MobileApp = "Nado";            
            let month = props.monthCode; // 사용자 선택에 따라 월별 구분.
            if(month < 10) {month = "0" + month}
            //const eventStartDate = "20240101";
            const eventStartDate = today.year() + "" + month + "01";            
            const type = "json";
            
            try{
              const response = await axios.get(
                baseUrl
                + "?serviceKey=" + serviceKey //인증키
                + "&MobileOS=" + MobileOS //OS 구분
                + "&MobileApp=" + MobileApp // 서비스명
                + "&arrange=A" // 정렬구분 (A: 제목순 C: 수정일순 D: 생성일순 // 대표이미지가 반드시 있는 정렬 ---> O:제목순 Q:수정일순 R: 생성일순)
                + "&listYN=Y"  // 목록구분 (Y = 목록 , N = 개수)
                + "&pageNo=1" // 현재페이지 번호
                + "&numOfRows=100" // 한페이지 결과 수 
                + "&eventStartDate=" + eventStartDate // 검색할 축제 일정
                + "&_type=" + type // Response 객체 타입 (기본 : XML)
              );        
              
              //console.log(window.navigator.userAgent);
              
              setCardItems(response.data.response.body.items.item);                  
            }catch(e){      
              console.log(e);
            }
          };
          Loging();
    },[props.monthCode]); 
    //useEffect(... ,두번째 파라미터) --> 생략: 컴포넌트 업데이트할때마다 실행. [] : 컴포넌트가 마운트될때 한번만 실행. [변수명] :변수가 변경 될때마다 실행

    if(!cardItems){ // 축제리스트의 값이 null일때
      return null;
    }

    // 지역별로 축제 분류하기.
    let cloneCard = new Array();
    const today = props.today;

    if(cardItems){      // cardItems에 값이 있을시만 ture.                  
      for(let idx = 0; idx < cardItems.length ; idx++){
        if(props.areaCode === 0 && props.today.endOf('month').isAfter(moment(cardItems[idx].eventstartdate))){ // areaCode가 0(전국)이라면 지역 분류 필요 X
            cloneCard.push(cardItems[idx]);
          }
                
        // areaCode가 일치하는 것만 출력
        if(props.areaCode.toString() === cardItems[idx].areacode && props.today.endOf('month').isAfter(moment(cardItems[idx].eventstartdate))){ cloneCard.push(cardItems[idx]); }                 
        
      }
      //sort함수로 날짜 최신순으로 정렬
      cloneCard.sort((a,b) => moment(a.eventstartdate) < moment(b.eventstartdate) ? 1 :moment(a.eventstartdate) > moment(b.eventstartdate) ? -1 : 0);        
      //sort함수로 행사 진행중인 순으로 재정렬
      cloneCard.sort((a) => props.today < moment(a.eventenddate)? -1: props.today > moment(a.eventenddate)? 1 : 0);
      // 결과 = 행사 진행중 -->시작일기준 최신순 / 행사종료 --> 종료일기준 최신순
    }
    
    if(cloneCard.length === 0){
      return (
        <div className="card_list">
          <h1>{props.monthCode}월에 진행하는 행사가 없습니다.</h1>
        </div>
      );
    }
    else{
      return ( 
          <div className='card_list'>
              {cloneCard.map(cloneitem => (
                  <Festval_CardItem key={cloneitem.title} cardItem = {cloneitem} today = {props.today}/>//컨포넌트에서 today한번만 구하면 되게끔 설정.
              )
            )}                    
          </div>        
      )
    }
}

export default Festval_CardList;