/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // Loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        // Create a new div element, which will become the game card
        const gameCard = document.createElement('div');

        // Add the class game-card to the list
        gameCard.classList.add('game-card');

        // Set the inner HTML using a template literal to display some info about each game
        gameCard.innerHTML = `
            <img class="game-img" src="${games[i].img}" alt="${games[i].name}">
            <h3>${games[i].name}</h3>
            <p>Backers: ${games[i].backers}</p>
            <p>Pledged: $${games[i].pledged.toLocaleString()}</p>
            <!-- Add more information as needed -->
            <p>Genre: ${games[i].genre}</p>
            <p>Release Date: ${games[i].releaseDate}</p>
        `;

        // Append the game card to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
// const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const GAMES_JSON2 = GAMES_JSON;/* Your games array here */;

const totalContributions = GAMES_JSON2.reduce((acc, game) => {
  return acc + game.backers;
}, 0);

const contributionsCard = document.getElementById("num-contributions"); // Assuming you have an HTML element with the id "contributionsCard"

contributionsCard.textContent = `Total Contributions: ${totalContributions}`;

// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
// const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON2.reduce((acc, GAMES_JSON2) => {
    return acc + GAMES_JSON2.pledged;
  }, 0);
  
  // Display the total raised with a dollar sign
  const raisedCard = document.getElementById("total-raised");
  raisedCard.textContent = `Total Raised: $${totalRaised}`;
  

// set inner HTML using template literal


// grab number of games card and set its inner HTML
// const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON2.length;

// Display the total number of games
const gamesCard = document.getElementById("num-games");
gamesCard.textContent = `Total Number of Games: ${totalGames}`;



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    console.log("Number of unfunded games:", unfundedGames.length);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// ...

// add event listeners with the correct functions to each button
const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.addEventListener("click", filterUnfundedOnly);

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // use the function we previously created to add funded games to the DOM
    addGamesToPage(fundedGames);
}

// ...

// add event listeners with the correct functions to each button
const fundedBtn = document.getElementById("funded-btn");
fundedBtn.addEventListener("click", filterFundedOnly);

// show all games
// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// ...

// add event listeners with the correct functions to each button
const allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", showAllGames);


// select each button in the "Our Games" section


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

console.log("Number of unfunded games:", unfundedGamesCount);


// create a string that explains the number of unfunded games using the ternary operator

const totalRaised2 = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
const totalGames2 = GAMES_JSON.length;


const message = `
  ${totalGames > 0 ? `A total of $${totalRaised2.toLocaleString()} has been raised for ${totalGames2} games.` : "No games available."}
  ${unfundedGamesCount > 0 ? `Currently, ${unfundedGamesCount} game${unfundedGamesCount > 1 ? 's' : ''} remain${unfundedGamesCount > 1 ? '' : 's'} unfunded.` : "All games are fully funded!"}
`;

console.log(message);

// create a new DOM element containing the template string and append it to the description container

const newParagraph = document.createElement('p');
newParagraph.textContent = message;

// Append the new paragraph to the descriptionContainer
descriptionContainer.appendChild(newParagraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

// Use destructuring and the spread operator to grab the first and second games
const [topGame, runnerUpGame, ...remainingGames] = sortedGames;

// Display the top 2 games
const createGameElement = (game) => {
    const gameElement = document.createElement('div');
    gameElement.classList.add('top-game-card');
    gameElement.innerHTML = `
        <h3>${game.name}</h3>
        <p>Backers: ${game.backers}</p>
        <p>Pledged: $${game.pledged.toLocaleString()}</p>
        <!-- Add more information as needed -->
        <p>Genre: ${game.genre}</p>
        <p>Release Date: ${game.releaseDate}</p>
    `;
    return gameElement;
};

// Clear existing content in containers
firstGameContainer.innerHTML = "";
secondGameContainer.innerHTML = "";

// Append the top 2 games to their respective containers
firstGameContainer.appendChild(createGameElement(topGame));
secondGameContainer.appendChild(createGameElement(runnerUpGame));


// create a new element to hold the name of the top pledge game, then append it to the correct element

// Create new elements containing the names of the top 2 funded games
const createGameNameElement = (game) => {
    const gameNameElement = document.createElement('h2');
    gameNameElement.textContent = game.name;
    return gameNameElement;
};

// Clear existing content in containers
firstGameContainer.innerHTML = "";
secondGameContainer.innerHTML = "";

// Append the names of the top 2 funded games to their respective containers
firstGameContainer.appendChild(createGameNameElement(topGame));
secondGameContainer.appendChild(createGameNameElement(runnerUpGame));


// do the same for the runner up item