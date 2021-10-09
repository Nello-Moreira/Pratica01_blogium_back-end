import fs from 'fs';

const postsDataPath = './src/data/posts.json';
const commentsDataPath = './src/data/comments.json';

const getStoredPosts = () => {
	if (!fs.existsSync(postsDataPath)) {
		return [];
	}
	return JSON.parse(fs.readFileSync(postsDataPath));
};

const getSingleStoredPost = postId =>
	getStoredPosts().filter(post => post.id === postId)[0];

const savePostData = newPostData => {
	const allPosts = getStoredPosts();
	allPosts.push(newPostData);
	fs.writeFileSync(postsDataPath, JSON.stringify(allPosts));
};

const editPost = (postId, postData) => {
	const storedPosts = getStoredPosts();
	const editedArray = storedPosts.map(post => {
		if (post.id === postId) return postData;
		return post;
	});
	fs.writeFileSync(postsDataPath, JSON.stringify(editedArray));
};

const getPostComments = postId => {
	if (!fs.existsSync(commentsDataPath)) {
		return [];
	}
	const allComments = JSON.parse(fs.readFileSync(commentsDataPath));

	return allComments.filter(comment => comment.postId === postId);
};

const saveNewComment = (postId, newComment) => {
	let allComments = [];
	let id = 1;
	let parentPost = getSingleStoredPost(postId);

	if (fs.existsSync(commentsDataPath)) {
		allComments = JSON.parse(fs.readFileSync(commentsDataPath));
		id = allComments[allComments.length - 1].id + 1;
	}
	newComment = { ...newComment, postId, id };
	allComments.push(newComment);

	editPost(postId, {
		...parentPost,
		commentCount: parentPost.commentCount + 1,
	});

	fs.writeFileSync(commentsDataPath, JSON.stringify(allComments));

	return newComment;
};

const createContentPreview = content => {
	let numberOfWords = 10;
	let preview = content.split(' ').slice(0, numberOfWords).join(' ');

	if (content === preview) return preview;

	while (preview.length > 100 && numberOfWords > 0) {
		numberOfWords--;
		preview = preview.split(' ').slice(0, numberOfWords).join(' ');
	}

	return preview + '...';
};

const saveNewPost = postContent => {
	const storedPosts = getStoredPosts();
	let id = 1;
	const cleannerRegex = /(<([^>]+)>)/gi;

	if (storedPosts.length !== 0) {
		storedPosts[storedPosts.length - 1];
		id = storedPosts[storedPosts.length - 1].id + 1;
	}

	postContent = {
		...postContent,
		content: postContent.content.replace(cleannerRegex, ''),
		id,
		commentCount: 0,
		contentPreview: createContentPreview(
			postContent.content.replace(cleannerRegex, '')
		),
	};
	storedPosts.push(postContent);
	fs.writeFileSync(postsDataPath, JSON.stringify(storedPosts));

	return postContent;
};

export {
	getStoredPosts,
	getSingleStoredPost,
	savePostData,
	getPostComments,
	saveNewComment,
	saveNewPost,
};
