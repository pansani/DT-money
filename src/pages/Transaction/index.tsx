import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import {
  PriceHighlight,
  TagSimpleIcon,
  TransactionContainer,
  TransactionsTable,
} from "./styles";

import { useEffect, useContext, useState } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";
import { priceFormatter } from "../../utils/formatter";
import { api } from "../../lib/axios";

export function Transactions() {
  const { transactions, setTransactions } = useContext(TransactionContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await api.get("transactions");
        setTransactions(response.data);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    }

    fetchTransactions();
  }, [setTransactions]);

  return (
    <div>
      <Header />
      <Summary />

      <TransactionContainer>
        <h3>Transações</h3>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.description}</td>
                <td className={transaction.type}>
                  <PriceHighlight variant={transaction.type}>
                    {transaction.type === "outcome" && "- "}
                    {priceFormatter.format(transaction.amount)}
                  </PriceHighlight>
                </td>
                <td>
                  {windowWidth <= 720 && <TagSimpleIcon size={22} />}
                  {transaction.category}
                </td>
                <td>{transaction.date.toString()}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionContainer>
    </div>
  );
}
