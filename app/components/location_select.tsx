import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";

export default function LocationSelect({
  control,
  locations,
  errors,
  defaultValue,
}) {
  const options = locations.map((location) => ({
    value: location.id,
    label: location.title,
  }));

  const defaultIndex = defaultValue
    ? options.findIndex((option) => option.label == defaultValue)
    : -1;

  return (
    <div className="mb-4">
      <label htmlFor="location" className="text-neutral-700 dark:text-white">
        Location
      </label>
      <Controller
        name="location"
        control={control}
        defaultValue={defaultValue ? options[defaultIndex] : null}
        rules={{ required: "Please select a location" }}
        render={({ field }) => (
          <Select
            className="my-react-select-container"
            classNamePrefix="my-react-select"

            {...field}
            options={options}
          />
        )}
      />
      {errors.location && (
        <p className="px-1 mt-2 text-xs text-red-700 bg-red-100 border border-red-700 rounded ">
          {errors.location.message}
        </p>
      )}
    </div>
  );
}
