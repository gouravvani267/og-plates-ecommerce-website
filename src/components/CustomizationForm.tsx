import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import NumberPlatePreview from './NumberPlatePreview';

interface CustomizationFormProps {
  onOrderNow: (text: string) => void;
}

const CustomizationForm = ({ onOrderNow }: CustomizationFormProps) => {
  const [customText, setCustomText] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const handleTextChange = (value: string) => {
    // Allow only alphanumeric characters and basic symbols
    const filtered = value.replace(/[^a-zA-Z0-9\s]/g, '').toUpperCase();
    if (filtered.length <= 12) {
      setCustomText(filtered);
    }
  };

  const validateAndOrder = async () => {
    if (customText.trim().length < 2) {
      toast.error("Please enter at least 2 characters for your custom text");
      return;
    }

    setIsValidating(true);
    
    // Simulate validation
    setTimeout(() => {
      setIsValidating(false);
      onOrderNow(customText.trim());
    }, 1000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="glass rounded-2xl p-8 shadow-premium">
        <h2 className="text-2xl font-bold text-center mb-6 text-foreground">
          Customize Your Magnetic Number Plate
        </h2>
        
        {/* Live Preview */}
        <div className="mb-8 flex justify-center">
          <NumberPlatePreview customText={customText} />
        </div>

        {/* Customization Input */}
        <div className="space-y-4 mb-6">
          <div>
            <Label htmlFor="customText" className="text-sm font-medium text-muted-foreground">
              Your Custom Text (Max 12 characters)
            </Label>
            <Input
              id="customText"
              value={customText}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Enter your name or text..."
              className="mt-2 h-12 text-lg text-center font-semibold tracking-wider"
              maxLength={12}
            />
            <p className="text-xs text-muted-foreground mt-1 text-center">
              {customText.length}/12 characters • Only letters and numbers allowed
            </p>
          </div>
        </div>

        {/* Product Features */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="text-center p-3 rounded-lg bg-secondary/50">
            <div className="font-semibold text-accent">Strong Magnetic</div>
            <div className="text-muted-foreground">Won't fall at high speeds</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-secondary/50">
            <div className="font-semibold text-accent">Perfect Fit</div>
            <div className="text-muted-foreground">Indian car plate size</div>
          </div>
        </div>

        {/* Price and Order */}
        <div className="text-center space-y-4">
          <div className="text-3xl font-bold text-primary">₹2,000</div>
          <div className="text-sm text-muted-foreground">
            Free Shipping • 6-10 Days Delivery
          </div>
          
          <Button
            onClick={validateAndOrder}
            disabled={isValidating || customText.trim().length < 2}
            variant="premium"
            size="xl"
            className="w-full"
          >
            {isValidating ? "Validating..." : "Order Now"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationForm;