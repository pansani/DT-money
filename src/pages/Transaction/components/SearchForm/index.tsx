import { SearchFormContainer } from "./styles";

export function SearchForm() {
  return (
    <SearchFormContainer>
      <input type="text" placeholder="Buscar por título" />
      <button type="submit">Buscar</button>
    </SearchFormContainer>
  );
}
