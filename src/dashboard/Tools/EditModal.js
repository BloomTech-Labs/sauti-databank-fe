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
                <label for="jobPosition">Job Position</label>
                <br></br>
                <input
                  type="jobPosition"
                  name="jobPosition"
                  id="jobPosition"
                  placeholder={props.data.jobPosition}
                  value={account.jobPosition}
                  onChange={handleChange}
                />
              </h2>
              <h2>
                <label for="Country">Country</label>
                <br></br>
                <input
                  type="text"
                  id="country"
                  placeholder={props.data.country}
                  name="country"
                  value={account.country}
                  onChange={handleChange}
                />
              </h2>
              <h2>
                <label for="Tier">Tier</label>
                <br></br>
                <input
                  type="text"
                  id="tier"
                  placeholder={props.data.tier}
                  name="tier"
                  value={account.tier}
                  onChange={handleChange}
                />
              </h2>

              <h2>
                <label for="interests">Interests</label>
                <br></br>
                <input
                  type="interests"
                  name="interests"
                  id="interests"
                  placeholder={props.data.interests}
                  value={account.interests}
                  onChange={handleChange}
                />
              </h2>
            </div>
            <div className="col2">
              <h2>
                <label for="Government">Government/ NGO/ Researcher</label>
                <br></br>
                <input
                  type="string"
                  name="government"
                  id="government"
                  placeholder={props.data.government}
                  value={account.government}
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
