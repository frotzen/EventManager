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

// entry point in <body onload="buildDropDown()">
function buildDropDown() {
  // store entire element in eventDD as a handle
  let eventDD = document.getElementById("eventDropDown");

  // remove HTML from inside element with id="eventDropDown"
  eventDD.innerHTML = "";

  // grab template from <template> tag with id="cityDD-template"
  const template = document.getElementById("cityDD-template");

  // copy events object array into curEvents
  let curEvents = getEventData();

  // filter curEvents by cities using map() with arrow function
  //    citiesOnly = curEvents mapped with arrow function to just 'city'
  let citiesOnly = curEvents.map((event) => event.city);

  //    distictEvents = Set() function creates a unique set of cities
  let distinctEvents = [...new Set(citiesOnly)];

  // A concise way of doing the same thing:
  // let distinctEvents = [...new Set(curEvents.map((event) => event.city))];

  // create an unordered list element in a variable and add a class
  // ex. <ul class="dropdown-menu"></ul>
  let ddul = document.createElement("ul");
  ddul.classList.add("dropdown-menu");

  ////// All Items case //////
  // this gets <li><a class="dropdown-item" onclick="getEvents()"></a></li>
  // from the template
  let ddItemNodeAll = document.importNode(template.content, true);

  let cityName = "All";

  // this pulls the <a> tag out of ddItemNode,
  // <a class="dropdown-item" onclick="getEvents()"></a>
  let ddItemAll = ddItemNodeAll.querySelector("a");

  // set the innerHTML or textContent to a city
  // can also use ddItem.innerHTML = cityName;
  ddItemAll.textContent = cityName;
  ddItemAll.setAttribute("data-string", cityName);

  // add item to <ul> tag
  ddul.appendChild(ddItemNodeAll);
  //
  /////

  for (let i = 0; i < distinctEvents.length; i++) {
    // this gets <li><a class="dropdown-item" onclick="getEvents()"></a></li>
    // from the template
    let ddItemNode = document.importNode(template.content, true);

    let cityName = distinctEvents[i];

    // this pulls the <a> tag out of ddItemNode,
    // <a class="dropdown-item" onclick="getEvents()"></a>
    let ddItem = ddItemNode.querySelector("a");

    // set the innerHTML or textContent to a city
    // can also use ddItem.innerHTML = cityName;
    ddItem.textContent = cityName;
    ddItem.setAttribute("data-string", cityName);

    // add item to <ul> tag
    ddul.appendChild(ddItemNode);
  }

  eventDD.appendChild(ddul);
  displayStats(curEvents);
  displayEventData();
}

function getEvents(element) {
  let city = element.getAttribute("data-string");

  let curEvents = getEventData();

  let statsHeader = document.getElementById("statsHeader");
  statsHeader.innerHTML = `Stats for ${city} Events`;

  //display stats for all, or the selected city
  let filteredEvents = curEvents;
  if (city != "All") {
    // filter array by city name
    filteredEvents = curEvents.filter(function (item) {
      if (item.city == city) {
        return item;
      }
    });
  }

  displayStats(filteredEvents);
}

function displayStats(events) {
  let total = 0;
  let most = 0;
  let least = -1;

  total = totalAttendance(events);
  document.getElementById("total").innerHTML = total.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  document.getElementById("average").innerHTML = (
    total / events.length
  ).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  most = mostAttendance(events);
  document.getElementById("most").innerHTML = most.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  least = leastAttendance(events);
  document.getElementById("least").innerHTML = least.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function totalAttendance(events) {
  let length = events.length;
  let totalAttendance = 0;
  for (let i = 0; i < length; i++) {
    totalAttendance += events[i].attendance;
  }
  return totalAttendance;
}

function mostAttendance(events) {
  let length = events.length;
  let most = 0;
  for (let i = 0; i < length; i++) {
    if (events[i].attendance > most) {
      most = events[i].attendance;
    }
  }
  return most;
}

function leastAttendance(events) {
  let length = events.length;
  let least = events[0].attendance;
  for (let i = 0; i < length; i++) {
    if (events[i].attendance < least) {
      least = events[i].attendance;
    }
  }
  return least;
}

// retrieves data from local storage
function getEventData() {
  // pull in eventData
  let curEvents = JSON.parse(localStorage.getItem("eventData"));
  if (curEvents == null) {
    curEvents = events;
    // set eventData if results is null
    localStorage.setItem("eventData", JSON.stringify(curEvents));
  }
  return curEvents;
}

// displays event data in eventData-template
function displayEventData() {
  // get template and store in variable
  const template = document.getElementById("eventData-template");
  // get location template will be written
  const eventBody = document.getElementById("eventData");
  // clear template before writing
  eventBody.innerHTML = "";

  // pull in local storage eventData
  let curEvents = getEventData();
  let length = curEvents.length;
  for (let i = 0; i < length; i++) {
    const eventRow = document.importNode(template.content, true);
    // querySelector gets first element, querySelectorAll gets all elements
    const eventCols = eventRow.querySelectorAll("td");
    eventCols[0].textContent = curEvents[i].event;
    eventCols[1].textContent = curEvents[i].city;
    eventCols[2].textContent = curEvents[i].state;
    eventCols[3].textContent = curEvents[i].attendance;
    // format date before assigning to eventCols[4]
    let eventDate = new Date(curEvents[i].date).toLocaleDateString();
    eventCols[4].textContent = eventDate;

    eventBody.appendChild(eventRow);
  }
}
