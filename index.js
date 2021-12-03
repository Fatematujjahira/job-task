const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fez92.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("interview-task");
    const userInformationCollection = database.collection("user-information");

    //--------------- create a document to insert------------------------//

    app.post("/userInformation", async (req, res) => {
      const register = req.body;
      console.log(register);
      const result = await userInformationCollection.insertOne(register);
      res.json(result);
    });
    app.get("/moreInformation", async (req, res) => {
      const user = await userInformationCollection.find({}).toArray();
      res.json(user);
    });
  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running my task server");
});
app.listen(port, () => {
  console.log("running my task server and amy First interview task", port);
});
