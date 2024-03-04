import { ArrowCircleUp, CurrencyDollar } from "@phosphor-icons/react";
import { SummaryContainer } from "./styles";

export function Summary() {
  return (
    <SummaryContainer>
      <div>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong>R$1000,00</strong>
      </div>
      <div>
        <header>
          <span>Saidas</span>
          <ArrowCircleUp size={32} color="#f75a68" />
        </header>
        <strong>R$1000,00</strong>
      </div>
      <div className="highlight-background">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong>R$1000,00</strong>
      </div>
    </SummaryContainer>
  );
}
