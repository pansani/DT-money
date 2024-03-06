import { zodResolver } from "@hookform/resolvers/zod";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect, useState } from "react";

import { MagnifyingGlass } from "@phosphor-icons/react";

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
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
    onSearch(data.query);
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
