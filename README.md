# koa-graphql-elasticsearch

An experimental repo to run koa on node and connect to elasticsearch with graphql.

- `npm install` to install node dependencies
- `npm start` to start the server
- Connects to a locally hosted elasticsearch cluster running on port 9200 (or swap out connection details in `schema.js`)
- Run graphql queries in GraphiQL (connect to localhost:3000/graphql in your browser).
 ```
 {
     product {
        count
        aggregations
        max_score
        took
        timed_out
    }
}
```
- Run graphql queries from a REST client such as Postman providing the request body as raw JSON
```
{
	"query": "{product {count aggregations max_score took timed_out}}"
}
```

Resources used:
- https://medium.freecodecamp.org/how-to-setup-a-powerful-api-with-graphql-koa-and-mongodb-339cfae832a1
- https://github.com/graphql-compose/graphql-compose-elasticsearch
-
