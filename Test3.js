// Player data
const playerData = [
    {
        playerName: "K Butt", team: "KUM", role: "AR", hand: "Right Hand Bat/Right Arm Medium",
        averageFpts: 122.6, avgFptsVsOpposition: 136, avgFptsAtVenue: 127.5, avgFptsBatFirst: 84,
        avgFptsInChase: 139, inDreamTeam: 9, bottom20: 1, avgPositionRank: 1, avgTeamRank: 2
    },
    {
        playerName: "W Botheju", team: "KUM", role: "WK", hand: "-", averageFpts: 100.9,
        avgFptsVsOpposition: 130, avgFptsAtVenue: 100.9, avgFptsBatFirst: 100, avgFptsInChase: 102,
        inDreamTeam: 8, bottom20: 0, avgPositionRank: 1, avgTeamRank: 2
    },
    {
        playerName: "H Mirza", team: "KUM", role: "BAT", hand: "Right Hand Bat", averageFpts: 77.4,
        avgFptsVsOpposition: null, avgFptsAtVenue: 77.4, avgFptsBatFirst: 123, avgFptsInChase: 47,
        inDreamTeam: 7, bottom20: 1, avgPositionRank: 2, avgTeamRank: 4
    },
    {
        playerName: "S Singh", team: "SBS", role: "AR", hand: "-", averageFpts: 75.4,
        avgFptsVsOpposition: null, avgFptsAtVenue: 75.4, avgFptsBatFirst: 62, avgFptsInChase: 106,
        inDreamTeam: 7, bottom20: 1, avgPositionRank: 2, avgTeamRank: 4
    },
    {
        playerName: "A Kumara Bolanda", team: "KUM", role: "BAT", hand: "-", averageFpts: 71.6,
        avgFptsVsOpposition: null, avgFptsAtVenue: 71.6, avgFptsBatFirst: 48, avgFptsInChase: 88,
        inDreamTeam: 7, bottom20: 1, avgPositionRank: 3, avgTeamRank: 4
    },
    {
        playerName: "L Singh", team: "SBS", role: "BAT", hand: "-", averageFpts: 63.6,
        avgFptsVsOpposition: null, avgFptsAtVenue: 75.3, avgFptsBatFirst: 64, avgFptsInChase: null,
        inDreamTeam: 8, bottom20: 1, avgPositionRank: 1, avgTeamRank: 4
    },
    {
        playerName: "F Meer", team: "KUM", role: "BAT", hand: "-", averageFpts: 52.2,
        avgFptsVsOpposition: null, avgFptsAtVenue: 52.2, avgFptsBatFirst: 45, avgFptsInChase: 55,
        inDreamTeam: 6, bottom20: 1, avgPositionRank: 5, avgTeamRank: 5
    },
    {
        playerName: "A Mushtaq", team: "KUM", role: "WK", hand: "Right Hand Bat", averageFpts: 49.7,
        avgFptsVsOpposition: null, avgFptsAtVenue: 49.7, avgFptsBatFirst: 33, avgFptsInChase: 57,
        inDreamTeam: 7, bottom20: 2, avgPositionRank: 2, avgTeamRank: 5
    },
    {
        playerName: "Y Mohammed", team: "SBS", role: "BOW", hand: "-", averageFpts: 47.7,
        avgFptsVsOpposition: null, avgFptsAtVenue: 47.7, avgFptsBatFirst: 48, avgFptsInChase: null,
        inDreamTeam: 7, bottom20: 1, avgPositionRank: 2, avgTeamRank: 5
    },
    {
        playerName: "S Jeet", team: "SBS", role: "AR", hand: "-", averageFpts: 39.9,
        avgFptsVsOpposition: null, avgFptsAtVenue: 39.9, avgFptsBatFirst: 40, avgFptsInChase: null,
        inDreamTeam: 4, bottom20: 3, avgPositionRank: 4, avgTeamRank: 7
    },
    {
        playerName: "A Razzaq", team: "SBS", role: "AR", hand: "-", averageFpts: 37.22,
        avgFptsVsOpposition: null, avgFptsAtVenue: 37.22, avgFptsBatFirst: 35, avgFptsInChase: 41,
        inDreamTeam: 4, bottom20: 3, avgPositionRank: 5, avgTeamRank: 7
    },
    {
        playerName: "R Khan", team: "KUM", role: "BOW", hand: "Right Arm Medium", averageFpts: 37,
        avgFptsVsOpposition: 31, avgFptsAtVenue: 37, avgFptsBatFirst: 58, avgFptsInChase: 23,
        inDreamTeam: 5, bottom20: 1, avgPositionRank: 3, avgTeamRank: 6
    },
    {
        playerName: "R Manaf", team: "SBS", role: "BAT", hand: "-", averageFpts: 27.2,
        avgFptsVsOpposition: null, avgFptsAtVenue: 27.2, avgFptsBatFirst: 22, avgFptsInChase: 48,
        inDreamTeam: 5, bottom20: 1, avgPositionRank: 6, avgTeamRank: 7
    },
    {
        playerName: "N Singh", team: "SBS", role: "BOW", hand: "-", averageFpts: 25.9,
        avgFptsVsOpposition: null, avgFptsAtVenue: 25.9, avgFptsBatFirst: 31, avgFptsInChase: 5,
        inDreamTeam: 3, bottom20: 4, avgPositionRank: 5, avgTeamRank: 7
    },
    {
        playerName: "B Singh", team: "SBS", role: "WK", hand: "-", averageFpts: 25.6,
        avgFptsVsOpposition: null, avgFptsAtVenue: 25.6, avgFptsBatFirst: 28, avgFptsInChase: 17,
        inDreamTeam: 4, bottom20: 5, avgPositionRank: 4, avgTeamRank: 8
    },
    {
        playerName: "M Muthu", team: "SBS", role: "WK", hand: "-", averageFpts: 24.5,
        avgFptsVsOpposition: null, avgFptsAtVenue: 24.5, avgFptsBatFirst: 25, avgFptsInChase: null,
        inDreamTeam: 0, bottom20: 0, avgPositionRank: 3, avgTeamRank: 7
    },
    {
        playerName: "A Nabeel Ghafoor", team: "KUM", role: "BOW", hand: "-", averageFpts: 22.2,
        avgFptsVsOpposition: null, avgFptsAtVenue: 22.2, avgFptsBatFirst: 18, avgFptsInChase: 39,
        inDreamTeam: 3, bottom20: 4, avgPositionRank: 6, avgTeamRank: 8
    },
    {
        playerName: "J Singh", team: "SBS", role: "BAT", hand: "-", averageFpts: 21.2,
        avgFptsVsOpposition: null, avgFptsAtVenue: 21.2, avgFptsBatFirst: 26, avgFptsInChase: 9,
        inDreamTeam: 3, bottom20: 5, avgPositionRank: 8, avgTeamRank: 8
    },
    {
        playerName: "M Abdullah", team: "KUM", role: "BOW", hand: "-", averageFpts: 12.5,
        avgFptsVsOpposition: null, avgFptsAtVenue: 12.5, avgFptsBatFirst: 4, avgFptsInChase: 16,
        inDreamTeam: 1, bottom20: 7, avgPositionRank: 7, avgTeamRank: 9
    },
    {
        playerName: "A Ghulam Khan", team: "KUM", role: "BOW", hand: "-", averageFpts: null,
        avgFptsVsOpposition: null, avgFptsAtVenue: null, avgFptsBatFirst: null, avgFptsInChase: null,
        inDreamTeam: null, bottom20: null, avgPositionRank: null, avgTeamRank: null
    },
    {
        playerName: "R Angoda Liyanage", team: "KUM", role: "BOW", hand: "-", averageFpts: null,
        avgFptsVsOpposition: null, avgFptsAtVenue: null, avgFptsBatFirst: null, avgFptsInChase: null,
        inDreamTeam: null, bottom20: null, avgPositionRank: null, avgTeamRank: null
    },
    {
        playerName: "S Showkat", team: "SBS", role: "BOW", hand: "-", averageFpts: null,
        avgFptsVsOpposition: null, avgFptsAtVenue: null, avgFptsBatFirst: null, avgFptsInChase: null,
        inDreamTeam: null, bottom20: null, avgPositionRank: null, avgTeamRank: null
    }
];

