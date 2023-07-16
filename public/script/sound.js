export  const Soundconst = async () =>{

 const url = 'https://large-text-to-speech.p.rapidapi.com/tts';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': 'cd12d00385mshd8bc38116689251p1f326djsnb92de91ef13e',
		'X-RapidAPI-Host': 'large-text-to-speech.p.rapidapi.com'
	},
	body: {
		text: 'Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
}