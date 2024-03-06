import styled from "styled-components";

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 3rem;
    border-radius: 0.25rem;
    border: 0;
    background: ${(props) => props.theme["gray-900"]};
    color: ${(props) => props.theme["gray-300"]};

    &::placeholder {
      color: ${(props) => props.theme["gray-500"]};
    }
  }

  button {
    padding: 0 2rem;
    height: 3rem;
    background: ${(props) => props.theme["green-500"]};
    color: ${(props) => props.theme["gray-100"]};
    border: 0;
    border-radius: 0.25rem;
    font-size: 1rem;
    font-weight: bold;
    transition: filter 0.2s;
    cursor: pointer;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      filter: brightness(0.9);
    }
  }
`;
