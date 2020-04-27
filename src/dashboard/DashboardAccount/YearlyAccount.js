import React from "react";
import { useHistory } from "react-router-dom";
import { UserAccount, DivProps } from "../styledComponents/DashAccount";
import { getToken, decodeToken } from "../auth/Auth";
import EditAccount from "./EditAccount";

//Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

//Material UI card styling
const useStyles = makeStyles({
  root: {
    minWidth: 340,
    minHeight: 500
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: "3rem",
    fontWeight: 400,
    letterSpacing: "1px"
  },
  subtitle1: {
    fontSize: "2.2rem",
    fontWeight: 600
  },
  pos: {
    marginBottom: 12,
    fontSize: "2.2rem",
    fontWeight: 600
  },
  pos1: {
    fontSize: "1.5rem",
    fontWeight: 500,
    lineHeight: "2"
  }
});

const YearlyAccount = props => {
  const classes = useStyles();
  const history = useHistory();
  const token = getToken();

  const tokenId = decodeToken(token);

  let data;
  if (props.data) {
    data = props.data;
  }

  const handleSubscriptionCancellation = props.handleSubscriptionCancellation;

  const handleReturn = e => {
    e.preventDefault();
    history.push("/data");
  };

  return (
    <UserAccount>
      <div className="container">
        <div className="container-row">
          <div className="container-row-col-top-col">
            <div>
              <h1>Account Access</h1>
            </div>
          </div>
          <div className="container-row-col-middle col">
            <div className="account-box">
              <div className="account-box-header">
                <Card className={classes.root}>
                  <CardContent>
                    <div className="edit-btn">
                      <EditAccount data={tokenId} />
                    </div>

                    <Typography
                      className={classes.subtitle1}
                      variant="h3"
                      component="h3"
                      gutterBottom
                    >
                      Premium Account
                    </Typography>

                    <div className="free-border">
                      <Typography
                        className={classes.title}
                        variant="h1"
                        component="h3"
                      >
                        {data.databankUser.paypal_plan || props.planName}
                      </Typography>
                      <Typography
                        className={classes.pos1}
                        variant="h6"
                        component="h6"
                        gutterBottom
                      >
                        Benefits included with your account subscription
                      </Typography>
                    </div>
                    <div className="free-perk1">
                      <Typography className={classes.pos} color="textSecondary">
                        Download data into an excel file
                      </Typography>
                    </div>
                    <div className="free-perk2">
                      <Typography className={classes.pos} color="textSecondary">
                        Change Data Filters
                      </Typography>
                    </div>
                    <div className="free-perk3">
                      <Typography className={classes.pos} color="textSecondary">
                        Cross-Filter Data by Date
                      </Typography>
                    </div>
                    <div className="free-perk4">
                      <Typography className={classes.pos} color="textSecondary">
                        Additional Filtering Options
                      </Typography>
                    </div>
                  </CardContent>
                  <CardActions>
                    <div className="container-row-col-bottom-col">
                      <DivProps props={props}>
                        <div>
                          {data && data.databankUser.p_next_billing_time ? (
                            <span>
                              Your subscription will expire on{" "}
                              {new Date(
                                parseInt(data.databankUser.p_next_billing_time)
                              ).toDateString()}
                            </span>
                          ) : (
                            <button
                              className="cancel"
                              onClick={handleSubscriptionCancellation}
                            >
                              Cancel Subscription
                            </button>
                          )}
                        </div>
                        <button
                          className="button-return"
                          onClick={handleReturn}
                        >
                          Return to Data
                        </button>
                      </DivProps>
                    </div>
                  </CardActions>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserAccount>
  );
};

export default YearlyAccount;
