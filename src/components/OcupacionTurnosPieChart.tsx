
import React from 'react';
import { DatosOcupacion } from './OcupacionTabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface OcupacionTurnosPieChartProps {
  data: DatosOcupacion[];
  activeTurnos: string[];
  maxCapacity: number;
}

const OcupacionTurnosPieChart: React.FC<OcupacionTurnosPieChartProps> = ({ 
  data, 
  activeTurnos,
  maxCapacity
}) => {
  // Process data for pie chart
  const chartData = React.useMemo(() => {
    const turnoTotals: Record<string, number> = {};
    
    // Calculate total for each turno
    activeTurnos.forEach(turno => {
      const total = data
        .filter(item => item.turno === turno)
        .reduce((sum, item) => sum + item.comensales, 0);
      
      turnoTotals[turno] = total;
    });
    
    // Convert to array for chart
    return Object.entries(turnoTotals).map(([name, value]) => ({
      name: `Turno ${name}`,
      value
    }));
  }, [data, activeTurnos]);

  // Colors for the pie segments
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribución por Turnos</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default OcupacionTurnosPieChart;
