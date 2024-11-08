// Player scoring weights
const weightFantasyPoints = 0.35;
const weightFppm = 0.1;
const weightRuns = 0.1;
const weightWkts = 0.2;
const weightCentury = 0.15;
const weightHalfCentury = 0.1;

// Player data
const players = [
    { name: "Hardik Pandya", team: "IND", position: "AR", salary: 9.0, selPerc: 95.30, fantasyPoints: 357, value: 7.93, nos: 5, runs: 149, century: 0, halfCentury: 0, wkts: 3 },
    { name: "Axar Patel", team: "IND", position: "AR", salary: 8.0, selPerc: 56.29, fantasyPoints: 391, value: 9.78, nos: 5, runs: 67, century: 0, halfCentury: 0, wkts: 9 },
    { name: "Marco Jansen", team: "SA", position: "AR", salary: 8.0, selPerc: 79.99, fantasyPoints: 187, value: 4.68, nos: 5, runs: 23, century: 0, halfCentury: 0, wkts: 5 },
    { name: "Abhishek Sharma", team: "IND", position: "AR", salary: 7.5, selPerc: 75.68, fantasyPoints: 189, value: 5.04, nos: 5, runs: 49, century: 0, halfCentury: 0, wkts: 3 },
    { name: "Patrick Kruger", team: "SA", position: "AR", salary: 6.5, selPerc: 10.09, fantasyPoints: 295, value: 9.08, nos: 5, runs: 55, century: 0, halfCentury: 0, wkts: 7 },
    { name: "Ramandeep Singh", team: "IND", position: "AR", salary: 6.0, selPerc: 3.53, fantasyPoints: 0, value: "#DIV/0!", nos: 0, runs: 0, century: 0, halfCentury: 0, wkts: 0 },
    { name: "Mihlali Mpongwana", team: "SA", position: "AR", salary: 5.5, selPerc: 0.90, fantasyPoints: 0, value: "#DIV/0!", nos: 0, runs: 0, century: 0, halfCentury: 0, wkts: 0 },
    { name: "Suryakumar Yadav", team: "IND", position: "BAT", salary: 9.0, selPerc: 90.70, fantasyPoints: 276, value: 6.13, nos: 5, runs: 146, century: 0, halfCentury: 1, wkts: 2 },
    { name: "David Miller", team: "SA", position: "BAT", salary: 8.5, selPerc: 37.71, fantasyPoints: 107, value: 2.52, nos: 5, runs: 68, century: 0, halfCentury: 0, wkts: 0 },
    { name: "Aiden Markram", team: "SA", position: "BAT", salary: 8.0, selPerc: 40.34, fantasyPoints: 138, value: 3.45, nos: 5, runs: 78, century: 0, halfCentury: 0, wkts: 0 },
    { name: "Tristan Stubbs", team: "SA", position: "BAT", salary: 8.0, selPerc: 71.82, fantasyPoints: 242, value: 6.05, nos: 5, runs: 153, century: 0, halfCentury: 1, wkts: 0 },
    { name: "Reeza Hendricks", team: "SA", position: "BAT", salary: 7.5, selPerc: 14.68, fantasyPoints: 246, value: 6.56, nos: 5, runs: 159, century: 0, halfCentury: 2, wkts: 0 },
    { name: "Rinku Singh", team: "IND", position: "BAT", salary: 7.5, selPerc: 28.53, fantasyPoints: 199, value: 5.31, nos: 5, runs: 62, century: 0, halfCentury: 1, wkts: 2 },
    { name: "Tilak Varma", team: "IND", position: "BAT", salary: 7.0, selPerc: 14.24, fantasyPoints: 141, value: 4.03, nos: 5, runs: 93, century: 0, halfCentury: 0, wkts: 0 },
    { name: "Donovan Ferreira", team: "SA", position: "BAT", salary: 6.5, selPerc: 0.97, fantasyPoints: 128, value: 4.92, nos: 4, runs: 72, century: 0, halfCentury: 0, wkts: 0 },
    { name: "Arshdeep Singh", team: "IND", position: "BOW", salary: 8.5, selPerc: 88.78, fantasyPoints: 323, value: 7.60, nos: 5, runs: 7, century: 0, halfCentury: 0, wkts: 10 },
    { name: "Keshav Maharaj", team: "SA", position: "BOW", salary: 8.0, selPerc: 62.74, fantasyPoints: 202, value: 5.05, nos: 5, runs: 9, century: 0, halfCentury: 0, wkts: 6 },
    { name: "Ravi Bishnoi", team: "IND", position: "BOW", salary: 8.0, selPerc: 36.91, fantasyPoints: 332, value: 8.30, nos: 5, runs: 8, century: 0, halfCentury: 0, wkts: 9 },
    { name: "Avesh Khan", team: "IND", position: "BOW", salary: 7.5, selPerc: 12.65, fantasyPoints: 238, value: 6.35, nos: 5, runs: 16, century: 0, halfCentury: 0, wkts: 7 },
    { name: "Gerald Coetzee", team: "SA", position: "BOW", salary: 7.5, selPerc: 56.99, fantasyPoints: 230, value: 6.13, nos: 5, runs: 24, century: 0, halfCentury: 0, wkts: 7 },
    { name: "Ottniel Baartman", team: "SA", position: "BOW", salary: 7.0, selPerc: 19.50, fantasyPoints: 193, value: 5.51, nos: 5, runs: 1, century: 0, halfCentury: 0, wkts: 6 },
    { name: "Varun Chakravarthy", team: "IND", position: "BOW", salary: 7.0, selPerc: 20.40, fantasyPoints: 191, value: 5.46, nos: 5, runs: 0, century: 0, halfCentury: 0, wkts: 5 },
    { name: "Nqabayomzi Peter", team: "SA", position: "BOW", salary: 6.0, selPerc: 1.58, fantasyPoints: 129, value: 5.38, nos: 4, runs: 14, century: 0, halfCentury: 0, wkts: 4 },
    { name: "Vijaykumar Vyshak", team: "IND", position: "BOW", salary: 6.0, selPerc: 1.00, fantasyPoints: 0, value: "#DIV/0!", nos: 0, runs: 0, century: 0, halfCentury: 0, wkts: 0 },
    { name: "Yash Dayal", team: "IND", position: "BOW", salary: 6.0, selPerc: 1.38, fantasyPoints: 0, value: "#DIV/0!", nos: 0, runs: 0, century: 0, halfCentury: 0, wkts: 0 },
    { name: "Andile Simelane", team: "SA", position: "BOW", salary: 5.5, selPerc: 0.84, fantasyPoints: 0, value: "#DIV/0!", nos: 0, runs: 0, century: 0, halfCentury: 0, wkts: 0 },
    { name: "Heinrich Klaasen", team: "SA", position: "WK", salary: 9.0, selPerc: 88.98, fantasyPoints: 220, value: 4.89, nos: 5, runs: 118, century: 0, halfCentury: 1, wkts: 0 },
    { name: "Sanju Samson", team: "IND", position: "WK", salary: 8.0, selPerc: 76.00, fantasyPoints: 259, value: 6.48, nos: 5, runs: 150, century: 1, halfCentury: 0, wkts: 0 },
    { name: "Ryan Rickelton", team: "SA", position: "WK", salary: 7.0, selPerc: 9.99, fantasyPoints: 271, value: 7.74, nos: 5, runs: 163, century: 0, halfCentury: 1, wkts: 0 },
    { name: "Jitesh Sharma", team: "IND", position: "WK", salary: 6.0, selPerc: 1.60, fantasyPoints: 129, value: 4.30, nos: 5, runs: 60, century: 0, halfCentury: 0, wkts: 0 }
];

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