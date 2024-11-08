// Player scoring weights
const weightBatCI = 0.35;
const weightBowlCI = 0.1;
const weightOverallCI = 0.2;
const weightSelectionPercent = 0.15;
const weightSalary = 0.1;

// Player data
const players = [
    {name: "Naeem Khan", team: "SAF", position: "AR", salary: 6.0, selectionPercent: 15.56, battingCI: null, bowlingCI: null, overallCI: null},
    {name: "Mohdammad Hasan", team: "SAF", position: "AR", salary: 6.0, selectionPercent: 6.97, battingCI: null, bowlingCI: null, overallCI: null},
    {name: "Imran Nawaz", team: "SAF", position: "BAT", salary: 8.5, selectionPercent: 83.78, battingCI: 31.6, bowlingCI: null, overallCI: null},
    {name: "Abdul Rabinsha Salam", team: "SAF", position: "BOW", salary: 8.0, selectionPercent: 87.78, battingCI: null, bowlingCI: null, overallCI: null},
    {name: "Alim Ahmed Fahim", team: "SAF", position: "BOW", salary: 8.0, selectionPercent: 88.86, battingCI: null, bowlingCI: 85.0, overallCI: null},
    {name: "Saidul Islam", team: "SAF", position: "BOW", salary: 7.5, selectionPercent: 20.10, battingCI: null, bowlingCI: null, overallCI: null},
    {name: "Abdul Hanan", team: "SAF", position: "BOW", salary: 7.0, selectionPercent: 27.55, battingCI: null, bowlingCI: 55.0, overallCI: null},
    {name: "Mohammad Abrahim", team: "SAF", position: "BOW", salary: 6.5, selectionPercent: 16.89, battingCI: null, bowlingCI: null, overallCI: null},
    {name: "Wasim Qureshi", team: "SAF", position: "WK", salary: 7.5, selectionPercent: 71.83, battingCI: null, bowlingCI: null, overallCI: 58.6},
    {name: "Fahimuddin Shareef", team: "SAF", position: "WK", salary: 7.0, selectionPercent: 25.27, battingCI: null, bowlingCI: null, overallCI: 100.0},
    {name: "Mohdammad Faysal", team: "SAF", position: "WK", salary: 6.0, selectionPercent: 4.01, battingCI: null, bowlingCI: null, overallCI: null},
    {name: "Abdul Razzaq", team: "SBS", position: "AR", salary: 9.0, selectionPercent: 93.93, battingCI: null, bowlingCI: null, overallCI: 88.1},
    {name: "Sarleedharan Nair", team: "SBS", position: "AR", salary: 9.0, selectionPercent: 86.18, battingCI: null, bowlingCI: null, overallCI: 61.8},
    {name: "Satinder Jeet", team: "SBS", position: "AR", salary: 8.0, selectionPercent: 57.45, battingCI: null, bowlingCI: null, overallCI: 81.6},
    {name: "Sukhwinder Singh", team: "SBS", position: "AR", salary: 7.0, selectionPercent: 33.47, battingCI: null, bowlingCI: null, overallCI: 61.7},
    {name: "Badshah Ahmad", team: "SBS", position: "BAT", salary: 8.5, selectionPercent: 82.63, battingCI: 34.2, bowlingCI: null, overallCI: null},
    {name: "Jugraj Singh", team: "SBS", position: "BAT", salary: 8.5, selectionPercent: 69.68, battingCI: 67.2, bowlingCI: null, overallCI: null},
    {name: "Riyaz Manaf", team: "SBS", position: "BAT", salary: 7.5, selectionPercent: 7.39, battingCI: 31.8, bowlingCI: null, overallCI: null},
    {name: "Lakhwinder Singh", team: "SBS", position: "BAT", salary: 6.5, selectionPercent: 23.32, battingCI: 100.0, bowlingCI: null, overallCI: null},
    {name: "Yusaf Mohammed", team: "SBS", position: "BOW", salary: 7.5, selectionPercent: 87.56, battingCI: null, bowlingCI: 75.0, overallCI: null},
    {name: "Navpreet Singh", team: "SBS", position: "BOW", salary: 6.5, selectionPercent: 12.79, battingCI: null, bowlingCI: 35.0, overallCI: null},
    {name: "Murugan Muthu", team: "SBS", position: "WK", salary: 7.0, selectionPercent: 8.15, battingCI: null, bowlingCI: null, overallCI: 80.0}
];

