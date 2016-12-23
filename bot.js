var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cool guy/; 
      botRegexDepth = /^\/depth/i;
      botRegexRules = /^\/rules/
      botRegexSC = /^\/schedule/i; 
      botRegexPlayer = /^\/player/i;  
      botRegexTw = /^\/twitch/i; 
      botRegexSb = /^\/sub/; 
      botRegexCoaches = /^\/coaches/;  
      botRegexOW = /^\/ratings/; 
      botRegexSim = /^\/recommended/; 
      botRegexUserGames = /^\/usergames/;
      botRegexStand = /^\/standings/;
  var teamAb = ["NE","NO","ARI","PHI","CLE","TEN","OAK","DAL","IND","SEA","CIN","PIT","JAC"
                ,"BAL","SD","DEN","MIN","ATL","KC","NYG","GB","DET","HOU","STL","CHI","CAR",
                "MIA","BUF","SF","WAS","NYJ","TB"]
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage(cool());
    this.res.end();
  }
  else if(request.text && botRegexDepth.test(request.text)) {
    this.res.writeHead(200);
    //postMessage("http://www.daddyleagues.com/maddenrating?name=&position=all&team="+request.text.substring(5,8));
    postMessage("http://daddyleagues.com/trb/team/"+request.text.substring(7,10)+"/depthchart");
    this.res.end();
  } 
  else if(request.text && botRegexStand.test(request.text)){
    this.res.writeHead(200);
    postMessage("https://www.daddyleagues.com/trb/standings")
    this.res.end();
  }
  else if(request.text && botRegexOW.test(request.text)) {
    this.res.writeHead(200);
    postMessage("www.daddyleagues.com/maddenrating/");
    this.res.end();
  } 
  else if(request.text && botRegexRules.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://www.daddyleagues.com/trb/rules");
    this.res.end();
  } 
  else if(request.text && botRegexSC.test(request.text)) {
    this.res.writeHead(200);
    
    postMessage("http://daddyleagues.com/trb/team/"+request.text.substring(10,13)+"/schedule");
    this.res.end();
  }
  else if(request.text && botRegexPlayer.test(request.text)) {
    this.res.writeHead(200);
    var req = request.text.substring(8,request.text.length);
    var rep = req.replace(/ /,"+");
    postMessage("http://daddyleagues.com/trb/players?name="+rep+"&position=all&team=all");
    
    this.res.end();
  }  
  else if(request.text && botRegexTw.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://www.twitch.tv/"+request.text.substring(8,request.text.length));
    this.res.end();
  } 
  else if(request.text && botRegexSb.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://www.reddit.com/r/theredditbowl");
    this.res.end();
  } 
  else if(request.text && botRegexCoaches.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://www.daddyleagues.com/trb/coaches");
    this.res.end();
  } 
  else if(request.text && botRegexSim.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://drive.google.com/open?id=0B4Qbc_uYjDSjTF9iMUp5eWtPMXM");
    this.res.end();
  }
   else if(request.text && botRegexUserGames.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Week 1: Seahawks @ Panthers\n Week 4:Texans @ Panthers \nWeek 8: Vikings @ Raiders \nWeek 12: Texans @ Raiders \nWeek 15: 
Seahawks @ Steelers");
    this.res.end();
  }
   else if(request.text && botRegexSim.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://drive.google.com/open?id=0B4Qbc_uYjDSjTF9iMUp5eWtPMXM");
    this.res.end();
  }
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(response) {
  var botResponse,options, body, botReq;

  botResponse = response

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


exports.respond = respond;
