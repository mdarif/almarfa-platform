type ContainerProps = {
  children: React.ReactNode;
};

export function Container({
  children,
}: ContainerProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      {children}
    </div>
  );
}