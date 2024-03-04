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

  img {
    max-height: 45px;
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
  }
`;
