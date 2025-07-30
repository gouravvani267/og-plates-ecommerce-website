import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Shield, Truck, Clock, CheckCircle, Magnet, Car, Zap } from 'lucide-react';
import CustomizationForm from '@/components/CustomizationForm';
import ReviewsSection from '@/components/ReviewsSection';
import OrderModal from '@/components/OrderModal';
import heroImage from '@/assets/hero-numberplate.jpg';
import productDetail from '@/assets/product-detail.jpg';
import lifestyleShot from '@/assets/lifestyle-shot.jpg';
import ogPlatesLogo from '@/assets/og-plates-logo.jpg';

const Index = () => {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedCustomText, setSelectedCustomText] = useState('');

  const handleOrderNow = (customText: string) => {
    setSelectedCustomText(customText);
    setOrderModalOpen(true);
  };

  const scrollToCustomization = () => {
    document.getElementById('customize')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="glass border-b border-border/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img 
                src={ogPlatesLogo} 
                alt="OG PLATES Logo" 
                className="h-10 w-auto md:h-12 object-contain cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Badge variant="secondary" className="px-3 py-1">
                <Star className="w-4 h-4 mr-1 fill-primary text-primary" />
                4.9 Rating
              </Badge>
              <span className="text-sm text-muted-foreground">Free Shipping</span>
              <Button variant="glass" size="sm" onClick={scrollToCustomization}>
                Customize Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="premium-gradient text-primary-foreground px-4 py-2">
                  Premium Magnetic Number Plates
                </Badge>
                <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Customize Your
                  <span className="bg-gradient-primary bg-clip-text text-transparent block">
                    Car's Identity
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-lg">
                  High-quality magnetic plates that perfectly fit Indian car number plates. 
                  Personalize with any name or text you want.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  <span className="text-sm">Strong Magnetic Hold</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-sm">Perfect Indian Size</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  <span className="text-sm">High Speed Safe</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="premium" size="xl" onClick={scrollToCustomization}>
                  Start Customizing
                </Button>
                <Button variant="glass" size="xl">
                  View Gallery
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">₹2,000</div>
                  <div className="text-sm text-muted-foreground">Free Shipping</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">6-10 Days</div>
                  <div className="text-sm text-muted-foreground">Delivery Time</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img 
                  src={heroImage} 
                  alt="Custom magnetic number plate" 
                  className="w-full h-auto rounded-2xl shadow-premium"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl blur-xl transform scale-110"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose Our Magnetic Plates?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Engineered for Indian roads and weather conditions with premium materials
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass rounded-xl p-6 text-center shadow-card">
              <Magnet className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Super Strong Magnets</h3>
              <p className="text-muted-foreground">
                Industrial-grade neodymium magnets that won't budge even at highway speeds
              </p>
            </div>

            <div className="glass rounded-xl p-6 text-center shadow-card">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Weather Resistant</h3>
              <p className="text-muted-foreground">
                UV-resistant materials that withstand Indian sun, rain, and dust
              </p>
            </div>

            <div className="glass rounded-xl p-6 text-center shadow-card">
              <Car className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Perfect Fit</h3>
              <p className="text-muted-foreground">
                Designed exactly to Indian standard number plate dimensions
              </p>
            </div>

            <div className="glass rounded-xl p-6 text-center shadow-card">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quick Delivery</h3>
              <p className="text-muted-foreground">
                Fast processing and delivery within 6-10 business days
              </p>
            </div>

            <div className="glass rounded-xl p-6 text-center shadow-card">
              <Truck className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">
                No hidden charges. Free delivery across India
              </p>
            </div>

            <div className="glass rounded-xl p-6 text-center shadow-card">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-muted-foreground">
                Premium materials with satisfaction guarantee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">See It In Action</h2>
            <p className="text-muted-foreground">
              Real customers, real results
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="relative group">
              <img 
                src={productDetail} 
                alt="Detailed view of magnetic attachment" 
                className="w-full h-80 object-cover rounded-xl shadow-premium group-hover:scale-105 transition-smooth"
              />
              <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                <Badge className="premium-gradient">Magnetic Detail</Badge>
              </div>
            </div>

            <div className="relative group">
              <img 
                src={lifestyleShot} 
                alt="Car with custom plate on highway" 
                className="w-full h-80 object-cover rounded-xl shadow-premium group-hover:scale-105 transition-smooth"
              />
              <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                <Badge className="premium-gradient">High Speed Test</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customization Section */}
      <section id="customize" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Design Your Plate</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Create your personalized magnetic number plate in real-time
            </p>
          </div>

          <CustomizationForm onOrderNow={handleOrderNow} />
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ReviewsSection />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Customize Your Ride?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have personalized their vehicles with our premium magnetic plates
          </p>
          <Button variant="premium" size="xl" onClick={scrollToCustomization}>
            Start Customizing Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-border/20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <img 
                src={ogPlatesLogo} 
                alt="OG PLATES Logo" 
                className="h-8 w-auto object-contain"
              />
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>© 2024 theogplates. All rights reserved.</span>
              <span>•</span>
              <span>Made in India</span>
              <span>•</span>
              <Badge variant="secondary">
                <Star className="w-3 h-3 mr-1 fill-primary text-primary" />
                4.9/5 Rating
              </Badge>
            </div>
          </div>
        </div>
      </footer>

      {/* Order Modal */}
      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        customText={selectedCustomText}
      />
    </div>
  );
};

export default Index;