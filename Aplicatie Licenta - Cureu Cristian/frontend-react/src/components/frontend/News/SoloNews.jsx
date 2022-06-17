import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../../../requestMethods";
import Navbar from "../../../layouts/frontend/Navbar";
import styled from "styled-components";
import {
  ThumbUpOutlined,
  ThumbDownOutlined,
  ArrowBackIosRounded,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function SoloNews(props) {
  const userId = useSelector((state) => state.user.currentUser._id);
  const [news, setNews] = useState([]);
  let id = props.match.params.id;
  useEffect(() => {
    const getNewsById = async () => {
      try {
        const { data } = await publicRequest.get(`/news/${id}`);
        setNews(data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewsById();
  }, [props.match.params.id]);

  // Like news
  const like = async () => {
    try {
      const res = await userRequest.put(`/like/${id}`);
      console.log(res);

    } catch (err) {
      console.log(err);
    }
  };

  // Unlike News
  const unlike = async () => {
    try {
      const res = await userRequest.put(`/unlike/${id}`);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Navbar />
      <News>
        <Link to="/news">
          <Back>
            <ArrowBackIosRounded />
          </Back>
        </Link>
        <Left>
          <h1>{news.title}</h1>
          <Image>
            <img src={news.newsPhoto} alt="image" />
          </Image>
        </Left>
        <Right>
          <RightText>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            ratione sapiente laborum mollitia et minima atque deserunt
            consequuntur veritatis molestiae praesentium quo velit laboriosam
            dolor hic quae, deleniti quas vel. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Eligendi ratione sapiente laborum
            mollitia et minima atque deserunt consequuntur veritatis molestiae
            praesentium quo velit laboriosam dolor hic quae, deleniti quas vel.
          </RightText>
          <DateInfo></DateInfo>
          <Buttons>
            <Like
              onClick={() => {
                like();
              }}
            >
              <ThumbUpOutlined />
            </Like>
            <UnLike
              onClick={() => {
                unlike();
              }}
            >
              <ThumbDownOutlined />
            </UnLike>
          </Buttons>
        </Right>
      </News>
    </Container>
  );
}
const Back = styled.div`
  margin-top: 1.5rem;
  position: absolute;
  top: 0;
  left: 0;
  color: #4e4e4e;
  display: flex;
  align-items: center;
  cursor: pointer;
  transform: scale(1.2);
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.4);
  }
  a {
    text-decoration: none;
  }
`;
const Container = styled.div`
  height: 100vh;
`;
const News = styled.div`
  height: 90vh;
  width: 90%;
  margin: auto;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const DateInfo = styled.div`
  margin: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
`;
const Date = styled.p`
  color: #424242;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  font-family: "Rajdhani", sans-serif;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  width: 50%;
  h1 {
    margin-bottom: 2rem;
    color: #303030;
  }
`;
const Image = styled.div`
  display: flex;
  box-shadow: 0 0 14px;
  color: #828282;
  margin-bottom: 3rem;
  img {
    width: 100%;
    border-radius: 2px;
  }
`;
const Right = styled.div`
  border-radius: 4px;
  flex-wrap: wrap;
  color: #cbcbcb;
  box-shadow: 0 0 14px;
  position: relative;
  display: flex;
  width: 60%;
  height: 80%;
  margin-left: 4rem;
  margin-right: 1rem;
  font-size: 20px;
  letter-spacing: 0.2px;
  font-weight: 200;
`;
const RightText = styled.p`
  color: #232323;
  padding: 3rem;
`;

const Buttons = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 4rem;
  display: flex;
  justify-content: space-between;
  width: 100px;
`;
const Like = styled.div`
  color: #0087e1;
  display: flex;
  align-items: center;
  transform: scale(1.5);
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.7);
  }
`;
const UnLike = styled.div`
  color: #0087e1;
  display: flex;
  align-items: center;
  transform: scale(1.5);
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.7);
  }
`;
const NrOfLikes = styled.div`
  color: black;
  font-family: "Rajdhani", sans-serif;
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  top: 100%;
`;
export default SoloNews;
