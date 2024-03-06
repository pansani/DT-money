import * as Dialog from "@radix-ui/react-dialog";
import { useForm, SubmitHandler } from "react-hook-form"; // Import react-hook-form

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
import { TransactionContext } from "../../contexts/TransactionContext";

interface NewTransactionData {
  description: string;
  amount: number;
  category: string;
}

export function NewTransactionModal() {
  const { isFormOpen, transactionDate, addTransaction, setFormOpen } =
    useContext(TransactionContext);

  const { register, handleSubmit, reset } = useForm<NewTransactionData>();

  const [transactionType, setTransactionType] = useState("");

  const formattedDate = new Date(transactionDate).toLocaleDateString("pt-BR");

  const handleCreateNewTransaction: SubmitHandler<NewTransactionData> = async (
    data
  ) => {
    const amount = parseFloat(data.amount.toString());

    const transactionData = {
      description: data.description,
      amount: amount,
      category: data.category,
      type: transactionType,
      date: formattedDate,
    };

    console.log(typeof data.amount);

    try {
      const response = await axios.post(
        "http://localhost:3000/transactions",
        transactionData
      );
      console.log("Transação criada com sucesso!");
      console.log(response.data);
      addTransaction(response.data);
    } catch (error) {
      console.error(error);
    }

    reset();

    setFormOpen(false);
  };

  const handleTransactionType = (type: "income" | "outcome") => {
    setTransactionType(type);
  };

  return (
    <>
      {isFormOpen && (
        <Dialog.Portal>
          <Overlay />
          <Content>
            <Dialog.Title>Nova Transação</Dialog.Title>
            <CloseButton>X</CloseButton>
            <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
              <input
                type="text"
                placeholder="Descrição"
                required
                {...register("description")}
              />
              <input
                type="number"
                inputMode="numeric"
                placeholder="Preço"
                required
                {...register("amount")}
              />
              <input
                type="text"
                placeholder="Categoria"
                required
                {...register("category")}
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
          </Content>
        </Dialog.Portal>
      )}
    </>
  );
}
