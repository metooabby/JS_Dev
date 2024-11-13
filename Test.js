// Player data
const players = [
    { name: "Chamari Atapattu", team: "SYD", position: "AR", salary: 9.0, selPerc: 97.74, fantasyPoints: 419 },
    { name: "Sophie Devine", team: "PER", position: "AR", salary: 8.0, selPerc: 93.16, fantasyPoints: 165 },
    { name: "Alana King", team: "PER", position: "BOW", salary: 8.5, selPerc: 94.37, fantasyPoints: 517 },
    { name: "Samantha Bates", team: "SYD", position: "BOW", salary: 9.0, selPerc: 92.15, fantasyPoints: 516 },
    { name: "Sammy Jo Johnson", team: "SYD", position: "AR", salary: 7.5, selPerc: 46.16, fantasyPoints: 142 },
    { name: "Heather Knight", team: "SYD", position: "BAT", salary: 8.0, selPerc: 87.25, fantasyPoints: 327 },
    { name: "Phoebe Litchfield", team: "SYD", position: "BAT", salary: 8.5, selPerc: 86.19, fantasyPoints: 280 },
    { name: "Dayalan Hemalatha", team: "PER", position: "BAT", salary: 6.5, selPerc: 13.11, fantasyPoints: 69 },
    { name: "Chloe Ainsworth", team: "PER", position: "BOW", salary: 8.0, selPerc: 82.52, fantasyPoints: 359 },
    { name: "Shabnim Ismail", team: "SYD", position: "BOW", salary: 8.5, selPerc: 77.21, fantasyPoints: 235 },
    { name: "Hannah Darlington", team: "SYD", position: "BOW", salary: 8.0, selPerc: 60.61, fantasyPoints: 233 },
    { name: "Georgia Voll", team: "SYD", position: "BAT", salary: 8.0, selPerc: 34.56, fantasyPoints: 212 },
    { name: "Mikayla Hinkley", team: "PER", position: "BAT", salary: 7.0, selPerc: 14.37, fantasyPoints: 112 },
    { name: "Taneale Peschel", team: "SYD", position: "BOW", salary: 5.5, selPerc: 21.91, fantasyPoints: 247 },
    { name: "Amy Jones", team: "PER", position: "WK", salary: 7.5, selPerc: 28.26, fantasyPoints: 135 },
    { name: "Ebony Hoskin", team: "PER", position: "BOW", salary: 7.5, selPerc: 9.58, fantasyPoints: 140 },
    { name: "Beth Mooney", team: "PER", position: "WK", salary: 8.5, selPerc: 93.67, fantasyPoints: 286 },
    { name: "Chloe Piparo", team: "PER", position: "BAT", salary: 7.0, selPerc: 7.23, fantasyPoints: 64 },
    { name: "Tahlia Wilson", team: "SYD", position: "WK", salary: 6.5, selPerc: 7.16, fantasyPoints: 96 },
    { name: "Anika Learoyd", team: "SYD", position: "BAT", salary: 7.0, selPerc: 3.3, fantasyPoints: 129 },
    { name: "Amy Edgar", team: "PER", position: "AR", salary: 7.0, selPerc: 37.29, fantasyPoints: 147 },
    { name: "Lilly Mills", team: "PER", position: "BOW", salary: 7.5, selPerc: 8.05, fantasyPoints: 129 }
]    

function calculatePlayerScore(player) {
    return player.fantasyPoints;
}

function filterPlayersByPosition(positionFilter, players) {
    if (positionFilter === "ALL" || !positionFilter) {
        return players;
    }
    return players.filter(player => player.position === positionFilter);
}

// Function to select best team
function selectBestTeam(players) {
    const scoredPlayers = players.map(player => ({
        ...player,
        score: calculatePlayerScore(player)
    }));

    // Sort players by score (high to low)
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

    // Helper function to filter players by first digit rule and selPerc
    function filterByFirstDigit(players) {
        const filtered = [];

        // Group players by the first digit of their fantasy points
        const groupedByFirstDigit = players.reduce((acc, player) => {
            const firstDigit = player.fantasyPoints.toString()[0];
            if (!acc[firstDigit]) acc[firstDigit] = [];
            acc[firstDigit].push(player);
            return acc;
        }, {});

        // Sort first-digit groups in descending order
        const sortedKeys = Object.keys(groupedByFirstDigit).sort((a, b) => b - a);

        sortedKeys.forEach(firstDigit => {
            const group = groupedByFirstDigit[firstDigit];

            // If there are multiple players with the same first digit, select the one with the highest selPerc
            const selectedPlayer = group.reduce((best, player) => 
                player.selPerc > best.selPerc ? player : best, group[0]);
            filtered.push(selectedPlayer);
        });

        return filtered;
    }

    // Process each position with filtering by group and then single-digit rule
    positions.forEach(position => {
        const positionFiltered = filterByFirstDigit(positionGroups[position]);

        // Add players from the filtered list to the team
        positionFiltered.forEach(player => {
            if (positionCounters[player.position] < positionLimits[player.position].max && !isPlayerInTeam(player)) {
                bestTeam.push(player);
                positionCounters[player.position]++;
            }
        });

        // If there are still open spots, add the next best single-value players based on selPerc
        if (positionCounters[position] < positionLimits[position].max) {
            const remainingPlayers = positionGroups[position].filter(player => !isPlayerInTeam(player));
            remainingPlayers.sort((a, b) => b.selPerc - a.selPerc); // Sort all by highest selPerc

            while (positionCounters[position] < positionLimits[position].max && remainingPlayers.length > 0) {
                const playerToAdd = remainingPlayers.shift();
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

// Function to recommend captain and vice-captain from the best 11 players
function recommendCaptainViceCaptain(players) {
    // Get the best 11 players using the selectBestTeam function
    const best11 = selectBestTeam(players).slice(0, 11);

    // Group players by the first digit of their fantasy points
    const groupedByFirstDigit = best11.reduce((acc, player) => {
        const firstDigit = player.fantasyPoints.toString()[0];
        if (!acc[firstDigit]) acc[firstDigit] = [];
        acc[firstDigit].push(player);
        return acc;
    }, {});

    const captainRecommendations = [];
    const viceCaptainRecommendations = [];

    // Process each group for captain and vice-captain selections
    Object.keys(groupedByFirstDigit).forEach(firstDigit => {
        const group = groupedByFirstDigit[firstDigit];

        if (group.length > 1) {
            // For groups with multiple players sharing the same first digit, select the player with max fantasyPoints as captain
            const captainCandidate = group.reduce((best, player) => 
                player.fantasyPoints > best.fantasyPoints ? player : best, group[0]);
            captainRecommendations.push(captainCandidate);
        } else if (group.length === 1) {
            // For single-player groups, recommend them as vice-captain
            viceCaptainRecommendations.push(group[0]);
        }
    });

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
              <td>${player.fantasyPoints}</td>
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
              <td>${player.fantasyPoints}</td>
          `;
        viceCaptainTableBody.appendChild(row);
    });
}

// Event listener to display captain and vice-captain recommendations
document.getElementById("recommendCaptainViceCaptainButton").addEventListener("click", () => {
    displayCaptainViceCaptainRecommendations(players);
});


