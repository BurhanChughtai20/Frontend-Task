import DynamicContent from "../DynamicContent"

const FeatureCard = () => {

  return (
    <div className="my-2 md:my-10 md:py10 w-full">
      <div className="flex items-center justify-center md:justify-start">
      <DynamicContent as="h3" data={"Build a better website, faster."} />
      </div>
    </div>
  )
}

export default FeatureCard
