import React from "react";
import styled from "styled-components";

//styled-component
const Datafooter = styled.div`
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

export const Footer = () => {
  return (
    <Datafooter className="landing-page-row-col-bot-footer">
      <div className="col-bot-footer-row">
        <div className="col-bot-footer-row-col-top">
          <p>
            Sauti Databank is a non-profit organization working to improve the
            lives of African people trading their goods accross the borders in
            Kenyan, Ugandan, and Rwandan. We are excited to work with
            researchers and government officials alike to improve laws and make
            the lives of traders better.
          </p>
        </div>
        <div className="col-bot-footer-row-col-bot">
          <div className="footer-col-bot-footer-list">
            <span>Privacy Policy</span>
            <span>Terms of Services</span>
          </div>
        </div>
      </div>
    </Datafooter>
  );
};
