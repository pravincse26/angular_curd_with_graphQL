import { gql } from 'apollo-angular';

const GET_TODOS = gql`
  query {
    tasks {
      id
      title
      description
    }
  }
`;

const ADD_TODO = gql`
  mutation createTask($title: String!, $description: String!) {
    createTask(title: $title, description: $description) {
      title
      description
    }
  }
`;

const DELETE_TODO = gql`
  mutation deleteTask($id: Int!) {
    deleteTask(id: $id)
  }
`;

export { GET_TODOS, ADD_TODO, DELETE_TODO };