// Player scoring weights
const scoringWeights = {
    averageFpts: 0.35,
    avgFptsVsOpposition: 0.1,
    avgFptsAtVenue: 0.1,
    avgFptsInChase: 0.2,
    inDreamTeam: 0.15,
    bottom20: 0.1
};


// Function to calculate player score
function calculatePlayerRating(player) {
    const score =
        (player.averageFpts * scoringWeights.averageFpts) +
        (player.avgFptsVsOpposition * scoringWeights.avgFptsVsOpposition) +
        (player.avgFptsAtVenue * scoringWeights.avgFptsAtVenue) +
        (player.avgFptsInChase * scoringWeights.avgFptsInChase) +
        (player.inDreamTeam * scoringWeights.inDreamTeam) +
        (player.bottom20 * scoringWeights.bottom20);
    return score;
}


// Function to count players by role

function countPlayersByRole(role, players) {
    console.log(players)
    return players.filter(player => player.role === role).length;
}


// Function to filter players by role
function filterPlayersByRole(role, players) {
    if (role === "ALL") {
        return players;
    } else {
        return players.filter(player => player.role === role);
    }
}


// Function to select best team
function selectOptimalTeam(players) {
    const ratedPlayers = players.map(player => ({ ...player, rating: calculatePlayerRating(player) }));
    ratedPlayers.sort((a, b) => b.rating - a.rating);

    const roles = ['BAT', 'BOW', 'AR', 'WK'];
    const roleLimits = { BAT: { min: 3, max: 3 }, BOW: { min: 4, max: 4 }, AR: { min: 2, max: 2 }, WK: { min: 2, max: 2 } };
    const minTotalPlayers = roles.reduce((sum, role) => sum + roleLimits[role].min, 0);
    const maxTotalPlayers = roles.reduce((sum, role) => sum + roleLimits[role].max, 0);
    const highSelectionLimit = Math.min(Math.ceil(ratedPlayers.length / 2), 7);

    const optimalTeam = [];
    const roleCounters = Object.fromEntries(
        Object.keys(roleLimits).map(role => [role, 0])
    );

    // Prioritize high selection percentage players
    const highSelectionPlayers = ratedPlayers.filter(player => player.inDreamTeam >= 7);
    const bestHighSelectionPlayers = highSelectionPlayers.slice(0, highSelectionLimit);

    bestHighSelectionPlayers.forEach(player => {
        if (roleCounters[player.role] < roleLimits[player.role].max) {
            optimalTeam.push(player);
            roleCounters[player.role]++;
        }
    });

    // Fill remaining positions with low selection percentage players
    const lowSelectionPlayers = ratedPlayers.filter(player => player.inDreamTeam < 7);
    const remainingPositions = 11 - optimalTeam.length;

    lowSelectionPlayers.forEach(player => {
        if (optimalTeam.length < 11 && roleCounters[player.role] < roleLimits[player.role].max) {
            optimalTeam.push(player);
            roleCounters[player.role]++;
        }
    });

    // Ensure minimum role requirements are met
    roles.forEach(role => {
        while (roleCounters[role] < roleLimits[role].min && optimalTeam.length < 11) {
            const eligiblePlayers = lowSelectionPlayers.filter(p => p.role === role);
            if (eligiblePlayers.length > 0) {
                optimalTeam.push(eligiblePlayers[0]);
                roleCounters[role]++;
            }
        }
    });

    // Fill any remaining positions with top-rated players regardless of selection percentage
    ratedPlayers.forEach(player => {
        if (optimalTeam.length < 11 && !optimalTeam.includes(player)) {
            optimalTeam.push(player);
        }
    });

    // Sort final team by rating
    optimalTeam.sort((a, b) => b.rating - a.rating);

    return optimalTeam;
}


