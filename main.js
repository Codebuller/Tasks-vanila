window.addEventListener('load', async () =>{
  if(navigator.serviceWorker)
  {
    try{
      const reg = await navigator.serviceWorker.register('/sw.js');
    }
    catch(e){
      console.log("SW register fail");
    }
  }
})
import { getLoc, getWether } from './public/script/APIs.js';
import { cloak } from './public/script/cloak.js'
import { Update, intallEv } from './public/script/events.js';

let sity,wetObj,icon,tempFeels,temp,tempDescription,lastUpdate;
const  Revalidate  = async () =>{
  await getLoc();
  await getWether(JSON.parse(window.localStorage.getItem('location')).loc);
   wetObj = JSON.parse(window.sessionStorage.getItem('wether'));
   cloak(Date.parse(wetObj.location.localtime) + (new Date() - new Date(wetObj.datetime)));

  lastUpdate = wetObj.current.last_updated_epoch;
   sity = wetObj.location.name;
   icon = wetObj.current.condition.icon;
   tempFeels  = wetObj.current.feelslike_c;
   temp  = wetObj.current.temp_c;
 
   tempDescription = wetObj.current.condition.text;
  
document.querySelector('.temp').textContent = temp+'°';
document.querySelector('.wether-discription').textContent = tempDescription;



const sityEl = document.querySelector('.sity');
const img = document.querySelector('.wether');
img.src = icon;
sityEl.textContent = sity;
}
if(localStorage.getItem('location') === null || sessionStorage.getItem('wether') === null)
(async () => {
await Revalidate();
})();



let tasksHTML = " <h1 class='task-paragraf'>Tasks</h1>";

document.querySelector(".buttonAdd").addEventListener('click',(e)=>{
  
  let el = document.getElementsByClassName("form__field")[0].value;
  localStorage.setItem('tasks',localStorage.getItem('tasks')===null ?el :localStorage.getItem('tasks')+'`'+el);
  let tasksHTML = " <h1 class='task-paragraf'>Tasks</h1>";
  localStorage.getItem('tasks').split('`').forEach(el=>{
    tasksHTML+=`<div class='task'><h1 class='name'>${el}</h1><svg class="remove" fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="0 0 72 72" enable-background="new 0 0 72 72" xml:space="preserve"><g><path d="M53.678,61.824c-2.27,0-4.404-0.885-6.01-2.49L36,47.667L24.332,59.334c-1.604,1.605-3.739,2.49-6.01,2.49 s-4.404-0.885-6.01-2.49c-1.605-1.604-2.49-3.739-2.49-6.01c0-2.271,0.885-4.405,2.491-6.011l11.666-11.667l-10.96-10.961 c-1.605-1.604-2.49-3.739-2.49-6.01s0.885-4.405,2.49-6.01c1.605-1.605,3.739-2.49,6.011-2.49c2.271,0,4.405,0.885,6.01,2.49 L36,23.626l10.96-10.96c1.605-1.605,3.738-2.49,6.01-2.49s4.406,0.885,6.01,2.49c1.605,1.604,2.49,3.739,2.49,6.01 s-0.885,4.405-2.49,6.01L48.021,35.646l11.666,11.668c1.605,1.604,2.49,3.738,2.49,6.01c0,2.271-0.885,4.405-2.49,6.01 C58.084,60.939,55.949,61.824,53.678,61.824z M36,42.839c0.511,0,1.023,0.195,1.414,0.586l13.082,13.081 c0.852,0.851,1.98,1.318,3.182,1.318c1.203,0,2.332-0.468,3.182-1.318c0.852-0.851,1.318-1.98,1.318-3.182 c0-1.202-0.467-2.332-1.318-3.181l-13.08-13.083c-0.781-0.781-0.781-2.047,0-2.828l12.373-12.375 c0.852-0.851,1.318-1.979,1.318-3.182s-0.467-2.331-1.318-3.182c-0.85-0.851-1.98-1.318-3.182-1.318s-2.332,0.468-3.18,1.318 L37.414,27.868c-0.781,0.781-2.046,0.781-2.828,0L22.21,15.494c-0.85-0.851-1.979-1.318-3.181-1.318 c-1.202,0-2.332,0.468-3.182,1.318c-0.851,0.851-1.319,1.979-1.319,3.182s0.469,2.331,1.318,3.182l12.374,12.375 c0.781,0.781,0.781,2.047,0,2.828L15.14,50.143c-0.85,0.85-1.318,1.979-1.318,3.182c0,1.201,0.469,2.331,1.318,3.182 c0.851,0.851,1.98,1.318,3.182,1.318c1.202,0,2.332-0.468,3.182-1.318l13.083-13.081C34.977,43.034,35.489,42.839,36,42.839z"/></g>
    </svg></div>`;
    })

    tasksContent.innerHTML = tasksHTML;
    Update();
    const popupСontainer = document.querySelector(".popup-container");
    popupСontainer.style.display = 'none';
    document.querySelector(".form__field").value = '';
})

