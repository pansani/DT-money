import { TagSimple } from "@phosphor-icons/react";
import styled from "styled-components";

export const TransactionContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;

  @media (max-width: 720px) {
    width: 95%;
    margin: 2rem auto 0;

    color: ${(props) => props.theme["gray-500"]};
  }

  h3 {
    opacity: 0;

    @media (max-width: 720px) {
      opacity: 1;
      font-size: 1.3rem;
      font-weight: 300;
      margin-bottom: 1rem;
    }
  }
`;

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  tr {
    @media (max-width: 720px) {
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;

      border-radius: 5px;
    }
  }

  td {
    background: ${(props) => props.theme["gray-700"]};

    padding: 1.5rem 2rem;
    border: 0;
    border-radius: 0.25rem;

    @media (max-width: 720px) {
      border-radius: 0;

      display: flex;
      align-items: center;
    }

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;

      @media (max-width: 720px) {
        font-size: 20px;
        border-top-right-radius: 6px;
        border-bottom-left-radius: 0;

        color: ${(props) => props.theme["gray-300"]};
      }
    }
    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;

      @media (max-width: 720px) {
        border-bottom-left-radius: 6px;
        border-top-right-radius: 0;
      }
    }

    @media (max-width: 720px) {
      padding: 0.5rem 1rem;
    }
  }
`;

interface PriceHighlightProps {
  variant: "income" | "outcome";
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant === "income"
      ? props.theme["green-300"]
      : props.theme["red-500"]};

  @media (max-width: 720px) {
    font-size: 20px;
  }
`;

export const TagSimpleIcon = styled(TagSimple)`
  display: inline;
  margin-right: 5px;
`;
