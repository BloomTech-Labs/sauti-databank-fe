import styled from "styled-components";
import { device } from "./responsive";

export const AccountPage = styled.div`
  /* most outer div */
  font-family: "Helvetica", sans-serif;
  height: 90vh;

  .page-row {
    height: 90vh;
    display: flex;
    flex-direction: column;

    .page-row-col-top {
      display: flex;
      height: 30%;

      @media ${device.desktopL} {
        height: 35%;
        -webkit-min-device-pixel-ratio: 1;
      }

      .header-container {
        width: 100%;
        padding: 2rem;

        .header-row {
          display: flex;
          height: 100%;
          flex-direction: row;

          .header-row-col {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 33.33%;
            box-sizing: border-box;

            h1 {
              color: #000000;
              letter-spacing: 0.01em;
              line-height: 6vw;
              font-size: 3vw;
              font-weight: bold;

              @media ${device.desktopL} {
                line-height: 4vw;
                -webkit-min-device-pixel-ratio: 1;
              }

              @media ${device.desktopXL} {
                line-height: 5vw;
                -webkit-min-device-pixel-ratio: 1;
              }
            }

            span {
              color: #000000;
              line-height: 2vw;
              font-size: 1.3vw;
              font-weight: normal;

              @media ${device.laptop} {
                /* 1024px - 1600px */
                font-size: 1.2vw;
                -webkit-min-device-pixel-ratio: 1;
              }

              @media ${device.desktopL} {
                /* 2560px - 3115px */
                line-height: 2vw;
                -webkit-min-device-pixel-ratio: 1;
              }

              @media ${device.desktopXL} {
                /* greater than 3115px  */
                line-height: 2vw;
                -webkit-min-device-pixel-ratio: 1;
              }
            }
          }

          .admin {
            width: 100%;
          }
        }
      }
    }

    .page-row-col-bottom {
      display: flex;
      flex-direction: row;
      justify-content: center;
      flex-grow: 1;
      padding: 3%;

      @media ${device.desktopL} {
        padding: 3%;
        -webkit-min-device-pixel-ratio: 1;
      }

      .account-container {
        width: 100%;

        .account-row {
          display: flex;
          height: 100%;
          flex-direction: row;

          @media ${device.laptop} {
            /* 1024px - 1600px */

            height: 95%;
            -webkit-min-device-pixel-ratio: 1;
          }

          .account-row-col {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 33%;
            margin: 1rem;

            @media ${device.laptop} {
              /* 1024px - 1600px */
              width: 23%;
              -webkit-min-device-pixel-ratio: 1;
            }

            .account-type {
              box-sizing: border-box;
              background: #ffffff;
              border: 1px solid rgba(0, 0, 0, 0.3);
              border-radius: 5px;
              height: 100%;
              width: 85%;
              padding: 2rem;

              @media ${device.laptop} {
                /* 1024px - 1600px */
                width: 100%;
                -webkit-min-device-pixel-ratio: 1;
              }

              @media ${device.desktop} {
                /* 1600px - 2560px */
                width: 95%;
                -webkit-min-device-pixel-ratio: 1;
              }

              .account-header {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                margin-left: 1rem;
                height: 20%;
                border-bottom: 1px solid rgba(0, 0, 0, 0.3);

                h2 {
                  font-size: 1.2vw;
                  font-weight: bold;
                }

                h1 {
                  font-size: 2vw;
                  line-height: 2.5vw;
                  font-weight: normal;

                  @media ${device.laptop} {
                    /* 1024px - 1600px */
                    font-size: 1.9vw;
                    -webkit-min-device-pixel-ratio: 1;
                  }
                }
              }
              .account-features {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 50%;

                .account-features-items {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;

                  span {
                    font-size: 1vw;
                    line-height: 2.5vw;
                    font-weight: bold;
                    color: rgba(0, 0, 0, 0.5);
                  }
                }
              }
              .account-bottom {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 30%;
                width: 100%;

                .account-bottom-btn-ctn {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  height: 100%;
                  button {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 2vw;
                    width: 7vw;
                    font-size: 1vw;
                    font-weight: bold;
                    color: #000000;
                    background: #ffffff;
                    border: 2px solid #11736c;
                    box-sizing: border-box;
                    border-radius: 2px;

                    @media ${device.laptop} {
                      /* 1024px - 1600px */
                      height: 2.5vw;
                      width: 7vw;
                      font-size: 1.5rem;
                      -webkit-min-device-pixel-ratio: 1;
                    }

                    &:hover {
                      background-color: #11736c;
                      transition: 0.3s ease;
                      color: #ffffff;
                      cursor: pointer;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const UserAccount = styled.div`
  height: 90vh;
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .container-row {
      display: flex;
      flex-direction: column;
      height: 80%;
      width: 50%;

      .col {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }

      .container-row-col-top {
        height: 20%;

        div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          width: 100%;
        }

        h1 {
          font-weight: bold;
          font-size: 4vw;
        }
        span {
          line-height: 2vw;
          font-size: 1vw;
        }
      }
      .container-row-col-middle {
        height: 60%;

        .account-box {
          padding: 2rem;
          height: 80%;
          width: 100%;
          border: 1px solid rgba(0, 0, 0, 0.3);
          box-sizing: border-box;
          border-radius: 5px;

          .account-box-header {
            border-bottom: 1px solid rgba(0, 0, 0, 0.3);
            h1 {
              font-size: 2vw;
              margin-bottom: 1vw;
            }
          }

          .account-box-features {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            margin-top: 1vw;
            height: 100%;

            span {
              font-weight: bold;
              color: rgba(0, 0, 0, 0.5);
              line-height: 2vw;
              font-size: 1vw;
            }
          }
        }
      }
      .container-row-col-bottom {
        display: flex;
        flex-direction: row;
        height: 20%;

        .cancel {
          margin: 2rem;
          height: 2vw;
          width: 10vw;
          font-weight: bold;
          font-size: 1.3rem;
          color: #ffffff;
          background: #eb5e52;
          border: 2px solid #eb5e52;
          text-decoration: none;
          border-radius: 2px;
          transition: 0.5s ease;
          &:hover {
            color: black;
            cursor: pointer;
            border: 1px solid black;
          }
        }

        .button-return {
          margin: 2rem;
          height: 2vw;
          width: 10vw;
          font-weight: bold;
          font-size: 1.3rem;
          color: black;
          background: #ffffff;
          border: 2px solid black;
          text-decoration: none;
          border-radius: 2px;
          transition: 0.5s ease;
          &:hover {
            color: #eb5e52;
            cursor: pointer;
          }
        }
      }
    }
  }
`;

// <UserAccount>
// <div className="container">
//   <div className="container-row">
//     <div className="container-row-col">
//       <h1>Account Access</h1>
//       <span>Benefits included with your account subscription</span>
//     </div>
//     <div className="container-row-col">
//       <div className="account-box">
//         <div className="account-box-header">
//           <h1>Premium Account</h1>
//         </div>
//         <div className="account-box-features">
//           <span>Download data into an excel file</span>
//           <span>Change Data Filters</span>
//           <span>Cross-Filter Data by Date</span>
//           <span>Additional Filtering Options</span>
//         </div>
//       </div>
//     </div>
//     <div className="container-row-col">
//       <button>Cancel Subscription</button>
//     </div>
//   </div>
// </div>
// </UserAccount>
