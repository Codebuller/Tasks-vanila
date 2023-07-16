import axios from 'axios';
export async function getWether(loc){
 
  const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q='+loc.toString();
  const options = {
      method: 'GET',
      headers: {
          'X-RapidAPI-Key': 'cd12d00385mshd8bc38116689251p1f326djsnb92de91ef13e',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
  };
  
  try {
      const response = await fetch(url, options);
      let result = await response.text();
      result = JSON.parse(result);
      result.datetime = new Date();
      result  = JSON.stringify(result);
      await window.sessionStorage.setItem('wether',result);
      console.log("Записал",sessionStorage.getItem('wether'))
  } catch (error) {
      console.error(error); 
  }
    }
  

 export async function getLoc() {

    try{
    const response = await  fetch("https://ipinfo.io?token=9c604eb6371a64");
      const result = await response.text();
      await window.localStorage.setItem('location',result);
    }
    catch(error){
      console.error(error); 
    }
  }
  

  export const getAudiofirst = async (textAud) =>{
    let idAud; 

    const optionsFirst = {
      method: 'POST',
      url: 'https://large-text-to-speech.p.rapidapi.com/tts',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'cd12d00385mshd8bc38116689251p1f326djsnb92de91ef13e',
        'X-RapidAPI-Host': 'large-text-to-speech.p.rapidapi.com'
      },
      data: {
        text: textAud.length === 0 ? "Hello, welcome to mywebsite. This project was created as a kind of task manager, where the user can write out their tasks and close them, this site is connected to 3 web apis to get location, current weather and of course to get my voice)The weather is revalidated and stored in the session storage. Tasks and location are also saved, but in local storage. Thank you for your interest in the upcoming project"
: textAud
      }
    };
    
    try {
      const response = await axios.request(optionsFirst);
      idAud = response.data.id;
    } catch (error) {
      console.error(error);
    }
    await new Promise(resolve => setTimeout(resolve, 7000));
 
        const optionssSec = {
          method: 'GET',
          url: 'https://large-text-to-speech.p.rapidapi.com/tts',
          params: {
            id: idAud
          },
          headers: {
            'X-RapidAPI-Key': 'cd12d00385mshd8bc38116689251p1f326djsnb92de91ef13e',
            'X-RapidAPI-Host': 'large-text-to-speech.p.rapidapi.com'
          }
        };
        
        try {
          const response = await axios.request(optionssSec);
          if(response.data.status === "success"){
            console.log(response.data)
            return response.data.url;
          }
         
        } catch (error) {
          console.error(error);
        }
      
  }