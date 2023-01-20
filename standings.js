window.addEventListener('DOMContentLoaded', event =>{
    displayTable();
});
const url = "https://statsapi.web.nhl.com/api/v1/standings/byLeague"
async function MyFetch(url) {
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status : ${reponse.status}`);
    }
    return await response.json();
}
function displayTable(){
    var table = document.getElementById("standings");
    try{
        MyFetch(url).then(json_data => {
            recordsObject = json_data.records[0];
            //console.log(recordsObject);
            teamArray = recordsObject.teamRecords;
            teamArray.forEach(teamObject => {
             var row = createRow(teamObject);
             table.append(row);
             
            });
        });
    }
    catch(exception){

    }
}
function createRow(teamObject){
    var teamName = teamObject.team.name;
    var gamesPlayed = teamObject.gamesPlayed;
    var teamWins = teamObject.leagueRecord.wins;
    var teamLosses = teamObject.leagueRecord.losses;
    var teamOTLoss = teamObject.leagueRecord.ot;
    var teamStreak = teamObject.streak.streakCode;
    var teamPoints = teamObject.points;
    var teamStandings = teamObject.leagueRank;
    var row = document.createElement("tr");
    //repeat for all var
    
    
    var col1 = document.createElement("td");
    col1.innerHTML = teamStandings;
    row.append(col1);

    var col2 = document.createElement("td");
    col2.innerHTML = teamName;
    row.append(col2);

    var col2 = document.createElement("td");
    col2.innerHTML = gamesPlayed;
    row.append(col2);

    var col3 = document.createElement("td");
    col3.innerHTML = teamWins;
    row.append(col3);

    var col4 = document.createElement("td");
    col4.innerHTML = teamLosses;
    row.append(col4);

    var col5 = document.createElement("td");
    col5.innerHTML = teamOTLoss;
    row.append(col5);

    var col6 = document.createElement("td");
    col6.innerHTML = teamPoints;
    row.append(col6);

    var col7 = document.createElement("td");
    col7.innerHTML = teamStreak;
    row.append(col7);

    return row;

}

