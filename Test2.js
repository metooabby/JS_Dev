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
    { name: "Ellyse Perry", team: "SYS", position: "AR", salary: 9.0, selPerc: 97.21, fantasyPoints: 661, value: 14.69, nos: 5, runs: 268, century: 0, halfCentury: 3, wkts: 9, ct: 2, st: 0, economy: 7.75, strikeRate: 166.46 },
    { name: "Chloe Tryon", team: "HBT", position: "AR", salary: 8.0, selPerc: 59.14, fantasyPoints: 149, value: 3.73, nos: 5, runs: 40, century: 0, halfCentury: 0, wkts: 2, ct: 2, st: 0, economy: 5.87, strikeRate: 88.89 },
    { name: "Nicola Carey", team: "HBT", position: "AR", salary: 8.5, selPerc: 92.99, fantasyPoints: 348, value: 8.19, nos: 5, runs: 123, century: 0, halfCentury: 1, wkts: 6, ct: 0, st: 0, economy: 7.58, strikeRate: 113.89 },
    { name: "Sophie Ecclestone", team: "SYS", position: "BOW", salary: 9.0, selPerc: 90.52, fantasyPoints: 283, value: 6.29, nos: 5, runs: 21, century: 0, halfCentury: 0, wkts: 7, ct: 4, st: 0, economy: 8.12, strikeRate: 140.00 },
    { name: "Ashleigh Gardner", team: "SYS", position: "AR", salary: 8.5, selPerc: 93.57, fantasyPoints: 370, value: 8.71, nos: 5, runs: 60, century: 0, halfCentury: 0, wkts: 9, ct: 1, st: 0, economy: 8.60, strikeRate: 86.96 },
    { name: "Lauren Cheatle", team: "SYS", position: "BOW", salary: 8.0, selPerc: 70.28, fantasyPoints: 186, value: 4.65, nos: 5, runs: 2, century: 0, halfCentury: 0, wkts: 4, ct: 3, st: 0, economy: 8.50, strikeRate: 100.00 },
    { name: "Danielle Wyatt", team: "HBT", position: "BAT", salary: 9.0, selPerc: 77.83, fantasyPoints: 137, value: 3.81, nos: 4, runs: 91, century: 0, halfCentury: 1, wkts: 0, ct: 0, st: 0, economy: 0.00, strikeRate: 149.18 },
    { name: "Elyse Villani", team: "HBT", position: "BAT", salary: 8.0, selPerc: 39.52, fantasyPoints: 144, value: 3.60, nos: 5, runs: 100, century: 0, halfCentury: 0, wkts: 0, ct: 1, st: 0, economy: 0.00, strikeRate: 97.09 },
    { name: "Alyssa Healy", team: "SYS", position: "WK", salary: 8.0, selPerc: 51.14, fantasyPoints: 139, value: 3.48, nos: 5, runs: 43, century: 0, halfCentury: 0, wkts: 0, ct: 3, st: 3, economy: 0.00, strikeRate: 97.73 },
    { name: "Heather Graham", team: "HBT", position: "AR", salary: 9.0, selPerc: 95.47, fantasyPoints: 400, value: 8.89, nos: 5, runs: 98, century: 0, halfCentury: 0, wkts: 8, ct: 2, st: 0, economy: 5.67, strikeRate: 144.12 },
    { name: "Lizelle Lee", team: "HBT", position: "WK", salary: 8.5, selPerc: 71.71, fantasyPoints: 249, value: 5.86, nos: 5, runs: 130, century: 0, halfCentury: 1, wkts: 0, ct: 1, st: 3, economy: 0.00, strikeRate: 120.37 },
    { name: "Molly Strano", team: "HBT", position: "BOW", salary: 8.0, selPerc: 80.02, fantasyPoints: 254, value: 6.35, nos: 5, runs: 20, century: 0, halfCentury: 0, wkts: 6, ct: 5, st: 0, economy: 8.19, strikeRate: 95.24 },
    { name: "Sarah Bryce", team: "SYS", position: "WK", salary: 7.5, selPerc: 63.69, fantasyPoints: 153, value: 6.80, nos: 3, runs: 102, century: 0, halfCentury: 1, wkts: 0, ct: 1, st: 0, economy: 0.00, strikeRate: 137.84 },
    { name: "Lauren Smith", team: "HBT", position: "BOW", salary: 7.5, selPerc: 25.59, fantasyPoints: 86, value: 2.29, nos: 5, runs: 2, century: 0, halfCentury: 0, wkts: 2, ct: 1, st: 0, economy: 7.90, strikeRate: 66.67 },
    { name: "Hollie Armitage", team: "SYS", position: "BAT", salary: 8.0, selPerc: 22.27, fantasyPoints: 119, value: 2.98, nos: 5, runs: 66, century: 0, halfCentury: 0, wkts: 0, ct: 1, st: 0, economy: 0.00, strikeRate: 115.79 },
    { name: "Courtney Sippel", team: "SYS", position: "BOW", salary: 7.5, selPerc: 14.51, fantasyPoints: 133, value: 3.55, nos: 5, runs: 26, century: 0, halfCentury: 0, wkts: 3, ct: 2, st: 0, economy: 7.40, strikeRate: 57.78 },
    { name: "Caoimhe Bray", team: "SYS", position: "BOW", salary: 6.5, selPerc: 12.71, fantasyPoints: 181, value: 5.57, nos: 5, runs: 37, century: 0, halfCentury: 0, wkts: 4, ct: 1, st: 0, economy: 9.03, strikeRate: 94.87 },
    { name: "Zoe Cooke", team: "HBT", position: "BOW", salary: 6.0, selPerc: 11.81, fantasyPoints: 0, value: "#DIV/0!", nos: 0, runs: 0, century: 0, halfCentury: 0, wkts: 0, ct: 0, st: 0, economy: 0.00, strikeRate: 0.00 },
    { name: "Maitlan Brown", team: "SYS", position: "AR", salary: 7.0, selPerc: 9.88, fantasyPoints: 62, value: 1.77, nos: 5, runs: 24, century: 0, halfCentury: 0, wkts: 0, ct: 2, st: 0, economy: 2.40, strikeRate: 104.35 },
    { name: "Amy Smith", team: "HBT", position: "BAT", salary: 6.0, selPerc: 4.87, fantasyPoints: 147, value: 4.90, nos: 5, runs: 1, century: 0, halfCentury: 0, wkts: 4, ct: 0, st: 0, economy: 7.45, strikeRate: 20.00 },
    { name: "Tabatha Saville", team: "HBT", position: "BAT", salary: 7.0, selPerc: 3.92, fantasyPoints: 85, value: 2.43, nos: 5, runs: 44, century: 0, halfCentury: 0, wkts: 0, ct: 1, st: 0, economy: 0.00, strikeRate: 110.00 },
    { name: "Mathilda Carmichael", team: "SYS", position: "BAT", salary: 6.5, selPerc: 2.42, fantasyPoints: 151, value: 4.65, nos: 5, runs: 84, century: 0, halfCentury: 0, wkts: 0, ct: 3, st: 0, economy: 0.00, strikeRate: 121.74 },
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