import Navbar from "../../../layouts/frontend/Navbar";
import Carousel, { CarouselItem } from "./carousel/Carousel";
import images from "./images";
import "./news.css";
import styled from "styled-components";
import { publicRequest, userRequest } from "../../../requestMethods";
import { useEffect, useState } from "react";
import { ThumbUpOutlined, ThumbDownOutlined, ThumbUp } from "@material-ui/icons";
import {
  FacebookIcon,
  FacebookShareButton,
  FacebookShareCount,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const News = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [news, setNews] = useState([]);
  useEffect(() => {
    const getNews = async () => {
      try {
        const res = await publicRequest.get("/view-news");
        setNews(res.data);
        console.log(currentUser._id);
      } catch (err) {
        console.log(err);
      }
    };
    getNews();
  }, []);

  const like = async (id) => {
    try {
      const { data } = await userRequest.put(`/like/${id}`);

      //Update nr of likes without refreshing the page
      const newData = news.map((el) => {
        if (el._id === data._id) {
          return data;
        } else {
          return el;
        }
      });
      console.log(data);
      setNews(newData);
    } catch (err) {
      console.log(err);
    }
  };

  // Unlike News
  const unlike = async (id) => {
    try {
      const { data } = await userRequest.put(`/unlike/${id}`);
      const newData = news.map((el) => {
        if (el._id === data._id) {
          return data;
        } else {
          return el;
        }
      });
      setNews(newData);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Navbar />
      <Carousel>
        {images.map((image) => {
          return (
            <CarouselItem key={image}>
              <img src={image} alt="" />
            </CarouselItem>
          );
        })}
      </Carousel>
      <NewsContainer>
        {news.map((item) => (
          <SingleNews key={item._id}>
            <Link to={`/news/${item._id}`}>
              <Image>
                <img src={item.newsPhoto} alt="" />
              </Image>
            </Link>
            <h2>{item.title}</h2>
            <LikeInfo>
              <Buttons>
                {item.likes.filter((like) => like.user === currentUser._id).length >
                0 ? (
                  <Like onClick={() => unlike(item._id)}>
                    <ThumbUp />
                  </Like>
                ) : (
                  <Like onClick={() => like(item._id)}>
                    <ThumbUpOutlined />
                  </Like>
                )}
              </Buttons>
              <NrOfLikes>{item.likes.length} likes</NrOfLikes>
            </LikeInfo>
            <Share>
              <FacebookShareButton url={`localhost:3000/news/${item._id}`}>
                <FacebookIcon className="icon" round="true" size={32} />
              </FacebookShareButton>
              <TwitterShareButton url={`localhost:3000/news/${item._id}`}>
                <TwitterIcon className="icon" round="true" size={32} />
              </TwitterShareButton>
            </Share>
          </SingleNews>
        ))}
      </NewsContainer>
    </Container>
  );
};

const Container = styled.div``;
const NewsContainer = styled.div`
  padding: 2rem 0rem;
  width: 92%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 2.5rem;
  a {
    text-decoration: none;
  }
  h2 {
    width: 100%;
    color: black;
    position: absolute;
    bottom: 0;
    text-align: center;
    margin: 0.5rem;
  }
`;
const SingleNews = styled.div`
  position: relative;
  height: 50vh;
  display: flex;
  border-radius: 2px;
  overflow: hidden;
  color: #909090;
  box-shadow: 0 0 8px;
`;
const Image = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  overflow: hidden;
  display: flex;
  img {
    width: 100%;
    height: 100%;
    transition: all 0.4s ease;
    &:hover {
      transform: scale(1.1);
    }
  }
`;
const LikeInfo = styled.div`
  width: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0.5rem 1rem;
`;
const Date = styled.p`
  color: #424242;
  font-size: 14px;
  letter-spacing: 1px;
  font-family: "Rajdhani", sans-serif;
`;
const Share = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 1rem 0.5rem;
  display: flex;
  width: 20%;
  justify-content: space-around;
`;
const Fb = styled.div`
  border: 1px solid red;
  display: flex;
`;
const Buttons = styled.div`
  margin-bottom: 5px;
`;
const Like = styled.div`
  color: #0087e1;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: scale(1.2);
  &:hover {
    transform: scale(1.5);
  }
`;

const NrOfLikes = styled.div`
  color: black;
  font-family: "Rajdhani", sans-serif;
  font-size: 15px;
  font-weight: normal;
  letter-spacing: 0.7px;
`;
export default News;
