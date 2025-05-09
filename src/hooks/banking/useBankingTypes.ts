
export interface Transaction {
  id: string;
  account_id: string;
  amount: number;
  date: string;
  description: string;
  category_id?: string;
  payee?: string;
}

export interface TransactionCategory {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export interface BankAccount {
  id: string;
  name: string;
  institution?: string;
  account_number?: string;
  type?: string;
}

export interface Balance {
  account_id: string;
  balance_amount: number;
  balance_currency: string;
  balance_type: string;
}

export interface BankAnalysisState {
  accounts: BankAccount[];
  balances: Balance[];
  transactions: Transaction[];
  categories: TransactionCategory[];
  error?: string | null;
}

export interface FilterOptions {
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  accounts: string[];
  categories: string[];
  amountRange: {
    min: number | null;
    max: number | null;
  };
}

export interface UseBankingDataResult extends BankAnalysisState {
  refreshData: () => Promise<void>;
  isLoading: boolean;
}
