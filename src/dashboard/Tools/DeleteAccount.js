import React from "react";

import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "react-loader-spinner";

const Users_Query = gql`
  query UsersQ {
    allUsers: databankUsers {
      id
      email
      interest
      tier
      organization
      job_position
      country
      organization_type
    }
  }
`;

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
  const [deleteId, deleteUser] = useMutation(DELETE, {
    update(cache, { data: { deleteUser } }) {
      const data = cache.readQuery({ query: Users_Query });
      cache.writeQuery({
        query: Users_Query,
        data: {
          allUsers: [
            ...data.allUsers,
            data.allUsers.map(e => {
              if (e.id !== deleteUser.id) {
                return e;
              }
            })
          ]
        }
      });
    }
  });

  const deleteHandler = (event, input) => {
    input = { id: input };
    event.preventDefault();
    deleteId({
      variables: { delete_user: input },
      refetchQueries: [{ query: Users_Query }]
      // update(cache, { data: { deleteUser } }) {
      //   const data = cache.readQuery({ query: Users_Query });
      //   console.log(data);
      //   cache.writeQuery({
      //     query: Users_Query,
      //     data: {
      //       allUsers: [
      //         ...data.allUsers,
      //         data.allUsers.map(e => {
      //           if (e.id !== deleteUser.id) {
      //             return e;
      //           }
      //         })
      //       ]
      //     }
      //   });
      // }
      // update: (store, {data})=> {
      //   const userData = store.readQuery<Users_Query>({
      //     query: Users_Query
      //   })
      //   console.log(userData)
      // }
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
