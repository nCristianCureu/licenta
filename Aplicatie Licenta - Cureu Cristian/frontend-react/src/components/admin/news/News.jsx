import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../loading/Loading";
import styled from "styled-components";

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/api/view-news").then((res) => {
      if (res.status === 201) {
        setNewsList(res.data);
      }
      setLoading(false);
    });
  }, []);

  let viewNewsTable = "";
  if (loading) {
    return <Loading />;
  } else {
    viewNewsTable = newsList.map((news) => {
      return (
        <NewsInfo key={news._id}>
          <Link to={"/admin/news/" + news._id}>
            <Image>
              <img src={news.newsPhoto} alt="image" />
            </Image>
          </Link>
          <h3>{news.title}</h3>
          <DateInfo>
            <Dates>{news.date.substring(0, 10)}</Dates>
            <Dates>{news.date.substring(11, 16)}</Dates>
          </DateInfo>
        </NewsInfo>
      );
    });
  }

  return (
    <Container>
      <PageTitle>All News</PageTitle>
      <AllNews>{viewNewsTable}</AllNews>
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  flex-direction: column;
  width: 100%;
  display: flex;
`;
const PageTitle = styled.h2`
  margin: 1rem 0rem;
  letter-spacing: 0.5px;
`;

const Image = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  border-radius: 2px;
`;

const NewsInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 1rem 0rem;
  img {
    width: 300px;
    cursor: pointer;
    transition: transform 1s ease;
  }
  img:hover {
    transform: scale(1.1);
  }
  a {
    text-decoration: none;
  }
`;
const AllNews = styled.div`
  margin: 1rem 0rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 1rem;
`;
const DateInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
const Dates = styled.p`
  color: #424242;
  font-size: 14px;
  letter-spacing: 1px;
  font-family: "Rajdhani", sans-serif;
`;

export default News;
