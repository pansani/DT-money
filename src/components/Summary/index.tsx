import { ArrowCircleUp, CurrencyDollar } from "@phosphor-icons/react";
import { SummaryContainer } from "./styles";
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";

export function Summary() {
  const {
    transactionAmountIncome,
    transactionAmountOutcome,
    transactionAmountTotal,
  } = useContext(TransactionContext);

  const [variant, setVariant] = useState<"income" | "outcome">("income");

  useEffect(() => {
    if (transactionAmountTotal < 0) {
      setVariant("outcome");
    } else {
      setVariant("income");
    }
  }, [transactionAmountTotal]);

  return (
    <SummaryContainer variant={variant}>
      <div>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong>R${transactionAmountIncome}</strong>
      </div>
      <div>
        <header>
          <span>Saidas</span>
          <ArrowCircleUp size={32} color="#f75a68" />
        </header>
        <strong>R${transactionAmountOutcome}</strong>
      </div>
      <div className="highlight-background">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong>R${transactionAmountTotal}</strong>
      </div>
    </SummaryContainer>
  );
}
