interface AccessConditionProps {
  title?: string;
  subTitle?: string;
}
const AccessCondition = ({ title, subTitle }: AccessConditionProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-4">{subTitle}</p>
    </div>
  );
};

export default AccessCondition;
