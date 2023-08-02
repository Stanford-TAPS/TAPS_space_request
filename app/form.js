"use client";
import { useForm } from "react-hook-form";

export default function SpaceForm({ locations }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({});
  const selectedLocation = watch("location");
  const onSubmit = (data) => console.log(data);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="bg-white dark:bg-gray-500 shadow-md px-8 pt-6 pb-8 w-full h-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="text-gray-500 dark:text-white">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="text-gray-500 dark:text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && (
            <span className="text-red-500 text-xs italic">
              This field is required
            </span>
          )}
        </div>

        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="text-gray-500 dark:text-white">
            Location
          </label>
          <select
            {...register("location")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option default disabled>
              -Select a space-
            </option>
            {locations.map((location, index) => (
              <option key={index} value={location.id}>
                {location.title}
              </option>
            ))}
          </select>
        </div>
        <p>Value: {selectedLocation}</p>

        <div className="flex items-center justify-between">
          <input
            type="submit"
            value="Submit Request"
            className="bg-cardinal hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </div>
      </form>
    </div>
  );
}
