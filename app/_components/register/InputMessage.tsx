import React from "react";

export const InputMessage = ({ isError, text }: { isError: boolean; text: string }) => {
  if (isError) {
    return <p className="text-red-500">{text}</p>;
  } else {
    return <p className="text-blue-500">{text}</p>;
  }
};
