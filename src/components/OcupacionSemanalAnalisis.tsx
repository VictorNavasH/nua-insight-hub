
import React from 'react';
import { DatosOcupacion } from './OcupacionTabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface OcupacionSemanalAnalisisProps {
  data: DatosOcupacion[];
  activeTurnos: string[];
}

const OcupacionSemanalAnalisis: React.FC<OcupacionSemanalAnalisisProps> = ({ data, activeTurnos }) => {
  // Process data for chart
  const chartData = React.useMemo(() => {
    // Group data by week and calculate totals
    // This is a simplified implementation
    return data.map(item => ({
      fecha: item.fecha,
      [item.turno]: item.comensales,
    }));
  }, [data]);

  // Colors for different turnos
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ocupación Semanal</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Legend />
            {activeTurnos.map((turno, index) => (
              <Bar 
                key={turno} 
                dataKey={turno} 
                stackId="a" 
                fill={colors[index % colors.length]} 
                name={`Turno ${turno}`}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default OcupacionSemanalAnalisis;
