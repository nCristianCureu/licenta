const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("Connected to DB")
);

//Import routes
const authRoute = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const playersRoutes = require("./routes/playersRoutes");
const newsRoutes = require("./routes/newsRoutes");
const newsLikesRoutes = require("./routes/newsLikesRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const stripeRoutes = require("./routes/stripe");
const matchRoutes = require("./routes/Tickets/matchRoutes");
const ticketRoutes = require("./routes/Tickets/ticketRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

//Middlewares
app.use(express.json());
app.use(cors());

//Route Middlewares
//Everything that is in authRoute will have /api/user before it
app.use("/api/user", authRoute);
app.use("/api/users", userRoutes);
app.use("/api", playersRoutes);
app.use("/api", newsRoutes);
app.use("/api/news-likes", newsLikesRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", stripeRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/tickets", ticketRoutes);
app.use(notFound);
app.use(errorHandler);

// Server listening on port 3001
app.listen(3001, () => {
  console.log("Server Up");
});
