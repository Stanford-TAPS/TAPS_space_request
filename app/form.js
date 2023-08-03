"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SpaceForm({ locations }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({});

  const selectedLocation = watch("location");
  useEffect(() => {
    if (selectedLocation && selectedLocation !== "default") {
      router.push(`/${selectedLocation}`);
    }
  }, [selectedLocation]);
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log(response);
      } else {
        console.log(response);
      }
    } catch (err) {
      // Handle exception
    }
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="fixed top-0 h-full w-1/3 bg-white border-r border-neutral-200 dark:bg-neutral-800 dark:border-0 shadow-md px-8 pt-6 pb-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="mt-20 mb-4">
          <label htmlFor="title" className="text-neutral-700 dark:text-white">
            Event Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="text-neutral-700 dark:text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && (
            <span className="text-red-700 text-xs italic">
              This field is required
            </span>
          )}
        </div>

        {/* Location */}
        <div className="mb-4">
          <label
            htmlFor="location"
            className="text-neutral-700 dark:text-white"
          >
            Location
          </label>
          <select
            {...register("location")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="default" disabled hidden>
              -Select a space-
            </option>
            {locations.map((location, index) => (
              <option key={index} value={location.id}>
                {location.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <input
            type="submit"
            value="Submit Request"
            className="bg-red-700 hover:bg-red-700 click-border-red-700 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </div>
      </form>
    </div>
  );
}
