import { createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

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
  fetchTransactions: (query?: string) => Promise<void>;
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

  async function fetchTransactions(query?: string) {
    const response = await api.get("transactions");
    let filteredTransactions = response.data;

    if (query) {
      query = query.toLowerCase();
      filteredTransactions = filteredTransactions.filter(
        (transaction: {
          description: { toLowerCase: () => (string | undefined)[] };
        }) => transaction.description.toLowerCase().includes(query)
      );
    }

    setTransactions(filteredTransactions);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

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
        fetchTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
