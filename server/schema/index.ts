import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { addProperty, updateProperty } from '../controllers/propertiesController';
import PropertyUpdateType from './type_defs/propertyUpdateType';
import PropertyCreationType from './type_defs/propertyCreationType';

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        message: {
            type: GraphQLString,
            resolve: () => 'Hello World'
        }
    })
})


const rootMutation = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: () => ({
        editEntity: {
            type: GraphQLString,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
                id: { type: GraphQLString },
                labels: { type: GraphQLString },
                descriptions: { type: GraphQLString },
                aliases: { type: GraphQLList(GraphQLString) },//TODO create types for labels and descriptions and aliases.
            },
            resolve: (root, args) => {
                console.log('Edit entity');
                return args
            }
        },
        addProperty: {
            type: PropertyCreationType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
                id: { type: GraphQLString },
                property: { type: GraphQLString },
                value: { type: GraphQLString },
            },
            resolve: (root, args) => {
                addProperty(args);
            }
        },
        updateProperty: {
            type: PropertyUpdateType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
                id: { type: GraphQLString },
                property: { type: GraphQLString },
                oldValue: { type: GraphQLString },
                newValue: { type: GraphQLString },
            },
            resolve: (root, args) => {
                updateProperty(args);
            }
        },
    })
})

export default new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
})