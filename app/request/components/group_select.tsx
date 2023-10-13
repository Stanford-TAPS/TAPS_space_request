import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";

export default function GroupSelect({ control, groups }) {
  const options = [
    { value: null, label: "None" }, // None option at the beginning for independent reservers
    ...groups.map((group) => ({
      value: group.id,
      label: group.title,
    })),
    { value: "other", label: "Other (will eventually prompt selection)" }, // Other option at the end
  ];

  return (
    <div className="mb-4">
      <label htmlFor="group" className="text-neutral-700 dark:text-white">
        Group/Organization
      </label>
      <Controller
        name="group"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <Select
            className="my-react-select-container"
            classNamePrefix="my-react-select"
            options={options}
          />
        )}
      />
    </div>
  );
}
