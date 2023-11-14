// Write your helper functions here!

require ('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = 
                `<h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance} </li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src="${imageUrl}">`
 }
 
 function validateInput(testInput) {
    if (testInput === '')  {
        return 'Empty'
    } else if (!isNaN(testInput)) {
        return 'Is a Number'
    } else {
        return 'Not a Number' 
    }
 }
 
 function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    
    // declaring status doms
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus  = document.getElementById("launchStatus")
    // console.log(validateInput(pilot));
    // console.log(validateInput(copilot));
    // console.log(validateInput(fuelLevel));
    // console.log(validateInput(cargoLevel));

    if (validateInput(pilot) === 'Empty' || validateInput(copilot) === 'Empty' || validateInput(fuelLevel) === 'Empty' || validateInput(cargoLevel) === 'Empty') {
        alert("Fill in all fields!");
     } else if (validateInput(pilot) === 'Is a Number' || validateInput(copilot) === 'Is a Number') {
        alert("Pilot and Copilot cannot be a number!");
    } else if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
        alert("Fuel Level and Cargo Level must be numbers!"); 
    } else if (validateInput(pilot) === 'Not a Number' || validateInput(copilot) === 'Not a Number'){
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        list.style.visibility = "hidden";

        if (Number(fuelLevel) < 10000 && Number(cargoLevel) <= 10000) {
            fuelStatus.innerHTML = "Fuel level too low for launch";
            list.style.visibility = "visible";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "red";
        } else if (Number(fuelLevel) >= 10000 && Number(cargoLevel) > 10000) {
            fuelStatus.innerHTML = "Fuel level high enough for launch";
            cargoStatus.innerHTML = "Cargo mass too heavy for launch";
            list.style.visibility = "visible";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "red";
        } else if (Number(cargoLevel) > 10000 && Number(fuelLevel) < 10000){
            cargoStatus.innerHTML = "Cargo mass too heavy for launch";
            fuelStatus.innerHTML = "Fuel level too low for launch";
            list.style.visibility = "visible";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "red";
        } else if (Number(fuelLevel) >= 10000 && Number(cargoLevel) <= 10000) {
            fuelStatus.innerHTML = "Fuel level high enough for launch";
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
            list.style.visibility = "visible";
            launchStatus.innerHTML = "Shuttle is Ready for Launch";
            launchStatus.style.color = "green";
        }
    }

 }
 
 async function myFetch() {
     let planetsReturned;
 
     planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
        return response.json();
         });
 
     return planetsReturned;
 }
 
 function pickPlanet(planets) {
    index = Math.round(Math.random() * planets.length);
    return planets[index];
 }
 
 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;