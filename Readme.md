# Tweet Delete
#### Easy twitter archive deletion, configuration details to follow

1. Add your twitter API credentials to your bash profile
	export consumer_key= YOUR_consumer_key
	export consumer_secret= YOUR_consumer_secret
	export access_token_key= YOUR_access_token_key
	export access_token_secret= YOUR_access_token_secret

2. Request extract of your twitter data from your settings page

3. Download twitter data extract, open 'tweets.js'

4. Modify the file such that the array of tweets is accessible to this script. 
	
	var tweets = [{..etc.}];

	module.exports = tweets;

5. Execute index.js and point to your tweets archive. The script to delete likes (likes.js) works similarly. 

6. 'deletelikes.js' - Pulls the last 200 favorited tweets and will delete those if they are available. 


#### The scripts to delete likes aren't very reliable as twitter will often return inconsisteny results -- i.e. the tweet is visible as a 'like/favorite' via your profile but hitting the API to remove the like returns err code 144 or 34. 