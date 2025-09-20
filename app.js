let trendMvs = document.querySelector(".trendMvs");
let popMvs = document.querySelector(".popMvs");
let topRate = document.querySelector(".topRate");

let btns = document.querySelectorAll(".btns");

let btn_trMvDay = document.querySelector(".btn_trMvDay");
let btn_trMvWeek = document.querySelector(".btn_trMvWeek");
let btn_popMv = document.querySelector(".btn_popMv");
let btn_popTvSh = document.querySelector(".btn_popTvSh");
let btn_trTvShDay = document.querySelector(".btn_trTvShDay");
let btn_trTvShWeek = document.querySelector(".btn_trTvShWeek");
let btn_topRateSh = document.querySelector(".btn_topRateSh");
let btn_topRateMv = document.querySelector(".btn_topRateMv");

let data_trMvDay = document.querySelector(".data_trMvDay");
let data_trMvWeek = document.querySelector(".data_trMvWeek");
let data_popMv = document.querySelector(".data_popMv");
let data_popTvSh = document.querySelector(".data_popTvSh");
let data_trTvShDay = document.querySelector(".data_trTvShDay");
let data_trTvShWeek = document.querySelector(".data_trTvShWeek");
let data_topRateSh = document.querySelector(".data_topRateSh");
let data_topRateMv = document.querySelector(".data_topRateMv");

const api_key = "369ee80d4eeddde4c58de276d137958c";
const base_url = "https://api.themoviedb.org/3";
// const IMG_BASE_PATH = "https://image.tmdb.org/t/p/original/";
const IMG_BASE_PATH = "https://image.tmdb.org/t/p/w500/";

let data = [];

let trMvDay = `${base_url}/trending/movie/day?language=en-US&api_key=${api_key}`;
let trMvWeek = `${base_url}/trending/movie/week?language=en-US&api_key=${api_key}`;
let popMv = `${base_url}/movie/popular?language=en-US&page=1&api_key=${api_key}`;
let popTvSh = `${base_url}/tv/popular?language=en-US&page=1&api_key=${api_key}`;
let topRateMv = `${base_url}/movie/top_rated?language=en-US&page=1&api_key=${api_key}`;
let topRateSh = `${base_url}/tv/top_rated?language=en-US&page=1&api_key=${api_key}`;
let trTvShDay = `${base_url}/trending/tv/day?language=en-US&api_key=${api_key}`;
let trTvShWeek = `${base_url}/trending/tv/week?language=en-US&api_key=${api_key}`;

async function fetchData(url) {
  let response = await fetch(url);
  let result = await response.json();
  // console.log(result.results);
  return result.results;
}

let mv_arr = {
  data_trMvDay: trMvDay,
  data_trMvWeek: trMvWeek,
  data_popMv: popMv,
  data_popTvSh: popTvSh,
  data_trTvShDay: trTvShDay,
  data_trTvShWeek: trTvShWeek,
  data_topRateSh: topRateSh,
  data_topRateMv: topRateMv,
};

window.addEventListener("load", show);

async function show() {
  let promises = [];
  for (let key in mv_arr) {
    let container = document.querySelector(`.${key}`);
    let res = fetchData(mv_arr[key]);
    // console.log(res);
    promises.push(res);
  }
  data = await Promise.all(promises);
  console.log(data);
  printData({
    data_trMvDay: data[0],
    data_popMv: data[2],
    data_trTvShDay: data[4],
    data_topRateSh: data[6],
  });
}

function printData(obj) {
  for (let key in obj) {
    let container = document.querySelector(`.${key}`);

    for (let i = 0; i < obj[key].length; i++) {
      let card = document.createElement("div");
      card.classList.add("card");
      let title = document.createElement("p");
      let img = document.createElement("img");
      title.innerText = obj[key][i].original_title || obj[key][i].name;
      img.src = `${IMG_BASE_PATH}` + obj[key][i].poster_path;
      card.append(img, title);
      container.append(card);
    }
  }
}

for (let i = 0; i < btns.length; i++)
  btns[i].addEventListener("click", showThatData);

function showThatData(e) {
  let btnClass = e.target.classList[0];
  let dataClass = btnClass.replace("btn", "data");

  let parentBtns = e.target.parentElement.querySelectorAll("button");
  parentBtns.forEach((btn) => btn.classList.remove("active"));

  e.target.classList.add("active");

  let keys = Object.keys(mv_arr);
  let index = keys.indexOf(dataClass);
  console.log(index);

  printData({
    [dataClass]: data[index],
  });

  toggleContainers(dataClass);
}

function toggleContainers(dataClass) {
  let parent = document.querySelector(`.${dataClass}`).parentElement;

  let allContainers = parent.querySelectorAll("div[class^='data_']");
  allContainers.forEach((div) => {
    div.classList.remove("show");
    div.classList.add("hidden");
  });

  let activeContainer = parent.querySelector(`.${dataClass}`);
  activeContainer.classList.remove("hidden");
  activeContainer.classList.add("show");
}
