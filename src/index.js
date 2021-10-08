import express from 'express';
import cors from 'cors';
import allPosts from './routes/allPosts.js';
import singlePost from './routes/singlePost.js';
import postComments from './routes/postComments.js';

const port = 4000;
const server = express();

server.use(cors());

server.get(allPosts.route, allPosts.getPosts);
server.get(singlePost.route, singlePost.getPost);
server.get(postComments.route, postComments.getComments);

server.listen(port);
