import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql';

export default new GraphQLObjectType({
  name: 'UpdateProperty',
  description: 'This represents a Wikidata property',
  fields: () => ({
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    id: { type: GraphQLString },
    anonymous: { type: GraphQLBoolean },
    property: { type: GraphQLString },
    oldValue: { type: GraphQLString },
    newValue: { type: GraphQLString },
  })
})