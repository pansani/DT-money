import { zodResolver } from "@hookform/resolvers/zod";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../../../contexts/TransactionContext";
import { MagnifyingGlass } from "@phosphor-icons/react";

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const { fetchTransactions } = useContext(TransactionContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Buscar por título"
        {...register("query")}
      />
      <button type="submit" disabled={isSubmitting}>
        {windowWidth <= 720 && <MagnifyingGlass />}
        <span>Buscar</span>
      </button>
    </SearchFormContainer>
  );
}
