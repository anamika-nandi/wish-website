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
      companies: {
        Row: {
          country: string | null
          created_at: string
          id: string
          name: string | null
          tagline: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          id?: string
          name?: string | null
          tagline?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          id?: string
          name?: string | null
          tagline?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_country_fkey"
            columns: ["country"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          flag: string
          id: string
          label: string
          lat: string | null
          lng: string | null
          region: string
          value: string
        }
        Insert: {
          flag: string
          id?: string
          label: string
          lat?: string | null
          lng?: string | null
          region: string
          value: string
        }
        Update: {
          flag?: string
          id?: string
          label?: string
          lat?: string | null
          lng?: string | null
          region?: string
          value?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          product_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id: string
          product_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favorites_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      PowerPoint: {
        Row: {
          content: Json[] | null
          createdAt: string
          id: string
          type: string
          user_id: string | null
        }
        Insert: {
          content?: Json[] | null
          createdAt?: string
          id: string
          type: string
          user_id?: string | null
        }
        Update: {
          content?: Json[] | null
          createdAt?: string
          id?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "PowerPoint_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      product_attributes: {
        Row: {
          attribute_name: string
          attribute_value: string
          created_at: string
          id: string
          product_id: string | null
        }
        Insert: {
          attribute_name: string
          attribute_value: string
          created_at?: string
          id?: string
          product_id?: string | null
        }
        Update: {
          attribute_name?: string
          attribute_value?: string
          created_at?: string
          id?: string
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_attributes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: Database["public"]["Enums"]["CategoryTypes"] | null
          company_id: string | null
          country: string | null
          created_at: string
          description: string | null
          id: string
          price: number | null
          quantity: number | null
          sku: string | null
          small_description: string | null
          title: string | null
        }
        Insert: {
          category?: Database["public"]["Enums"]["CategoryTypes"] | null
          company_id?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          id?: string
          price?: number | null
          quantity?: number | null
          sku?: string | null
          small_description?: string | null
          title?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["CategoryTypes"] | null
          company_id?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          id?: string
          price?: number | null
          quantity?: number | null
          sku?: string | null
          small_description?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_country_fkey"
            columns: ["country"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      reservations: {
        Row: {
          created_at: string
          end_date: string
          id: string
          product_id: string | null
          start_date: string
          status: Database["public"]["Enums"]["Status"]
          total_price: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          product_id?: string | null
          start_date: string
          status: Database["public"]["Enums"]["Status"]
          total_price: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          product_id?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["Status"]
          total_price?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rentals_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rentals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          created_at: string
          description: string | null
          helpful_count: number | null
          id: string
          product_id: string | null
          rating: number | null
          response: Json | null
          title: string | null
          unhelpful_count: number | null
          user_id: string | null
          verified_purchase: boolean | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          helpful_count?: number | null
          id?: string
          product_id?: string | null
          rating?: number | null
          response?: Json | null
          title?: string | null
          unhelpful_count?: number | null
          user_id?: string | null
          verified_purchase?: boolean | null
        }
        Update: {
          created_at?: string
          description?: string | null
          helpful_count?: number | null
          id?: string
          product_id?: string | null
          rating?: number | null
          response?: Json | null
          title?: string | null
          unhelpful_count?: number | null
          user_id?: string | null
          verified_purchase?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_owns_companies: {
        Row: {
          company_id: string | null
          created_at: string
          id: string
          permission_role: string | null
          user_id: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          id?: string
          permission_role?: string | null
          user_id?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string
          id?: string
          permission_role?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_own_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_own_companies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          stripe_connected: boolean | null
          stripe_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          stripe_connected?: boolean | null
          stripe_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          stripe_connected?: boolean | null
          stripe_id?: string | null
        }
        Relationships: []
      }
      waitlist: {
        Row: {
          created_at: string
          email: string
          id: string
          interest_type: string | null
          response_data: Json | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          interest_type?: string | null
          response_data?: Json | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          interest_type?: string | null
          response_data?: Json | null
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
      CategoryTypes: "template" | "uikit" | "icon"
      Status: "pending" | "approved" | "declined"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
