"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FileDropzone from "@/components/FileDropzone";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { client } from "@/sanity/client";

const formSchema = z.object({
  first_name: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  publication: z.string().url({
    message: "Invalid URL format.",
  }),
});

export default function SubmitVideoForm() {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      publication: "",
    },
  });

  async function onSubmit(formValues: z.infer<typeof formSchema>) {
    try {
      if (file === null) {
        setFileError("Please upload a file.");
      }

      setLoading(true);

      const formData = new FormData();

      formData.append("file", file!);

      const newFileName = `${formValues.first_name}-${formValues.last_name}-${Date.now()}`;

      const preSignedURLResponse = await fetch("/api/r2/signed-url", {
        method: "POST",
        body: JSON.stringify({ fileName: newFileName, type: "upload" }),
      });

      if (!preSignedURLResponse.ok) {
        throw new Error("Failed to upload file");
      }

      const { url } = await preSignedURLResponse.json();

      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: file!,
        headers: {
          "Content-Type": file!.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file");
      }

      const downloadPreSignedURLResponse = await fetch("/api/r2/signed-url", {
        method: "POST",
        body: JSON.stringify({ fileName: newFileName, type: "download" }),
      });

      if (!downloadPreSignedURLResponse.ok) {
        throw new Error("Failed to retrieve download link");
      }

      const { url: downloadURL } = await downloadPreSignedURLResponse.json();

      const videoResponse = await fetch("/api/upload/author-video", {
        method: "POST",
        body: JSON.stringify({
          title: `${formValues.first_name} ${formValues.last_name}`,
          videoDownloadUrl: downloadURL,
        }),
      });

      if (videoResponse.ok) {
        //TODO: send notification
      }

      //TODO: send notification of error

      setLoading(false);

      //TODO: send uploaded file to sanity
    } catch (error) {
      //TODO:sentry
      console.error(error);
    }
  }

  return !loading ? (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="flex sm:flex-row flex-col sm:gap-4 gap-8 w-full">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="publication"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publication</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Link to any published work of yours (doesn’t have to be a novel){" "}
                so we know you&apos;re legit.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FileDropzone
          fileError={fileError}
          setFileError={setFileError}
          setFile={setFile}
          file={file}
        />
        <div className="flex items-center">
          <Button className="w-full  mx-auto" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  ) : (
    <div className="flex flex-col gap-8">
      <div className="w-full h-10 rounded-md bg-slate-300 animate-pulse" />
      <div className="w-full h-10 rounded-md bg-slate-300 animate-pulse" />
      <div className="w-full h-10 rounded-md bg-slate-300 animate-pulse" />
      <div className="w-full h-24 rounded-md bg-slate-300 animate-pulse" />
      <div className="w-full h-10 bg-primary rounded-md text-black flex items-center justify-center">
        Submitting...
      </div>
    </div>
  );
}
