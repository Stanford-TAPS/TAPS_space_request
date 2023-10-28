import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import Image from "next/image";
import Avatar from "boring-avatars";

export default function GroupSelect({ control, groups }) {
  const options = [
    { value: null, label: "None" }, // None option at the beginning for independent reservers
    ...groups.map((group) => ({
      value: group.id,
      label: group.title,
      image: group.image,
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
        render={({ }) => (
          <Select
            className="my-react-select-container"
            classNamePrefix="my-react-select"
            options={options}
            components={
              {
                Option: ({ data, ...props }) => (
                  <div className="flex items-center pt-3 pb-3 mt-1 mb-1 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800" onClick={() => {
                    props.selectOption(data)
                  }}>
                    {data.image ? (
                      <Image
                        src={data.image}
                        alt={data.label}
                        width={30}
                        height={30}
                        className="ml-2 rounded-full"
                      />
                    ) : <div className="ml-2 rounded-full"> <Avatar size={30} name={data.label} colors={["#B9030F", "#9E0004", "#70160E", "#161917", "#E1E3DB"]} variant="marble" /></div>}
                    <div className="ml-2 mr-2">{data.label}</div>
                  </div>
                ),

                SingleValue: ({ data, ...props }) => (
                  <div className="absolute flex items-center h-1 cursor-pointer left-1 top-3">
                    {data.image ? (
                      <Image
                        src={data.image}
                        alt={data.label}
                        width={25}
                        height={25}
                        className="ml-2 rounded-full"
                      />
                    ) : <div className="ml-2 rounded-full"> <Avatar size={25} name={data.label} colors={["#B9030F", "#9E0004", "#70160E", "#161917", "#E1E3DB"]} variant="marble" /></div>}
                    <div className="ml-2 mr-2 line-clamp-1">{data.label}</div>
                  </div>
                ),
              }
            }
          />
        )}
      />
    </div>
  );
}
