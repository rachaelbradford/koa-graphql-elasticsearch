const Koa = require("koa");
const mount = require("koa-mount");
const graphqlHTTP = require("koa-graphql");
const schema = require("./graphql/schema").default;

const app = new Koa();

app.use(
  mount(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      graphiql: true,
      formatError: error => ({
        message: error.message,
        stack: error.stack.split("\n")
      })
    })
  )
);

app.listen(3000);
