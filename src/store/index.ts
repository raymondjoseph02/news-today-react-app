import { Store } from "@tanstack/react-store";

export const activeTab = new Store("all");
export const updateActiveTab = (active: string) => activeTab.setState(active);

export const search = new Store<string | null>(null);
export const resetSearch = () => search.setState(null);
export const handleSearch = (value: string) => {
  search.setState(value);
};