const tasksContent = document.querySelector('.tasks-content');

if(localStorage.getItem('tasks') === null)
tasksHTML+=`<h1 style='margin:auto;font-size: 3em;'>No tasks now</h1>`;
else{
localStorage.getItem('tasks').split('`').forEach(el=>{
  tasksHTML+=`<div class='task'><h1 class='name'>${el}</h1><svg class="remove" fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="0 0 72 72" enable-background="new 0 0 72 72" xml:space="preserve"><g><path d="M53.678,61.824c-2.27,0-4.404-0.885-6.01-2.49L36,47.667L24.332,59.334c-1.604,1.605-3.739,2.49-6.01,2.49 s-4.404-0.885-6.01-2.49c-1.605-1.604-2.49-3.739-2.49-6.01c0-2.271,0.885-4.405,2.491-6.011l11.666-11.667l-10.96-10.961 c-1.605-1.604-2.49-3.739-2.49-6.01s0.885-4.405,2.49-6.01c1.605-1.605,3.739-2.49,6.011-2.49c2.271,0,4.405,0.885,6.01,2.49 L36,23.626l10.96-10.96c1.605-1.605,3.738-2.49,6.01-2.49s4.406,0.885,6.01,2.49c1.605,1.604,2.49,3.739,2.49,6.01 s-0.885,4.405-2.49,6.01L48.021,35.646l11.666,11.668c1.605,1.604,2.49,3.738,2.49,6.01c0,2.271-0.885,4.405-2.49,6.01 C58.084,60.939,55.949,61.824,53.678,61.824z M36,42.839c0.511,0,1.023,0.195,1.414,0.586l13.082,13.081 c0.852,0.851,1.98,1.318,3.182,1.318c1.203,0,2.332-0.468,3.182-1.318c0.852-0.851,1.318-1.98,1.318-3.182 c0-1.202-0.467-2.332-1.318-3.181l-13.08-13.083c-0.781-0.781-0.781-2.047,0-2.828l12.373-12.375 c0.852-0.851,1.318-1.979,1.318-3.182s-0.467-2.331-1.318-3.182c-0.85-0.851-1.98-1.318-3.182-1.318s-2.332,0.468-3.18,1.318 L37.414,27.868c-0.781,0.781-2.046,0.781-2.828,0L22.21,15.494c-0.85-0.851-1.979-1.318-3.181-1.318 c-1.202,0-2.332,0.468-3.182,1.318c-0.851,0.851-1.319,1.979-1.319,3.182s0.469,2.331,1.318,3.182l12.374,12.375 c0.781,0.781,0.781,2.047,0,2.828L15.14,50.143c-0.85,0.85-1.318,1.979-1.318,3.182c0,1.201,0.469,2.331,1.318,3.182 c0.851,0.851,1.98,1.318,3.182,1.318c1.202,0,2.332-0.468,3.182-1.318l13.083-13.081C34.977,43.034,35.489,42.839,36,42.839z"/></g>
  </svg></div>`
  })
}

tasksContent.innerHTML = tasksHTML;
if(sessionStorage.getItem('wether') !== null){
  
  wetObj = JSON.parse(window.sessionStorage.getItem('wether'));
  cloak(Date.parse(wetObj.location.localtime) + (new Date() - new Date(wetObj.datetime)));
  
  lastUpdate = wetObj.current.last_updated_epoch;
   sity = wetObj.location.name;
   icon = wetObj.current.condition.icon;
   tempFeels  = wetObj.current.feelslike_c;
   temp  = wetObj.current.temp_c;
 
   tempDescription = wetObj.current.condition.text;
  
document.querySelector('.temp').textContent = temp+'°';
document.querySelector('.wether-discription').textContent = tempDescription;


const sityEl = document.querySelector('.sity');
const img = document.querySelector('.wether');
img.src = icon;
sityEl.textContent = sity;
}
intallEv();

  
  async function getLink(){
    const play = document.querySelector(".aud");
  let res = await getAudio();
  play.src = res;
  document.addEventListener('mousemove', function Play() {
    play.muted = false;
    play.play();
    document.removeEventListener('mousemove',Play);
  });
  play.addEventListener("ended", function() {
    play.src = "";
});
  }
  // getLink();

