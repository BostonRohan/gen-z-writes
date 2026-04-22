import { poppins } from "@/app/fonts";
import { Search } from "lucide-react";
import { ChangeEvent } from "react";

const SearchInput = ({
  handleSearch,
}: {
  // eslint-disable-next-line no-unused-vars
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <section className="w-full flex justify-center relative my-12 sm:p-0 px-4">
      <div className="relative w-full max-w-md">
        <Search className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-ink-muted" />
        <input
          type="search"
          className={`rounded-xl bg-paper-cream border-ink/20 border-2 p-4 w-full text-ink placeholder:text-ink-muted outline-none focus:border-brandPrimary focus:ring-2 focus:ring-brandPrimary/20 transition-all ${poppins.className} placeholder:font-normal pl-12 shadow-sm`}
          placeholder="Search by category, author or title..."
          onChange={(e) => handleSearch(e)}
        />
      </div>
    </section>
  );
};

export default SearchInput;
