import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import styled from "styled-components";

function SingleNews(props) {
  const history = useHistory();
  const [details, setDetails] = useState({});
  useEffect(() => {
    let newsId = props.match.params.id;
    axios.get(`http://localhost:3001/api/news/${newsId}`).then((res) => {
      if (res.status === 201) {
        setDetails(res.data);
      } else {
        swal("error", "", "error");
        history.push("/admin/view-news");
      }
    });
  }, [props.match.params.id, history]);
  const deleteNews = (e, newsId) => {
    e.preventDefault();
    axios.delete(`http://localhost:3001/api/news/${newsId}`).then((res) => {
      if (res.status === 201) {
        swal("Success", "", "success");
        history.push("/admin/view-news");
      } else if (res.status === 400) {
        swal("Error", "", "error");
      }
    });
  };
  return (
    <NewsDetails>
      <h2>{details.title}</h2>
      <img src={details.newsPhoto} alt="image" />
      <Desc>
        <p>{details.description}</p>
      </Desc>
      <DateInfo>
        <Date>{details.date}</Date>
      </DateInfo>
      <Buttons>
        <EditButton>
          <Link to={`/admin/edit-news/${details._id}`}>Edit</Link>
        </EditButton>
        <button onClick={(e) => deleteNews(e, details._id)}>Delete</button>
      </Buttons>
    </NewsDetails>
  );
}

const NewsDetails = styled.div`
  height: 70vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  img {
    border-radius: 1rem;
    width: 30%;
  }
  h2 {
    font-size: 1.6rem;
  }
  p {
    font-size: 1rem;
  }
`;
const Buttons = styled.div`
  position: absolute;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    color: #db0000;
    background-color: white;
    border: 2px solid #db0000;
    border-radius: 2px;
    transition: all 0.3s ease;
    :hover {
      color: white;
      background-color: #db0000;
    }
  }
`;
const EditButton = styled.div`
  font-size: 0.9rem;
  border: 2px solid #00ca00;
  border-radius: 2px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: white;
  transition: all 0.3s ease;
  a {
    text-decoration: none;
    color: #00ca00;
  }
  :hover {
    background-color: #00ca00;
    a {
      color: white;
    }
  }
`;
const DateInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0.5rem;
`;
const Date = styled.p`
  color: #424242;
  font-size: 14px;
  letter-spacing: 1px;
  font-family: "Rajdhani", sans-serif;
`;
const Desc = styled.div`
  width: 70%;
  letter-spacing: 0.2px;
`;

export default SingleNews;
