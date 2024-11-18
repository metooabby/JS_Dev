// Player data
const players = [
    { name: "G Maxwell", team: "AUS", position: "AR", salary: 8.5, selPerc: 84.7, fantasyPoints: 95 },
    { name: "M Stoinis", team: "AUS", position: "AR", salary: 8.0, selPerc: 64.2, fantasyPoints: 48 },
    { name: "A Salman", team: "PAK", position: "AR", salary: 7.5, selPerc: 24.5, fantasyPoints: 19 },
    { name: "A Hardie", team: "AUS", position: "AR", salary: 7.5, selPerc: 20.3, fantasyPoints: 39 },
    { name: "J Khan", team: "PAK", position: "AR", salary: 6.5, selPerc: 6.7, fantasyPoints: 0 },
    { name: "M Short", team: "AUS", position: "BAT", salary: 8.0, selPerc: 79.2, fantasyPoints: 95 },
    { name: "B Azam", team: "PAK", position: "BAT", salary: 9.0, selPerc: 55.1, fantasyPoints: 30 },
    { name: "J Fraser McGurk", team: "AUS", position: "BAT", salary: 7.0, selPerc: 53.0, fantasyPoints: 72 },
    { name: "T David", team: "AUS", position: "BAT", salary: 7.5, selPerc: 20.3, fantasyPoints: 54 },
    { name: "I Khan", team: "PAK", position: "BAT", salary: 6.0, selPerc: 15.1, fantasyPoints: 55 },
    { name: "S Farhan", team: "PAK", position: "BAT", salary: 6.5, selPerc: 13.5, fantasyPoints: 43 },
    { name: "H Rauf", team: "PAK", position: "BOW", salary: 9.0, selPerc: 88.3, fantasyPoints: 153 },
    { name: "A Zampa", team: "AUS", position: "BOW", salary: 9.0, selPerc: 79.8, fantasyPoints: 146 },
    { name: "X Bartlett", team: "AUS", position: "BOW", salary: 7.0, selPerc: 72.6, fantasyPoints: 150 },
    { name: "A Afridi", team: "PAK", position: "BOW", salary: 6.0, selPerc: 66.7, fantasyPoints: 196 },
    { name: "S Johnson", team: "AUS", position: "BOW", salary: 6.5, selPerc: 61.8, fantasyPoints: 170 },
    { name: "N Ellis", team: "AUS", position: "BOW", salary: 8.0, selPerc: 52.3, fantasyPoints: 102 },
    { name: "S Afridi", team: "PAK", position: "BOW", salary: 8.5, selPerc: 52.2, fantasyPoints: 15 },
    { name: "S Muqeem", team: "PAK", position: "BOW", salary: 6.5, selPerc: 22.7, fantasyPoints: 66 },
    { name: "U Khan", team: "PAK", position: "WK", salary: 7.0, selPerc: 55.4, fantasyPoints: 89 },
    { name: "J Inglis", team: "AUS", position: "WK", salary: 8.5, selPerc: 46.7, fantasyPoints: 34 },
    { name: "H Khan", team: "PAK", position: "WK", salary: 6.0, selPerc: 6.0, fantasyPoints: 19 }
];

// Player data remains the same

function calculatePlayerScore(player) {
    return player.fantasyPoints;
}

function filterPlayersByPosition(positionFilter, players) {
    if (positionFilter === "ALL" || !positionFilter) {
        return players;
    }
    return players.filter(player => player.position === positionFilter);
}

