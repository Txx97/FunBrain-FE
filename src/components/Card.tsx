import { useRouter } from "next/router";
import React from "react";

export const Card = (props) => {
  const router = useRouter();

  const navigateTo = (route: string, params: string) => {
    router.push(`${route}/${params}`);
  };
  return (
    <div className="col-md-4" onClick={() => navigateTo(props.route, props.id)}>
      <div className="card p-3 mb-2">
        <div className="mt-5 mb-5">
          <h3 className="heading text-center">{props.title}</h3>
        </div>
      </div>
    </div>
  );
};
