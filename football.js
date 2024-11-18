// Player data
const players = [
    { name: "H Duro", team: "VAL", position: "FW", salary: 8.0, selPerc: 90.5, fantasyPoints: 149 },
    { name: "G Mamardashvili", team: "VAL", position: "GK", salary: 7.5, selPerc: 67.7, fantasyPoints: 136 },
    { name: "J Pepelu Luis", team: "VAL", position: "MF", salary: 7.5, selPerc: 95.1, fantasyPoints: 120 },
    { name: "J Saenz", team: "LEG", position: "DF", salary: 7.0, selPerc: 25.1, fantasyPoints: 109 },
    { name: "C Mosquera", team: "VAL", position: "DF", salary: 7.0, selPerc: 25.3, fantasyPoints: 83 },
    { name: "T Correia", team: "VAL", position: "DF", salary: 7.0, selPerc: 53.0, fantasyPoints: 82 },
    { name: "A Ribeiro Almeida", team: "VAL", position: "MF", salary: 6.5, selPerc: 22.2, fantasyPoints: 71 },
    { name: "L Rioja", team: "VAL", position: "FW", salary: 7.0, selPerc: 80.5, fantasyPoints: 65 },
    { name: "C Tarrega", team: "VAL", position: "DF", salary: 7.5, selPerc: 85.1, fantasyPoints: 49 },
    { name: "V Rosier", team: "LEG", position: "DF", salary: 7.5, selPerc: 66.8, fantasyPoints: 44 },
    { name: "D Foulquier", team: "VAL", position: "DF", salary: 6.0, selPerc: 12.1, fantasyPoints: 42 },
    { name: "Y Gasiorowski", team: "VAL", position: "DF", salary: 5.0, selPerc: 9.1, fantasyPoints: 39 },
    { name: "S Gonzalez", team: "LEG", position: "DF", salary: 8.0, selPerc: 74.5, fantasyPoints: 27 },
    { name: "R Lopez Alcaide", team: "LEG", position: "MF", salary: 6.5, selPerc: 13.8, fantasyPoints: 26 },
    { name: "S Cisse", team: "LEG", position: "MF", salary: 7.0, selPerc: 18.5, fantasyPoints: 25 },
    { name: "S Canos", team: "VAL", position: "MF", salary: 6.0, selPerc: 8.2, fantasyPoints: 22 },
    { name: "Y Neyou", team: "LEG", position: "MF", salary: 7.5, selPerc: 84.3, fantasyPoints: 21 },
    { name: "J Cruz Daiz", team: "LEG", position: "MF", salary: 8.5, selPerc: 69.7, fantasyPoints: 19 },
    { name: "M Dmitrovic", team: "LEG", position: "GK", salary: 7.0, selPerc: 20.3, fantasyPoints: 15 },
    { name: "A Altimira", team: "LEG", position: "DF", salary: 6.5, selPerc: 7.0, fantasyPoints: 8 },
    { name: "S Haller", team: "LEG", position: "FW", salary: 6.0, selPerc: 29.1, fantasyPoints: 8 },
    { name: "J Hernandez Carrera", team: "LEG", position: "DF", salary: 7.0, selPerc: 11.9, fantasyPoints: 7 }
];

// Function to calculate player score
function calculatePlayerScore(player) {
    return player.fantasyPoints;
}

function filterPlayersByPosition(positionFilter, players) {
    if (positionFilter === "ALL" || !positionFilter) {
        return players;
    }
    return players.filter(player => player.position === positionFilter);
}

// Function to select the best team
function selectBestTeam(players) {
    // Divide players into high and low selection groups
    const highSelectionPlayers = players.filter(player => player.selPerc >= 31);
    const lowSelectionPlayers = players.filter(player => player.selPerc < 31);

    const positions = ["GK", "DF", "MF", "FW"];
    const positionLimits = {
        GK: { min: 1, max: 1 },
        DF: { min: 5, max: 5 },
        MF: { min: 3, max: 4 },
        FW: { min: 1, max: 2 },
    };

    const bestTeam = [];
    const positionCounters = Object.fromEntries(
        Object.keys(positionLimits).map(position => [position, 0])
    );

    // Helper function to select players from a group
    function selectFromGroup(group) {
        const positionGroups = positions.reduce((acc, position) => {
            const playersInPosition = group.filter(
                player => player.position === position
            );
            const halfCount = Math.ceil(playersInPosition.length / 2);
            acc[position] = playersInPosition.slice(0, halfCount).sort(
                (a, b) => b.fantasyPoints - a.fantasyPoints
            );
            return acc;
        }, {});

        positions.forEach(position => {
            const filteredPlayers = positionGroups[position] || [];

            filteredPlayers.forEach(player => {
                if (
                    positionCounters[position] < positionLimits[position].max &&
                    !bestTeam.some(teamPlayer => teamPlayer.name === player.name)
                ) {
                    bestTeam.push(player);
                    positionCounters[position]++;
                }
            });
        });
    }

    // Process high selection players first
    selectFromGroup(highSelectionPlayers);

    // Process low selection players next
    selectFromGroup(lowSelectionPlayers);

    return bestTeam.slice(0, 11); // Ensure a maximum of 11 players
}

// Function to display team
function displayTeam(players) {
    const tableBody = document.getElementById("teamTableBody");
    tableBody.innerHTML = '';

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

// Function to recommend captain and vice-captain
function recommendCaptainViceCaptain(players) {
    const best11 = selectBestTeam(players);

    best11.sort((a, b) => b.fantasyPoints - a.fantasyPoints);

    const captain = best11[0];
    const viceCaptain = best11[1];

    return { captain, viceCaptain };
}

// Function to display captain and vice-captain recommendations
function displayCaptainViceCaptainRecommendations(players) {
    const { captain, viceCaptain } = recommendCaptainViceCaptain(players);

    const captainTableBody = document.getElementById("captainTableBody");
    captainTableBody.innerHTML = '';
    const captainRow = document.createElement("tr");
    captainRow.innerHTML = `
        <td>${captain.name}</td>
        <td>${captain.team}</td>
        <td>${captain.position}</td>
        <td>${captain.fantasyPoints}</td>
    `;
    captainTableBody.appendChild(captainRow);

    const viceCaptainTableBody = document.getElementById("viceCaptainTableBody");
    viceCaptainTableBody.innerHTML = '';
    const viceCaptainRow = document.createElement("tr");
    viceCaptainRow.innerHTML = `
        <td>${viceCaptain.name}</td>
        <td>${viceCaptain.team}</td>
        <td>${viceCaptain.position}</td>
        <td>${viceCaptain.fantasyPoints}</td>
    `;
    viceCaptainTableBody.appendChild(viceCaptainRow);
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

document.getElementById("recommendCaptainViceCaptainButton").addEventListener("click", () => {
    displayCaptainViceCaptainRecommendations(players);
});

// Initialize team display
displayTeam(players);
