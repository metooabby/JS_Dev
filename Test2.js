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

    const highSelPlayers = scoredPlayers.filter(player => player.selPerc >= 31);
    const lowSelPlayers = scoredPlayers.filter(player => player.selPerc < 31);

    const highSelCount = Math.min(Math.ceil(highSelPlayers.length / 2), 7);
    const lowSelCount = 11 - highSelCount;

    const bestHighSelPlayers = highSelPlayers.slice(0, highSelCount);
    const bestLowSelPlayers = lowSelPlayers.slice(0, lowSelCount);

    let bestTeam = [...bestHighSelPlayers, ...bestLowSelPlayers];

    const positions = ['BAT', 'BOW', 'AR', 'WK'];
    const positionLimits = { BAT: 3, BOW: 3, AR: 3, WK: 2 };
    const finalBestTeam = [];
    let remainingPlayers = [...bestTeam];

    positions.forEach(position => {
        const positionPlayers = remainingPlayers.filter(player => player.position === position);
        const topPlayers = positionPlayers.slice(0, positionLimits[position]);
        finalBestTeam.push(...topPlayers);
        remainingPlayers = remainingPlayers.filter(player => !topPlayers.includes(player));
    });

    const additionalPlayers = remainingPlayers.slice(0, 11 - finalBestTeam.length);
    finalBestTeam.push(...additionalPlayers);

    // Sort final team by score
    finalBestTeam.sort((a, b) => b.score - a.score);

    return finalBestTeam;
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