var twitter = require('twitter');
var fs = require('fs');
var readline = require('readline');
var filePath,
	tweet,
	client,
	params,
	arrayOfTweets = [],
	interval, 
	i=0,
	k=0;


var getTweets = function(){
	client.get('favorites/list',params, function(ereror,tweets,response){
		for (var x in tweets){
			var id = tweets[x].id;
			var id_string = tweets[x].id_str;
			console.log(typeof(id_string) +" : " + id);
			arrayOfTweets.push(id_string);
		}
		interval = setInterval(deleteTweets,500)
	});
		
};

var deleteTweets = function(){
	if(arrayOfTweets.length){
		client.post('favorites/destroy/',{id: arrayOfTweets[i]}, function(error,tweets, response){
		if(!error){
			console.log("Success, deleted: " + + " "+ tweets.text);
		}else{
			console.log("Error, attempted to delete: " + arrayOfTweets[i]);
			console.log("At index: " + i)
			console.log(error);
		}
		i++;
	});
	}
}
startClient();

function startClient(){
	client = new twitter({
		consumer_key: 'bUzyXeiGIaBQHQpwnk5T7exrU',
		consumer_secret: 'PejrzO2R39aOGini4T5WlpLF4Le6SQoE31VoDrXeo3w7Ri6Svj',
		access_token_key: '762040724523249665-0YHkrPsr183CSnjmOg2vkdkDemu1wE4',
		access_token_secret: 'ollN7XWaRkc0wDTxW49rhxl4QmerZGNrkp6hr3cIJkQLs'
	});

	params = {screen_name: 'nodejs', count:200};
	getTweets();
};



