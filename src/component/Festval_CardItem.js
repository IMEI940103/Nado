import "./css/Festval_CardItem.css";
import CardItem_Map from "./CardItem_Map";
import moment from "moment";
import { useState } from "react";

const Festval_card_item = (props) => {

  const {title, eventstartdate, eventenddate, addr1, addr2, firstimage , mapx, mapy, tel} = props.cardItem;
  
  /* 기간 YYYY.MM.DD 형식으로 변환  
    const startyear = eventstartdate.substring(0,4);
    const startmonth = eventstartdate.substring(4,6);
    const startday = eventstartdate.substring(6,8);

    const startdate = [startyear,startmonth,startday].join(".");

    const endyear = eventenddate.substring(0,4);
    const endmonth = eventenddate.substring(4,6);
    const endday = eventenddate.substring(6,8);

    const enddate = [endyear,endmonth,endday].join(".");
  */
  
  // 축제 상태
  let condistion = "";

  //Date 객체의 month 변수는 0~11 로 12월을 구분하기때문에 12월 입력을 원할시 -1 시켜줘야함.
  const festvalStartDate = moment(eventstartdate);
  const festvalEndDate = moment(eventenddate);
  const today = props.today;
   
  //행사 중 조건문 -> 오늘이 시작일보다 같거나 크고, 종료일보다 작거나 같을때
  if(today.isAfter(festvalStartDate) && today.isBefore(festvalEndDate.clone().add(1,"days"))) { condistion = "행사 중"; }
  // 행사 종료 조건문 -> 오늘이 종료일보다 이후일때  
  else if(today.isAfter(festvalEndDate)) { condistion = "행사 종료"; }
  else { condistion = "준비 중" };

  //즐겨찾기설정? 알람설정? 비활성
  const [star,setStar] = useState("blackStar");
  const starControll = () => {
    if(star === "blackStar") { setStar("yellowStar"); }    
    else  { setStar("blackStar"); }
  }
  
  // 지도 온/오프 설정하기
  const [mapOpen, mapClose] = useState(false);

  const mapCondition = () => {
    if(mapOpen === false){ mapClose(true); }
    else{ mapClose(false); }
  }
  
  return(
        <div className='cardList_item'>
          <div style={{opacity: condistion === "행사 종료"? 0.5 : 1}}>
            <img className='itemImage' src={firstimage !== ""? firstimage : "/image/ImgPre.jpeg"} alt="com" />
            <ul className="itemInfo">
              <li className="itemAlram">
                  <span>{condistion}</span>
                  <a className={star}  onClick={starControll}></a>
              </li>              
              <li className="itemTitle">
                  {title}
              </li>                
              <li className="itemDate">
                <span className="sub">기간</span>                  
                <span>{festvalStartDate.format("YYYY.MM.DD")}</span>~<span>{festvalEndDate.format("YYYY.MM.DD")}</span>                  
              </li>
              <li className="itemAddress">
                <span className="sub">장소</span>                  
                <span>{addr1} {addr2}</span>                  
              </li>
              <li className="itemLink">
                <a className="itemMap" onClick={mapCondition}>지도보기</a>
                <a className="itemHome" href="#" dangerouslySetInnerHTML={{__html : tel}}></a>
              </li>
            </ul>              
          </div>
          <CardItem_Map mapx={mapx} mapy={mapy} mapOpen={mapOpen}></CardItem_Map>
        </div>        
    );
};

export default Festval_card_item;