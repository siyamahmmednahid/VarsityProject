import styled from "styled-components";
import authTopShape from "../../../assets/images/authTopShape.png";
import authBottomShape from "../../../assets/images/authBottomShape.png";

export const Section = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Card = styled.div`
    background: var(--bgColor);
    padding: 30px;
    border-radius: 5px;
    box-shadow: var(--boxShadow);
    width: 400px;
    margin: 0 auto;
    padding: 30px 30px 40px;
    position: relative;

    &::before {
        content: '';
        background-image: url(${authTopShape});
        width: 160px;
        height: 160px;
        background-size: cover;
        position: absolute;
        top: -54px;
        left: -46px;
        z-index: -1;
    }
    &::after {
        content: '';
        background-image: url(${authBottomShape});
        width: 190px;
        height: 190px;
        background-size: cover;
        position: absolute;
        bottom: -54px;
        right: -46px;
        z-index: -1;
    }

    @media (max-width: 767px) {
        max-width: 300px;
        padding: 25px 20px;

        &::before {
            width: 110px;
            height: 110px;
            top: -30px;
            left: -30px;
        }
        ::after {
            width: 140px;
            height: 140px;
            bottom: -30px;
            right: -30px;
        }
    }
`;