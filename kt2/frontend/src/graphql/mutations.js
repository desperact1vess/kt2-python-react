import { gql } from "@apollo/client";

export const ADD_TASK = gql`
  mutation AddTask($input: TaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      isCompleted
      category {
        name
        color
      }
    }
  }
`;

export const MARK_DONE = gql`
  mutation MarkDone($id: ID!) {
    completeTask(id: $id) {
      id
      isCompleted
    }
  }
`;
