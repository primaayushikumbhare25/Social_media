import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "state";

const EditUserProfile = ({ user, onClose }) => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  //  Initialize formData with user values (or empty strings as fallback)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
    picturePath: user?.picturePath || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleFileChange = (e) => {
    setFormData({ ...formData, picture: e.target.files[0] });
  };


  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${user._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUser = await response.json();
      // Update Redux state with new user info
      dispatch(setLogin({ user: updatedUser, token }));
      onClose(); // close the form after saving
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "white",
        maxWidth: 400,
        margin: "2rem auto",
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Edit Profile
      </Typography>

      <TextField
        fullWidth
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        margin="normal"
      />

    <input type="file" accept="image/*" onChange={handleFileChange} />

     


      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

 export default EditUserProfile;
