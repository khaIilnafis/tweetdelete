var twitter = require('twitter');
var fs = require('fs');
var readline = require('readline');
var filePath,
	tweet,
	client,
	params,
	arrayOfTweets = [],
	interval, 
	i=0;

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
}); 


rl.question('Please enter the file path: ', (answer) =>{
	console.log("Path logged as: "+ answer.toString());
	filePath = answer.toString();
	tweet = require('./' + filePath);
	rl.close();
});

rl.on('close',function(){
	startClient();
})

function startClient(){
	client = new twitter({
		consumer_key: '',
		consumer_secret: '',
		access_token_key: '',
		access_token_secret: ''
	});

	params = {screen_name: 'nodejs'};
	for(var x in tweet){
		var id = tweet[x].id_str;
		arrayOfTweets.push(id.toString());
	}
	interval = setInterval(deleteTweets,500)
};


var deleteTweets = function(){
	console.log("Index:" + i + " Executing for id: " + arrayOfTweets[i]);
		if(i<arrayOfTweets.length){
			client.post('statuses/destroy/' + arrayOfTweets[i],params, function(error,tweets, response){
				if(!error){
					console.log("Success, deleted: " + tweets.text);
				}else{
					console.log(error);
				}
				i++;
			});
		}else{
			clearInterval(interval);
			fs.unlink('./'+filePath, (err) => {
				if(err) throw err;
				console.log("Tweet delete script finished, file: " + filePath + " deleted")
			});
		}
};
