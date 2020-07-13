const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})



const postRouter = require('./routes/post');
app.use('/postPage', postRouter);

const profileDetailsRouter = require('./routes/profileDetails');
app.use('/ProfileDetails', profileDetailsRouter);

const profileRefsRouter = require('./routes/profileRefs');
app.use('/profileRefs', profileRefsRouter);

const aboutRouter = require('./routes/about');
app.use('/aboutDetails', aboutRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});