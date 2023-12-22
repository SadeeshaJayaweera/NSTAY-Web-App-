import React, { useState, useEffect } from "react";
import mapStyles from "../mapStyles";
import axios from "axios";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";



const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = { lat: 6.8212612, lng: 80.0414355 };

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
};

function NstayMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD_wkpI6bjBWcIW3CJbEf7eEN7y_eKJFDQ",
  });

  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/locations")
      .then((response) => {
        setMarkers(response.data);
        console.log(response.data); // Log the data to the console
      })
      .catch((error) => console.error("Error fetching locations:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <Container
      style={{
        height: "650px",
        border: "2px solid var(--Gray-5, #E0E0E0)",
        borderRadius: "6px",
        marginTop: "60px",
      }}
    >
      <Row>
        <Col sm={3}>
          <Container
            style={{
              height: "550px",
              border: "2px solid var(--Gray-5, #E0E0E0)",
              borderRadius: "6px",
              marginTop: "20px",
            }}
          ></Container>
        </Col>
        <Col sm={9}>
          <Container
            style={{
              height: "550px",
              border: "0.5px solid #2F80ED",
              borderRadius: "6px",
              marginTop: "20px",
            }}
          >
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={14}
              center={center}
              options={options}
            >
              {/* Your existing code for the center marker */}
              <MarkerF
                position={center}
                icon={{
                  url: "../public/NSBM_Pin.png",
                  scaledSize: { width: 50, height: 50 },
                }}
              />

              {/* Map over the markers from the state */}
              {markers.map(({ _id, lat, lng }) => (
                <MarkerF
                  key={_id}
                  position={{ lat, lng }}
                  icon={{
                    url: "../public/pin.png",
                    scaledSize: { width: 23, height: 23 },
                  }}
                />
              ))}
            </GoogleMap>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default NstayMap;
