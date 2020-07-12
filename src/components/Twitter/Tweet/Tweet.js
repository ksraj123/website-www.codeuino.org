import React from 'react';

const Tweet = (props) => {
    return(
        <div className="tweet">
            {props.tweet.full_text}
        </div>
    );
}

export default Tweet;
