import { HeaderContainer, HeaderContent } from "./styles";
import Logo from "../../assets/logo-dt-money.svg";

import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModal } from "../NewTransactionModal";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={Logo} />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button>Nova Transacao</button>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
