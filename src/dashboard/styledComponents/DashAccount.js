import styled from "styled-components";
import { device } from "./responsive";

export const AccountPage = styled.div`
  /* most outer div */
  font-family: "Helvetica", sans-serif;
  height: calc(100vh - 7rem);

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

      @media ${device.tablet} {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        padding: 3%;
        -webkit-min-device-pixel-ratio: 1;
      }

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

          @media ${device.tablet} {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            -webkit-min-device-pixel-ratio: 1;
          }

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

            @media ${device.tablet} {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 50vmin;
              margin: 1rem;
              -webkit-min-device-pixel-ratio: 1;
            }

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

              @media ${device.tablet} {
                height: 40rem;
                -webkit-min-device-pixel-ratio: 1;
              }

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
                  justify-content: space-evenly;
                  height: 100%;
                  width: 100%;

                  span {
                    font-size: 1.1vw;
                    font-weight: bold;
                    color: rgba(0, 0, 0, 0.5);

                    @media ${device.tablet} {
                      font-size: 1.5vw;
                      -webkit-min-device-pixel-ratio: 1;
                    }
                  }
                }
              }

              .admin-features {
                height: 80%;
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
  height: calc(100vh - 7rem);

  :root {
    font-size: 16px;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .container-row {
      display: flex;
      flex-direction: column;
      height: 80%;
      width: 60vmin;
      padding: 3em;

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
        height: 100%;

        .account-box {
          display: flex;
          flex-direction: column;
          padding: 2rem;
          height: 95%;
          width: 100%;
          border: 1px solid rgba(0, 0, 0, 0.3);
          box-sizing: border-box;
          border-radius: 5px;

          .account-box-header {
            line-height: 5rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.3);
            h1 {
              font-size: 5em;
              margin-bottom: 0.5em;
            }

            span {
              font-size: 2.5em;
            }
          }

          .account-box-features {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            margin-top: 1vw;

            .account-box-features-list {
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              height: 100%;
              width: 100%;

              span {
                font-weight: bold;
                color: rgba(0, 0, 0, 0.5);
                font-size: 1.5vw;
              }
            }
          }
        }
      }

      .container-row-col-bottom {
        display: flex;
        flex-direction: column;
        height: 20%;

        span {
          font-size: 1.3vw;
        }

        .cancel {
          margin: 2rem;
          height: 3rem;
          width: 18rem;
          font-weight: bold;
          font-size: 1.5rem;
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

          @media ${device.laptop} {
            /* 1024px - 1600px */
            height: 4rem;
            width: 18rem;
            -webkit-min-device-pixel-ratio: 1;
          }

          @media ${device.desktop} {
            /* 1600px - 2560px */
            height: 4rem;
            width: 18rem;
            -webkit-min-device-pixel-ratio: 1;
          }

          @media ${device.desktopL} {
            /* 2560px - 3115px */
            font-size: 1.7rem;
            height: 4.5rem;

            width: 19rem;
            -webkit-min-device-pixel-ratio: 1;
          }

          @media ${device.desktopXL} {
            /* greater than 3115px  */
            height: 5rem;
            width: 18rem;
            -webkit-min-device-pixel-ratio: 1;
          }
        }

        .button-return {
          margin: 2rem;
          height: 3rem;
          width: 15rem;
          font-weight: bold;
          font-size: 1.5rem;
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

          @media ${device.laptop} {
            /* 1024px - 1600px */
            height: 4rem;
            width: 15rem;
            -webkit-min-device-pixel-ratio: 1;
          }

          @media ${device.desktop} {
            /* 1600px - 2560px */
            height: 4rem;
            width: 15rem;
            -webkit-min-device-pixel-ratio: 1;
          }

          @media ${device.desktopL} {
            /* 2560px - 3115px */
            font-size: 1.7rem;
            height: 4.5rem;
            width: 15rem;
            -webkit-min-device-pixel-ratio: 1;
          }

          @media ${device.desktopXL} {
            /* greater than 3115px  */
            font-size: 1.7rem;
            height: 5rem;
            width: 15rem;
            -webkit-min-device-pixel-ratio: 1;
          }
        }
      }
    }
  }
`;

export const DivProps = styled.div`
  display: ${props =>
    props.props.data && props.props.data.databankUser.p_next_billing_time
      ? "flex"
      : "flex"};
  flex-direction: ${props =>
    props.props.data && props.props.data.databankUser.p_next_billing_time
      ? "column"
      : "row"};
  justify-content: ${props =>
    props.props.data && props.props.data.databankUser.p_next_billing_time
      ? "center"
      : "center"};
  align-items: ${props =>
    props.props.data && props.props.data.databankUser.p_next_billing_time
      ? "center"
      : "center"};
`;

export const PasswordReset = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: white;
  box-sizing: border-box;

  .container {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 40rem;
    width: 45rem;
    padding: 1rem;
    border: 1px solid lightgrey;

    .container-header {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-direction: column;
      height: 20%;

      h1 {
        font-size: 3rem;
      }

      h2 {
        font-size: 2rem;
      }
    }

    .container-stepper {
      display: flex;
      flex-grow: 1;
    }
  }
`;

export const ResetPasswordCodeStyles = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  .code-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;

    .code-container-header {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      height: 20%;

      h1 {
        text-transform: uppercase;
        font-size: 2rem;
        font-weight: 500;
      }
    }
    .code-container-number-container {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      flex-grow: 1;

      input {
        width: 5rem;
        height: 9rem;
        font-size: 8rem;
        padding: 1rem;
        border: 0;
        outline: 0;
        background: transparent;
        border-bottom: 2px solid #ddd;

        &[placeholder]:focus::-webkit-input-placeholder {
          transition: opacity 0.5s 0s ease;
          opacity: 0;
        }
      }
    }
  }
`;
