// Fake API for showcase purposes
export interface OrderData {
  customText: string;
  quantity: number;
  price: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fakeAPI = {
  // Create order
  createOrder: async (orderData: OrderData): Promise<ApiResponse<{ orderId: string; estimatedDelivery: string }>> => {
    await delay(1500); // Simulate network delay
    
    // Simulate occasional failures for realism
    if (Math.random() < 0.05) {
      return {
        success: false,
        message: "Server temporarily unavailable. Please try again."
      };
    }
    
    const orderId = `NP${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 5) + 6); // 6-10 days
    
    return {
      success: true,
      data: {
        orderId,
        estimatedDelivery: deliveryDate.toLocaleDateString('en-IN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      },
      message: "Order placed successfully!"
    };
  },

  // Get reviews
  getReviews: async (): Promise<ApiResponse<any[]>> => {
    await delay(800);
    
    const reviews = [
      {
        id: 1,
        name: "Rajesh Kumar",
        rating: 5,
        comment: "Excellent quality! The magnetic attachment is super strong and the customization looks professional. Highly recommended!",
        date: "2024-01-15",
        verified: true
      },
      {
        id: 2,
        name: "Priya Sharma",
        rating: 5,
        comment: "Perfect fit for Indian number plates. The material quality is premium and it hasn't fallen off even at high speeds.",
        date: "2024-01-12",
        verified: true
      },
      {
        id: 3,
        name: "Vikram Singh",
        rating: 5,
        comment: "Amazing product! Got my name customized and it looks fantastic. Delivery was within the promised timeframe.",
        date: "2024-01-10",
        verified: true
      },
      {
        id: 4,
        name: "Anita Patel",
        rating: 4,
        comment: "Good quality magnetic plate. Easy to install and remove. The customization is clear and durable.",
        date: "2024-01-08",
        verified: true
      },
      {
        id: 5,
        name: "Suresh Reddy",
        rating: 5,
        comment: "Fantastic product! The magnetic hold is incredibly strong. Perfect for personalizing your vehicle.",
        date: "2024-01-05",
        verified: true
      }
    ];

    return {
      success: true,
      data: reviews
    };
  },

  // Check delivery status
  checkDelivery: async (pincode: string): Promise<ApiResponse<{ available: boolean; days: string }>> => {
    await delay(1000);
    
    // Simulate delivery check
    const available = pincode.length === 6 && /^\d+$/.test(pincode);
    const days = available ? "6-10 business days" : "Not serviceable";
    
    return {
      success: true,
      data: {
        available,
        days
      }
    };
  }
};