import { HeaderContainer, HeaderContent } from "./styles";
import Logo from "../../assets/logo-dt-money.svg";

import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModal } from "../NewTransactionModal";
import { useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";

export function Header() {
  const { setFormOpen } = useContext(TransactionContext);

  const handleOpenForm = () => {
    setFormOpen(true);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={Logo} />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button onClick={handleOpenForm}>Nova Transacao</button>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
