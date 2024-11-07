// Player scoring weights
const weightBatCI = 0.35;
const weightBowlCI = 0.1;
const weightOverallCI = 0.2;
const weightSelectionPercent = 0.15;
const weightSalary = 0.1;

// Player data
const players = [
    {name: "Abhijith Asokan", team: "AIOC", position: "BAT", salary: 8.0, selectionPercent: 86.58, battingCI: 44.4, bowlingCI: null, overallCI: null},
    {name: "Ahamad Kabeer", team: "AIOC", position: "BOW", salary: 7.0, selectionPercent: 65.89, battingCI: null, bowlingCI: 90.0, overallCI: null},
    {name: "Anoop Oravanakundil", team: "AIOC", position: "AR", salary: 8.0, selectionPercent: 80.12, battingCI: null, bowlingCI: null, overallCI: 68.4},
    {name: "Arun Geetha John", team: "AIOC", position: "AR", salary: 7.0, selectionPercent: 19.03, battingCI: null, bowlingCI: null, overallCI: 56.9},
    {name: "Asif Shahid Mahmood", team: "GGL", position: "WK", salary: 7.0, selectionPercent: 6.67, battingCI: 39.8, bowlingCI: null, overallCI: null},
    {name: "Bilal Kazmi", team: "AIOC", position: "BOW", salary: 6.0, selectionPercent: 7.42, battingCI: null, bowlingCI: 75.0, overallCI: null},
    {name: "Hashim Mohammed", team: "AIOC", position: "WK", salary: 7.5, selectionPercent: 35.16, battingCI: 96.4, bowlingCI: null, overallCI: null},
    {name: "Hassan Sarwar", team: "GGL", position: "WK", salary: 8.5, selectionPercent: 85.99, battingCI: 100.0, bowlingCI: null, overallCI: null},
    {name: "Mohammad Jahangir", team: "GGL", position: "BAT", salary: 7.5, selectionPercent: 77.96, battingCI: 65.3, bowlingCI: null, overallCI: null},
    {name: "Mohammad Sohel", team: "GGL", position: "BAT", salary: 5.5, selectionPercent: 14.40, battingCI: 52.4, bowlingCI: null, overallCI: null},
    {name: "Mohammed Hisham", team: "AIOC", position: "AR", salary: 9.0, selectionPercent: 92.53, battingCI: null, bowlingCI: null, overallCI: 61.0},
    {name: "Nichel Prakash", team: "AIOC", position: "BOW", salary: 8.5, selectionPercent: 87.78, battingCI: null, bowlingCI: 92.6, overallCI: null},
    {name: "Rahul Murali", team: "AIOC", position: "BAT", salary: 7.0, selectionPercent: 24.90, battingCI: 0.0, bowlingCI: null, overallCI: null},
    {name: "Riasat Ali Anwar Khan", team: "GGL", position: "AR", salary: 9.0, selectionPercent: 91.80, battingCI: null, bowlingCI: null, overallCI: 59.9},
    {name: "Robin Plathanath", team: "AIOC", position: "BOW", salary: 6.5, selectionPercent: 11.98, battingCI: null, bowlingCI: 0.0, overallCI: null},
    {name: "Sabuh Ghosh", team: "GGL", position: "AR", salary: 8.0, selectionPercent: 36.76, battingCI: null, bowlingCI: null, overallCI: 71.0},
    {name: "Sajad Ahmed", team: "GGL", position: "BOW", salary: 7.5, selectionPercent: 48.24, battingCI: null, bowlingCI: 85.0, overallCI: null},
    {name: "Sandeep Toshkhani", team: "GGL", position: "AR", salary: 7.5, selectionPercent: 15.21, battingCI: null, bowlingCI: null, overallCI: 53.7},
    {name: "Shibu Omanakuttan", team: "AIOC", position: "AR", salary: 8.5, selectionPercent: 83.32, battingCI: null, bowlingCI: null, overallCI: 40.1},
    {name: "Vishukant Tyagi", team: "GGL", position: "BOW", salary: 8.0, selectionPercent: 88.12, battingCI: null, bowlingCI: 86.8, overallCI: null},
    {name: "Waqar Ali", team: "GGL", position: "BAT", salary: 6.5, selectionPercent: 19.90, battingCI: 49.5, bowlingCI: null, overallCI: null},
    {name: "Zeeshan Ahmad", team: "GGL", position: "AR", salary: 6.0, selectionPercent: 10.33, battingCI: null, bowlingCI: null, overallCI: 0.0}
  ];
  

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
            score = (player.battingCI * 0.6) + (player.bowlingCI * 0.4) + (player.selectionPercent * weightSelectionPercent) + ((11 - player.salary) * weightSalary);
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
    const scoredPlayers = players.map(player => ({
        ...player,
        score: calculatePlayerScore(player)
    }));

    scoredPlayers.sort((a, b) => b.score - a.score);

    const positions = ['BAT', 'BOW', 'AR', 'WK'];
    const positionLimits = { BAT: { min: 3, max: 3 }, BOW: { min: 3, max: 3 }, AR: { min: 4, max: 4 }, WK: { min: 1, max: 1 } };
    const minTotalPlayers = positions.reduce((sum, position) => sum + positionLimits[position].min, 0);
    const maxTotalPlayers = positions.reduce((sum, position) => sum + positionLimits[position].max, 0);
    const highSelLimit = Math.min(Math.ceil(scoredPlayers.length / 2), 7);

    const bestTeam = [];
    const positionCounters = Object.fromEntries(
        Object.keys(positionLimits).map(position => [position, 0])
    );

    // Prioritize high selection percentage players
    const highSelPlayers = scoredPlayers.filter(player => player.selectionPercent >= 31);
    const bestHighSelPlayers = highSelPlayers.slice(0, highSelLimit);

    bestHighSelPlayers.forEach(player => {
        if (positionCounters[player.position] < positionLimits[player.position].max) {
            bestTeam.push(player);
            positionCounters[player.position]++;
        }
    });

    // Fill remaining positions with low selection percentage players
    const lowSelPlayers = scoredPlayers.filter(player => player.selectionPercent < 31);
    const remainingPositions = 11 - bestTeam.length;

    
    lowSelPlayers.forEach(player => {
        if (bestTeam.length < 11 && positionCounters[player.position] < positionLimits[player.position].max) {
            bestTeam.push(player);
            positionCounters[player.position]++;
        }
    });

    // Ensure minimum position requirements are met
    positions.forEach(position => {
        while (positionCounters[position] < positionLimits[position].min && bestTeam.length < 11) {
            const eligiblePlayers = lowSelPlayers.filter(p => p.position === position);
            if (eligiblePlayers.length > 0) {
                const bestEligiblePlayer = eligiblePlayers[0];
                bestTeam.push(bestEligiblePlayer);
                positionCounters[position]++;
            }
        }
    });

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

    scoredPlayers.forEach(player => {
        const row = document.createElement("tr");
        row.innerHTML = `
              <td>${player.name}</td>
              <td>${player.team}</td>
              <td>${player.position}</td>
              <td>${player.selectionPercent}</td>
              <td>${player.score.toFixed(2)}</td>
          `;
        tableBody.appendChild(row);
    });
}

