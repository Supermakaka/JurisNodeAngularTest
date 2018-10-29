import * as express from 'express';

import TwitterCtrl from './controllers/twitter';

export default function setRoutes(app) {

  const router = express.Router();

  const twitterCtrl = new TwitterCtrl();

  // Users
  router.route('/twitter/search/:query').get(twitterCtrl.search);
  

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
