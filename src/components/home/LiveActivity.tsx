
import { useState, useEffect } from "react";
import { ShoppingBag, Users, Package, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ActivityItem {
  id: number;
  type: 'purchase' | 'signup' | 'delivery' | 'trending';
  message: string;
  time: string;
  location?: string;
}

const LiveActivity = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([
    { id: 1, type: 'purchase', message: 'John from Lagos just purchased iPhone 13', time: '2 minutes ago', location: 'Lagos' },
    { id: 2, type: 'signup', message: 'Sarah joined as a new seller', time: '5 minutes ago', location: 'Abuja' },
    { id: 3, type: 'delivery', message: 'Order delivered to Alex in Port Harcourt', time: '8 minutes ago', location: 'Port Harcourt' },
    { id: 4, type: 'trending', message: 'Gaming Laptop trending in Electronics', time: '12 minutes ago' },
  ]);

  const [stats, setStats] = useState({
    activeUsers: 1247,
    todayOrders: 89,
    liveProducts: 10584
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live activity updates
      setStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 3),
        todayOrders: prev.todayOrders + Math.floor(Math.random() * 2),
        liveProducts: prev.liveProducts + Math.floor(Math.random() * 5)
      }));

      // Add new activity occasionally
      if (Math.random() > 0.7) {
        const newActivity: ActivityItem = {
          id: Date.now(),
          type: ['purchase', 'signup', 'delivery', 'trending'][Math.floor(Math.random() * 4)] as any,
          message: 'New activity just happened',
          time: 'just now'
        };
        setActivities(prev => [newActivity, ...prev.slice(0, 3)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'purchase': return <ShoppingBag className="h-4 w-4 text-green-600" />;
      case 'signup': return <Users className="h-4 w-4 text-blue-600" />;
      case 'delivery': return <Package className="h-4 w-4 text-purple-600" />;
      case 'trending': return <TrendingUp className="h-4 w-4 text-orange-600" />;
      default: return <ShoppingBag className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">Live Marketplace Activity</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-market-600">{stats.activeUsers.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.todayOrders}</div>
                <div className="text-sm text-gray-500">Orders Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.liveProducts.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Live Products</div>
              </div>
            </div>
          </div>
          
          <Card className="bg-gray-50 border-0">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Recent Activity
              </h4>
              <div className="space-y-3">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-white transition-colors">
                    {getIcon(activity.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LiveActivity;
