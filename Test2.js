// Player scoring weights
const weightFantasyPoints = 0.35;
const weightFppm = 0.1;
const weightRuns = 0.1;
const weightWkts = 0.2;
const weightCentury = 0.15;
const weightHalfCentury = 0.1;

// Player data
const players = [
    { name: "Alana King", team: "PER", position: "BOW", salary: 8.5, selPerc: 96.39, fantasyPoints: 531, value: 12.49, nos: 5, runs: 44, century: 0, halfCentury: 0, wkts: 14 },
    { name: "Alice Capsey", team: "MEL", position: "BAT", salary: 8.0, selPerc: 93.16, fantasyPoints: 216, value: 6.75, nos: 4, runs: 27, century: 0, halfCentury: 0, wkts: 6 },
    { name: "Amy Edgar", team: "PER", position: "AR", salary: 7.0, selPerc: 32.2, fantasyPoints: 118, value: 3.37, nos: 5, runs: 21, century: 0, halfCentury: 0, wkts: 2 },
    { name: "Amy Jones", team: "PER", position: "WK", salary: 7.5, selPerc: 39.28, fantasyPoints: 200, value: 5.33, nos: 5, runs: 126, century: 0, halfCentury: 0, wkts: 0 },
    { name: "Beth Mooney", team: "PER", position: "WK", salary: 8.5, selPerc: 95.6, fantasyPoints: 266, value: 6.26, nos: 5, runs: 163, century: 0, halfCentury: 1, wkts: 0 },
    { name: "Charis Bekker", team: "PER", position: "BOW", salary: 6.0, selPerc: 17.01, fantasyPoints: 151, value: 6.29, nos: 4, runs: 20, century: 0, halfCentury: 0, wkts: 3 },
    { name: "Chloe Ainsworth", team: "PER", position: "BOW", salary: 8.0, selPerc: 81.93, fantasyPoints: 181, value: 4.53, nos: 5, runs: 41, century: 0, halfCentury: 0, wkts: 3 },
    { name: "Chloe Piparo", team: "PER", position: "BAT", salary: 7.0, selPerc: 6.07, fantasyPoints: 77, value: 2.20, nos: 5, runs: 38, century: 0, halfCentury: 0, wkts: 0 },
    { name: "Courtney Webb", team: "MEL", position: "BAT", salary: 8.0, selPerc: 74.62, fantasyPoints: 249, value: 6.23, nos: 5, runs: 180, century: 0, halfCentury: 1, wkts: 0 },
    { name: "Dayalan Hemalatha", team: "PER", position: "BAT", salary: 6.5, selPerc: 18.09, fantasyPoints: 38, value: 2.92, nos: 2, runs: 20, century: 0, halfCentury: 0, wkts: 0 },
    { name: "Deandra Dottin", team: "MEL", position: "BAT", salary: 8.5, selPerc: 72.37, fantasyPoints: 115, value: 3.38, nos: 4, runs: 42, century: 0, halfCentury: 0, wkts: 1 },
    { name: "Ebony Hoskin", team: "PER", position: "BOW", salary: 7.5, selPerc: 59.66, fantasyPoints: 131, value: 5.82, nos: 3, runs: 1, century: 0, halfCentury: 0, wkts: 4 },
    { name: "Emma de Broughe", team: "MEL", position: "AR", salary: 7.5, selPerc: 17.74, fantasyPoints: 154, value: 4.11, nos: 5, runs: 73, century: 0, halfCentury: 0, wkts: 1 },
    { name: "Georgia Wareham", team: "MEL", position: "AR", salary: 8.5, selPerc: 97.26, fantasyPoints: 434, value: 10.21, nos: 5, runs: 94, century: 0, halfCentury: 1, wkts: 9 },
    { name: "Hayley Matthews", team: "MEL", position: "AR", salary: 9.0, selPerc: 98.21, fantasyPoints: 350, value: 7.78, nos: 5, runs: 107, century: 0, halfCentury: 0, wkts: 6 },
    { name: "Lilly Mills", team: "PER", position: "BOW", salary: 7.5, selPerc: 20.17, fantasyPoints: 145, value: 3.87, nos: 5, runs: 21, century: 0, halfCentury: 0, wkts: 3 },
    { name: "Mikayla Hinkley", team: "PER", position: "BAT", salary: 7.0, selPerc: 6.53, fantasyPoints: 100, value: 2.86, nos: 5, runs: 67, century: 0, halfCentury: 0, wkts: 0 },
    { name: "Milly Illingworth", team: "MEL", position: "BOW", salary: 6.5, selPerc: 7.81, fantasyPoints: 29, value: 1.12, nos: 4, runs: 1, century: 0, halfCentury: 0, wkts: 0 },
    { name: "Naomi Stalenberg", team: "MEL", position: "BAT", salary: 7.5, selPerc: 5.77, fantasyPoints: 115, value: 3.07, nos: 5, runs: 62, century: 0, halfCentury: 0, wkts: 0 },
    { name: "Nicole Faltum", team: "MEL", position: "WK", salary: 7.0, selPerc: 5.13, fantasyPoints: 113, value: 3.23, nos: 5, runs: 45, century: 0, halfCentury: 0, wkts: 0 },
    { name: "Sarah Coyte", team: "MEL", position: "BOW", salary: 7.0, selPerc: 35.95, fantasyPoints: 166, value: 4.74, nos: 5, runs: 12, century: 0, halfCentury: 0, wkts: 4 },
    { name: "Sophie Devine", team: "PER", position: "AR", salary: 8.0, selPerc: 95.14, fantasyPoints: 235, value: 5.88, nos: 5, runs: 90, century: 0, halfCentury: 0, wkts: 4 }
]

// Function to calculate player score
function calculatePlayerScore(player) {
    const fppm = player.nos ? player.fantasyPoints / player.nos : 0;
    const score =
        (player.fantasyPoints * weightFantasyPoints) +
        (fppm * weightFppm) +
        (player.runs * (player.position === 'WK' || player.position === 'BAT' ? 0.3 : 0.1)) +
        (player.wkts * (player.position === 'AR' || player.position === 'BOW' ? 0.2 : 0.05)) +
        (player.century * weightCentury) +
        (player.halfCentury * weightHalfCentury)
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
    const positionLimits = { BAT: { min: 3, max: 4 }, BOW: { min: 3, max: 4 }, AR: { min: 2, max: 3 }, WK: { min: 1, max: 2 } };
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

    // Calculate scores and sort players
    const scoredPlayers = players.map(player => ({
        ...player,
        score: calculatePlayerScore(player)
    }));
    scoredPlayers.sort((a, b) => b.score - a.score);

    scoredPlayers.forEach(player => {
        const row = document.createElement("tr");
        row.innerHTML = `
              <td>${player.name}</td>
              <td>${player.team}</td>
              <td>${player.position}</td>
              <td>${player.selPerc}</td>
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
    const captainRecommendations = scoredPlayers.slice(0, 3);
    const viceCaptainRecommendations = scoredPlayers.slice(3, 6);

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
              <td>${player.selPerc}</td>
              <td>${player.score.toFixed(2)}</td>
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
              <td>${player.selPerc}</td>
              <td>${player.score.toFixed(2)}</td>
          `;
        viceCaptainTableBody.appendChild(row);
    });
}

// Event listener to display captain and vice-captain recommendations
document.getElementById("recommendCaptainViceCaptainButton").addEventListener("click", () => {
    displayCaptainViceCaptainRecommendations(players);
});