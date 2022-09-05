import axios from "axios";
import Notiflix from "notiflix";


const form = document.querySelector(`form`);
const input = document.querySelector(`[name="searchQuery"]`)
const mainDiv = document.querySelector(".gallery")
const button = document.querySelector(".load-more")
button.style.display = "none";
let inputValue;
let page = 1;
console.log(mainDiv);

console.log(input.value)


form.addEventListener("submit", event => {
    event.preventDefault();
    console.log(input.value)
    if (!input.value) {
        mainDiv.innerHTML = "";
        button.style.display = "none";
    }
    else {
        page = 1;
        axios.get(`https://pixabay.com/api/?key=29678307-c5737503ea3de173bef225585&q=${input.value.trim()}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
            .then(res => res.data)
            .then(data => {
                inputValue = input.value;
                const newData = data.hits.map(results => {
                    return {
                        webformatURL: results.webformatURL,
                        largeImageURL: results.largeImageURL,
                        alt: results.tags,
                        likes: results.likes,
                        views: results.views,
                        comments: results.comments,
                        downloads: results.downloads
                    }
                }
                )
                if (newData.length == 0) Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                else {
                    console.log(newData);
                    mainDiv.innerHTML = "";
                    for (i = 1; i < newData.length; i++) {
                        mainDiv.insertAdjacentHTML("beforeend", `<div class="single-image">
                    <div class="image-box"><img class="image" src="${newData[i].webformatURL}" alt="${newData[i].alt}"></div>
                <div class="info">
                    <span class="info-box">
                            <b>Likes</b>
                            <p>${newData[i].likes}</p>
                        </span>
                        <span class="info-box">
                            <b>Views</b>
                            <p>${newData[i].views}</p>
                        </span>
                        <span class="info-box">
                            <b>Comments</b>
                            <p>${newData[i].comments}</p>
                        </span>
                        <span class="info-box">
                            <b>Downloads</b>
                            <p>${newData[i].downloads}</p>
                        </span></div> 
                    </div>`)
                    }
                    button.style.display = "block";
                }
            })
            .catch(error => console.warn(error))
    }
})

button.addEventListener("click", () => {

    page += 1;
    console.log(page)
    axios.get(`https://pixabay.com/api/?key=29678307-c5737503ea3de173bef225585&q=${inputValue.trim()}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
        .then(res => res.data)
        .then(data => {
            if (data.totalHits / 40 > page) {
                console.log(data)
                const newData = data.hits.map(results => {
                    return {
                        webformatURL: results.webformatURL,
                        largeImageURL: results.largeImageURL,
                        alt: results.tags,
                        likes: results.likes,
                        views: results.views,
                        comments: results.comments,
                        downloads: results.downloads
                    }
                })
                for (i = 1; i < newData.length; i++) {
                    mainDiv.insertAdjacentHTML("beforeend", `<div class="single-image">
            <div class="image-box"><img class="image" src="${newData[i].webformatURL}" alt="${newData[i].alt}"></div>
        <div class="info">
            <span class="info-box">
                    <b>Likes</b>
                    <p>${newData[i].likes}</p>
                </span>
                <span class="info-box">
                    <b>Views</b>
                    <p>${newData[i].views}</p>
                </span>
                <span class="info-box">
                    <b>Comments</b>
                    <p>${newData[i].comments}</p>
                </span>
                <span class="info-box">
                    <b>Downloads</b>
                    <p>${newData[i].downloads}</p>
                </span></div> 
            </div>`)
                }
            }
            else {
                Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
                button.style.display = "none";
            }
        })
        .catch(error => console.warn(error))
})
