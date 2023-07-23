import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  //   handle input chnage
  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const { data } = await axios.post("/api/v1/user/register", {
        username: input.name,
        email: input.email,
        password: input.password,
      });
      if (data.success) {
        alert("user Register Successfully");
      }
      console.log(data, "data---------");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          margin="auto"
          marginTop={3}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign="center"
          >
            Register
          </Typography>
          <TextField
            value={input.name}
            placeholder="name"
            name="name"
            margin="normal"
            type="text"
            onChange={handleChange}
            required
          />
          <TextField
            value={input.email}
            placeholder="email"
            name="email"
            margin="normal"
            type="email"
            onChange={handleChange}
            required
          />
          <TextField
            value={input.password}
            placeholder="password"
            name="password"
            margin="normal"
            type="password"
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/login")}
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Already register please login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
