
import React, { useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, PiggyBank } from "lucide-react";
import { Transaction, BankAccount, Balance } from '@/hooks/banking/useBankingTypes';

interface BankingMetricsCardsProps {
  accounts: BankAccount[];
  balances: Balance[];
  transactions: Transaction[];
}

const BankingMetricsCards: React.FC<BankingMetricsCardsProps> = ({
  accounts,
  balances,
  transactions,
}) => {
  // Calculate total income and expenses for the current month
  const { totalIncome, totalExpenses, savingsRate } = useMemo(() => {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    
    // Filter transactions for current month
    const currentMonthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate >= firstDayOfMonth;
    });
    
    // Calculate income (positive amounts) and expenses (negative amounts)
    const income = currentMonthTransactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
      
    const expenses = currentMonthTransactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    // Calculate savings rate if there's income
    const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;
    
    return {
      totalIncome: income,
      totalExpenses: expenses,
      savingsRate: Math.max(0, savingsRate) // Ensure it's not negative
    };
  }, [transactions]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardContent className="p-4 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">Ingresos</span>
            <ArrowUpRight className="h-3 w-3 text-green-500" />
          </div>
          <div className="text-lg font-bold text-green-500">
            {totalIncome.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">Gastos</span>
            <ArrowDownRight className="h-3 w-3 text-red-500" />
          </div>
          <div className="text-lg font-bold text-red-500">
            {totalExpenses.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardContent className="p-4 flex items-center">
          <PiggyBank className="h-5 w-5 text-primary mr-2" />
          <div>
            <div className="text-xs font-medium text-muted-foreground">Tasa de Ahorro</div>
            <div className="font-bold">{savingsRate.toFixed(1)}%</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BankingMetricsCards;
