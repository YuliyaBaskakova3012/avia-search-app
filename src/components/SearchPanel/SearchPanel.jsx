import { useEffect, useState } from 'react';
import style from './SearchPanel.module.css';
export const SearchPanel=({initialData, displayedData, changeDisplayedData, changeCurrentPage})=>{
let caption=a=>a.flight.carrier.caption;
let amount=a=>a.flight.price.total.amount;
let segmentsLength0=a=>a.flight.legs[0].segments.length;
let segmentsLength1=a=>a.flight.legs[1].segments.length;
let duration0=i=>i.flight.legs[0].duration;
let duration1=i=>i.flight.legs[1].duration;
let minPrice=(j)=>{
return Math.min(...initialData.filter(i=>caption(i)===j).map(k=>+amount(k))); 
}
let avia=[...new Set(initialData.map(i=>caption(i)))];
 
//Изменение отображаемых данных
const changeDisplayedData1=( sortedD, t1, t2, t3)=>{
let arr=[...t1, ...t2, ...t3]
.filter(i=>((t1.includes(i)&&t2.includes(i)&&t3.includes(i))
||(t1.includes(i)&&!t2.length&&!t3.length)
||(t1.includes(i)&&t2.includes(i)&&!t3.length)
||(t1.includes(i)&&t3.includes(i)&&!t2.length)
||(t2.includes(i)&&t3.includes(i)&&!t1.length)
||(t2.includes(i)&&!t1.length&&!t3.length)
||(t3.includes(i)&&!t1.length&&!t2.length)));
if(!sortedD.length&&!arr.length&&!t1.length&&!t2.length&&!t3.length&&priceValueFrom===''&&priceValueTo===''){  
return initialData;
}else if(!arr.length&&!t1.length&&!t2.length&&!t3.length&&(priceValueFrom!==''||priceValueTo!=='')){
return [];
}else if(!arr.length&&(t1.length||t2.length)){
return [];
}else if(!sortedD.length&&arr.length){
let changeFilteredData=(a)=>{
let filteredData=initialData.filter(i=>a.includes(i.flightToken));
return filteredData;
}
let data1=changeFilteredData(arr);
return data1;
}else if(sortedD.length&&!arr.length&&!t1.length&&!t2.length&&!t3.length&&priceValueFrom===''&&priceValueTo===''){
return sortedD;
}else if(sortedD.length&&arr.length){
let changeFilteredData=(a)=>{
let filteredData=sortedD.filter(i=>a.includes(i.flightToken));
return filteredData;
}
let data1=changeFilteredData(arr);
return data1;
}
} 

//Получение отсортированных данных
const getsortData=(sortDirection)=>{
if(sortDirection==='up'){
let sortAscData=[...initialData].concat().sort((a, b)=>+amount(a)- +amount(b))
return sortAscData;
}else if(sortDirection==='down'){
let sortDesData=[...initialData].concat().sort((a, b)=>+amount(b)- +amount(a))
return sortDesData;
}else if(sortDirection==='time'){
let sortTimeData=[...initialData].concat().sort((a, b)=>(duration0(a)+duration1(a))-(duration0(b)+duration1(b)))
return sortTimeData;
}else{
return [];
}
}
//Получение массива названий выбранных авиакомпаний
const filterAviaHelp=(ch, val)=>{
const checkBoxes=[...aviaValue];
if(ch){
checkBoxes.push(val);
}else{
const index=checkBoxes.findIndex(i=>i===val);
checkBoxes.splice(index, 1)
}
filterAviaValue(checkBoxes);
}
//Изменение значения цены в поле "От"
const priceValueFromHandler=event=>{
setPriceValueFrom(event.target.value) 
}
//Изменение значения цены в поле "До"
const priceValueToHandler=event=>{
setPriceValueTo(event.target.value) 
}
//Получение массива значений flightToken при изменении значений цены в полях "От" и "До"
const priceFilter=(from, to)=>{
let arr=[];
if(from===''&&to===''){
changefromToToken([]);
}else if(from!==''&&to!==''){
arr=initialData.filter(i=>+amount(i)>=from&&+amount(i)<=to).map(i=>i.flightToken);
changefromToToken(arr); 
}
else if(from===''&&to!==''){
arr=initialData.filter(i=>+amount(i)<=to).map(i=>i.flightToken);
changefromToToken(arr);
}else if(from!==''&&to===''){
arr=initialData.filter(i=>+amount(i)>=from).map(i=>i.flightToken);
changefromToToken(arr);
}
}
//Получение массива значений flightToken при изменении необходимого количества пересадок             
const searchFiltered=(numTrans1, numTrans2)=>{
let a;
if(numTrans1===true&&numTrans2===true){
a=initialData.filter(i=>segmentsLength0(i)-1+segmentsLength1(i)-1===1||segmentsLength0(i)-1+segmentsLength1(i)-1===0).map(i=>i.flightToken); 
}else if(numTrans1===false&&numTrans2===true){
a=initialData.filter(i=>segmentsLength0(i)-1+segmentsLength1(i)-1===1).map(i=>i.flightToken); 
}else if(numTrans1===true&&numTrans2===false){
a=initialData.filter(i=>segmentsLength0(i)-1+segmentsLength1(i)-1===0).map(i=>i.flightToken); 
}else if(numTrans1===false&&numTrans2===false){
a=[];
}
return a;
}
//Изменение направления сортировки                   
const changeSortDirectionHandler=(val)=>{
changeSortDirection(val);
}     
//Изменение требуемого количества пересадок
const filterF0Handler=(ch)=>{
filterF0(ch);
}
const filterF1Handler=(ch)=>{
filterF1(ch);
}
//Включение и выключение чекбоксов раздела "Авиакомпании"
const changeAviaDisabled=(a)=>{
let arr=displayedData.filter(i=>(caption(i)===a));
let arr1=changeDisplayedData1(sortedData, transferToken, [], fromToToken).filter(i=>(caption(i)===a));
if((fromToToken.length||hasNoTransfer||hasOneTransfer)&&!aviaValueArrToken.length){
return !!!arr.length;
}else if((fromToToken.length||hasNoTransfer||hasOneTransfer)&&aviaValueArrToken.length){
return !!!arr1.length;
}
else{
return false;
}
}
//Включение и выключение чекбокса "без пересадок"
const changeDisabledNoTransfer=()=>{
let arr=displayedData.filter(i=>segmentsLength0(i)-1+segmentsLength1(i)-1===0);
if(!displayedData.length&&!aviaValueArrToken.length&&!fromToToken.length){
return false;
}else if(aviaValueArrToken.length||fromToToken.length){
return !!!arr.length;
}
}
//Включение и выключение чекбокса "1 пересадка"
const changeDisabledOneTransfer=()=>{   
let arr=displayedData.filter(i=>segmentsLength0(i)-1+segmentsLength1(i)-1===1);
if(!displayedData.length&&!aviaValueArrToken.length&&!fromToToken.length){
return false;
}
if(!displayedData.length&&(aviaValueArrToken.length||fromToToken.length)){
return false;
}else if(aviaValueArrToken.length||fromToToken.length){
return !!!arr.length;
}
}
//Изменение заполнителя в поле "От" раздела "Цена"
const priceValueFromPlaceHolder=()=>{
let placeholder;
if(displayedData.length){
placeholder=Math.min(...displayedData.map(i=>amount(i)));
}else{
placeholder=Math.min(...initialData.map(i=>amount(i)));
}
return placeholder;
}
//Изменение заполнителя в поле "До" раздела "Цена"
const priceValueToPlaceHolder=()=>{
let placeholder;
if(displayedData.length){
placeholder=Math.max(...displayedData.map(i=>amount(i)));
}else{
placeholder=Math.max(...initialData.map(i=>amount(i)));
}
return placeholder;
}
         
const [priceValueFrom, setPriceValueFrom]=useState('');
const [priceValueTo, setPriceValueTo]=useState('');
const [fromToToken, changefromToToken]=useState([]);

const [aviaValue, filterAviaValue]=useState([]);
const [aviaValueArrToken, filterAviaChangeToken]=useState([]);

const [hasNoTransfer, filterF0]=useState(false);
const [hasOneTransfer, filterF1]=useState(false);
const [transferToken, changeTransferToken]=useState([]);

const [sortedData, changeSortedData]=useState([]);
const [sortDirection, changeSortDirection]=useState([]);


useEffect(() => {
let dispD=changeDisplayedData1(sortedData, transferToken, aviaValueArrToken, fromToToken);
changeDisplayedData(dispD);
//eslint-disable-next-line react-hooks/exhaustive-deps
}, [transferToken, aviaValueArrToken, fromToToken, sortedData]);

useEffect(() => {
if(sortDirection){
let d=getsortData(sortDirection);
changeSortedData(d);
}
//eslint-disable-next-line react-hooks/exhaustive-deps
}, [sortDirection]);

useEffect(() => {
changeCurrentPage(1)
//eslint-disable-next-line react-hooks/exhaustive-deps
}, [displayedData]);

useEffect(() => {
let f=initialData.filter(i=>aviaValue.includes(caption(i))).map(i=>i.flightToken);
filterAviaChangeToken(f);
//eslint-disable-next-line react-hooks/exhaustive-deps
}, [aviaValue]);

useEffect(() => {
let f1=searchFiltered(hasNoTransfer, hasOneTransfer);
changeTransferToken(f1); 
//eslint-disable-next-line react-hooks/exhaustive-deps
}, [hasNoTransfer, hasOneTransfer]);

useEffect(() => {
priceFilter(priceValueFrom, priceValueTo);
//eslint-disable-next-line react-hooks/exhaustive-deps
}, [priceValueFrom, priceValueTo]);
      
  return (
  <div className={style.search}>
  <div></div>
  <div><b>Сортировать</b></div>
  <div><input type='radio' name='radio' value='up' onChange={(e)=>changeSortDirectionHandler(e.target.value)}/><label htmlFor='radio'> - по возрастанию цены</label></div>
  <div><input type='radio' name='radio' value='down' onChange={(e)=>changeSortDirection(e.target.value)}/><label htmlFor='radio'> - по убыванию цены</label></div>
  <div><input type='radio' name='radio' value='time' onChange={(e)=>changeSortDirection(e.target.value)}/><label htmlFor='radio'> - по времени в пути</label></div>
  <div><b>Фильтровать</b></div>
  <div><input type='checkbox'  onChange={(e)=>filterF1Handler(e.target.checked)} disabled={changeDisabledOneTransfer()}/> - 1 пересадка</div>
  <div><input type='checkbox' onChange={(e)=>filterF0Handler(e.target.checked)} disabled={changeDisabledNoTransfer()}/> - без пересадок</div>
  <div><b>Цена</b></div>
  <div><div>От</div><div><input type='number' onChange={priceValueFromHandler}  placeholder={priceValueFromPlaceHolder()}/></div></div>
  <div><div>До</div><div><input type='number' onChange={priceValueToHandler}  placeholder={priceValueToPlaceHolder()}/></div></div>
  <div><b>Авиакомпании</b></div>
  {avia.map(i=>(
  <div key={i}><input type='checkbox'  name='avia' value={i} onChange={(e)=>filterAviaHelp(e.target.checked, e.target.value)} disabled={changeAviaDisabled(i)}/><label htmlFor='avia'> - {i} от {minPrice(i)} р.</label></div>
  ))} 
  <div></div>
  </div>
  );
}
export default SearchPanel;
