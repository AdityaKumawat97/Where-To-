import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { CssBaseline, Grid } from "@material-ui/core";
import { getPlacesData } from "./api";

function App() {
  const [places, setplaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  useEffect(() => {
    setIsLoading(true);
    getPlacesData(bounds?.sw, bounds?.ne).then((data) => {
      setplaces(data);
      setIsLoading(false);
    });
  }, [coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List {...{ places, childClicked, isLoading }} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            {...{
              setBounds,
              setCoordinates,
              coordinates,
              places,
              setChildClicked,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
