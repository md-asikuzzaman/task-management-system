import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Search, Check } from "lucide-react";
import { useState } from "react";

const statuses = ["All", "Todo", "In Progress", "Completed"];
const owners = ["All", "Asik", "John", "Sarah"];
const sortOptions = ["Newest", "Oldest", "A-Z", "Z-A"];

const ToolbarWrapper = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [owner, setOwner] = useState("All");
  const [sort, setSort] = useState("Newest");

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      {/* Search */}
      <div className="relative w-full lg:max-w-sm">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
        />

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 w-full rounded-lg border border-neutral-200 bg-neutral-50 pl-10 pr-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Status */}
        <FilterDropdown
          label="Status"
          value={status}
          options={statuses}
          onChange={setStatus}
        />

        {/* Owner */}
        <FilterDropdown
          label="Owner"
          value={owner}
          options={owners}
          onChange={setOwner}
        />

        {/* Sort */}
        <FilterDropdown
          label="Sort"
          value={sort}
          options={sortOptions}
          onChange={setSort}
        />
      </div>
    </div>
  );
};

interface FilterDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const FilterDropdown = ({
  label,
  value,
  options,
  onChange,
}: FilterDropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="flex h-10 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 text-sm font-medium text-neutral-700 outline-none transition hover:bg-neutral-50 focus:ring-2 focus:ring-primary-100"
        >
          <span className="text-neutral-500">{label}:</span>

          <span className="text-neutral-900">{value}</span>

          <ChevronDown size={16} className="text-neutral-400" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={6}
          className="z-50 min-w-44 rounded-lg border border-neutral-200 bg-white p-1 shadow-lg outline-none"
        >
          {options.map((option) => (
            <DropdownMenu.Item
              key={option}
              onSelect={() => onChange(option)}
              className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm text-neutral-700 outline-none transition hover:bg-neutral-100 focus:bg-neutral-100"
            >
              <span>{option}</span>

              {value === option && (
                <Check size={16} className="text-primary-600" />
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ToolbarWrapper;
