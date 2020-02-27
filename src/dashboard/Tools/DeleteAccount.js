import React from "react";

import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "react-loader-spinner";

const DELETE = gql`
  mutation deleteAUser($delete_user: newDeleteUserInput!) {
    deleteUser(input: $delete_user) {
      ... on DatabankUser {
        id
        email
      }
      ... on Error {
        message
      }
    }
  }
`;

const DeleteAccount = props => {
  const [deleteId, deleteUser] = useMutation(DELETE);
  //console.log(props.data)
  const deleteHandler = (event, input) => {
    input = { id: input };
    event.preventDefault();
    deleteId({
      variables: { delete_user: input }
    });
    console.log(input);
    props.params.api.redrawRows();
  };

  if (deleteUser.loading) {
    return (
      <div className="loader-container">
        <Loader
          className="loader"
          type="Oval"
          color="#708090"
          width={100}
          timeout={12000}
        />
      </div>
    );
  }

  if (deleteUser.error) {
    return <p>ERROR!</p>;
  }

  return (
    <span className="btnCon">
      <button
        style={{ height: 20, lineHeight: 0.5 }}
        onClick={e => deleteHandler(e, props.data.id)}
        className="btn btn-info"
      >
        <i class="icon-trash"></i>
      </button>
    </span>
  );
};

export default DeleteAccount;
