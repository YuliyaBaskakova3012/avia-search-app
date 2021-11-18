import style from './AviaSearchResults.module.css';
import AF from './assets/AF.png';
import AY from './assets/AY.png';
import AZ from './assets/AZ.png';
import BT from './assets/BT.png';
import KL from './assets/KL.png';
import LO from './assets/LO.png';
import PC from './assets/PC.png';
import SN from './assets/SN.png';
import SU1 from './assets/SU1.png';
import TK from './assets/TK.png';
import clock from './assets/wall-clock.png';
import ruble from './assets/ruble.png';
import { useEffect, useState } from 'react';
const logo={AF, AY, AZ, BT, KL, LO, PC, SN, SU1, TK};
export const AviaSearchResults=(props)=>{
let displayedData=props.displayedData;
const [buttonAddStatus, changeButtonAddStatus]=useState(true);
let displayedData1=displayedData.slice().splice(0, props.currentPage+1);
 const pagesCount=displayedData.length;
 const pagesCount1=displayedData1.length;
 
 let uid=i=>i.flight.carrier.uid;
 let amount=i=>i.flight.price.total.amount;
 let legs0=i=>i.flight.legs[0];
 let departureCity0=i=>legs0(i).segments[0].departureCity.caption;
 let departureAirportCaption0=i=>legs0(i).segments[0].departureAirport.caption;
 let departureAirportUid0=i=>legs0(i).segments[0].departureAirport.uid;
 let arrivalAirportCaption0=i=>legs0(i).segments[segmentsLength0(i)-1].arrivalAirport.caption;
 let arrivalAirportUid0=i=>legs0(i).segments[segmentsLength0(i)-1].arrivalAirport.uid;
 let departureDate0=i=>legs0(i).segments[0].departureDate;
 let duration0=i=>legs0(i).duration;
 let arrivalDate0=i=>legs0(i).segments[segmentsLength0(i)-1].arrivalDate;
 let segmentsLength0=i=>legs0(i).segments.length;
 let carrierCaption=i=>i.flight.carrier.caption;


 let segmentsLength1=i=>legs1(i).segments.length;
 let legs1=i=>i.flight.legs[1];
 let departureAirportCaption1=i=>legs1(i).segments[0].departureAirport.caption;
 let departureAirportUid1=i=>legs1(i).segments[0].departureAirport.uid
 let arrivalAirportCaption1=i=>legs1(i).segments[segmentsLength1(i)-1].arrivalAirport.caption;
 let arrivalAirportUid1=i=>legs1(i).segments[segmentsLength1(i)-1].arrivalAirport.uid;
 let departureDate1=i=>legs1(i).segments[segmentsLength1(i)-1].departureDate;
 let duration1=i=>legs1(i).duration;
 let arrivalDate1=i=>legs1(i).segments[segmentsLength1(i)-1].arrivalDate;


useEffect(() => {
 if(pagesCount===pagesCount1){
   changeButtonAddStatus(false)
 }else{
  changeButtonAddStatus(true)
 }
 //eslint-disable-next-line react-hooks/exhaustive-deps
}, [props.currentPage, props.displayedData]);

const getTime=(dateUTF8)=>{
  let hourMinutes=dateUTF8.split('T')[1].split(':');
  let time= `${hourMinutes[0]}:${hourMinutes[1]}`;
  return time;
}
const getDate=(dateUTF8)=>{
  const options={
    month: 'short',
    day: 'numeric',
    weekday: 'short'
  }
 let date=new Date(dateUTF8).toLocaleString('ru', options);
 return date;
}
  return (
  <div>

    {displayedData1.map(fl=>(
    <div key={fl.flightToken}>
    <div className={style.panel}>
    <div><img src={logo[uid(fl)]} alt='logo'/></div>
    <div>{amount(fl)} <img src={ruble} alt='ruble' style={{height: '14px', padding: '5px'}}/></div>
    <div>Стоимость для одного взрослого пассажира</div>
    </div>

<div className={style.air}>  
    <span>{departureCity0(fl)},   </span>  
    <span>{departureAirportCaption0(fl)}   </span>
    <span>({departureAirportUid0(fl)})   </span>
    <span>   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>   </span>
   <span>
     ЛОНДОН,   {arrivalAirportCaption0(fl)}   </span>
    <span>({arrivalAirportUid0(fl)})
    </span> 
     </div>

    <div className={style.hr1}><hr/></div>
    <div className={style.date}>
    <div>{getTime(departureDate0(fl))}<span className={style.date1}>{getDate(departureDate0(fl))}</span></div>
    <div><img className={style.clock} src={clock} alt='clock'/>{Math.floor(duration0(fl)/60)} ч {duration0(fl)%60} мин</div>
    <div><span className={style.date2}>{getDate(arrivalDate0(fl))}</span>{getTime(arrivalDate0(fl))}</div>
    </div>
   
    <div>
    {segmentsLength0(fl)-1?
    <div className={style.transfer}>
        <span><hr/></span>
        <span>{segmentsLength0(fl)-1} пересадка</span>
        <span><hr/></span>
    </div>
        :
    <div className={style.hr2}><hr/></div>}
    </div>
  <div className={style.s}>Рейс выполняет: {carrierCaption(fl)}</div>
  
  <div><hr className={style.hr3}/></div>
    <div className={style.air}>  
    <span>ЛОНДОН,   </span> 
    <span>{departureAirportCaption1(fl)}   </span>
    <span>({departureAirportUid1(fl)})</span>
    <span>   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
<path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>   </span>
<span>Москва, {arrivalAirportCaption1(fl)}</span>
<span> ({arrivalAirportUid1(fl)})</span>
    </div> 
    <div className={style.hr1}><hr/></div> 
    <div className={style.date}>
    <div>{getTime(departureDate1(fl))}<span className={style.date1}>{getDate(departureDate1(fl))}</span></div>
    <div><img className={style.clock} src={clock} alt='clock'/>{Math.floor(duration1(fl)/60)} ч {duration1(fl)%60} мин</div>
    <div><span className={style.date2}>{getDate(arrivalDate1(fl))}</span>{getTime(arrivalDate1(fl))}</div>
    </div>

    <div>
      {segmentsLength1(fl)-1?
      <div className={style.transfer}>
        <span><hr/></span>
        <span>{segmentsLength1(fl)-1} пересадка</span>
        <span><hr/></span>
        </div>
        :
        <div className={style.hr2}>
        <hr/>
      </div>}
  </div>
    <div className={style.s}>Рейс выполняет: {carrierCaption(fl)}</div>
    <button className={style.buttonPanel} >ВЫБРАТЬ</button>
</div>))}
{buttonAddStatus?<div className={style.divButtonAdd}><button className={style.buttonAdd} onClick={()=>props.changeCurrentPage(props.currentPage+2)}>Показать еще</button></div>:null}
</div>
  )
    }
export default AviaSearchResults;
