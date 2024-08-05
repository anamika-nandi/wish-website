import { getUser } from "@/app/actions";

import { createImageUpload } from "novel/plugins";
import { toast } from "sonner";

const onUpload = (file: File, userId: string) => {
  const encodedFileName = encodeURIComponent(file.name);

  const promise = fetch("/api/upload", {
    method: "POST",
    headers: {
      "x-user-id": userId,
      "x-filename": encodedFileName,
      "content-type": file.type,
    },
    body: file,
  });

  return new Promise((resolve, reject) => {
    toast.promise(
      promise.then(async (res) => {
        // Check if upload was successful
        if (res.status === 200) {
          try {
            const { url } = (await res.json()) as {
              url: any;
            };
            const baseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/`;
            const imageUrl = `${baseUrl}/${url.fullPath}`;

            const image = new Image();

            image.src = imageUrl;

            image.onload = () => {
              resolve(url);
            };
            image.onerror = (error) => {
              console.error("Error preloading image:", error);
              reject(error);
            };
          } catch (error) {
            console.error("Error parsing JSON response:", error);
            reject(error);
          }
        } else if (res.status === 401) {
          // Handle unauthorized error
          throw new Error(
            "`BLOB_READ_WRITE_TOKEN` environment variable not found."
          );
        } else {
          // Handle other HTTP errors
          throw new Error(`Error uploading image. Status: ${res.status}`);
        }
      }),
      {
        loading: "Uploading image...",
        success: "Image uploaded successfully.",
        error: (e) => {
          console.error("Error uploading image:", e);
          reject(e);
          return e.message;
        },
      }
    );
  });
};

export const uploadFn = createImageUpload({
  onUpload: async (file: File) => {
    const data = await getUser();
    if (!data) {
      console.log("User not found.");
      return;
    }
    return await onUpload(file, data.id);
  },
  validateFn: (file: File) => {
    if (!file.type.includes("image/")) {
      toast.error("File type not supported.");
      return false;
    } else if (file.size / 1024 / 1024 > 20) {
      toast.error("File size too big (max 20MB).");
      return false;
    }
    return true;
  },
});
