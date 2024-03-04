import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import {
  PriceHighlight,
  TransactionContainer,
  TransactionsTable,
} from "./styles";

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />

      <TransactionContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            <tr>
              <td>Desenvolvimento de website</td>
              <td className="deposit">
                <PriceHighlight variant="income">R$ 12.000</PriceHighlight>
              </td>
              <td>Desenvolvimento</td>
              <td>20/02/2021</td>
            </tr>
            <tr>
              <td>Aluguel</td>
              <td className="withdraw">
                <PriceHighlight variant="outcome">- R$ 1.100</PriceHighlight>
              </td>
              <td>Casa</td>
              <td>17/02/2021</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionContainer>
    </div>
  );
}
