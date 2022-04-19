import { gql } from "@apollo/client";

export const UPDATE_PROPERTY_MUTATION = gql`
  mutation updateProperty(
    $username: String!
    $password: String!
    $id: String!
    $property: String!
    $oldValue: String!
    $newValue: String!
  ) {
    updateProperty(
      username: $username
      password: $password
      id: $id
      property: $property
      oldValue: $oldValue
      newValue: $newValue
    ) {
      id
    }
  }
`;

export const CREATE_PROPERTY_MUTATION = gql`
  mutation addProperty($username: String!, $password: String!, $id: String!, $property: String!, $value: String!)
  {
    addProperty(username: $username, password: $password, id: $id, property: $property, value: $value)
    {
      username
      password
      id
      property
      value
    }
  }
`;