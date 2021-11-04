import { songData } from "./songData.js";
import { movieData } from "./movieData.js";
let month, day, year, time;
let enteredDateTime;

function collectEnteredData() {
  const enteredMonth = document.getElementById("month");
  const enteredDay = document.getElementById("day");
  const enteredYear = document.getElementById("year");
  const enteredTime = document.getElementById("time");

  month = enteredMonth.value;
  day = enteredDay.value;
  year = enteredYear.value;
  time = enteredTime.value;
  enteredDateTime = moment().format(`${year}-${month}-${day} ${time}`);
}

function findDayofWeek() {
  let workingDate = moment(`${year}-${month}-${day}`);
  const dayOfWeek = workingDate.weekday();
  const displayDayofWeek = document.getElementById("day-of-week");
  const weekdays = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };
  let dayBorn = weekdays[dayOfWeek];
  displayDayofWeek.style.opacity = "1";
  displayDayofWeek.textContent = `You were born on a ${dayBorn}.`;
}

function calculateAge(dob) {
  function addCommas(num) {
    return num.toLocaleString();
  }
  const years = addCommas(moment().diff(dob, "years"));
  const months = addCommas(moment().diff(dob, "months"));
  const weeks = addCommas(moment().diff(dob, "weeks"));
  const days = addCommas(moment().diff(dob, "days"));
  const hours = addCommas(moment().diff(dob, "hours"));
  const minutes = addCommas(moment().diff(dob, "minutes"));
  const seconds = addCommas(moment().diff(dob, "seconds"));

  const info = document.getElementById("info");
  const heading = document.getElementById("heading");
  const displayYears = document.getElementById("years");
  const displayMonths = document.getElementById("months");
  const displayWeeks = document.getElementById("weeks");
  const displayDays = document.getElementById("days");
  const displayHours = document.getElementById("hours");
  const displayMinutes = document.getElementById("minutes");
  const displaySeconds = document.getElementById("seconds");

  info.style.opacity = "1";
  heading.textContent = "You have been alive for:";
  displayYears.textContent = `${years} Years`;
  displayMonths.textContent = `${months} Months`;
  displayWeeks.textContent = `${weeks} Weeks`;
  displayDays.textContent = `${days} Days`;
  displayHours.textContent = `${hours} Hours`;
  displayMinutes.textContent = `${minutes} Minutes`;
  displaySeconds.textContent = `${seconds} Seconds`;
}

function findSong() {
  const songTextDisplay = document.getElementById("song");
  const songVideo = document.getElementById("youtube-song");
  const songContainer = document.querySelector(".song-container");
  songContainer.style.opacity = "1";
  let enteredDate = moment().format(`${year}-${month}-${day}`);
  let correctSong;

  songData.map((song) => {
    let start = song.startDate;
    let end = song.endDate;

    let checkDates = moment(enteredDate).isBetween(start, end);

    if (checkDates === true) {
      correctSong = song;
    }
  });

  // Display Song Info
  songTextDisplay.textContent = correctSong.songTitle;
  songVideo.src = `https://www.youtube.com/embed/${correctSong.youtubeId}`;
}

function findMovie() {
  const movieTextDisplay = document.getElementById("movie");
  const movieVideo = document.getElementById("youtube-movie");
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.style.opacity = "1";
  let enteredDate = moment().format(`${year}-${month}-${day}`);
  let correctMovie;

  movieData.map((movie) => {
    let start = movie.startDate;
    let end = movie.endDate;

    let checkDates = moment(enteredDate).isBetween(start, end);

    if (checkDates === true) {
      correctMovie = movie;
    }
  });

  // Display Movie Info
  movieTextDisplay.textContent = correctMovie.movieTitle;
  movieVideo.src = `https://www.youtube.com/embed/${correctMovie.youtubeId}`;
}

function displayUserInfo(e) {
  e.preventDefault();
  collectEnteredData();
  findDayofWeek();
  setInterval(() => {
    calculateAge(enteredDateTime);
  }, 1000);
  findSong();
  findMovie();
}

// Event Listener
const form = document.getElementById("datePicker");
form.addEventListener("submit", displayUserInfo);
