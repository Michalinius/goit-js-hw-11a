import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector("#search-box");

input.addEventListener("input", debounce(event =>{
    //tu czyścic
    if(event.target.value === ""){
        return
    }

    fetchCountries(event.target.value).then(data => {
    if (data.length>10) 
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
    else if (data.length==0) 
        Notiflix.Notify.failure("Oops, there is no country with that name")
    else if (data.length==1)
        console.log('asd')
    else if (data.length >= 2 && data.length <= 10)
        console.log('asdd')
    })
    
},DEBOUNCE_DELAY))