
import { useState, useEffect } from 'react';
import { UseBankingDataResult, Transaction, BankAccount, TransactionCategory, Balance } from './useBankingTypes';
import { supabase } from '@/lib/supabase';

export const useBankingData = (): UseBankingDataResult => {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [balances, setBalances] = useState<Balance[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all banking data
  const fetchBankingData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch accounts
      const { data: accountsData, error: accountsError } = await supabase
        .from('bank_accounts')
        .select('*');
      
      if (accountsError) throw new Error(`Error fetching accounts: ${accountsError.message}`);
      
      // Map accounts to the required format
      const formattedAccounts: BankAccount[] = (accountsData || []).map(account => ({
        id: account.id.toString(),
        name: account.account_name,
        institution: account.institution,
        account_number: account.account_number,
        type: 'checking' // Default type
      }));
      
      setAccounts(formattedAccounts);
      
      // Fetch balances
      const { data: balancesData, error: balancesError } = await supabase
        .from('account_balances')
        .select('*');
      
      if (balancesError) throw new Error(`Error fetching balances: ${balancesError.message}`);
      
      // Map balances to the required format
      const formattedBalances: Balance[] = (balancesData || []).map(balance => ({
        account_id: balance.account_id.toString(),
        balance_amount: balance.balance_amount,
        balance_currency: balance.balance_currency || 'EUR',
        balance_type: balance.balance_type || 'available'
      }));
      
      setBalances(formattedBalances);
      
      // Fetch transactions
      const { data: transactionsData, error: transactionsError } = await supabase
        .from('account_transactions')
        .select('*')
        .order('booking_date', { ascending: false });
      
      if (transactionsError) throw new Error(`Error fetching transactions: ${transactionsError.message}`);
      
      // Map transactions to the required format
      const formattedTransactions: Transaction[] = (transactionsData || []).map(transaction => ({
        id: transaction.id,
        account_id: transaction.account_id,
        amount: transaction.amount,
        date: transaction.booking_date,
        description: transaction.description || '',
        category_id: transaction.data?.category_id,
        payee: transaction.data?.payee
      }));
      
      setTransactions(formattedTransactions);
      
      // Create some sample categories
      // In a real app, these would come from the database
      setCategories([
        { id: 'food', name: 'Alimentación', color: '#FF6B6B' },
        { id: 'transport', name: 'Transporte', color: '#4ECDC4' },
        { id: 'housing', name: 'Vivienda', color: '#FFD166' },
        { id: 'entertainment', name: 'Ocio', color: '#6A0572' },
        { id: 'utilities', name: 'Servicios', color: '#1A535C' },
        { id: 'health', name: 'Salud', color: '#FF9F1C' },
      ]);
      
    } catch (err) {
      console.error('Error fetching banking data:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido al cargar los datos');
    } finally {
      setIsLoading(false);
    }
  };

  // Subscribe to real-time updates for transactions
  useEffect(() => {
    fetchBankingData();

    // Set up real-time subscriptions
    const accountsSubscription = supabase
      .channel('public:bank_accounts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bank_accounts' }, (payload) => {
        console.log('Bank accounts updated:', payload);
        fetchBankingData();
      })
      .subscribe();

    const transactionsSubscription = supabase
      .channel('public:account_transactions')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'account_transactions' }, (payload) => {
        console.log('Transactions updated:', payload);
        fetchBankingData();
      })
      .subscribe();

    const balancesSubscription = supabase
      .channel('public:account_balances')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'account_balances' }, (payload) => {
        console.log('Balances updated:', payload);
        fetchBankingData();
      })
      .subscribe();

    // Cleanup subscriptions
    return () => {
      supabase.removeChannel(accountsSubscription);
      supabase.removeChannel(transactionsSubscription);
      supabase.removeChannel(balancesSubscription);
    };
  }, []);

  return {
    accounts,
    balances,
    transactions,
    categories,
    isLoading,
    error,
    refreshData: fetchBankingData
  };
};
