import { MergeDeep } from "type-fest";
import { Database as DatabaseGenerated } from "./supabase_generated";
import { SupabaseClient } from "@supabase/supabase-js";

// Override the type for a specific column in a view:
export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Tables: {
        apartment_costs: {
          Row: {
            // make them optional
            id?: number;
            created_at?: string;
          };
        };
      };
    };
  }
>;
export type TypedSupabaseClient = SupabaseClient<Database>;

// Ads
export type Products = Database["public"]["Tables"]["products"]["Row"];
export type Reservation = Database["public"]["Tables"]["reservations"]["Row"];
export type Company = Database["public"]["Tables"]["companies"]["Row"];
export type User = Database["public"]["Tables"]["users"]["Row"];
export type Owner = Database["public"]["Tables"]["user_owns_companies"]["Row"];
export type ProductAttributes =
  Database["public"]["Tables"]["product_attributes"]["Row"];
export type ProductDetailsPage = Products & {
  images: string[];
  reservations: Reservation[];
  attributes: ProductAttributes[];
};

export type CompanyWithImages = Company & {
  images?: string[];
  // all images
  banner: string;
  logo: string;
};

export type CompanyWithLocation = Company & {
  location: string;
};
export type ProductWithImages = Products & {
  images: string[];
};
