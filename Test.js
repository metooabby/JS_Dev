// Player data
const players = [
    { name: "Chamari Atapattu", team: "SYD", position: "AR", salary: 9.0, selPerc: 97.74, fantasyPoints: 419 },
    { name: "Sophie Devine", team: "PER", position: "AR", salary: 8.0, selPerc: 93.16, fantasyPoints: 165 },
    { name: "Sammy Jo Johnson", team: "SYD", position: "AR", salary: 7.5, selPerc: 46.16, fantasyPoints: 142 },
    { name: "Amy Edgar", team: "PER", position: "AR", salary: 7.0, selPerc: 37.29, fantasyPoints: 147 },
    { name: "Phoebe Litchfield", team: "SYD", position: "BAT", salary: 8.5, selPerc: 86.19, fantasyPoints: 280 },
    { name: "Georgia Voll", team: "SYD", position: "BAT", salary: 8.0, selPerc: 34.56, fantasyPoints: 212 },
    { name: "Heather Knight", team: "SYD", position: "BAT", salary: 8.0, selPerc: 87.25, fantasyPoints: 327 },
    { name: "Anika Learoyd", team: "SYD", position: "BAT", salary: 7.0, selPerc: 3.3, fantasyPoints: 129 },
    { name: "Chloe Piparo", team: "PER", position: "BAT", salary: 7.0, selPerc: 7.23, fantasyPoints: 64 },
    { name: "Mikayla Hinkley", team: "PER", position: "BAT", salary: 7.0, selPerc: 14.37, fantasyPoints: 112 },
    { name: "Dayalan Hemalatha", team: "PER", position: "BAT", salary: 6.5, selPerc: 13.11, fantasyPoints: 69 },
    { name: "Samantha Bates", team: "SYD", position: "BOW", salary: 9.0, selPerc: 92.15, fantasyPoints: 516 },
    { name: "Alana King", team: "PER", position: "BOW", salary: 8.5, selPerc: 94.37, fantasyPoints: 517 },
    { name: "Shabnim Ismail", team: "SYD", position: "BOW", salary: 8.5, selPerc: 77.21, fantasyPoints: 235 },
    { name: "Chloe Ainsworth", team: "PER", position: "BOW", salary: 8.0, selPerc: 82.52, fantasyPoints: 359 },
    { name: "Hannah Darlington", team: "SYD", position: "BOW", salary: 8.0, selPerc: 60.61, fantasyPoints: 233 },
    { name: "Ebony Hoskin", team: "PER", position: "BOW", salary: 7.5, selPerc: 9.58, fantasyPoints: 140 },
    { name: "Lilly Mills", team: "PER", position: "BOW", salary: 7.5, selPerc: 8.05, fantasyPoints: 129 },
    { name: "Taneale Peschel", team: "SYD", position: "BOW", salary: 5.5, selPerc: 21.91, fantasyPoints: 247 },
    { name: "Beth Mooney", team: "PER", position: "WK", salary: 8.5, selPerc: 93.67, fantasyPoints: 286 },
    { name: "Amy Jones", team: "PER", position: "WK", salary: 7.5, selPerc: 28.26, fantasyPoints: 135 },
    { name: "Tahlia Wilson", team: "SYD", position: "WK", salary: 6.5, selPerc: 7.16, fantasyPoints: 96 }
];

// Function to calculate player score (without fantasy points)
function calculatePlayerScore(player) {
    return player.fantasyPoints;
}

function filterPlayersByPosition(positionFilter, players) {
    if (positionFilter === "All" || !positionFilter) {
        return players; // If 'All' is selected or no position is selected, return all players
    }
    return players.filter(player => player.position === positionFilter);
}

// Function to select best team
function selectBestTeam(players) {
    const scoredPlayers = players.map(player => ({
        ...player,
        score: calculatePlayerScore(player)
    }));

    // Sort players by score (high to low) initially for easy processing
    scoredPlayers.sort((a, b) => b.score - a.score);

    const positions = ['BAT', 'BOW', 'AR', 'WK'];
    const positionLimits = { BAT: { min: 3, max: 3 }, BOW: { min: 4, max: 4 }, AR: { min: 3, max: 3 }, WK: { min: 1, max: 1 } };
    const bestTeam = [];
    const positionCounters = Object.fromEntries(
        Object.keys(positionLimits).map(position => [position, 0])
    );

    // Helper function to check if a player is already in the team
    const isPlayerInTeam = (player) => bestTeam.some(teamPlayer => teamPlayer.name === player.name);

    // Group players by position
    const positionGroups = positions.reduce((acc, position) => {
        acc[position] = scoredPlayers.filter(player => player.position === position);
        return acc;
    }, {});

    // Helper function to filter by first digit rule with highest selPercentage as a tiebreaker
    function filterByFirstDigit(players, position) {
        const filtered = [];

        // Group players by the first digit of their fantasy points
        const groupedByFirstDigit = players.reduce((acc, player) => {
            const firstDigit = player.fantasyPoints.toString()[0];
            if (!acc[firstDigit]) acc[firstDigit] = [];
            acc[firstDigit].push(player);
            return acc;
        }, {});

        // Sort the first digits in descending order to process from highest to lowest
        const sortedKeys = Object.keys(groupedByFirstDigit).sort((a, b) => b - a);

        sortedKeys.forEach(firstDigit => {
            const group = groupedByFirstDigit[firstDigit];

            if (position === "BOW") {
                // For BOW, select the bowler with the lowest selPerc (opposite to other positions)
                const selectedPlayer = group.reduce((best, player) => 
                    player.selPerc < best.selPerc ? player : best, group[0]);
                filtered.push(selectedPlayer);
            } else {
                // For other positions, select based on highest selPercentage
                const selectedPlayer = group.reduce((best, player) => 
                    player.selPerc > best.selPerc ? player : best, group[0]);
                filtered.push(selectedPlayer);
            }
        });

        return filtered;
    }

    // Process each position with filtering
    positions.forEach(position => {
        const positionFiltered = filterByFirstDigit(positionGroups[position], position);

        // Fill the position with the first digit filtered players
        positionFiltered.forEach(player => {
            if (positionCounters[player.position] < positionLimits[player.position].max && !isPlayerInTeam(player)) {
                bestTeam.push(player);
                positionCounters[player.position]++;
            }
        });

        // If there are still open spots, fill them with the next best players based on selPerc
        if (positionCounters[position] < positionLimits[position].max) {
            const remainingPlayers = positionGroups[position].filter(player => !isPlayerInTeam(player));
            remainingPlayers.sort((a, b) => position === "BOW" ? a.selPerc - b.selPerc : b.selPerc - a.selPerc); // Sort based on lowest selPerc for bowlers

            while (positionCounters[position] < positionLimits[position].max && remainingPlayers.length > 0) {
                const playerToAdd = remainingPlayers.shift(); // Select the player with the lowest or highest selPerc
                if (playerToAdd && !isPlayerInTeam(playerToAdd)) {
                    bestTeam.push(playerToAdd);
                    positionCounters[position]++;
                }
            }
        }
    });

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
              <td>${player.salary}</td>
              <td>${player.selPerc}</td>
              <td>${player.fantasyPoints}</td>
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
    displayTeam(filteredPlayers);  // Display the filtered team
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
          `;
        viceCaptainTableBody.appendChild(row);
    });
}

// Event listener to display captain and vice-captain recommendations
document.getElementById("recommendCaptainViceCaptainButton").addEventListener("click", () => {
    displayCaptainViceCaptainRecommendations(players);
});


