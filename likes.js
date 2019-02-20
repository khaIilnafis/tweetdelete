var twitter = require('twitter');
var fs = require('fs');
var readline = require('readline');
var filePath,
	tweet,
	client,
	params,
	arrayOfTweets = [],
	interval, 
	currentTweetId,
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
		consumer_key: process.env.consumer_key,
		consumer_secret: process.env.consumer_secret,
		access_token_key: process.env.access_token_key,
		access_token_secret: process.env.access_token_secret
	});

	params = {screen_name: 'nodejs'};
	for(var x in tweet){
		var id = tweet[x].like.tweetId;
		arrayOfTweets.push(id.toString());
	}
	interval = setInterval(checkAndDelete,500)
};


var checkAndDelete = function(){
	console.log("\n Index:" + i + " Executing for id: " + arrayOfTweets[i]);
		if(i<arrayOfTweets.length){
			client.post('favorites/create',
				{screen_name: 'nodejs',
				id: arrayOfTweets[i]}, function(error, tweet, response){
					if(!error){
						console.log(arrayOfTweets[i] + "\n Favorited: " + tweet.text);

					}else{
						console.log(error)
					}
					destroyTweet(arrayOfTweets[i]);
				})
		}else{
			clearInterval(interval);
			fs.unlink('./'+filePath, (err) => {
				if(err) throw err;
				console.log("\n Tweet delete script finished, file: " + filePath + " deleted")
			});
		}
};

var destroyTweet = function (id){
	console.log("\n At index: " + i + "\n Tweet ID: " + arrayOfTweets[i]);
	client.post('favorites/destroy/', 
		{
			screen_name: 'nodejs',
			id: id
		},function(error,tweets, response){
		if(!error){
			console.log("\n " + tweets.id + " Success, deleted: " + tweets.text);
			i++;
		}else{
			console.log(error);
			i++;
		}
	});	
}
