import { poppins } from "@/app/fonts";
import { ChangeEvent } from "react";

const SearchInput = ({
  handleSearch,
}: {
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <section className="w-full flex justify-center relative my-12 sm:p-0 px-4">
      <div className="relative">
        <i className="absolute top-[20px] left-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-4 h-4"
            fill="white"
          >
            <path d="M368 208A160 160 0 1 0 48 208a160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z" />
          </svg>
        </i>
      </div>
      <input
        type="search"
        className={`rounded-xl bg-primary border-white border-2 p-4 w-full max-w-[450px] text-white outline-none ${poppins.className} placeholder:font-normal pl-10`}
        placeholder="Search by category, artist or title..."
        onChange={handleSearch}
      />
    </section>
  );
};

export default SearchInput;
