import { cookies, headers } from "next/headers";
import React from "react";

const Forbidden = () => {
  const headersInst = headers();
  const cookiesInst = cookies();

  console.log(cookiesInst.get('foo'))
  console.log(headersInst.get('foo'));

  return <div>Test</div>;
};

export default Forbidden;
