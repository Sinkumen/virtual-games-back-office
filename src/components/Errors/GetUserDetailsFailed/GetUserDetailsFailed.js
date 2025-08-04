import AppButton from "@/components/AppButton";
import EmptyDataPlaceholder from "@/components/EmptyDataPlaceholder";
import React from "react";

const GetUserDetailsFailed = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className=" flex flex-col items-center mt-[-200px]">
        <EmptyDataPlaceholder
          large
          title="Auth Failed"
          description="Failed to fetch user details"
        />

        <AppButton
          dense
          onClick={() => window.location.reload()}
          className={"w-40"}
        >
          Reload
        </AppButton>
      </div>
    </div>
  );
};

export default GetUserDetailsFailed;
