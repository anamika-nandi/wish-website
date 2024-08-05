import { supabaseAdmin } from "@/utils/supabase/admin";

export async function getProductImages(productId: string) {
  const supabase = supabaseAdmin();

  const { data: files, error: storageError } = await supabase.storage
    .from("products")
    .list(`${productId}/`, { limit: 100, offset: 0 });

  if (storageError) {
    console.error("Error at: getting product image from storage", storageError);
    throw storageError;
  }

  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;
  const imageUrls = files.map(
    (file) => `${baseUrl}/products/${productId}/${file.name}`
  );

  return imageUrls;
}

export async function getCompanyImages(companyId: string) {
  const supabase = supabaseAdmin();

  const { data: files, error: storageError } = await supabase.storage
    .from("companies")
    .list(`${companyId}/`, { limit: 100, offset: 0 });

  if (storageError) {
    console.error(
      "Error at: getting Company images from storage",
      storageError
    );
    throw storageError;
  }

  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;

  const bannerFile = files.find((file) => file.name.startsWith("banner"));
  const logoFile = files.find((file) => file.name.startsWith("logo"));

  const banner = bannerFile
    ? `${baseUrl}/companies/${companyId}/${bannerFile.name}`
    : "";
  const logo = logoFile
    ? `${baseUrl}/companies/${companyId}/${logoFile.name}`
    : "";

  const images = files.map(
    (file) => `${baseUrl}/companies/${companyId}/${file.name}`
  );

  return {
    banner,
    logo,
    images,
  };
}
