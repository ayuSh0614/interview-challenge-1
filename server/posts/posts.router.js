const express = require('express');
const { fetchPosts } = require('./posts.service');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts();

    const postsWithImages = await Promise.all(
      posts.map(async (post) => {
        const photos = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
        return {
          ...post,
          images: photos.data.map(photo => ({ url: photo.url })),
        };
      })
    );

    res.json(postsWithImages);
  } catch (error) {
    console.error('Error fetching posts or photos:', error);
    res.status(500).json({ message: 'An error occurred while fetching posts or photos.' });
  }
});

module.exports = router;
