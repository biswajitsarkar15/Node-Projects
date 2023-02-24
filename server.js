const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser')

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser())
app.set('view engine', 'ejs')
app.set('views','views')

const dbDriver =
  'mongodb+srv://biswajitsarkar100:sarkar9932147924@cluster0.gm6vjwv.mongodb.net/CrudLogReg'

const jwtAuth =require('./middleware/adminJwt')
app.use(jwtAuth.authJwt)

const adminRouter = require("./routes/admin.routes");

app.use(adminRouter);

const port = process.env.PORT || 2030;

mongoose
  .connect(dbDriver, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    app.listen(port, () => {
      console.log(`Db is connected`);
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
