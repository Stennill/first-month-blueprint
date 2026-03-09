interface DataPointProps {
  subject: string;
  implementation: string;
  firstRevenue: string;
  roi: string;
}

const DataPoint = ({ subject, implementation, firstRevenue, roi }: DataPointProps) => {
  return (
    <div className="border border-border p-4 font-mono text-xs">
      <span className="text-muted-foreground">{subject}</span>
      <div className="grid grid-cols-3 gap-2 mt-2">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Implementation</p>
          <p className="text-foreground font-semibold">{implementation}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">First Revenue</p>
          <p className="text-foreground font-semibold">{firstRevenue}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">ROI</p>
          <p className="text-primary font-bold">{roi}</p>
        </div>
      </div>
    </div>
  );
};

export default DataPoint;
