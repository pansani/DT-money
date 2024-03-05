import { useContext, useEffect, useState } from "react";
import { SearchFormContainer } from "./styles";
import axios from "axios";
import { TransactionContext } from "../../../../contexts/TransactionContext";

export function SearchForm() {
  const { setTransactions } = useContext(TransactionContext);

  const [searchValue, setSearchValue] = useState("");

  const handleChangeSearchValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(event.target.value);
  };

  //Fix this useEffect to fetch transactions with the searchValue

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await axios.get(
          `http://localhost:3000/transactions?description_like=${searchValue}`
        );
        setTransactions(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }
    fetchTransactions();
    console.log(searchValue);
  }, [searchValue]);

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
