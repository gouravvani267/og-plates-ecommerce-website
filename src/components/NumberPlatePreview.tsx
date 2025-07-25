import { useState, useEffect } from 'react';

interface NumberPlatePreviewProps {
  customText: string;
  className?: string;
}

const NumberPlatePreview = ({ customText, className = "" }: NumberPlatePreviewProps) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    setDisplayText(customText || "YOUR NAME");
  }, [customText]);

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Indian Number Plate Template */}
      <div className="relative w-80 h-20 bg-white border-4 border-black rounded-lg shadow-premium overflow-hidden">
        {/* Standard Indian plate template */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50">
          {/* Top section for standard number */}
          <div className="h-8 flex items-center justify-center border-b border-gray-300">
            <span className="text-black font-bold text-xs tracking-wider">MH 12 AB 1234</span>
          </div>
          
          {/* Bottom section for custom text */}
          <div className="h-12 flex items-center justify-center relative">
            {/* Magnetic overlay indicator */}
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
              <span 
                className="text-white font-bold text-lg tracking-widest uppercase"
                style={{ 
                  fontFamily: 'monospace',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  letterSpacing: '2px'
                }}
              >
                {displayText.slice(0, 12)}
              </span>
            </div>
            
            {/* Magnetic corners */}
            <div className="absolute top-1 left-1 w-2 h-2 bg-metallic-silver rounded-full"></div>
            <div className="absolute top-1 right-1 w-2 h-2 bg-metallic-silver rounded-full"></div>
            <div className="absolute bottom-1 left-1 w-2 h-2 bg-metallic-silver rounded-full"></div>
            <div className="absolute bottom-1 right-1 w-2 h-2 bg-metallic-silver rounded-full"></div>
          </div>
        </div>
        
        {/* Holographic security strip */}
        <div className="absolute right-2 top-2 w-1 h-16 bg-gradient-to-b from-blue-400 via-green-400 to-purple-400 opacity-60"></div>
      </div>
      
      {/* Magnetic attachment visualization */}
      <div className="absolute -top-2 -left-2 w-4 h-4 bg-metallic-silver rounded-full shadow-lg animate-pulse"></div>
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-metallic-silver rounded-full shadow-lg animate-pulse"></div>
      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-metallic-silver rounded-full shadow-lg animate-pulse"></div>
      <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-metallic-silver rounded-full shadow-lg animate-pulse"></div>
    </div>
  );
};

export default NumberPlatePreview;