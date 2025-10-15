import React from "react";

import Loading from ".";

type Props = React.SuspenseProps;

const Suspenser: React.FC<Props> = ({ children, ...props }) => (
  <React.Suspense fallback={<Loading />} {...props}>
    {children}
  </React.Suspense>
);

export default Suspenser;
