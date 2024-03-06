import { useContext, useEffect, useState } from "react";
import { SearchFormContainer } from "./styles";
import { TransactionContext } from "../../../../contexts/TransactionContext";

export function SearchForm() {
  const { transactions, setTransactions } = useContext(TransactionContext);
  const [allTransactions, setAllTransactions] = useState(transactions);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    setAllTransactions(transactions);
  }, [transactions]);

  const handleChangeSearchValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchValue(value);

    if (!value.trim()) {
      setTransactions(allTransactions);
      return;
    }

    const filteredTransactions = allTransactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchValue.toLowerCase())
    );

    setTransactions(filteredTransactions);
    console.log(filteredTransactions);
    console.log(searchValue);
  };

  return (
    <SearchFormContainer>
      <input
        type="text"
        placeholder="Buscar por título"
        value={searchValue}
        onChange={handleChangeSearchValue}
      />
      <button type="submit">Buscar</button>
    </SearchFormContainer>
  );
}
