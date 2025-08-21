"use client";

import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";

const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(255, "Title must be less than 255 characters"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long")
    .max(255, "Description must be less than 255 characters"),
  content: z.string().min(10, "Content must be at least 10 characters long"),
});

type PostFormValues = z.infer<typeof postSchema>;

export default function PostForm() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
  });

  const onFormSubmit = async (data: PostFormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter post title"
          {...register("title")}
          disabled={isPending}
        />

        {errors?.title && (
          <p className="text-sm text-red-700">{errors.title.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter post description"
          {...register("description")}
          disabled={isPending}
        />
        {errors?.description && (
          <p className="text-sm text-red-700">{errors.description.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Enter post content"
          className="min-h-[250px] resize-none"
          {...register("content")}
          disabled={isPending}
        />
        {errors?.content && (
          <p className="text-sm text-red-700">{errors.content.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isPending} className="mt-5 w-full">
        {isPending ? "Saving Post" : "Create Post"}
      </Button>
    </form>
  );
}
