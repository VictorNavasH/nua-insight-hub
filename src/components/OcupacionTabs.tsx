
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import OcupacionSemanalAnalisis from './OcupacionSemanalAnalisis';
import OcupacionPorDias from './OcupacionPorDias';
import OcupacionTurnosPieChart from './OcupacionTurnosPieChart';

// Define the data structure for ocupación data
export interface DatosOcupacion {
  fecha: string;
  turno: string;
  comensales: number;
  reservas: number;
}

export interface OcupacionTabsProps {
  datos: DatosOcupacion[];
  aforoMaximo: number;
}

const OcupacionTabs: React.FC<OcupacionTabsProps> = ({ datos, aforoMaximo }) => {
  const [tabActivo, setTabActivo] = useState("semanal");

  // Extract unique turnos from the data
  const turnosActivos = React.useMemo(() => {
    const turnos = new Set<string>();
    datos.forEach(dato => turnos.add(dato.turno));
    return Array.from(turnos);
  }, [datos]);

  // Group data by week for the weekly analysis
  const datosSemanales = React.useMemo(() => {
    // Logic to organize data by weeks
    // For now, we'll just use the original data
    return datos;
  }, [datos]);

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <Tabs defaultValue={tabActivo} onValueChange={setTabActivo}>
          <TabsList className="mb-4">
            <TabsTrigger value="semanal">Vista Semanal</TabsTrigger>
            <TabsTrigger value="dias">Por Días</TabsTrigger>
            <TabsTrigger value="turnos">Por Turnos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="semanal">
            <OcupacionSemanalAnalisis 
              data={datosSemanales} 
              activeTurnos={turnosActivos} 
            />
          </TabsContent>
          
          <TabsContent value="dias">
            <OcupacionPorDias 
              data={datos}
              activeTurnos={turnosActivos}
            />
          </TabsContent>
          
          <TabsContent value="turnos">
            <OcupacionTurnosPieChart 
              data={datos} 
              activeTurnos={turnosActivos}
              maxCapacity={aforoMaximo}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OcupacionTabs;
