import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { CssBaseline, Grid } from "@material-ui/core";
import { getPlacesData, getWeatherData } from "./api";

function App() {
  const [places, setplaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, settype] = useState("restaurants");
  const [weatherData, setWeatherData] = useState(null);
  const [filteredPlaces, setfilteredPlaces] = useState([]);
  const [rating, setRating] = useState("");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);
      getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
        setWeatherData(data)
      );
      getPlacesData(type, bounds?.sw, bounds?.ne).then((data) => {
        setplaces(
          data?.filter(
            (place) => place?.name?.length > 0 && place?.num_reviews > 0
          )
        );
        setfilteredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [bounds, type]);
  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setfilteredPlaces(filteredPlaces);
  }, [rating]);
  return (
    <>
      <CssBaseline />
      <Header {...{ setCoordinates }} />
      <Grid container style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            {...{
              childClicked,
              isLoading,
              type,
              settype,
              rating,
              setRating,
            }}
            places={filteredPlaces.length ? filteredPlaces : places}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            {...{
              setBounds,
              weatherData,
              setCoordinates,
              coordinates,
              setChildClicked,
            }}
            places={filteredPlaces.length ? filteredPlaces : places}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
