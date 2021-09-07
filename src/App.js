import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";
import { CssBaseline, Grid } from "@material-ui/core";
function App() {
  return (
    <>
       
      <CssBaseline />
      <Header />
      <Grid>
        <List />
        <Map />
        <PlaceDetails />
      </Grid>
        
    </>
  );
}

export default App;
