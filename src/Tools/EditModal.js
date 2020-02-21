import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex"
  }
}));

//button on AccountGrid
const EditModal = props => {
  const [account, setAccount] = useState([]);

  //account id added automatically, needed to .put
  account.id = props.data.id;

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleChange = event => {
    setAccount({ ...account, [event.target.name]: event.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.editAccount(account);
    setOpen(false);
    props.api.api.redrawRows();
  };

  return (
    <>
      <span className="btnCon">
        <button
          style={{ height: 20, lineHeight: 0.5 }}
          onClick={e => handleOpen(e, props.data)}
          className="btn btn-info"
        >
          Edit
        </button>
      </span>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className="col1">
              <h2>
                <label for="Id">Id</label>
                <br></br>
                <input
                  type="text"
                  id="id"
                  placeholder={props.data.id}
                  name={props.data.id}
                  value={account.id}
                  onChange={handleChange}
                />
              </h2>
              <h2>
                <label for="Organization">Organization</label>
                <br></br>
                <input
                  type="text"
                  id="organization"
                  placeholder={props.data.organization}
                  name="organization"
                  value={account.last_name}
                  onChange={handleChange}
                />
              </h2>
              <h2>
                <label for="First Name">First Name</label>
                <br></br>
                <input
                  type="text"
                  id="first_name"
                  placeholder={props.data.first_name}
                  name="first_name"
                  value={account.first_name}
                  onChange={handleChange}
                />
              </h2>

              <h2>
                <label for="Last Name">Last Name</label>
                <br></br>
                <input
                  type="text"
                  id="last_name"
                  placeholder={props.data.last_name}
                  name="last_name"
                  value={account.last_name}
                  onChange={handleChange}
                />
              </h2>
              <h2>
                <label for="Email">Email</label>
                <br></br>
                <input
                  type="email"
                  name="email"
                  id="Email"
                  placeholder={props.data.email}
                  value={account.email}
                  onChange={handleChange}
                />
              </h2>
            </div>
            <div className="col2">
              <h2>
                <label for="mobile number">Mobile Number</label>
                <br></br>
                <input
                  type="string"
                  name="mobile_number"
                  id="mobile_number"
                  placeholder={props.data.mobile_number}
                  value={account.mobile_number}
                  onChange={handleChange}
                />
              </h2>
              <br></br>

              <h2></h2>
              <br></br>
              <footer>
                <button variant="secondary" onClick={handleClose}>
                  Close
                </button>
                <button variant="primary" onClick={handleSubmit}>
                  Save Changes
                </button>
              </footer>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default EditModal;
