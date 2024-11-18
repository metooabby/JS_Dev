// Player data
const players = [
    { name: "Rinku-HC", team: "MUM", position: "DEF", salary: 15.0, selPerc: 90.3, fantasyPoints: 512 },
    { name: "S Nandal", team: "BLR", position: "DEF", salary: 14.0, selPerc: 35.7, fantasyPoints: 335 },
    { name: "P Bhainswal", team: "MUM", position: "DEF", salary: 13.5, selPerc: 42.5, fantasyPoints: 403 },
    { name: "S Kumar", team: "MUM", position: "DEF", salary: 13.0, selPerc: 64.1, fantasyPoints: 447 },
    { name: "S Sherawat", team: "BLR", position: "DEF", salary: 10.5, selPerc: 5.4, fantasyPoints: 16 },
    { name: "A Zafardanesh", team: "MUM", position: "AR", salary: 15.0, selPerc: 92.7, fantasyPoints: 610 },
    { name: "N Rawal", team: "BLR", position: "AR", salary: 14.0, selPerc: 92.7, fantasyPoints: 675 },
    { name: "Sombir", team: "MUM", position: "AR", salary: 13.0, selPerc: 42.3, fantasyPoints: 438 },
    { name: "Prateek", team: "BLR", position: "AR", salary: 11.5, selPerc: 9.8, fantasyPoints: 230 },
    { name: "A Chauhan", team: "MUM", position: "RAI", salary: 14.5, selPerc: 93.0, fantasyPoints: 652 },
    { name: "A Pawar", team: "BLR", position: "RAI", salary: 14.0, selPerc: 48.0, fantasyPoints: 357 },
    { name: "Manjeet", team: "MUM", position: "RAI", salary: 13.0, selPerc: 51.4, fantasyPoints: 390 },
    { name: "P Narwal", team: "BLR", position: "RAI", salary: 13.0, selPerc: 22.7, fantasyPoints: 264 },
    { name: "S Om", team: "BLR", position: "RAI", salary: 10.0, selPerc: 4.9, fantasyPoints: 20 },
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
    const highSelectionPlayers = players.filter(player => player.selPerc >= 31);
    const lowSelectionPlayers = players.filter(player => player.selPerc <= 30.99);

    const positionLimits = {
        DEF: { min: 1, max: 5 },
        AR: { min: 1, max: 2 },
        RAI: { min: 1, max: 2 },
    };

    const positionCounters = { DEF: 0, AR: 0, RAI: 0 };
    const bestTeam = [];

    function groupAndSelect(playersGroup) {
        const groupedPlayers = playersGroup.reduce((acc, player) => {
            const firstDigit = Math.floor(player.fantasyPoints / 100);
            if (!acc[firstDigit]) acc[firstDigit] = [];
            acc[firstDigit].push(player);
            return acc;
        }, {});

        Object.keys(groupedPlayers).sort((a, b) => b - a).forEach(firstDigit => {
            groupedPlayers[firstDigit]
                .sort((a, b) => b.fantasyPoints - a.fantasyPoints)
                .forEach(player => {
                    const { position } = player;
                    if (
                        positionCounters[position] < positionLimits[position].max &&
                        bestTeam.length < 7
                    ) {
                        bestTeam.push(player);
                        positionCounters[position]++;
                    }
                });
        });
    }

    // Process high selection players first
    groupAndSelect(highSelectionPlayers);

    // Process low selection players next
    groupAndSelect(lowSelectionPlayers);

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
