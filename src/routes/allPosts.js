import { getStoredPosts, saveNewPost } from '../data/dataManager.js';

const getPosts = (request, response) => {
	response.send(getStoredPosts());
};

const createPost = (request, response) => {
	response.send(saveNewPost(request.body));
};

const allPosts = {
	getPosts,
	createPost,
	route: '/posts',
};

export default allPosts;