// Function to display selected team
function displaySelectedTeam(players) {
    const bestTeam = selectBestTeam(players);
    displayTeam(bestTeam);
}

// Event listeners
document.getElementById("filterButton").addEventListener("click", () => {
    const positionFilter = document.getElementById("positionFilter").value;
    const filteredPlayers = filterPlayersByPosition(positionFilter, players);
    displayTeam(filteredPlayers);
});

document.getElementById("selectTeamButton").addEventListener("click", () => {
    displaySelectedTeam(players);
});

// Initialize team display
displayTeam(players);

// Function to recommend captain and vice-captain
function recommendCaptainViceCaptain(players) {
    const scoredPlayers = players.map(player => ({
        ...player,
        score: calculatePlayerScore(player)
    }));
    scoredPlayers.sort((a, b) => b.score - a.score);

    // Recommend top 3 players as captain and vice-captain
    const captainRecommendations = scoredPlayers.slice(0, 1);
    const viceCaptainRecommendations = scoredPlayers.slice(1, 2);

    return { captainRecommendations, viceCaptainRecommendations };
}

// Function to display captain and vice-captain recommendations
function displayCaptainViceCaptainRecommendations(players) {
    const { captainRecommendations, viceCaptainRecommendations } = recommendCaptainViceCaptain(players);

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

document.getElementById("recommendCaptainViceCaptainButton").addEventListener("click", () => {
    displayCaptainViceCaptainRecommendations(players);
});