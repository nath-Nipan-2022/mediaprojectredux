import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";

export const addUser = createAsyncThunk("users/add", async () => {
  const res = await axios.post("http://localhost:3005/users", {
    name: faker.person.fullName(),
  });
  return res.data;
});
