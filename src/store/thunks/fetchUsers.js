import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const res = await axios.get("http://localhost:3005/users");
  // DEV ONLY!!!
  const pause = await pauseFor(1000);
  return res.data;
});

// DEV ONLY!!!
async function pauseFor(duration) {
  return new Promise((res) => setTimeout(res, duration));
}
