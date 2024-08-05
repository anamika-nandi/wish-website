"use server";

import { supabaseAdmin } from "@/utils/supabase/admin";
import { FieldValues } from "react-hook-form";

const supabase = supabaseAdmin();

export const insertWaitlistEmail = async (email: string): Promise<any> => {
  const emailExists = await checkEmailExists(email);
  if (emailExists) {
    return { error: "Email already exists" };
  }
  const { data, error } = await supabase.from("waitlist").insert([{ email }]);

  if (error) {
    console.error("Error inserting email to waitlist:", error);
    return { error: "Error inserting email to waitlist" };
  }
  return data;
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from("waitlist")
    .select("email")
    .eq("email", email);

  if (error) {
    console.error("Error checking email:", error);
    return false;
  }
  return data.length > 0;
};

export const getWaitlistEmails = async (): Promise<any> => {
  const { data, error } = await supabase.from("waitlist").select("*");

  if (error) {
    console.error("Error getting waitlist emails:", error);
    return { error: "Error getting waitlist emails" };
  }
  return data;
};

const removeEmptyFields = (data: FieldValues) => {
  return Object.entries(data).reduce(
    (acc: { [key: string]: any }, [key, value]) => {
      if (
        value !== "" &&
        value !== null &&
        (!Array.isArray(value) || value.length > 0)
      ) {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );
};

export const createInterestSignup = async (
  data: FieldValues,
  interest_type: string
): Promise<any> => {
  const { email, ...responseData } = data;
  const filteredResponseData = removeEmptyFields(responseData);

  const { data: datav, error } = await supabase.from("waitlist").insert([
    {
      email: data.email,
      response_data: filteredResponseData,
      interest_type: interest_type,
    },
  ]);

  if (error) {
    console.error("Error inserting signup:", error);
    return { error: "Error inserting signup" };
  }
  return datav;
};
