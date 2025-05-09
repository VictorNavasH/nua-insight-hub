import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { BankAccount, TransactionCategory } from '@/hooks/banking/useBankingTypes';

interface FilterOptions {
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

interface TransactionFiltersProps {
  accounts: BankAccount[];
  categories: TransactionCategory[];
  onFilterChange: (filters: FilterOptions) => void;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  accounts,
  categories,
  onFilterChange,
}) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minAmount, setMinAmount] = useState<number | null>(null);
  const [maxAmount, setMaxAmount] = useState<number | null>(null);

  const applyFilters = () => {
    const filters: FilterOptions = {
      dateRange: {
        from: date || null,
        to: date || null,
      },
      accounts: selectedAccounts,
      categories: selectedCategories,
      amountRange: {
        min: minAmount,
        max: maxAmount,
      },
    };
    onFilterChange(filters);
  };

  return (
    <Card className="w-full">
      <Card className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
          {/* Date Range Picker */}
          <div className="col-span-1 md:col-span-1">
            <Label htmlFor="date">Fecha:</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={
                    "w-full justify-start text-left font-normal" +
                    (date ? " text-foreground" : " text-muted-foreground")
                  }
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "PPP", { locale: es })
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center" side="bottom">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) =>
                    date > new Date() || date < new Date("2023-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Account Selection */}
          <div className="col-span-1 md:col-span-1">
            <Label htmlFor="account">Cuenta:</Label>
            <Select onValueChange={(value) => setSelectedAccounts([value])}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una cuenta" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category Selection */}
          <div className="col-span-1 md:col-span-1">
            <Label htmlFor="category">Categoría:</Label>
            <Select onValueChange={(value) => setSelectedCategories([value])}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount Range */}
          <div className="col-span-1 md:col-span-1 flex items-end space-x-2">
            <div>
              <Label htmlFor="minAmount">Min:</Label>
              <Input
                type="number"
                id="minAmount"
                className="w-24"
                placeholder="Mínimo"
                onChange={(e) =>
                  setMinAmount(e.target.value ? parseFloat(e.target.value) : null)
                }
              />
            </div>
            <div>
              <Label htmlFor="maxAmount">Max:</Label>
              <Input
                type="number"
                id="maxAmount"
                className="w-24"
                placeholder="Máximo"
                onChange={(e) =>
                  setMaxAmount(e.target.value ? parseFloat(e.target.value) : null)
                }
              />
            </div>
          </div>
        </div>
        <div className="px-4 pb-4">
          <Button onClick={applyFilters}>Aplicar Filtros</Button>
        </div>
      </Card>
    </Card>
  );
};

export default TransactionFilters;