// Function to display team
function displayTeam(players) {
    const tableBody = document.getElementById("teamTableBody");
    tableBody.innerHTML = '';

    // Calculate ratings and sort players
    const ratedPlayers = players.map(player => ({ ...player, rating: calculatePlayerRating(player) }));
    ratedPlayers.sort((a, b) => b.rating - a.rating);

    ratedPlayers.forEach(player => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${player.playerName}</td>
      <td>${player.team}</td>
       <td>${player.role}</td>
        <td>${player.rating.toFixed(2)}</td>
`;
        tableBody.appendChild(row);
    });
}


// Function to display selected team
function displaySelectedTeam(players) {
    const optimalTeam = selectOptimalTeam(players);
    displayTeam(optimalTeam);
}


// Event listeners
document.getElementById("filterButton").addEventListener("click", () => {
    const positionFilter = document.getElementById("positionFilter").value;
    console.log("positionFilter:", positionFilter);

    const filteredPlayers = filterPlayersByRole(positionFilter, playerData);
    console.log("Filtered players:", filteredPlayers);

    displayTeam(filteredPlayers);
});

document.getElementById("selectTeamButton").addEventListener("click", () => {
    displaySelectedTeam(playerData);
});


// Initialize team display
displayTeam(playerData);

// Function to recommend captain and vice-captain
function recommendCaptainViceCaptain(players) {
    const ratedPlayers = players.map(player => ({ ...player, rating: calculatePlayerRating(player) }));
    ratedPlayers.sort((a, b) => b.rating - a.rating);

    // Recommend top 3 players as captain and vice-captain
    const captainRecommendations = ratedPlayers.slice(0, 3);
    const viceCaptainRecommendations = ratedPlayers.slice(3, 6);

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
    <td>${player.playerName}</td>
    <td>${player.team}</td>
    <td>${player.role}</td>
    <td>${player.inDreamTeam}</td>
    <td>${player.rating.toFixed(2)}</td>
`;
        captainTableBody.appendChild(row);
    });

    const viceCaptainTableBody = document.getElementById("viceCaptainTableBody");
    viceCaptainTableBody.innerHTML = '';
    viceCaptainRecommendations.forEach(player => {
        const row = document.createElement("tr");
        row.innerHTML = `
    <td>${player.playerName}</td>
    <td>${player.team}</td>
    <td>${player.role}</td>
    <td>${player.inDreamTeam}</td>
    <td>${player.rating.toFixed(2)}</td>
`;
        viceCaptainTableBody.appendChild(row);
    });
}


// Event listener to display captain and vice-captain recommendations
document.getElementById("recommendCaptainViceCaptainButton").addEventListener("click", () => {
    displayCaptainViceCaptainRecommendations(playerData);
});