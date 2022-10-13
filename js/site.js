// initial dataset for Event Manager in lieu of a database
const events = [
  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 240000,
    date: "06/01/2017",
  },
  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 250000,
    date: "06/01/2018",
  },
  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 257000,
    date: "06/01/2019",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 130000,
    date: "06/01/2017",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 140000,
    date: "06/01/2018",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 150000,
    date: "06/01/2019",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 40000,
    date: "06/01/2017",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 45000,
    date: "06/01/2018",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 50000,
    date: "06/01/2019",
  },
];

function buildDropDown() {
  // store entire element in eventDD as a handle
  let eventDD = document.getElementById("eventDropDown");

  // remove HTML from inside element with id="eventDropDown"
  eventDD.innerHTML = "";

  // grab template from <template> tag with id="cityDD-template"
  const template = document.getElementById("cityDD-template");

  // copy events object array into curEvents
  let curEvents = events;

  // filter curEvents by cities using map() with arrow function
  //    citiesOnly = curEvents mapped with arrow function to just 'city'
  let citiesOnly = curEvents.map((event) => event.city);

  //    distictEvents = Set() function creates a unique set of cities
  let distinctEvents = [...new Set(citiesOnly)];

  // A concise way of doing the same thing:
  // let distinctEvents = [...new Set(curEvents.map((event) => event.city))];
}
