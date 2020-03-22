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
              line-height: 8rem;
              font-size: 4vw;
              font-weight: bold;
            }

            span {
              color: #000000;
              line-height: 3.4rem;
              font-size: 1.3vw;
              font-weight: normal;
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

      .account-container {
        width: 100%;

        .account-row {
          display: flex;
          height: 100%;
          flex-direction: row;

          .account-row-col {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 33.33%;
            margin: 1rem;

            .account-type {
              box-sizing: border-box;
              background: #ffffff;
              border: 1px solid rgba(0, 0, 0, 0.3);
              border-radius: 5px;
              height: 100%;
              width: 90%;
              padding: 2rem;
              @media ${device.laptop} {
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
                  font-size: 1.3vw;
                  line-height: 2rem;
                  font-weight: bold;
                }

                h1 {
                  font-size: 2vw;
                  line-height: 2rem;
                  font-weight: normal;
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
                    font-size: 1.4vw;
                    line-height: 5rem;
                    font-weight: bold;
                    color: rgba(0, 0, 0, 0.5);
                  }
                }
              }
              .account-bottom {
                text-align: center;
                height: 30%;

                .account-bottom-btn-ctn {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  height: 100%;
                  button {
                    height: 4rem;
                    width: 12rem;
                    font-size: 1.5rem;
                    line-height: 1rem;
                    font-weight: bold;
                    color: #000000;
                    background: #ffffff;
                    border: 2px solid #11736c;
                    box-sizing: border-box;
                    border-radius: 2px;

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
