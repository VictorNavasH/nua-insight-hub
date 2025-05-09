
import React from 'react';
import { useBankingData } from '@/hooks/banking/useBankingData';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TotalBalanceCard from '@/components/banking/TotalBalanceCard';
import BankingMetricsCards from '@/components/banking/BankingMetricsCards';
import ExpensesChart from '@/components/banking/ExpensesChart';
import TransactionFilters from '@/components/banking/TransactionFilters';
import TransactionsTable from '@/components/banking/TransactionsTable';
import { Loader2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { accounts, balances, transactions, categories, isLoading, error } = useBankingData();
  
  const [filteredTransactions, setFilteredTransactions] = React.useState(transactions);

  // Update filtered transactions when base transactions change
  React.useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  // Handle filter changes
  const handleFilterChange = (filters: any) => {
    let filtered = [...transactions];
    
    // Apply date filter
    if (filters.dateRange.from) {
      const filterDate = new Date(filters.dateRange.from);
      filtered = filtered.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate >= filterDate;
      });
    }
    
    // Apply account filter
    if (filters.accounts.length > 0) {
      filtered = filtered.filter(t => filters.accounts.includes(t.account_id));
    }
    
    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(t => t.category_id && filters.categories.includes(t.category_id));
    }
    
    // Apply amount filter
    if (filters.amountRange.min !== null) {
      filtered = filtered.filter(t => t.amount >= filters.amountRange.min!);
    }
    if (filters.amountRange.max !== null) {
      filtered = filtered.filter(t => t.amount <= filters.amountRange.max!);
    }
    
    setFilteredTransactions(filtered);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Error</h1>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Financiero</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <TotalBalanceCard 
              accounts={accounts || []} 
              balances={balances || []} 
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <BankingMetricsCards 
              accounts={accounts || []} 
              balances={balances || []} 
              transactions={transactions || []} 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ExpensesChart 
              transactions={filteredTransactions || []} 
              categories={categories || []} 
            />
          </div>
          <div className="space-y-6">
            <TransactionFilters 
              accounts={accounts || []} 
              categories={categories || []} 
              onFilterChange={handleFilterChange} 
            />
            <TransactionsTable 
              transactions={filteredTransactions.slice(0, 5) || []} 
              accounts={accounts || []} 
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
