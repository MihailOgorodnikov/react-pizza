import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="131" cy="148" r="124" /> 
    <rect x="0" y="294" rx="10" ry="10" width="280" height="24" /> 
    <rect x="-1" y="335" rx="10" ry="10" width="280" height="88" /> 
    <rect x="-1" y="448" rx="10" ry="10" width="92" height="30" /> 
    <rect x="123" y="438" rx="20" ry="20" width="152" height="45" />
  </ContentLoader>
)

export default Skeleton