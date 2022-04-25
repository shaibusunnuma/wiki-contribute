import { gql } from "@apollo/client";

export const UPDATE_PROPERTY_MUTATION = gql`
  mutation updateProperty(
    $username: String!
    $password: String!
    $id: String!
    $anonymous: Boolean!
    $property: String!
    $oldValue: String!
    $newValue: String!
  ) {
    updateProperty(
      username: $username
      password: $password
      id: $id
      anonymous: $anonymous
      property: $property
      oldValue: $oldValue
      newValue: $newValue
    ) {
      id
    }
  }
`;

export const CREATE_PROPERTY_MUTATION = gql`
  mutation addProperty($username: String!, $password: String!, $id: String!, $anonymous: Boolean!, $property: String!, $value: String!)
  {
    addProperty(username: $username, password: $password, id: $id, anonymous: $anonymous property: $property, value: $value)
    {
      username
      password
      id
      anonymous
      property
      value
    }
  }
`;