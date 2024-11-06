// Player scoring weights
const weightFantasyPoints = 0.35;
const weightValue = 0.05;
const weightFppm = 0.1;
const weightRuns = 0.1;
const weightWkts = 0.2;
const weightCatches = 0.05;
const weightStumpings = 0.05;
const weightCentury = 0.15;
const weightHalfCentury = 0.1;
const weightEconomy = -0.15;
const weightStrikeRate = 0.1;

// Player data
const players = [
    
];

// Function to calculate player score
function calculatePlayerScore(player) {
    const fppm = player.nos ? player.fantasyPoints / player.nos : 0;
    const score =
        (player.fantasyPoints * weightFantasyPoints) +
        (player.value * weightValue) +
        (fppm * weightFppm) +
        (player.runs * (player.position === 'WK' || player.position === 'BAT' ? 0.3 : 0.1)) +
        (player.wkts * (player.position === 'AR' || player.position === 'BOW' ? 0.2 : 0.05)) +
        (player.ct * weightCatches) +
        (player.st * weightStumpings) +
        (player.century * weightCentury) +
        (player.halfCentury * weightHalfCentury) +
        ((player.econ || 0) * (player.position === 'BOW' ? weightEconomy : 0)) +
        ((player.strikeRate || 0) * (player.position === 'BAT' ? weightStrikeRate : 0));

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
    const positionLimits = { BAT: { min: 4, max: 4 }, BOW: { min: 3, max: 3 }, AR: { min: 2, max: 2 }, WK: { min: 2, max: 2 } };
    const minTotalPlayers = positions.reduce((sum, position) => sum + positionLimits[position].min, 0);
    const maxTotalPlayers = positions.reduce((sum, position) => sum + positionLimits[position].max, 0);
    const highSelLimit = Math.min(Math.ceil(scoredPlayers.length / 2), 7);

    const bestTeam = [];
    const positionCounters = Object.fromEntries(
        Object.keys(positionLimits).map(position => [position, 0])
    );

    // Prioritize high selection percentage players
    const highSelPlayers = scoredPlayers.filter(player => player.selPerc >= 31);
    const bestHighSelPlayers = highSelPlayers.slice(0, highSelLimit);

    bestHighSelPlayers.forEach(player => {
        if (positionCounters[player.position] < positionLimits[player.position].max) {
            bestTeam.push(player);
            positionCounters[player.position]++;
        }
    });

    // Fill remaining positions with low selection percentage players
    const lowSelPlayers = scoredPlayers.filter(player => player.selPerc < 31);
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
                bestTeam.push(eligiblePlayers[0]);
                positionCounters[position]++;
            }
        }
    });

    // Fill any remaining positions with top-scoring players regardless of selection percentage
    scoredPlayers.forEach(player => {
        if (bestTeam.length < 11 && !bestTeam.includes(player)) {
            bestTeam.push(player);
        }
    });

    // Sort final team by score
    bestTeam.sort((a, b) => b.score - a.score);

    return bestTeam;
}

// Function to display team
function displayTeam(players) {
    const tableBody = document.getElementById("teamTableBody");
    tableBody.innerHTML = '';

    players.forEach(player => {
        const row = document.createElement("tr");
        row.innerHTML = `
              <td>${player.name}</td>
              <td>${player.team}</td>
              <td>${player.position}</td>
              <td>${player.selPerc}</td>
              <td>${player.score ? player.score.toFixed(2) : calculatePlayerScore(player).toFixed(2)}</td>
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