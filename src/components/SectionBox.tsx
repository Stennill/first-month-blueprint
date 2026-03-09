interface SectionBoxProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

const SectionBox = ({ label, children, className = "" }: SectionBoxProps) => {
  return (
    <div className={`border border-border p-6 relative ${className}`}>
      <span className="section-label absolute top-3 left-4">{label}</span>
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
};

export default SectionBox;