// Function to calculate player score
function calculatePlayerScore(player) {
    let score;
    switch (player.position) {
        case 'BAT':
            score = (player.battingCI * weightBatCI) + (player.selectionPercent * weightSelectionPercent) + ((11 - player.salary) * weightSalary);
            break;
        case 'BOW':
            score = (player.bowlingCI * weightBowlCI) + (player.selectionPercent * weightSelectionPercent) + ((11 - player.salary) * weightSalary);
            break;
        case 'AR':
            score = (player.overallCI * weightOverallCI) + (player.selectionPercent * weightSelectionPercent) + ((11 - player.salary) * weightSalary);
            break;
        case 'WK':
            score = (player.battingCI * weightBatCI) + (player.selectionPercent * weightSelectionPercent) + ((11 - player.salary) * weightSalary);
            break;
        default:
            score = 0;
    }
    // Handle null values
    if (isNaN(score)) {
        score = 0;
    }
    return score;
}

// Function to count players by position
function countPlayersByPosition(position, players) {
    return players.filter(player => player.position === position).length;
}

// Function to filter players by position
function filterPlayersByPosition(position, players) {
    if (position === "ALL") {
        return players;
    } else {
        return players.filter(player => player.position === position);
    }
}

// Function to select best team
function selectBestTeam(players) {
    // Calculate scores for each player once
    const scoredPlayers = players.map(player => ({
        ...player,
        score: calculatePlayerScore(player)
    }));

    // Sort players by score once (highest first)
    scoredPlayers.sort((a, b) => b.score - a.score);
    const positions = ['BAT', 'BOW', 'AR', 'WK'];
    const positionLimits = { BAT: { min: 3, max: 4 }, BOW: { min: 3, max: 4 }, AR: { min: 2, max: 3 }, WK: { min: 1, max: 2 } };
    const highSelLimit = Math.min(Math.ceil(scoredPlayers.length / 2), 7);

    const bestTeam = [];
    const positionCounters = { BAT: 0, BOW: 0, AR: 0, WK: 0 };

    // Split players into high and low selection percentage groups once
    const highSelPlayers = scoredPlayers.filter(player => player.selectionPercent >= 31);
    const lowSelPlayers = scoredPlayers.filter(player => player.selectionPercent < 31);

    // Create a set to track selected players (to avoid duplicates)
    const selectedPlayersSet = new Set();

    // Prioritize high selection percentage players
    const bestHighSelPlayers = highSelPlayers.slice(0, highSelLimit);
    bestHighSelPlayers.forEach(player => {
        if (positionCounters[player.position] < positionLimits[player.position].max) {
            bestTeam.push(player);
            positionCounters[player.position]++;
            selectedPlayersSet.add(player.name); // Add player to the selected set
        }
    });

    // Prepare the low-selection players by position
    const lowSelByPosition = {
        BAT: lowSelPlayers.filter(p => p.position === 'BAT'),
        BOW: lowSelPlayers.filter(p => p.position === 'BOW'),
        AR: lowSelPlayers.filter(p => p.position === 'AR'),
        WK: lowSelPlayers.filter(p => p.position === 'WK')
    };

    // Fill remaining positions with low selection percentage players, ensuring position limits
    positions.forEach(position => {
        while (positionCounters[position] < positionLimits[position].min && bestTeam.length < 11) {
            const eligiblePlayers = lowSelByPosition[position];
            if (eligiblePlayers.length > 0) {
                const player = eligiblePlayers.shift(); // Get the first player
                if (!selectedPlayersSet.has(player.name)) {
                    bestTeam.push(player);
                    positionCounters[position]++;
                    selectedPlayersSet.add(player.name); // Mark as selected
                }
            }
        }
    });

    // Fill remaining positions with top-scoring players (if any remaining positions)
    for (let player of scoredPlayers) {
        if (bestTeam.length < 11 && !selectedPlayersSet.has(player.name)) {
            if (positionCounters[player.position] < positionLimits[player.position].max) {
                bestTeam.push(player);
                positionCounters[player.position]++;
                selectedPlayersSet.add(player.name); // Mark as selected
            }
        }
    }

    // Sort final team by score in descending order
    bestTeam.sort((a, b) => b.score - a.score);

    return bestTeam;
}

