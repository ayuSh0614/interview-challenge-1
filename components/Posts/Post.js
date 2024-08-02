import PropTypes from 'prop-types';
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollSnapType: 'x mandatory',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const UserInfo = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: '16px',
  '& > p': {
    margin: '4px 0',
    fontWeight: 'bold',
  },
  '& > p.email': {
    fontWeight: 'normal',
  },
  paddingLeft: '12px',
}));


const Avatar = styled.div(() => ({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  backgroundColor: '#ddd', 
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#333', 
}));


const Button = styled.button(() => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  cursor: 'pointer',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  color: '#000',
  fontSize: '20px',
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const getInitials = (name) => {
  const names = name.split(' ');
  if (names.length > 1) {
    return names[0][0] + names[1][0];
  }
  return names[0][0];
};


const Post = ({ post }) => {
  const carouselRef = useRef(null);
  const [itemW, setItemW] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (carouselRef.current && carouselRef.current.firstChild) {
      setItemW(carouselRef.current.firstChild.offsetWidth);
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/v1/users/${post.userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [post.userId]);

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: itemW,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -itemW,
        behavior: 'smooth',
      });
    }
  };

  return (
    <PostContainer>
      <CarouselContainer>
        {user ? (
          <UserInfo>
            <Avatar>
              {getInitials(user.name)}
            </Avatar>
            <div style={{paddingLeft: '10px'}}>
              <p style={{fontWeight: 'bold'}}><span>{user.name}</span></p>
              <p className="email"><span>{user.email}</span></p>
            </div>
          </UserInfo>
        ) : (
          <p>Loading user info...</p>
        )}
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};



Post.propTypes = {
  post: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    ).isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;
