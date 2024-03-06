import axios from "axios";
import { createContext, useEffect, useState } from "react";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  amount: number;
  category: string;
  date: Date;
}

interface TransactionContextType {
  transactions: Transaction[];
  isFormOpen: boolean;
  transactionDate: Date;
  setTransactionDate: React.Dispatch<React.SetStateAction<Date>>;
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addTransaction: (transaction: Transaction) => void;
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

export const TransactionContext = createContext({} as TransactionContextType);

export function TransactionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isFormOpen, setFormOpen] = useState(true);
  const [transactionDate, setTransactionDate] = useState(new Date());

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, transaction]);
  };

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await axios.get("http://localhost:3000/transactions");
        setTransactions(response.data);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    }

    fetchTransactions();
  }, [setTransactions]);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        isFormOpen,
        transactionDate,
        setTransactionDate,
        addTransaction,
        setTransactions,
        setFormOpen,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
