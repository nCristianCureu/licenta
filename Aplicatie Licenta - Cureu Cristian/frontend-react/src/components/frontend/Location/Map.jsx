import styled from "styled-components";
import Loading from "../../loading/Loading";
import {
  Directions,
  DirectionsCar,
  MyLocation,
  ArrowForward,
} from "@material-ui/icons";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";

const center = { lat: 47.66433503739467, lng: 23.579387309145694 };

function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAyzzKPOBH3r7bu7bPrID7S83upy - J3KEU",
    libraries: ["places"],
  });
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const originRef = useRef();

  if (!isLoaded) {
    return <Loading />;
  }
  const calculateRoute = async () => {
    if (originRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: center,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    console.log(results);
  };

  return (
    <Container>
      <Box>
        <Info>
          <Locations>
            <YourLocation>
              <Autocomplete>
                <input
                  type="text"
                  placeholder="Starting point . . ."
                  ref={originRef}
                />
              </Autocomplete>
            </YourLocation>
            <Line>
              <ArrowForward />
            </Line>
            <YourLocation>
              <Autocomplete>
                <p>Fantasy Stadium</p>
              </Autocomplete>
            </YourLocation>
          </Locations>
          <Distance>
            <p>Distance: {distance}</p>
            <Duration>
              <p>Duration: {duration}</p>
              {directionsResponse && (
                <DirectionsCar
                  style={{ color: "#595959", transform: "scale(0.9)" }}
                />
              )}
            </Duration>
          </Distance>
        </Info>
        <Buttons>
          <ButtonDirection>
            <Directions
              onClick={calculateRoute}
              style={{
                cursor: "pointer",
                color: "#ff008c",
              }}
            />
          </ButtonDirection>
          <ButtonLocation>
            {" "}
            <MyLocation
              style={{
                cursor: "pointer",
                color: "#008bee",
              }}
              onClick={() => map.panTo(center)}
            />
          </ButtonLocation>
        </Buttons>
      </Box>
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{ fullscreenControl: false }}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={center} />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </Container>
  );
}
const Container = styled.div`
  height: 90vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Line = styled.div`
  margin: 0rem 1rem;
  transform: scale(0.9);
  color: #757575;
`;
const Box = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 40%;
  margin: auto;
  height: 100px;
  border-radius: 4px;
  position: absolute;
  top: 0;
  margin-top: 15px;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.8);
`;
const Info = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-direction: column;
  font-size: 14px;
`;
const Locations = styled.div`
  display: flex;
  align-items: center;
  color: #505050;
  input {
    width: 170px;
    border: none;
    outline: none;
    color: #505050;
    letter-spacing: 0.5px;
    background-color: transparent;
  }
`;
const YourLocation = styled.div`
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  padding: 4px 12px;
  letter-spacing: 0.5px;
`;
const Distance = styled.div`
  width: 100%;
  color: #464646;
  display: flex;
  align-items: center;
  justify-content: space-around;
  letter-spacing: 0.5px;
`;
const Duration = styled.div`
  display: flex;
  align-items: center;
  letter-spacing: 0.5px;
  p {
    margin-right: 5px;
  }
`;
const Buttons = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;
const ButtonDirection = styled.div`
  display: flex;
  margin-top: 5px;
  transform: scale(1.8);
  transition: all 0.3s ease;
  &:hover {
    transform: scale(2);
  }
`;
const ButtonLocation = styled.div`
  display: flex;
  transform: scale(1.1);
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.25);
  }
`;

export default Map;
