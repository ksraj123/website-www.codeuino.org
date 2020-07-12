import React from 'react';
import Axios from 'axios';
import './Twitter.css';
import Tweet from './Tweet/Tweet';
import {Spinner, Button} from 'react-bootstrap';
import { TwitterTweetEmbed } from "react-twitter-embed";

const TwitterApi = Axios.create({
    baseURL: "https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1",
    headers: {
        Authorization: "Bearer AAAAAAAAAAAAAAAAAAAAAIWYFwEAAAAAVXUBMcE6iCqQ16jlG0ZCkgQ4pf8%3DqqNIBmiUakni4wHCSqOobgKbPC4pwflEWJqKNdm9XWBRQm3pBC"
    }
})

class Twitter extends React.Component {
    
    state={
        tweetsDisplay: [],
    }

    tweets=null;

    componentDidMount() {
        TwitterApi.get("/statuses/user_timeline.json?screen_name=codeuino&count=200&tweet_mode=extended")
        .then(Response => {
            let allWithHashtags = Response.data;
            allWithHashtags = allWithHashtags.filter(tweet => tweet.entities.hashtags.length !== 0)
            console.log(allWithHashtags);
            this.tweets=allWithHashtags;
            this.loadTweets();
        })
        .catch(err => console.log(err))
    }

    loadTweets = () => {
        console.log(this.tweets);
        let tweetsDisplay = [...this.state.tweetsDisplay];
        tweetsDisplay = this.tweets.slice(0, tweetsDisplay.length+1);
        console.log(tweetsDisplay);
        this.setState({tweetsDisplay: tweetsDisplay}, ()=>{
            tweetsDisplay = this.tweets.slice(0, tweetsDisplay.length+1);
            this.setState({tweetsDisplay: tweetsDisplay}, ()=>{
                tweetsDisplay = this.tweets.slice(0, tweetsDisplay.length+1);
                this.setState({tweetsDisplay: tweetsDisplay})
            })
        })
    }

    render() {
        return(
            <div style={{overflow: 'scroll', width: '500px', maxHeight: '600px', display: 'flex', flexDirection: 'column'}}>
            {
                    <React.Fragment>
                        {this.state.tweetsDisplay.map((tweet, index) => <TwitterTweetEmbed key={index} tweetId={tweet.id_str}/>)}
                        <Button id="loadTweets" variant="outline-primary" onClick={this.loadTweets}>
                            Load More
                        </Button>
                    </React.Fragment>
            }
            </div>
        );
    }
}

export default Twitter;
