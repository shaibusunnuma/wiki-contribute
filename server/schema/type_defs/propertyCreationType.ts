import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql';

export default new GraphQLObjectType({
  name: 'AddProperty',
  description: 'This creates a Wikidata property',
  fields: () => ({
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    anonymous: { type: GraphQLBoolean },
    id: { type: GraphQLString },
    property: { type: GraphQLString },
    value: { type: GraphQLString },
  })
})