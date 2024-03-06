import styled from "styled-components";

export const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme["gray-900"]};
  padding: 2.5em 0 7.5rem 0;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 1120px;

  margin: 0 auto;

  padding: 0 1.5em;

  @media (max-width: 720px) {
    padding: 0 2.5rem;
  }

  img {
    max-height: 45px;

    @media (max-width: 720px) {
      height: 25px;
    }
  }

  button {
    background-color: ${(props) => props.theme["green-500"]};
    color: ${(props) => props.theme.white};

    padding: 0 1.25em;

    height: 50px;

    border: 0;
    border-radius: 0.25em;

    font-size: 1rem;
    font-weight: 600;

    transition: filter 0.2s;

    cursor: pointer;

    &:hover {
      filter: brightness(0.9);
    }

    @media (max-width: 720px) {
      width: 130px;
      height: 35px;
      font-size: 13px;

      padding: 0;
    }
  }
`;
