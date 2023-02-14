export const Container: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="py-12 px-6 flex flex-col space-y-10 items-center justify-center">
      {children}
    </div>
  );
};
