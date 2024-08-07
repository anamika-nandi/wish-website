-- Set up basic PostgreSQL configuration
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Create necessary extensions
CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";
CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

-- Set ownership and default settings
ALTER SCHEMA "public" OWNER TO "postgres";
SET default_tablespace = '';
SET default_table_access_method = "heap";

-- Create tables
CREATE TABLE IF NOT EXISTS "public"."Content" (
    "id" "text" NOT NULL,
    "content" "jsonb"[],
    "type" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "user_id" "uuid"
);

CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "email" "text",
    "full_name" "text",
    "stripe_id" "text",
    "stripe_connected" boolean DEFAULT false
);

CREATE TABLE IF NOT EXISTS "public"."waitlist" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "email" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "interest_type" "text" NOT NULL
);

-- Set table ownership
ALTER TABLE "public"."Content" OWNER TO "postgres";
ALTER TABLE "public"."users" OWNER TO "postgres";
ALTER TABLE "public"."waitlist" OWNER TO "postgres";

-- Add primary keys and foreign keys
ALTER TABLE ONLY "public"."Content"
    ADD CONSTRAINT "Content_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."waitlist"
    ADD CONSTRAINT "waitlist_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."Content"
    ADD CONSTRAINT "Content_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");

-- Create policies
CREATE POLICY "Enable all for users based on user_id" ON "public"."Content" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));
CREATE POLICY "Enable read access for all users" ON "public"."Content" FOR SELECT USING (true);

ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."waitlist" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable delete for users based on user_id" ON "public"."users" AS PERMISSIVE FOR DELETE TO public USING ((( SELECT auth.uid() AS uid) = id));
CREATE POLICY "Enable read access based on user_id" ON "public"."users" AS PERMISSIVE FOR SELECT TO public USING ((( SELECT auth.uid() AS uid) = id));
CREATE POLICY "Enable update for users based on user_id" ON "public"."users" AS PERMISSIVE FOR UPDATE TO public USING ((( SELECT auth.uid() AS uid) = id));

-- Set up realtime publication
ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

-- Create function to handle new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.users (id, full_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name', NEW.email);
  RETURN NEW;
END;
$function$
;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Reset all settings
RESET ALL;