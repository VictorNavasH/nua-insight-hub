
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Transaction, TransactionCategory } from '@/hooks/banking/useBankingTypes';

interface ExpensesChartProps {
  transactions: Transaction[];
  categories?: TransactionCategory[];
}

const ExpensesChart: React.FC<ExpensesChartProps> = ({ transactions, categories = [] }) => {
  // Calculate expenses by category
  const expensesByCategory = useMemo(() => {
    // Create a map to track total expenses by category
    const categoryMap = new Map<string, number>();
    
    // Only process expense transactions (amount < 0)
    transactions
      .filter(t => t.amount < 0)
      .forEach(transaction => {
        const categoryId = transaction.category_id || 'uncategorized';
        const currentAmount = categoryMap.get(categoryId) || 0;
        categoryMap.set(categoryId, currentAmount + Math.abs(transaction.amount));
      });
    
    // Convert map to array for chart display
    return Array.from(categoryMap.entries()).map(([categoryId, amount]) => {
      const category = categories.find(c => c.id === categoryId);
      return {
        id: categoryId,
        name: category ? category.name : 'Sin categorizar',
        value: amount,
        color: category?.color || '#CBD5E1' // Default color for uncategorized
      };
    }).sort((a, b) => b.value - a.value);
  }, [transactions, categories]);

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#83A6ED', '#8DD1E1', '#A4DE6C'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gastos por Categoría</CardTitle>
      </CardHeader>
      <CardContent>
        {expensesByCategory.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expensesByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {expensesByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}`, 'Total']}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-gray-500">No hay datos de gastos disponibles</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpensesChart;
