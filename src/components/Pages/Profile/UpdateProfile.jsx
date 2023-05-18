import { useMutation } from "@apollo/client";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { UPDATE_USER } from "../../../Queries/userQueries";
import Loading from "../../../Reusables/Loading";
import { useDispatch } from "react-redux";
import { notification } from "../../../reducers/notificationReducer";

const UpdateProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(user.name);
  const [desired_name, setDesired_name] = useState(user?.desired_name || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [occupation, setOccupation] = useState(user?.occupation || "");
  const [hobby, setHobby] = useState(user?.hobby || "");

  const [update, result] = useMutation(UPDATE_USER, {
    variables: {
      name,
      desired_name,
      city,
      country,
      occupation,
      hobby,
    },
    onCompleted: (data) => {
      dispatch(notification("Profile updated successfully", 4000));
      console.log(data);
    },
    onError: (err) => {
      dispatch(notification(`an error occured  ${err.message}`, 4000));
    },
  });

  const handleChange = (e) => {
    e.target.name === "name" && setName(e.target.value);
    e.target.name === "desired_name" && setDesired_name(e.target.value);
    e.target.name === "city" && setCity(e.target.value);
    e.target.name === "country" && setCountry(e.target.value);
    e.target.name === "occupation" && setOccupation(e.target.value);
    e.target.name === "hobby" && setHobby(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    update();
  };

  return (
    <Container maxWidth="xs">
      {result.loading && <Loading />}
      <Typography variant="h4">Update your details</Typography>

      <Box component="form" sx={{}} onSubmit={handleSubmit}>
        <Box>
          <TextField
            label="Full Name"
            variant="outlined"
            name="name"
            fullWidth
            margin="normal"
            onChange={handleChange}
            value={name}
          />
        </Box>
        <Box>
          <TextField
            label="Desired Name"
            variant="outlined"
            name="desired_name"
            fullWidth
            onChange={handleChange}
            margin="normal"
            value={desired_name}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ mr: 1 }}>
            <TextField
              label="City"
              variant="outlined"
              name="city"
              fullWidth
              value={city}
              margin="normal"
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ ml: 1 }}>
            <TextField
              label="Country"
              name="country"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              value={country}
            />
          </Box>
        </Box>
        <Box>
          <TextField
            label="Occupation"
            name="occupation"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
            value={occupation}
          />
        </Box>
        <Box>
          <TextField
            label="Hobbies"
            name="hobby"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
            value={hobby}
            helperText="please, add a comma (,) after each input."
          />
        </Box>
        <Box>
          <Button
            type="submit"
            size="small"
            variant="contained"
            color="success"
          >
            Update
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UpdateProfile;
