import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./css/Festval_Serch.css";

/*
class Festval_serch_details extends Component{
  
  constructor(props){
  
    super(props);

    const month = Date();

    this.state = {
      area : '전국',
      area_selected : false,
      default_month : month + "월",
      month_selected : false
    };
  
  }// constructor close;

  render() {
    const {area, default_month} = this.state;
    
    return (
      <div className='search_box'>
        <div className='search_class'>           
          <button id='class_ground' onClick={()=>{this.setState({area_selected : true});}} className='select_box'>{area}</button>
          <button id='class_date' className='select_box'>{default_month}</button>                       
          <div id="select_hidden"></div>
        </div>          
        <div className='thema_class'>
          <div id="class_thema1" className='thema_box'>계절테마1</div>
          <div id="class_thema2" className='thema_box'>계절테마2</div>
          <div id="" className='thema_box'>계절테마3</div>
          <div id="class_thema4" className='thema_box'>계절테마4</div>
        </div>
      </div>        
    );

  }//render close


}// class close
*/
/*
const Festval_serch_details = () => {
  const [defaultArea, area] = useState("전국");
  const date = "월별";

  const [open_area,close_Area] = useState();
  const [open_date,close_Date] = useState();

  //const onClickSelected_area = () => onClickItem();
  //const onClickSelected_date = () => onClickItem();
  
  const id = useRef();

  const onClickItem = () =>{   
    console.log(id.current.innerText);
    area(id.current.innerText);
  }

  return(
    <div className='search_box'>
        <div className='search_class'>                     
          <button id='class_ground' className='select_button'>{defaultArea}</button>
          <button id='class_date' className='select_button'>{date}</button>                       
          <div id="select_hidden">
            <ul id="area_selete">
              
              <li className="select_item" onClick={onClickItem} ref={id}>전국</li>
              <li className="select_item" onClick={onClickItem} ref={id}>서울</li>
              <li className="select_item" onClick={onClickItem} ref={id}>인천</li>
              <li className="select_item" onClick={onClickItem} ref={id}>대전</li>
              <li className="select_item" onClick={onClickItem} ref={id}>대구</li>
              <li className="select_item" onClick={onClickItem} ref={id}>광주</li>
              <li className="select_item" onClick={onClickItem} ref={id}>부산</li>
              
            </ul>
          </div>  
        </div>          
        
        <div className='thema_class'>
          <div id="class_thema1" className='thema_box'>계절테마1</div>
          <div id="class_thema2" className='thema_box'>계절테마2</div>
          <div id="" className='thema_box'>계절테마3</div>
          <div id="class_thema4" className='thema_box'>계절테마4</div>
        </div>
      </div>
  );

};// Festval_search_detauls close
*/
const Festval_serch_details = (props) => {

  const [defaultArea, area] = useState("지역");
  const defaultDate = "월별";

  const [isSelect,setIsSelect] = useState(0); // 드롭메뉴_셀렉트
  const [isCalender,setIsCalender] = useState(0); // 드롭메뉴_캘린더

  const onClickCheck = (e) =>{        
    let divIdValue = e.target.id;

    if(divIdValue === "class_ground"){
      if(isCalender === 1) { 
        setIsSelect(1);
        return setIsCalender(0); 
      }
      else { 
        setIsCalender(0);
        return setIsSelect(1); 
      }
    }
    else if(divIdValue ==="class_date"){      
      if(isSelect === 1){ 
        setIsCalender(1);
        return setIsSelect(0); 
      }
      else{ 
        setIsSelect(0);
        return setIsCalender(1); 
      }      
    }
    else{ alert("잘못된 접근!"); }
  }

  // 월별 검색. 
  // 월별 검색 ---> 월 변경
  const [choiseMonth, setChoiseMonth] = useState((props.today.month()+1));
  // 선택한 월 CSS변경
  const monthSelection = (value) =>{    
    props.onMonthCodeChange(value);
    setChoiseMonth(value);
  }
  // 월별 스크롤 이동
  const monthRef = useRef();
  useEffect(() => {monthRef.current?.scrollIntoView({behavior: 'smooth'})},[]);
  
  
  
  // 지역별 검색.
  const areaSelection = (e) =>{
    setIsSelect(0);        
    const target = e.target;
    
    area(target.innerText);    
    //console.log("지역코드 변경합니다 ---> " + e.target.value);    
    props.onAreaCodeChange(target.value);
    
  }
  // 지역별 검색 ---> 지역코드 변경 
  const [areaCodes, setAreaCodes] = useState(null);
  /* 지역분류 코드 api로 받아오기  
  useEffect(() => {
    const Loging = async() => { // async를 사용하는 함수 따로 선언  

        const baseUrl = "http://apis.data.go.kr/B551011/KorService1/areaCode1";
        //const serviceKey = "";
        const serviceKey = "";
        const MobileOS = "ETC";
        const MobileApp = "Nado";            
        const type = "json";
        
        try{
          const response = await axios.get(
            baseUrl
            + "?serviceKey=" + serviceKey //인증키
            + "&MobileOS=" + MobileOS //OS 구분
            + "&MobileApp=" + MobileApp // 서비스명     
            + "&numOfRows=100" // 한 페이지에 보여 줄 개수
            + "&_type=" + type // Response 객체 타입 (기본 : XML)
          );        

          console.log(response.data);
          setAreaCode(response.data.response.body.items.item);
        }catch(e){      
          console.log(e);
        }
      };
      Loging();
},[]);
  if(!areaCode){ return "null"; }
*/

  // 지역분류 코드 Json파일로 가져오기
  useEffect(() => {    
    const fetchCode = async () => {
      const response = await fetch("/AreaCode.json"); // 간단한 작업에서는 fetch.
      const result = await response.json();
      setAreaCodes(result.data);
    };

    fetchCode();

  },[]);

  if(!areaCodes){     
    return new Array();
  }
 
  return(
    <div className='search_box'>
        <div className='search_class'>
          <div className='button_section'>
            <a id='class_ground' className='select_button' onClick={onClickCheck}>{defaultArea}</a>
            <a id='class_date' className='select_button' onClick={onClickCheck}>{defaultDate}</a>                       
          </div>
          <div id="select_hidden">
            <ul id="area_selete" style={{display: isSelect ? "block" : "none"}}>                 
              {areaCodes.map((item) => (
                  <li className="select_item" onClick={areaSelection} value={item.code}>{item.name}</li>
                )
              )}                                     
            </ul>
            <div id="date_calender" style={{display: isCalender ? "block" : "none"}}>
              <ul className="calender_date calender_years">
                <li className="calender_item years_item">{props.today.years()}</li>                
              </ul>
              <ul className="calender_date" ref={monthRef}>
                {[...Array(12)].map((t, idx) => {                  
                  return <li key={idx} className={`calender_item ${choiseMonth === idx + 1 ? "choise_calender" : ""}`} onClick={() => monthSelection(idx + 1)}> {idx + 1}월 </li>
                })}                
                
              </ul>
              
            </div>
          </div>  
        </div>          
      </div>
  );

};// Festval_search_detauls close


export default Festval_serch_details;