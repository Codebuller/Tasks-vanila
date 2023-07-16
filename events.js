 function name(){
    document.querySelectorAll('.name').forEach( e=>{
        e.addEventListener('click',function Name(){
          let style = e.style.textDecoration;
          e.style.textDecoration= style===''? 'line-through' :'';  
        })
        
      })
}
 function remove(){
    document.querySelectorAll('.remove').forEach(e=>{
        e.addEventListener('click',function Remove(){
        let tasks = localStorage.getItem('tasks').split('`')
        let ind;
        let string = '';
        tasks.map((el)=>{
          if(el !== e.parentElement.firstChild.textContent)
          {
            string+=el+'`';
          }
        })
        
        string = string.slice(0,-1)
        if(string.length>0)
        localStorage.setItem('tasks',string)
        else{
          localStorage.removeItem('tasks');
          document.querySelector('.tasks-content').innerHTML = `<h1 class='task-paragraf'>Tasks</h1><h1 style='margin:auto;font-size: 3em;'>No tasks now</h1>`;
        }
         e.parentElement.remove()
        })
        
      })
}
function popUp(){
    const clickBtn = document.getElementById("clickBtn");
const popupСontainer = document.querySelector(".popup-container");
const popup = document.querySelector(".popup");
const closeBtn = document.getElementById("closeBtn");
clickBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  popupСontainer.style.display = 'flex';
});
closeBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  popupСontainer.style.display = 'none';
});
popupСontainer.addEventListener('click', (e)=>{
  e.preventDefault();
  if(!(e.srcElement.parentElement === popup || e.srcElement.parentElement.parentElement === popup || e.srcElement.parentElement.parentElement.parentElement === popup || e.srcElement.parentElement.parentElement.parentElement?.parentElement === popup))
  popupСontainer.style.display = 'none';
});
}

export const intallEv = () =>{
popUp();
name();
remove();
}
export const Update = () =>{
name();
remove();
}