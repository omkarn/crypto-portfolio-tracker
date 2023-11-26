import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCryptoData = createAsyncThunk("user/fetchCryptoData", () => {
  return axios
    .get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en&x_cg_demo_api_key=CG-1kACbps3G9YfmsebsdvJVbWD"
    )
    .then((response) => response.data.map((crypto) => crypto));
});

const initialState = {
  loading: false,
  cryptoData: [],
  error: "",
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCryptoData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCryptoData.fulfilled, (state, action) => {
      state.loading = false;
      state.cryptoData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchCryptoData.rejected, (state, action) => {
      state.loading = false;
      state.cryptoData = [];
      state.error = action.error.message;
    });
  },
});

export default cryptoSlice.reducer;

export const selectCryptoData = (state) => state.crypto.cryptoData;
