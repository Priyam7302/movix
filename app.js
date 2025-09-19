let trendMvs = document.querySelector(".trendMvs");
let popMvs = document.querySelector(".popMvs");
let topRate = document.querySelector(".topRate");
let day = document.querySelector(".day");
let data_trMvDay = document.querySelector(".data_trMvDay");
let data_trMvWeek = document.querySelector(".data_trMvWeek");
let data_popMv = document.querySelector(".data_popMv");
let data_trTvShDay = document.querySelector(".data_trTvShDay");
let data_trTvShWeek = document.querySelector(".data_trTvShWeek");
let data_topRateSh = document.querySelector(".data_topRateSh");
let data_topRateMv = document.querySelector(".data_topRateMv");

const api_key = "369ee80d4eeddde4c58de276d137958c";
const base_url = "https://api.themoviedb.org/3";
// const IMG_BASE_PATH = "https://image.tmdb.org/t/p/original/";
const IMG_BASE_PATH = "https://image.tmdb.org/t/p/w500/";

let trMvDay = `${base_url}/trending/movie/day?language=en-US&api_key=${api_key}`;
let trMvWeek = `${base_url}/trending/movie/week?language=en-US&api_key=${api_key}`;
let popMv = `${base_url}/movie/popular?language=en-US&page=1&api_key=${api_key}`;
let topRateMv = `${base_url}/movie/top_rated?language=en-US&page=1&api_key=${api_key}`;

let trTvShDay = `${base_url}/trending/tv/day?language=en-US&api_key=${api_key}`;
let trTvShWeek = `${base_url}/trending/tv/week?language=en-US&api_key=${api_key}`;
let topRateSh = `${base_url}/tv/top_rated?language=en-US&page=1&api_key=${api_key}`;

async function fetchData(url) {
  let response = await fetch(url);
  let result = await response.json();
  console.log(result.results);
  return result.results;
}

let mv_arr = {
  data_trMvDay: trMvDay,
  data_trMvWeek: trMvWeek,
  data_popMv: popMv,
  data_trTvShDay: trTvShDay,
  data_trTvShWeek: trTvShWeek,
  data_topRateSh: topRateSh,
  data_topRateMv: topRateMv,
};

async function show() {
  for (let key in mv_arr) {
    let container = document.querySelector(`.${key}`);
    let res = await fetchData(mv_arr[key]);
    // console.log(res);
    for (let j = 0; j < res.length; j++) {
      let card = document.createElement("div");
      card.classList.add("card");
      let title = document.createElement("p");
      let img = document.createElement("img");
      title.innerText = res[j].original_title || res[j].name;
      img.src = `${IMG_BASE_PATH}` + res[j].poster_path;
      card.append(img, title);
      container.append(card);
    }
  }
}

// day.addEventListener("click", show);
window.addEventListener("load", show);
