import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import {
  PriceHighlight,
  TransactionContainer,
  TransactionsTable,
} from "./styles";

import { useEffect, useContext } from "react";
import axios from "axios";
import { TransactionContext } from "../../contexts/TransactionContext";

export function Transactions() {
  const { transactions, setTransactions } = useContext(TransactionContext);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await axios.get("http://localhost:3000/transaçoes");
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
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.description}</td>
                <td className={transaction.type}>
                  <PriceHighlight variant={transaction.type}>
                    R${transaction.amount}
                  </PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionContainer>
    </div>
  );
}
