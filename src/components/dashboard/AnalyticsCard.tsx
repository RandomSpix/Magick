import React from 'react';
import { useTheme } from '@/store/theme';
import { Sparkles, TrendingUp, Users, Star } from 'lucide-react';

interface AnalyticItem {
  label: string;
  value: number;
  icon: React.ElementType;
  trend?: number;
}

export const AnalyticsCard = () => {
  const { isMagicMode } = useTheme();

  const analytics: AnalyticItem[] = [
    {
      label: 'Total Resonances',
      value: 1234,
      icon: Sparkles,
      trend: 12.5
    },
    {
      label: 'Sacred Circle Members',
      value: 89,
      icon: Users,
      trend: 5.2
    },
    {
      label: 'Spiritual Power',
      value: 756,
      icon: Star,
      trend: 8.7
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${
      isMagicMode ? 'text-white' : 'text-gray-800'
    }`}>
      {analytics.map((item) => (
        <div key={item.label} className={`p-6 rounded-xl transition-all duration-300 ${
          isMagicMode 
            ? 'bg-gray-800/90 border border-purple-500/20' 
            : 'bg-white shadow-lg hover:shadow-xl'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <item.icon className={`w-8 h-8 ${
              isMagicMode ? 'text-purple-400' : 'text-purple-600'
            }`} />
            {item.trend && (
              <div className="flex items-center text-green-500">
                <TrendingUp className="w-4 h-4 mr-1" />
                {item.trend}%
              </div>
            )}
          </div>
          
          <h3 className="text-3xl font-bold mb-2">{item.value}</h3>
          <p className={`text-sm ${
            isMagicMode ? 'text-gray-400' : 'text-gray-600'
          }`}>{item.label}</p>
        </div>
      ))}
    </div>
  );
};