import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, CheckCircle, X } from 'lucide-react';
import { toast } from 'sonner';
import { fakeAPI } from '@/lib/api';
import type { OrderData } from '@/lib/api';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  customText: string;
}

const OrderModal = ({ isOpen, onClose, customText }: OrderModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    pincode: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{orderId: string; estimatedDelivery: string} | null>(null);
  const [deliveryInfo, setDeliveryInfo] = useState<{available: boolean; days: string} | null>(null);
  const [checkingDelivery, setCheckingDelivery] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Check delivery when pincode is complete
    if (field === 'pincode' && value.length === 6) {
      checkDelivery(value);
    }
  };

  const checkDelivery = async (pincode: string) => {
    setCheckingDelivery(true);
    try {
      const response = await fakeAPI.checkDelivery(pincode);
      if (response.success && response.data) {
        setDeliveryInfo(response.data);
      }
    } catch (error) {
      console.error('Delivery check failed:', error);
    } finally {
      setCheckingDelivery(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.pincode) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.pincode.length !== 6) {
      toast.error('Please enter a valid 6-digit pincode');
      return;
    }

    if (!deliveryInfo?.available) {
      toast.error('Delivery not available to this pincode');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData: OrderData = {
        customText,
        quantity: 1,
        price: 2000,
        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.address}, ${formData.pincode}`
        }
      };

      const response = await fakeAPI.createOrder(orderData);
      
      if (response.success && response.data) {
        setOrderSuccess(response.data);
        toast.success('Order placed successfully!');
      } else {
        toast.error(response.message || 'Failed to place order');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      pincode: ''
    });
    setOrderSuccess(null);
    setDeliveryInfo(null);
    onClose();
  };

  if (orderSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={resetModal}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Order Confirmed!</h3>
            <p className="text-muted-foreground mb-4">
              Your custom number plate "{customText}" has been ordered successfully.
            </p>
            <div className="glass rounded-lg p-4 mb-4">
              <div className="text-sm space-y-1">
                <div><strong>Order ID:</strong> {orderSuccess.orderId}</div>
                <div><strong>Estimated Delivery:</strong> {orderSuccess.estimatedDelivery}</div>
                <div><strong>Amount:</strong> ₹2,000 (Free Shipping)</div>
              </div>
            </div>
            <Button onClick={resetModal} variant="premium" className="w-full">
              Place Another Order
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Complete Your Order</DialogTitle>
          <p className="text-muted-foreground">
            Custom text: <strong>"{customText}"</strong> • ₹2,000
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="address">Complete Address *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="House/Flat no, Street, City, State"
              required
            />
          </div>

          <div>
            <Label htmlFor="pincode">Pincode *</Label>
            <Input
              id="pincode"
              value={formData.pincode}
              onChange={(e) => handleInputChange('pincode', e.target.value)}
              maxLength={6}
              pattern="[0-9]{6}"
              required
            />
            {checkingDelivery && (
              <p className="text-sm text-muted-foreground mt-1">
                <Loader2 className="w-4 h-4 animate-spin inline mr-1" />
                Checking delivery availability...
              </p>
            )}
            {deliveryInfo && (
              <p className={`text-sm mt-1 ${deliveryInfo.available ? 'text-green-600' : 'text-red-500'}`}>
                {deliveryInfo.available 
                  ? `✓ Delivery available in ${deliveryInfo.days}`
                  : '✗ Delivery not available to this location'
                }
              </p>
            )}
          </div>

          <div className="pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Product Price:</span>
              <span>₹2,000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping:</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total:</span>
              <span>₹2,000</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="premium" 
              disabled={isSubmitting || !deliveryInfo?.available}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                'Place Order'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;