import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const cors = require('cors');

app.use(cors({
    origin: 'https://uynvu078.github.io',
    credentials: true,
}));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);