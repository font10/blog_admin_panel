import Lottie from "lottie-react";
import loading from "../../assets/images/loading.json";

export const Loading = () => {
  return (
    <Lottie className="h-48" animationData={loading} loop={true} />
  )
}
