interface DisclaimerProps {
  className?: string;
}

export default function Disclaimer({ className = "" }: DisclaimerProps) {
  return (
    <div className={`pt-4 border-t border-banana-300 bg-white ${className}`}>
      <p className="text-sm text-black leading-relaxed">
        <strong>DISCLAIMER:</strong> This is a hackathon project for the 2025 ZecHub Zcash Hackathon. 
        This platform cannot be used for real betting as we do not have legal jurisdiction for gambling operations. 
        This is a demonstration of blockchain technology and should not be considered a real betting service.
      </p>
    </div>
  );
}
