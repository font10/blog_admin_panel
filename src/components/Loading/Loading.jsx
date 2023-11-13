import Lottie from "lottie-react";
import { loading } from "../../utils/images";

export const Loading = () => {
  return (
    <Lottie className="h-48" animationData={loading} loop={true} />
  )
}
