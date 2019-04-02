// const graphql = require("graphql");

import { GraphQLSchema, GraphQLObjectType } from "graphql";
import elasticsearch from "elasticsearch";
import { elasticApiFieldConfig } from "graphql-compose-elasticsearch";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      elastic66: elasticApiFieldConfig(
        // you may provide existed Elastic Client instance
        new elasticsearch.Client({
          host: "http://localhost:9200",
          apiVersion: "6.6"
        })
      )
      //   // or may provide just config
      //   elastic24: elasticApiFieldConfig({
      //     host: "http://user:pass@localhost:9200",
      //     apiVersion: "2.4"
      //   }),

      //   elastic17: elasticApiFieldConfig({
      //     host: "http://user:pass@localhost:9200",
      //     apiVersion: "1.7"
      //   })
    }
  })
});

module.exports = schema;
