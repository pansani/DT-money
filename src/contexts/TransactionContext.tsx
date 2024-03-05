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
  transactionAmountTotal: number;
  transactionAmountIncome: number;
  transactionAmountOutcome: number;
  setTransactionDate: React.Dispatch<React.SetStateAction<Date>>;
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addTransaction: (transaction: Transaction) => void;
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  calculateTotal: (type: "income" | "outcome") => void;
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
  const [transactionAmountIncome, setTransactionAmountIncome] = useState(0);
  const [transactionAmountOutcome, setTransactionAmountOutcome] = useState(0);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, transaction]);
  };

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await axios.get("http://localhost:3000/transacoes");
        setTransactions(response.data);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    }

    fetchTransactions();
  }, [setTransactions]);

  useEffect(() => {
    calculateTotalIncome("income");
    calculateTotalOutcome("outcome");
  }, [transactions]);

  const calculateTotalIncome = (type: "income" | "outcome") => {
    const total = transactions.reduce((acc, transaction) => {
      if (transaction.type === type) {
        return acc + transaction.amount;
      }
      return acc;
    }, 0);
    setTransactionAmountIncome(total);
  };

  const calculateTotalOutcome = (type: "income" | "outcome") => {
    const total = transactions.reduce((acc, transaction) => {
      if (transaction.type === type) {
        return acc + transaction.amount;
      }
      return acc;
    }, 0);
    setTransactionAmountOutcome(total);
  };

  const total = transactionAmountIncome - transactionAmountOutcome;

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        isFormOpen,
        transactionDate,
        transactionAmountTotal: total,
        transactionAmountIncome,
        transactionAmountOutcome,
        setTransactionDate,
        addTransaction,
        setTransactions,
        setFormOpen,
        calculateTotal: (type) => {
          calculateTotalIncome(type);
          calculateTotalOutcome(type);
        },
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
