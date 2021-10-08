import { getStoredPosts } from '../data/dataManager.js';

const getPosts = (request, response) => {
	response.send(getStoredPosts());
};

const allPosts = {
	getPosts,
	route: '/posts',
};

export default allPosts;
