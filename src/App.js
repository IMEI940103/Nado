import './App.css';
import Festval_Serch from "./component/Festval_Serch.js";
import Festval_CardList from "./component/Festval_CardList.js";
import moment from 'moment';
import { useState } from 'react';
import { NavermapsProvider } from 'react-naver-maps';
import React from 'react';



const App= () => {  

  const today = moment();
  let [areaCode, setAreaCode] = useState(0);
  let [monthCode, setMonthCode] = useState(today.month()+1);

  const onAreaCodeChange = (value) =>{ setAreaCode(value); }
  const onMonthCodeChange = (value) =>{ setMonthCode(value); }

  return (     
    <NavermapsProvider 
      ncpClientId='a303tgghr5' // or finClientId, govClientId  
    >
    <section id='main_conteiner'>
      <section className='left_box'></section> 
      <section className='right_box'>
        <Festval_Serch today = {today} onAreaCodeChange = {onAreaCodeChange} onMonthCodeChange = {onMonthCodeChange}/>
        <Festval_CardList today = {today} areaCode = {areaCode} monthCode = {monthCode} />
        
      </section>
    </section>    
    </NavermapsProvider>
    
  );
}

export default App;
