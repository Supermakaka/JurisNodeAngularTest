import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

import BaseCtrl from './base';
import { twitClient } from '../app';

export default class TwitterCtrl extends BaseCtrl {
  
  search = (req, res) => {
    
    twitClient.get('search/tweets', {q: encodeURIComponent(req.params.query), count: process.env.TWEET_RECORDS_RETURN_COUNT}, function(error, tweets, response) {
      if (error) {
        res.status(400).json("Ups! Search went wrong!");
      }
      res.status(200).json(tweets.statuses);
    });    
  }
}
