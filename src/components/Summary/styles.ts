import styled from "styled-components";

interface PriceHighlightProps {
  variant: "income" | "outcome";
}

export const SummaryContainer = styled.section<PriceHighlightProps>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  width: 100%;
  max-width: 1120px;

  margin: 0 auto;

  padding: 0 1.5em;

  margin-top: -5rem;

  div {
    background-color: ${(props) => props.theme["gray-600"]};
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      color: ${(props) => props.theme["gray-300"]};
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;
    }

    &.highlight-background {
      background-color: ${(props) =>
        props.variant === "income"
          ? props.theme["green-300"]
          : props.theme["red-500"]};

      color: ${(props) => props.theme.white};

      span {
        color: ${(props) => props.theme.white};
      }
    }
  }
`;
