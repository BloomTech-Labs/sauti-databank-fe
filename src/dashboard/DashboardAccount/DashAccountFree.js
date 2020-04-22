import React from "react";
import { AccountPage } from "../styledComponents/DashAccount";
import MonthlyButton from "../../Components/Paypal/MonthlyButton";
import BiAnnuallyButton from "../../Components/Paypal/BiannuallyButton";
import YearlyButton from "../../Components/Paypal/YearlyButton";
import UndrawOptionsSVG from "../Images/undrawOptionsSVG";
import UndrawInvestmentSVG from "../Images/undrawInvestmentSVG";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { getToken, decodeToken, getSubscription } from "../auth/Auth";
import EditAccount from "./EditAccount";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

// This components purpose is to potentially turn free users into paid users, capture the subscription ID, and push them to /data
// Making this component more responsive by implementing Material UI cards.

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
  }
});

const DashAccountFree = props => {
  const classes = useStyles();
  const token = getToken();
  const history = useHistory();

  const tokenId = decodeToken(token);

  let tier;
  if (token) {
    tier = decodeToken(token);
    console.log(`token info:`, tier);
    tier = tier.tier;
  }
  let userEmail;
  if (token) {
    userEmail = decodeToken(token);
    userEmail = userEmail.email;
  }
  const newSub = getSubscription();
  let sub;
  if (newSub) {
    sub = newSub;
  }

  const handleSubmit = async (e, input) => {
    e.preventDefault();
    history.push("/data");
  };

  const GET_SUBSCRIPTION_ID = gql`
    query($userEmail: String!) {
      databankUser(input: { email: $userEmail }) {
        id
        email
        subscription_id
        p_next_billing_time
        paypal_plan
      }
    }
  `;

  const { loading: fetching, error: err, data, refetch } = useQuery(
    GET_SUBSCRIPTION_ID,
    {
      variables: { userEmail: userEmail }
    }
  );

  if (fetching) {
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

  if (err) {
    return <h1>ERROR!</h1>;
  }

  return (
    <AccountPage>
      <div className="page-row">
        <div className="page-row-col-top">
          <div className="header-container">
            <div className="header-row">
              <div className="header-row-col">
                <UndrawOptionsSVG />
              </div>
              <div className="account-page-header">
                <h1>Need more data?</h1>
                <div className="account-descript">
                  <p>
                    We know how important data filtering is to your research.
                  </p>
                  <p>Upgrade to our paid plan to access all material.</p>
                </div>
              </div>

              <div className="header-row-col">
                <UndrawInvestmentSVG />
              </div>
              <EditAccount data={tokenId} />
            </div>
          </div>
        </div>
        <div className="page-row-col-bottom">
          <div className="account-container">
            <div className="account-row">
              <div className="account-row-col">
                <div className="account-type">
                  <div className="card-shadow1">
                    <Card className={classes.root}>
                      <CardContent>
                        <Typography
                          className={classes.subtitle1}
                          variant="h3"
                          component="h3"
                          gutterBottom
                        >
                          Free Account
                        </Typography>
                        <div className="free-border">
                          <Typography
                            className={classes.title}
                            variant="h1"
                            component="h3"
                          >
                            Free
                          </Typography>
                        </div>
                        <div className="free-perk1">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Can Create an Account
                          </Typography>
                        </div>
                        <div className="free-perk2">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Access Base App
                          </Typography>
                        </div>
                        <div className="free-perk3">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Change Data Filters
                          </Typography>
                        </div>
                      </CardContent>
                      <CardActions>
                        <div className="account-bottom">
                          <div className="account-bottom-btn-ctn">
                            <button type="submit" onClick={handleSubmit}>
                              Continue
                            </button>
                          </div>
                        </div>
                      </CardActions>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="account-row-col">
                <div className="account-type">
                  <div className="card-shadow2">
                    <Card className={classes.root}>
                      <CardContent>
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
                            $10/monthly
                          </Typography>
                        </div>
                        <div className="free-perk1">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Download data into an excel file
                          </Typography>
                        </div>
                        <div className="free-perk2">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Change Data Filters
                          </Typography>
                        </div>
                        <div className="free-perk3">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Cross-Filter Data by Date
                          </Typography>
                        </div>
                        <div className="free-perk3">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Additional Filtering Options
                          </Typography>
                        </div>
                      </CardContent>
                      <CardActions>
                        <div className="account-bottom">
                          <MonthlyButton />
                        </div>
                      </CardActions>
                    </Card>
                  </div>
                </div>
              </div>
              <div className="account-row-col">
                <div className="account-type">
                  <div className="card-shadow3">
                    <Card className={classes.root}>
                      <CardContent>
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
                            $49.99/bi-annually
                          </Typography>
                        </div>
                        <div className="free-perk1">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Download data into an excel file
                          </Typography>
                        </div>
                        <div className="free-perk2">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Change Data Filters
                          </Typography>
                        </div>
                        <div className="free-perk3">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Cross-Filter Data by Date
                          </Typography>
                        </div>
                        <div className="free-perk3">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Additional Filtering Options
                          </Typography>
                        </div>
                      </CardContent>
                      <CardActions>
                        <div className="account-bottom">
                          <BiAnnuallyButton />
                        </div>
                      </CardActions>
                    </Card>
                  </div>
                </div>
              </div>
              <div className="account-row-col">
                <div className="account-type">
                  <div className="card-shadow4">
                    <Card className={classes.root}>
                      <CardContent>
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
                            $89.99/yearly
                          </Typography>
                        </div>
                        <div className="free-perk1">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Download data into an excel file
                          </Typography>
                        </div>
                        <div className="free-perk2">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Change Data Filters
                          </Typography>
                        </div>
                        <div className="free-perk3">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Cross-Filter Data by Date
                          </Typography>
                        </div>
                        <div className="free-perk3">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Additional Filtering Options
                          </Typography>
                        </div>
                      </CardContent>
                      <CardActions>
                        <div className="account-bottom">
                          <YearlyButton />
                        </div>
                      </CardActions>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AccountPage>
  );
};

export default DashAccountFree;
