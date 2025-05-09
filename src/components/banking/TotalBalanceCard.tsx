
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { BankAccount, Balance } from '@/hooks/banking/useBankingTypes';

interface TotalBalanceCardProps {
  accounts: BankAccount[];
  balances: Balance[];
}

const TotalBalanceCard: React.FC<TotalBalanceCardProps> = ({ accounts, balances }) => {
  const totalBalance = useMemo(() => {
    return balances.reduce((total, balance) => total + (balance.balance_amount || 0), 0);
  }, [balances]);

  // Calculate change - for demo we'll use a hardcoded value
  // In a real app, this would compare to previous period
  const change = 2.5; // positive change of 2.5%

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">Balance Total</CardTitle>
        <div className={`flex items-center ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
          <span className="text-xs font-medium">{change}%</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {totalBalance.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {accounts.length} {accounts.length === 1 ? 'cuenta' : 'cuentas'} conectadas
        </p>
      </CardContent>
    </Card>
  );
};

export default TotalBalanceCard;
