import * as dotenv from 'dotenv';
import * as express from 'express';
import * as path from 'path';
import * as twitter from 'twitter';

import setRoutes from './routes';

const app = express();
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var twitClient = new twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

setRoutes(app);

let http = require('http').Server(app);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const server = http.listen(app.get('port'), function(){
    console.log(`Angular Full Stack listening on port ${app.get('port')}`);
});

var io = require('socket.io').listen(server);

var _stream;

io.on('connection', function(socket: any){
    console.log('a user connected.');
    
    var query = socket.handshake.query.data;

    startStream(socket, query);

    socket.on('disconnect', function () {
        console.log('Client disconnected');
        _stream.destroy();
    });
});

function startStream(socket, term) {
    twitClient.stream('statuses/filter', { track: encodeURIComponent(term) }, function(stream) {
      _stream = stream;
  
      stream.on('data', function(tweet) {
        io.emit('message', tweet);
      });
  
      stream.on('error', function(error) {
        // throw error;
        io.emit('message', error);
        _stream.destroy();
      });
    })
  }

export { app, twitClient, io };
