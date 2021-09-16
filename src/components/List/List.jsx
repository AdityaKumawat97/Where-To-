import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import { useState, useEffect, createRef } from "react";
import useStyles from "./styles";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

const List = ({ places, childClicked, isLoading }) => {
  const classes = useStyles();
  const [type, settype] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [references, setReferences] = useState([]);
  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => references[i] || createRef());
    setReferences(refs);
  }, [places]);
  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotels & Attractions around you
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => settype(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">hotels</MenuItem>
              <MenuItem value="Attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value="0">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid
                ref={references[i]}
                item
                key={i}
                xs={12}
                style={{ marginBottom: "1.4rem" }}
              >
                <PlaceDetails
                  {...{ place }}
                  selected={Number(childClicked) === i}
                  refProp={references[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
