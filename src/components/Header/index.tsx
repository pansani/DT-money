import { HeaderContainer, HeaderContent } from "./styles";
import Logo from "../../assets/logo-dt-money.svg";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={Logo} />
        <button>Nova Transacao</button>
      </HeaderContent>
    </HeaderContainer>
  );
}
