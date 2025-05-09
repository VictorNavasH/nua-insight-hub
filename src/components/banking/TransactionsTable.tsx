
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Transaction, BankAccount } from '@/hooks/banking/useBankingTypes';

interface TransactionsTableProps {
  transactions: Transaction[];
  accounts: BankAccount[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, accounts }) => {
  // Helper function to get account name by ID
  const getAccountName = (accountId: string): string => {
    const account = accounts.find(acc => acc.id === accountId);
    return account?.name || 'Desconocido';
  };

  return (
    <div className="mt-4 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Cuenta</TableHead>
            <TableHead className="text-right">Importe</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map(transaction => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString('es-ES')}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{getAccountName(transaction.account_id)}</TableCell>
                <TableCell className={`text-right ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                No hay transacciones para mostrar
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsTable;
