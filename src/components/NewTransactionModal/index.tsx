import * as Dialog from "@radix-ui/react-dialog";
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from "./styles";
import { ArrowCircleDown, ArrowCircleUp } from "@phosphor-icons/react";
import { useContext, useState } from "react";
import axios from "axios";
import {} from "../../pages/Transaction";
import { TransactionContext } from "../../contexts/TransactionContext";

export function NewTransactionModal() {
  const { addTransaction } = useContext(TransactionContext);

  const [isFormOpen, setIsFormOpen] = useState(true);

  const [transactionDescription, setTransactionDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionCategory, setTransactionCategory] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [transactionDate, setTransactionDate] = useState(new Date());

  const handleTransactionDate = (date: Date) => {
    setTransactionDate(date);
  };

  const handleCreateNewTransaction = async (event: React.FormEvent) => {
    handleTransactionDate;
    event.preventDefault();

    const data = {
      description: transactionDescription,
      amount: transactionAmount,
      category: transactionCategory,
      type: transactionType,
      date: transactionDate,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/transaçoes",
        data
      );
      console.log("Transação criada com sucesso!");
      console.log(response.data);
      addTransaction(response.data);
      setIsFormOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTransactionType = (type: "income" | "outcome") => {
    setTransactionType(type);
  };

  const handleTransactionDescription = (description: string) => {
    setTransactionDescription(description);
  };

  const handleTransactionAmount = (amount: number) => {
    setTransactionAmount(amount);
  };

  const handleTransactionCategory = (category: string) => {
    setTransactionCategory(category);
  };

  return (
    <>
      {isFormOpen && (
        <Dialog.Portal>
          <Overlay />
          <Content>
            <Dialog.Title>Nova Transação</Dialog.Title>
            <CloseButton>X</CloseButton>(
            <form onSubmit={handleCreateNewTransaction}>
              <input
                type="text"
                placeholder="Descrição"
                required
                value={transactionDescription}
                onChange={(event) =>
                  handleTransactionDescription(event.target.value)
                }
              />
              <input
                type="number"
                placeholder="Preço"
                required
                value={transactionAmount}
                onChange={(event) =>
                  handleTransactionAmount(Number(event.target.value))
                }
              />
              <input
                type="text"
                placeholder="Categoria"
                required
                value={transactionCategory}
                onChange={(event) =>
                  handleTransactionCategory(event.target.value)
                }
              />

              <TransactionType>
                <TransactionTypeButton
                  variant="income"
                  value="income"
                  onClick={() => handleTransactionType("income")}
                >
                  <ArrowCircleUp size={22} />
                  Entrada
                </TransactionTypeButton>
                <TransactionTypeButton
                  variant="outcome"
                  value="outcome"
                  onClick={() => handleTransactionType("outcome")}
                >
                  <ArrowCircleDown size={22} />
                  Saida
                </TransactionTypeButton>
              </TransactionType>

              <button type="submit">Cadastrar</button>
            </form>
            )
          </Content>
        </Dialog.Portal>
      )}{" "}
    </>
  );
}
