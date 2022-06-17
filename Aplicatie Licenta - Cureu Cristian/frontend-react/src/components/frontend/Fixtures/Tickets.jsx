import { Add, Remove, ShoppingCartOutlined, Info } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../../../requestMethods";
import StripeCheckout from "react-stripe-checkout";
import styled from "styled-components";
import "./fixtures.css";
import swal from "sweetalert";

function Tickets(props) {
  const history = useHistory();
  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token);
  };
  const [tickets, setTickets] = useState([]);
  const [sectorAquantity, setSectorAQuantity] = useState(0);
  const [sectorBquantity, setSectorBQuantity] = useState(0);
  const [sectorCquantity, setSectorCQuantity] = useState(0);
  const [sectorDquantity, setSectorDQuantity] = useState(0);
  const [eastStandQuantity, setEastStandQuantity] = useState(0);
  const [westStandQuantity, setWestStandQuantity] = useState(0);
  let quantity = 0;
  let price = 0;

  //Use Effects
  useEffect(() => {
    let id = props.match.params.id;
    const getTicket = async () => {
      try {
        const res = await publicRequest.get(`/tickets/find/${id}`);
        setTickets(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTicket();
  }, [props.match.params.id]);
  useEffect(() => {
    const makeRequest = async () => {
      try {
          await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: price * 100,
        });
        swal("Success", "Your payment was registered!", "success");
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && price > 0 && makeRequest(); //If stripeToken exists, call the function
  }, [stripeToken, price, history]);

  //Increase or Decrease tickets quantity
  const handleQuantity = (type, sector) => {
    if (sector === "sectorA") {
      if (type === "-") {
        sectorAquantity > 0 && setSectorAQuantity(sectorAquantity - 1);
      } else if (type === "+") {
        sectorAquantity < 10 && setSectorAQuantity(sectorAquantity + 1);
      }
    } else if (sector === "sectorB") {
      if (type === "-") {
        sectorBquantity > 0 && setSectorBQuantity(sectorBquantity - 1);
      } else if (type === "+") {
        sectorBquantity < 10 && setSectorBQuantity(sectorBquantity + 1);
      }
    } else if (sector === "sectorC") {
      if (type === "-") {
        sectorCquantity > 0 && setSectorCQuantity(sectorCquantity - 1);
      } else if (type === "+") {
        sectorCquantity < 10 && setSectorCQuantity(sectorCquantity + 1);
      }
    } else if (sector === "sectorD") {
      if (type === "-") {
        sectorDquantity > 0 && setSectorDQuantity(sectorDquantity - 1);
      } else if (type === "+") {
        sectorDquantity < 10 && setSectorDQuantity(sectorDquantity + 1);
      }
    } else if (sector === "east") {
      if (type === "-") {
        eastStandQuantity > 0 && setEastStandQuantity(eastStandQuantity - 1);
      } else if (type === "+") {
        eastStandQuantity < 10 && setEastStandQuantity(eastStandQuantity + 1);
      }
    } else if (sector === "west") {
      if (type === "-") {
        westStandQuantity > 0 && setWestStandQuantity(westStandQuantity - 1);
      } else if (type === "+") {
        westStandQuantity < 10 && setWestStandQuantity(westStandQuantity + 1);
      }
    }
  };

  const addToQuantity = (sector) => {
    if (sector === "sectorA") {
      quantity += sectorAquantity;
      price += sectorAquantity * 30;
    } else if (sector === "sectorB") {
      quantity += sectorBquantity;
      price += sectorBquantity * 30;
    } else if (sector === "sectorC") {
      quantity += sectorCquantity;
      price += sectorCquantity * 30;
    } else if (sector === "sectorD") {
      quantity += sectorDquantity;
      price += sectorDquantity * 30;
    } else if (sector === "west") {
      quantity += westStandQuantity;
      price += westStandQuantity * 20;
    } else if (sector === "east") {
      quantity += eastStandQuantity;
      price += eastStandQuantity * 20;
    }
  };
  return (
    <Container>
      <Information>
        <Info />
        <p>select your tickets and then click on cart to complete the order</p>
      </Information>
      <ContainerStadium>
        <Pitch>
          <img src="https://i.ibb.co/yXQ0Xmb/pitchB.png" alt="pitch" />
        </Pitch>
        <Top>
          <SectorA className="sector">
            {tickets
              .filter((ticket) => ticket.sector.includes("sector a"))
              .map((filteredTicket) => (
                <div className="text" key={filteredTicket._id}>
                  <p>{filteredTicket.sector}</p>
                </div>
              ))}
            <AmountContainer
              className="amount"
              onClick={addToQuantity("sectorA")}
            >
              <Remove onClick={() => handleQuantity("-", "sectorA")} />
              <Amount>{sectorAquantity}</Amount>
              <Add onClick={() => handleQuantity("+", "sectorA")} />
            </AmountContainer>
          </SectorA>
          <SectorB className="sector">
            {tickets
              .filter((ticket) => ticket.sector.includes("sector b"))
              .map((filteredTicket) => (
                <div className="text" key={filteredTicket._id}>
                  {filteredTicket.sector}
                </div>
              ))}
            <AmountContainer
              className="amount"
              onClick={addToQuantity("sectorB")}
            >
              <Remove onClick={() => handleQuantity("-", "sectorB")} />
              <Amount>{sectorBquantity}</Amount>
              <Add onClick={() => handleQuantity("+", "sectorB")} />
            </AmountContainer>
          </SectorB>
        </Top>
        <Bottom>
          <SectorC className="sector">
            {tickets
              .filter((ticket) => ticket.sector.includes("sector c"))
              .map((filteredTicket) => (
                <div className="text" key={filteredTicket._id}>
                  {filteredTicket.sector}
                </div>
              ))}
            <AmountContainer
              className="amount"
              onClick={addToQuantity("sectorC")}
            >
              <Remove onClick={() => handleQuantity("-", "sectorC")} />
              <Amount>{sectorCquantity}</Amount>
              <Add onClick={() => handleQuantity("+", "sectorC")} />
            </AmountContainer>
          </SectorC>
          <SectorD className="sector">
            {tickets
              .filter((ticket) => ticket.sector.includes("sector d"))
              .map((filteredTicket) => (
                <div className="text" key={filteredTicket._id}>
                  {filteredTicket.sector}
                </div>
              ))}
            <AmountContainer
              className="amount"
              onClick={addToQuantity("sectorD")}
            >
              <Remove onClick={() => handleQuantity("-", "sectorD")} />
              <Amount>{sectorDquantity}</Amount>
              <Add onClick={() => handleQuantity("+", "sectorD")} />
            </AmountContainer>
          </SectorD>
        </Bottom>
        <LeftRight>
          <EastStand className="sector">
            {tickets
              .filter((ticket) => ticket.sector.includes("west stand"))
              .map((filteredTicket) => (
                <div className="text" key={filteredTicket._id}>
                  {filteredTicket.sector}
                </div>
              ))}
            <AmountContainer className="amount" onClick={addToQuantity("west")}>
              <Remove onClick={() => handleQuantity("-", "west")} />
              <Amount>{westStandQuantity}</Amount>
              <Add onClick={() => handleQuantity("+", "west")} />
            </AmountContainer>
          </EastStand>
          <WestStand className="sector">
            {tickets
              .filter((ticket) => ticket.sector.includes("east stand"))
              .map((filteredTicket) => (
                <div className="text" key={filteredTicket._id}>
                  {filteredTicket.sector}
                </div>
              ))}
            <AmountContainer className="amount" onClick={addToQuantity("east")}>
              <Remove onClick={() => handleQuantity("-", "east")} />
              <Amount>{eastStandQuantity}</Amount>
              <Add onClick={() => handleQuantity("+", "east")} />
            </AmountContainer>
          </WestStand>
        </LeftRight>
      </ContainerStadium>
      <TicketInfo>
        <Badge badgeContent={quantity} color="primary">
          <ShoppingCartOutlined
            style={{ transform: "scale(1.5)", color: "#00365d" }}
          />
        </Badge>
        <h3>Total price: {price}</h3>
        <div>
          <StripeCheckout
            name="Fantasy Shop"
            image="https://gravatar.com/avatar/436d567b6d2aa4a1b251a27962993653?s=200&d=robohash&r=x"
            billingAddress
            shippingAddress
            description={`Your total is $${price}`}
            amount={price * 100} //100 = 1$
            token={onToken}
            stripeKey="pk_test_51KlC5mLjsMHQXbRaxrpAhgg0JggWfOVztXaNHCb3G2FxMIZMI3xvPuSbzbJvnIK25tVuDoMQTmi4S4hY6PCgkf6Z00bs1CCUIX"
          >
            <Button>BUY TICKETS</Button>
          </StripeCheckout>
        </div>
      </TicketInfo>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const Information = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0.8);
  position: relative;
  top: 2rem;
  color: #525252;
  z-index: 10;
  p {
    letter-spacing: 0.3px;
    margin-left: 10px;
  }
`;
const ContainerStadium = styled.div`
  height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  flex-wrap: wrap;
  text-transform: uppercase;
  transform: scale(0.95);
  color: white;
  font-size: 18px;
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
`;
const Pitch = styled.div`
  width: 25%;
  background-color: #005100;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25vh;
  border: 2px solid black;
  position: absolute;
  border-radius: 30px;
  z-index: 2;
  display: flex;
  align-items: center;
  overflow: hidden;
  img {
    width: 100%;
  }
`;
const Top = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
  justify-content: center;
  z-index: 1;
  cursor: pointer;
`;
const Bottom = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
  justify-content: center;
  z-index: 1;
  cursor: pointer;
`;
const SectorA = styled.div`
  position: relative;
  width: 50%;
  border: 2px solid black;
  padding: 6rem 6rem;
  border-top-left-radius: 30%;
  background-image: url("https://i.ibb.co/cr0P4sP/seatsT.jpg");
  background-size: cover;
  transition: all 0.7s ease;
  :hover {
    background-image: url("https://i.ibb.co/2FKzv8Q/seats-Tblur.jpg");
    background-size: cover;
    transition: all 0.7s ease;
  }
`;
const SectorB = styled.div`
  position: relative;
  width: 50%;
  border: 2px solid black;
  padding: 6rem 6rem;
  border-top-right-radius: 30%;
  background-image: url("https://i.ibb.co/cr0P4sP/seatsT.jpg");
  background-size: cover;
  transition: all 0.7s ease;
  :hover {
    background-image: url("https://i.ibb.co/2FKzv8Q/seats-Tblur.jpg");
    transition: all 0.7s ease;
  }
`;
const SectorC = styled.div`
  position: relative;
  width: 50%;
  border: 2px solid black;
  padding: 6rem 6rem;
  border-bottom-left-radius: 30%;
  background-image: url("https://i.ibb.co/x2XcvwF/seatsB.jpg");
  background-size: cover;
  transition: all 0.7s ease;
  :hover {
    background-image: url("https://i.ibb.co/H4Y9JWj/seats-Bblur.jpg");
    transition: all 0.7s ease;
  }
`;
const SectorD = styled.div`
  position: relative;
  width: 50%;
  border: 2px solid black;
  padding: 6rem 6rem;
  border-bottom-right-radius: 30%;
  background-image: url("https://i.ibb.co/x2XcvwF/seatsB.jpg");
  background-size: cover;
  transition: all 0.7s ease;
  :hover {
    background-image: url("https://i.ibb.co/H4Y9JWj/seats-Bblur.jpg");
    transition: all 0.7s ease;
  }
`;
const LeftRight = styled.div`
  flex-wrap: wrap;
  position: absolute;
  display: flex;
  width: 60%;
  height: 60vh;
  align-items: center;
  justify-content: space-between;
  z-index: 0;
  cursor: pointer;
`;
const WestStand = styled.div`
  position: relative;
  border-top-right-radius: 30%;
  border-bottom-right-radius: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16.8%;
  border: 2px solid black;
  padding: 7rem 0rem;
  background-image: url("https://i.ibb.co/FbwCPMz/seatsE.jpg");
  background-size: cover;
  transition: all 0.7s ease;
  :hover {
    background-image: url("https://i.ibb.co/n7TFsnF/seats-Eblur.jpg");
    transition: all 0.7s ease;
  }
`;
const EastStand = styled.div`
  position: relative;
  border-top-left-radius: 30%;
  border-bottom-left-radius: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16.8%;
  border: 2px solid black;
  padding: 7rem 0rem;
  background-image: url("https://i.ibb.co/ykDZdK2/seatsW.jpg");
  background-size: cover;
  transition: all 0.7s ease;
  :hover {
    background-image: url("https://i.ibb.co/jggbDMd/seats-Wblur.jpg");
    transition: all 0.7s ease;
  }
`;
const TicketInfo = styled.div`
  display: flex;
  width: 100%;
  height: 20vh;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
  bottom: 12px;
`;
const Button = styled.button`
  padding: 10px 20px;
  border-radius: 4px;
  border: 2px solid #3e3e3ec8;
  color: black;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
    border: 2px solid #0c0c0c;
  }
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 2px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
export default Tickets;
