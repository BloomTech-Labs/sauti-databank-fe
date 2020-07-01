import styled from "styled-components";
import { device } from "./responsive";

export const LandingPageStyles = styled.div`
  font-family: "Roboto", sans-serif;
  height: calc(100vh - 7rem);

  .landing-page-row {
    height: 100%;

    .combine {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(
          rgba(255, 255, 255, 0.1),
          rgba(255, 255, 255, 0.1)
        ),
        ${props => `url(${props.TopImage})`};
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 20% 20%;
      border-top: 2px solid rgba(0, 0, 0, 0.1);
    }
    .landing-page-row-col-top {
      background: linear-gradient(
        rgba(255, 255, 255, 0.7),
        rgba(255, 255, 255, 0.7)
      );

      .top-col-top {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 33.33%;
        h2 {
          color: #2c2e32;
          font-weight: 400;
          font-size: 2.5rem;

          @media ${device.desktopXL} {
            /* greater than 3115px  */
            font-weight: 400;
            font-size: 4.5rem;
            -webkit-min-device-pixel-ratio: 1;
          }
        }
      }
      .top-col-mid {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 33.33%;

        h1 {
          color: #2c2e32;
          padding: 0.5rem;
          font-weight: 800;
          font-size: 3rem;

          @media ${device.desktopXL} {
            /* greater than 3115px  */
            padding: 0.5rem;
            font-weight: 800;
            font-size: 6rem;
            -webkit-min-device-pixel-ratio: 1;
          }
        }
      }
      .top-col-bot {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 33.33%;
        margin-top: 2%;

        button {
          font-family: Montserrat;
          margin: 2vw;
          height: 3rem;
          width: 18rem;
          font-weight: bold;
          font-size: 1.6rem;
          color: #eb5e52;
          background: linear-gradient(
            rgba(255, 255, 255, 0.6),
            rgba(255, 255, 255, 0.6)
          );
          border: 2px solid #eb5e52;
          text-decoration: none;
          transition: 0.5s ease;
          border-radius: 5px;

          &:hover {
            color: #ffff;
            background: #eb5e52;
            cursor: pointer;
          }

          @media ${device.laptop} {
            /* 1024px - 1600px */
            margin: 2vw;
            height: 3rem;
            width: 18rem;
            font-weight: 800;
            font-size: 1.6rem;
            -webkit-min-device-pixel-ratio: 1;
          }

          @media ${device.desktop} {
            /* 1600px - 2560px */
            margin: 2vw;
            height: 4rem;
            width: 18rem;
            font-weight: 800;
            font-size: 1.6rem;
            -webkit-min-device-pixel-ratio: 1;
          }

          @media ${device.desktopL} {
            /* 2560px - 3115px */
            margin: 2vw;
            height: 4rem;
            width: 19rem;
            font-weight: 800;
            font-size: 1.6rem;
            -webkit-min-device-pixel-ratio: 1;
          }

          @media ${device.desktopXL} {
            /* greater than 3115px  */
            margin: 2vw;
            height: 4rem;
            width: 19rem;
            font-weight: 800;
            font-size: 1.6rem;
            -webkit-min-device-pixel-ratio: 1;
          }
        }

        button:last-child {
          color: #ffffff;
          background: #eb5e52;

          &:hover {
            color: #eb5e52;
            background: linear-gradient(
              rgba(255, 255, 255, 0.6),
              rgba(255, 255, 255, 0.6)
            );
            cursor: pointer;
          }
        }
      }
    }
  }

  .landing-page-row-col-mid {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 80vh;

    .col-bot-image {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 60vw;
      .img-background {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 50vw;
      }
    }
  }

  .landing-page-row-col-bot {
    .row-col-bot-whatwedo {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-top: 2px solid rgba(0, 0, 0, 0.1);
      border-bottom: 2px solid rgba(0, 0, 0, 0.1);
      height: 30rem;

      .bot-col-header {
        padding: 1rem;
        h2 {
          text-transform: uppercase;
          color: #2c2e32;
          font-weight: 400;
          font-size: 3rem;
        }
      }

      .bot-col-disc {
        text-align: center;
        padding: 1rem;
        width: 45vw;
        p {
          line-height: 1.2;
          color: #2c2e32;
          font-weight: 400;
          font-size: 2.5rem;
        }
      }
    }
  }

  .landing-page-row-col-bot-two {
    border-top: 1px solid #2c2e32;
    border-bottom: 1px solid #2c2e32;
    height: 40vh;

    .bot-two-row {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;

      .bot-two-col {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 33.33%;

        .col-header {
          padding: 1rem;
          h2 {
            color: #2c2e32;
            font-weight: 400;
            font-size: 3rem;
          }
        }

        .col-disc {
          padding: 1rem;
          p {
            color: #54575f;
            font-weight: 400;
            font-size: 2rem;
          }
        }

        .col-learn-more {
          padding: 1rem;
          button {
            height: 2vw;
            width: 10vw;
            font-weight: 500;
            font-size: 2rem;
            color: #2c2e32;
            background: transparent;
            border: 2px solid rgba(0, 0, 0, 0.3);
            text-decoration: none;
            border-radius: 2px;
            transition: 0.5s ease;
            &:hover {
              color: black;
              cursor: pointer;
              border: 2px solid #f5af37;
            }
          }
        }
      }
    }
  }

  .landing-page-row-col-bot-footer {
    background: #2c2e32;
    color: #ffffff;
    height: 30rem;
    width: 100%;
    .col-bot-footer-row {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .col-bot-footer-row-col-top {
        display: flex;
        justify-content: center;
        align-items: center;

        height: 50%;
        width: 100%;

        p {
          line-height: 1.5;
          text-align: center;
          width: 50vw;
          font-weight: 400;
          font-size: 1.5rem;
        }
      }

      .col-bot-footer-row-col-bot {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50%;
        width: 100%;

        .footer-col-bot-footer-list {
          height: 100%;
          width: 50vw;
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: center;

          span {
            font-weight: 400;
            font-size: 1.5rem;
          }
        }
      }
    }
  }
`;
