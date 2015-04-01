var argo = require('argo');
var express = require('express');
var app = express();
var proxy = argo()
    .target('https://api.usergrid.com')
    .build();

app.get('/basic', function(req, res){
  	var basicauth = req.header('Authorization');
  	if( basicauth == "Basic ODNESzBQdWZXWlRpamJtSjQ0UUpmR0dtZ2h4VWZzUFY6ckhJYVNjTVVJcnBwb2dQbQ==")
    {
		
  	var GitHubApi = require('github');
    var github = new GitHubApi({
        // required
        version: "3.0.0"
    });
    github.authenticate({
        type: "basic",
        username: req.header('username'),
        password: req.header('password')
    });
   github.user.get({user : req.header('username')}, function(err,response){
   		res.send(response);
   });
    
    }else{
      	res.send('Error, wrong access code');
    }
});


app.get('/oauth', function(req, res){
  	res.send('OAUTH');
});

app.all('*', proxy.run);

app.listen(3000);