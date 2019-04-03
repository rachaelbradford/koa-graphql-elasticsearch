import elasticsearch from "elasticsearch";
import { graphql, ObjectTypeComposer } from "graphql-compose";
import {
  composeWithElastic,
  elasticApiFieldConfig
} from "graphql-compose-elasticsearch";

const { GraphQLSchema, GraphQLObjectType } = graphql;

// Mapping obtained from ElasticSearch server
// For an existing index, access mappings from
//   GET http://user:pass@localhost:9200/product/_mapping
//   and then get subtree of returned document which contains
//   properties definitions (which looks like following data):
const productMapping = {
  properties: {
    created: {
      type: "date",
      format: "yyyy/MM/dd HH:mm:ss||yyyy/MM/dd"
    },
    description: {
      type: "text"
    },
    discount: {
      type: "integer"
    },
    in_stock: {
      type: "integer"
    },
    is_active: {
      type: "boolean"
    },
    name: {
      type: "text",
      fields: {
        keyword: {
          type: "keyword"
        }
      }
    },
    price: {
      type: "integer"
    },
    sold: {
      type: "long"
    },
    tags: {
      type: "text",
      fields: {
        keyword: {
          type: "keyword"
        }
      }
    }
  }
};

const ProductEsTC = composeWithElastic({
  graphqlTypeName: "ProductES",
  elasticIndex: "product",
  elasticType: "default",
  elasticMapping: productMapping,
  elasticClient: new elasticsearch.Client({
    host: "http://localhost:9200",
    apiVersion: "6.6",
    log: "trace"
  }),
  // elastic mapping does not contain information about which fields are arrays
  // so provide this information explicitly for obtaining correct types in GraphQL
  pluralFields: ["tags"]
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      product: ProductEsTC.getResolver("search").getFieldConfig()
      // productPagination: ProductEsTC.getResolver(
      //   "searchPagination"
      // ).getFieldConfig(),
      // productConnection: ProductEsTC.getResolver(
      //   "searchConnection"
      // ).getFieldConfig()
    }
  })
});

export default schema;
