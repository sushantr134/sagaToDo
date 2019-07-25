const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { GraphQLServer } = require("graphql-yoga");

require("dotenv").config();
const app = express();
const adminRoutes = require("./routes/admin");
const sequelize = require("./utils/database");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

app.use(require("cors")());
app.use(require("helmet")());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "dist")));

app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.sendFile(`index.html`);
});

const PORT = process.env.SERVER_PORT || 8000;

const opts = {
  port: 4000,
  endpoint: "/graphql"
};

const graphqlServer = new GraphQLServer({ typeDefs, resolvers, opts });

graphqlServer
  .start(() => {
    console.log(`GraphQL Server Started at ${opts.port}`);
  })
  .then(() => {
    return sequelize.sync();
  })
  .then(res => {
    //console.log(res);
    app.listen(PORT, err => {
      if (err) throw err;
      console.log(`Express Server Running at ${PORT}`);
    });
  })
  .catch(err => console.log(err));