function selectBestTeam(players) {
    const scoredPlayers = players.map(player => ({
        ...player,
        score: calculatePlayerScore(player),
    }));

    // Sort players by score (high to low)
    scoredPlayers.sort((a, b) => b.score - a.score);

    const positions = ['BAT', 'BOW', 'AR', 'WK'];
    const positionLimits = { BAT: { min: 3, max: 3 }, BOW: { min: 4, max: 4 }, AR: { min: 3, max: 3 }, WK: { min: 1, max: 1 } };
    const bestTeam = [];
    const positionCounters = Object.fromEntries(
        Object.keys(positionLimits).map(position => [position, 0])
    );

    const isPlayerInTeam = (player) => bestTeam.some(teamPlayer => teamPlayer.name === player.name);

    function filterByFirstDigit(players) {
        const filtered = [];

        // Group players by the first digit of their fantasy points
        const groupedByFirstDigit = players.reduce((acc, player) => {
            const firstDigit = player.fantasyPoints.toString()[0] || '0';
            if (!acc[firstDigit]) acc[firstDigit] = [];
            acc[firstDigit].push(player);
            return acc;
        }, {});

        // Sort first-digit groups in descending order
        const sortedKeys = Object.keys(groupedByFirstDigit).sort((a, b) => b - a);

        sortedKeys.forEach(firstDigit => {
            const group = groupedByFirstDigit[firstDigit];

            // Select the player with the highest selPerc from the group
            const selectedPlayer = group.reduce((best, player) =>
                player.selPerc > best.selPerc ? player : best, group[0]);
            filtered.push(selectedPlayer);
        });

        return filtered;
    }

    function processPlayers(playersGroup, positionLimits, maxSelections) {
        let addedPlayers = 0;
        positions.forEach(position => {
            const positionFiltered = playersGroup.filter(player => player.position === position);

            filterByFirstDigit(positionFiltered).forEach(player => {
                if (
                    addedPlayers < maxSelections &&
                    positionCounters[position] < positionLimits[position].max &&
                    !isPlayerInTeam(player)
                ) {
                    bestTeam.push(player);
                    positionCounters[position]++;
                    addedPlayers++;
                }
            });
        });
    }

    // Divide players into high and low selection groups
    const highSelPlayers = scoredPlayers.filter(player => player.selPerc >= 31 && player.selPerc <= 100);
    const lowSelPlayers = scoredPlayers.filter(player => player.selPerc >= 0 && player.selPerc < 31);

    // Calculate maximum players to select from each group
    const maxHighSelPlayers = Math.floor(highSelPlayers.length / 2);
    const maxLowSelPlayers = Math.floor(lowSelPlayers.length / 2);

    // Step 1: Process high selection percentage players
    processPlayers(highSelPlayers, positionLimits, maxHighSelPlayers);

    // Step 2: Process low selection percentage players
    processPlayers(lowSelPlayers, positionLimits, maxLowSelPlayers);

    // Step 3: Fill remaining spots with high selection players if lowSelPlayers are exhausted
    processPlayers(highSelPlayers, positionLimits, highSelPlayers.length); // No limit, fill remaining spots

    return bestTeam;
}

function displayTeam(players) {
    const tableBody = document.getElementById("teamTableBody");
    tableBody.innerHTML = '';

    players.forEach(player => {
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

function recommendCaptainViceCaptain(players) {
    const best11 = selectBestTeam(players).slice(0, 11);

    const captain = best11.reduce((best, player) =>
        player.fantasyPoints > best.fantasyPoints ? player : best, best11[0]);

    const viceCaptain = best11
        .filter(player => player.name !== captain.name)
        .reduce((best, player) =>
            player.fantasyPoints > best.fantasyPoints ? player : best, best11[0]);

    return { captain, viceCaptain };
}

function displayCaptainViceCaptain(players) {
    const { captain, viceCaptain } = recommendCaptainViceCaptain(players);

    const captainTableBody = document.getElementById("captainTableBody");
    const viceCaptainTableBody = document.getElementById("viceCaptainTableBody");

    captainTableBody.innerHTML = `
        <tr>
            <td>${captain.name}</td>
            <td>${captain.team}</td>
            <td>${captain.position}</td>
            <td>${captain.fantasyPoints}</td>
        </tr>`;

    viceCaptainTableBody.innerHTML = `
        <tr>
            <td>${viceCaptain.name}</td>
            <td>${viceCaptain.team}</td>
            <td>${viceCaptain.position}</td>
            <td>${viceCaptain.fantasyPoints}</td>
        </tr>`;
}

// Event listeners
document.getElementById("filterButton").addEventListener("click", () => {
    const positionFilter = document.getElementById("positionFilter").value;
    const filteredPlayers = filterPlayersByPosition(positionFilter, players);
    displayTeam(filteredPlayers);
});

document.getElementById("selectTeamButton").addEventListener("click", () => {
    displayTeam(selectBestTeam(players));
});

document.getElementById("recommendCaptainViceCaptainButton").addEventListener("click", () => {
    displayCaptainViceCaptain(players);
});

// Initialize team display
displayTeam(players);
