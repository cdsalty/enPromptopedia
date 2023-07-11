'use client';
// checked
import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  console.log(data);
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          data={data}
        />
      ))}
    </div>
  );
};

// The Feed will list the prompt cards inside the promptcardlist
const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]); // [post1, post2, post3]

  const fetchPosts = async () => {
    // endpoint I create
    const response = await fetch('/api/prompt');
    const data = await response.json();
    console.log(data);
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={() => {
          console.log(
            'will take a tag name later and filter the posts accordingly.'
          );
        }}
      />
    </section>
  );
};

export default Feed;