// Function to display team
function displayTeam(players) {
    const tableBody = document.getElementById("teamTableBody");
    tableBody.innerHTML = '';

    const scoredPlayers = players.map(player => ({
        ...player,
        score: calculatePlayerScore(player)
    }));

    const fragment = document.createDocumentFragment();
    scoredPlayers.forEach(player => {
        const row = document.createElement("tr");
        row.innerHTML = `
              <td>${player.name}</td>
              <td>${player.team}</td>
              <td>${player.position}</td>
              <td>${player.selectionPercent}</td>
              <td>${player.score.toFixed(2)}</td>
          `;
        fragment.appendChild(row);
    });
    tableBody.appendChild(fragment);
}

// Function to display selected team
function displaySelectedTeam(players) {
    const bestTeam = selectBestTeam(players);
    displayTeam(bestTeam);
}

// Function to recommend captain and vice-captain from best team
function recommendCaptainViceCaptainFromBestTeam(bestTeam) {
    const scoredBestTeam = bestTeam.map(player => ({
        ...player,
        score: calculatePlayerScore(player)
    }));
    scoredBestTeam.sort((a, b) => b.score - a.score);

    // Recommend top 2 players from best team as captain and vice-captain
    const captainRecommendations = scoredBestTeam.slice(0, 1);
    const viceCaptainRecommendations = scoredBestTeam.slice(1, 2);

    return { captainRecommendations, viceCaptainRecommendations };
}

// Function to display captain and vice-captain recommendations from best team
function displayCaptainViceCaptainRecommendationsFromBestTeam(bestTeam) {
    const { captainRecommendations, viceCaptainRecommendations } = recommendCaptainViceCaptainFromBestTeam(bestTeam);
    const captainTableBody = document.getElementById("captainTableBody");
    captainTableBody.innerHTML = '';
    captainRecommendations.forEach(player => {
        const row = document.createElement("tr");
        row.innerHTML = `
              <td>${player.name}</td>
              <td>${player.team}</td>
              <td>${player.position}</td>
              <td>${player.selectionPercent}</td>
              <td>${player.score ? player.score.toFixed(2) : 'N/A'}</td>
          `;
        captainTableBody.appendChild(row);
    });

    const viceCaptainTableBody = document.getElementById("viceCaptainTableBody");
    viceCaptainTableBody.innerHTML = '';
    viceCaptainRecommendations.forEach(player => {
        const row = document.createElement("tr");
        row.innerHTML = `
              <td>${player.name}</td>
              <td>${player.team}</td>
              <td>${player.position}</td>
              <td>${player.selectionPercent}</td>
              <td>${player.score ? player.score.toFixed(2) : 'N/A'}</td>
          `;
        viceCaptainTableBody.appendChild(row);
    });
}

// Debounce function
function debounce(func, timeout = 300) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

// Event listeners
document.getElementById("filterButton").addEventListener("click", debounce(() => {
    const positionFilter = document.getElementById("positionFilter").value;
    const filteredPlayers = filterPlayersByPosition(positionFilter, players);
    displayTeam(filteredPlayers);
}));

document.getElementById("selectTeamButton").addEventListener("click", debounce(() => {
    displaySelectedTeam(players);
}));

document.getElementById("recommendCaptainViceCaptainButton").addEventListener("click", debounce(() => {
    const bestTeam = selectBestTeam(players);
    displayCaptainViceCaptainRecommendationsFromBestTeam(bestTeam);
}));

// Initialize team display
displayTeam(players);
