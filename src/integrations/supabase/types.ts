export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      account_balances: {
        Row: {
          account_id: string
          balance_amount: number | null
          balance_currency: string | null
          balance_type: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          account_id: string
          balance_amount?: number | null
          balance_currency?: string | null
          balance_type?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          account_id?: string
          balance_amount?: number | null
          balance_currency?: string | null
          balance_type?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      account_details: {
        Row: {
          account_id: string
          bic: string | null
          data: Json | null
          iban: string | null
          id: string
          name: string | null
          owner_name: string | null
          updated_at: string | null
        }
        Insert: {
          account_id: string
          bic?: string | null
          data?: Json | null
          iban?: string | null
          id: string
          name?: string | null
          owner_name?: string | null
          updated_at?: string | null
        }
        Update: {
          account_id?: string
          bic?: string | null
          data?: Json | null
          iban?: string | null
          id?: string
          name?: string | null
          owner_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      account_transactions: {
        Row: {
          account_id: string
          amount: number | null
          booking_date: string | null
          currency: string | null
          data: Json | null
          description: string | null
          id: string
          updated_at: string | null
          value_date: string | null
        }
        Insert: {
          account_id: string
          amount?: number | null
          booking_date?: string | null
          currency?: string | null
          data?: Json | null
          description?: string | null
          id: string
          updated_at?: string | null
          value_date?: string | null
        }
        Update: {
          account_id?: string
          amount?: number | null
          booking_date?: string | null
          currency?: string | null
          data?: Json | null
          description?: string | null
          id?: string
          updated_at?: string | null
          value_date?: string | null
        }
        Relationships: []
      }
      agreements: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          institution_id: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id: string
          institution_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          institution_id?: string
        }
        Relationships: []
      }
      bank_accounts: {
        Row: {
          account_name: string
          account_number: string
          created_at: string
          id: number
          institution: string
        }
        Insert: {
          account_name: string
          account_number: string
          created_at?: string
          id?: number
          institution: string
        }
        Update: {
          account_name?: string
          account_number?: string
          created_at?: string
          id?: number
          institution?: string
        }
        Relationships: []
      }
      "estructura costes ideal": {
        Row: {
          id: number
          nombre: string
          pct_max: number | null
          pct_min: number
        }
        Insert: {
          id?: number
          nombre: string
          pct_max?: number | null
          pct_min: number
        }
        Update: {
          id?: number
          nombre?: string
          pct_max?: number | null
          pct_min?: number
        }
        Relationships: []
      }
      formulario_reservas: {
        Row: {
          comensales: number
          created_at: string | null
          fecha: string
          id: number
          reservas: number
          turno: string
        }
        Insert: {
          comensales: number
          created_at?: string | null
          fecha: string
          id?: number
          reservas: number
          turno: string
        }
        Update: {
          comensales?: number
          created_at?: string | null
          fecha?: string
          id?: number
          reservas?: number
          turno?: string
        }
        Relationships: []
      }
      requisitions: {
        Row: {
          agreement_id: string
          created_at: string | null
          id: string
          institution_id: string
          link: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          agreement_id: string
          created_at?: string | null
          id: string
          institution_id: string
          link?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          agreement_id?: string
          created_at?: string | null
          id?: string
          institution_id?: string
          link?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews_google: {
        Row: {
          comment: string | null
          created_at: string
          id: number
          metadata: Json | null
          rating: number
          review_date: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: number
          metadata?: Json | null
          rating: number
          review_date: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: number
          metadata?: Json | null
          rating?: number
          review_date?: string
        }
        Relationships: []
      }
      reviews_zoho: {
        Row: {
          comment: string | null
          created_at: string
          id: number
          metadata: Json | null
          rating: number
          review_date: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: number
          metadata?: Json | null
          rating: number
          review_date: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: number
          metadata?: Json | null
          rating?: number
          review_date?: string
        }
        Relationships: []
      }
      tickets_cerrados: {
        Row: {
          created_at: string
          id: string
          order_id: string
          origen: string
          raw_order: Json
          table_number: string
          total_amount: number
          turno: string
        }
        Insert: {
          created_at: string
          id?: string
          order_id: string
          origen: string
          raw_order: Json
          table_number: string
          total_amount: number
          turno: string
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          origen?: string
          raw_order?: Json
          table_number?: string
          total_amount?: number
          turno?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
