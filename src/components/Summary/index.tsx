import { ArrowCircleUp, CurrencyDollar } from "@phosphor-icons/react";
import { SummaryContainer } from "./styles";
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";
import { priceFormatter } from "../../utils/formatter";

export function Summary() {
  const { transactions } = useContext(TransactionContext);

  const [variant, setVariant] = useState<"income" | "outcome">("income");

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.outcome += transaction.amount;
        acc.total -= transaction.amount;
      }

      return acc;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    }
  );

  useEffect(() => {
    if (summary.total >= 0) {
      setVariant("income");
    } else {
      setVariant("outcome");
    }
  }, [transactions]);

  return (
    <SummaryContainer variant={variant}>
      <div>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong>{priceFormatter.format(summary.income)}</strong>
      </div>
      <div>
        <header>
          <span>Saidas</span>
          <ArrowCircleUp size={32} color="#f75a68" />
        </header>
        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </div>
      <div className="highlight-background">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong>{priceFormatter.format(summary.total)}</strong>
      </div>
    </SummaryContainer>
  );
}
