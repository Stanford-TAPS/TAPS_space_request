import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";

export default function LocationSelect({ control, locations, errors }) {
  const options = locations.map((location) => ({
    value: location.id,
    label: location.title,
  }));

  return (
    <div className="mb-4">
      <label htmlFor="location" className="text-neutral-700 dark:text-white">
        Location
      </label>
      <Controller
        name="location"
        control={control}
        defaultValue={null}
        rules={{ required: "Please select a location" }}
        render={({ field }) => (
          <Select
            className="text-black"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#b91c1c",
              },
            })}
            {...field}
            options={options}
          />
        )}
      />
      {errors.location && (
        <p className=" mt-2 rounded border border-red-700 bg-red-100 px-1 text-xs text-red-700">
          {errors.location.message}
        </p>
      )}
    </div>
  );
}
