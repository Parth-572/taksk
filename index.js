const express = require("express");
const appRouter = require("./routes/appRouter");
const errorHandler = require("./middlewares/error-handler");
const cookieParser = require("cookie-parser");

const PORT = 8000;

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());

//routes
app.get("/", (req, res) => {
  return res.status(200).json({ status: "running" });
});

app.use("/", appRouter);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server is started at Port : ${PORT}`);
});
