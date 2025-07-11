import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Database,
  Satellite,
  BarChart3,
  LineChart,
  Zap,
  RefreshCw,
  Download,
  Calendar,
  Target
} from 'lucide-react';

interface CMEEvent {
  id: string;
  timestamp: string;
  confidence: number;
  velocity: number;
  density: number;
  temperature: number;
  status: 'detected' | 'confirmed' | 'false_positive';
}

interface ModelMetrics {
  accuracy: number,
  detectionRate: number;
  precision: number;
  recall: number;
  f1Score: number;
  lastUpdated: string;
  totalEvents: number;
  confirmedEvents: number;
}

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [modelStatus, setModelStatus] = useState<'training' | 'active' | 'offline'>('training');
  
  // Mock data - replace with actual API calls
  const [modelMetrics, setModelMetrics] = useState<ModelMetrics>({
    accuracy: 94.2,
    detectionRate: 69.02,
    precision: 91.8,
    recall: 96.5,
    f1Score: 88.2,
    lastUpdated: '2024-12-19T10:30:00Z',
    totalEvents: 24313,
    confirmedEvents: 16781
  });

  const [recentEvents, setRecentEvents] = useState<CMEEvent[]>([
    {
      id: 'CME-2024-001',
      timestamp: '2024-12-19T08:45:00Z',
      confidence: 0.92,
      velocity: 650,
      density: 12.5,
      temperature: 1.2e5,
      status: 'detected'
    },
    {
      id: 'CME-2024-002',
      timestamp: '2024-12-19T06:20:00Z',
      confidence: 0.87,
      velocity: 580,
      density: 8.9,
      temperature: 9.8e4,
      status: 'confirmed'
    },
    {
      id: 'CME-2024-003',
      timestamp: '2024-12-19T04:15:00Z',
      confidence: 0.95,
      velocity: 720,
      density: 15.2,
      temperature: 1.5e5,
      status: 'confirmed'
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Simulate model status changes
      if (Math.random() > 0.7) {
        setModelStatus(prev => prev === 'training' ? 'active' : prev);
      }
    }, 30000); // Update every 30 seconds

    // Initial loading simulation
    setTimeout(() => setIsLoading(false), 2000);

    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setLastUpdate(new Date());
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'detected': return 'text-yellow-400 bg-yellow-400/20';
      case 'confirmed': return 'text-green-400 bg-green-400/20';
      case 'false_positive': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getModelStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'training': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="pt-16 bg-gray-900 min-h-screen">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-400/10 rounded-full animate-pulse blur-xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/10 rounded-full animate-pulse blur-xl" />
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Satellite className="h-10 w-10 text-cyan-400" />
                <h1 className="text-4xl font-bold text-white">
                  CME Detection <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Dashboard</span>
                </h1>
              </div>
              <p className="text-xl text-gray-300">
                Real-time analysis of Halo CME events from SWIS-ASPEX data
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-400">Model Status</div>
                <div className={`text-lg font-semibold ${getModelStatusColor(modelStatus)}`}>
                  {modelStatus.charAt(0).toUpperCase() + modelStatus.slice(1)}
                </div>
              </div>
              <button
                onClick={refreshData}
                disabled={isLoading}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white p-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <section className="py-12 bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Model Accuracy</p>
                  <p className="text-3xl font-bold text-cyan-400">{modelMetrics.accuracy}%</p>
                </div>
                <Target className="h-8 w-8 text-cyan-400" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total ICME Events</p>
                  <p className="text-3xl font-bold text-purple-400">{modelMetrics.totalEvents}</p>
                </div>
                <Database className="h-8 w-8 text-purple-400" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Confirmed ICMEs</p>
                  <p className="text-3xl font-bold text-green-400">{modelMetrics.confirmedEvents}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Detaction Rate</p>
                  <p className="text-3xl font-bold text-yellow-400">{modelMetrics.detectionRate}%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Events */}
            <div className="lg:col-span-2 bg-gradient-to-br from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Recent CME Detections</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
                </div>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400" />
                </div>
              ) : (
                <div className="space-y-4">
                  {recentEvents.map((event) => (
                    <div key={event.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50 hover:border-cyan-400/40 transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg font-semibold text-white">{event.id}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                            {event.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm text-gray-400">
                          {new Date(event.timestamp).toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Confidence:</span>
                          <span className="text-cyan-400 font-medium ml-2">{(event.confidence * 100).toFixed(1)}%</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Velocity:</span>
                          <span className="text-purple-400 font-medium ml-2">{event.velocity} km/s</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Density:</span>
                          <span className="text-green-400 font-medium ml-2">{event.density} cm⁻³</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Temperature:</span>
                          <span className="text-yellow-400 font-medium ml-2">{(event.temperature / 1e5).toFixed(1)}×10⁵ K</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Model Performance & Pipeline Status */}
            <div className="space-y-6">
              {/* Model Performance */}
              <div className="bg-gradient-to-br from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Model Performance</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Precision</span>
                      <span className="text-cyan-400">{modelMetrics.precision}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full" style={{ width: `${modelMetrics.precision}%` }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Recall</span>
                      <span className="text-purple-400">{modelMetrics.recall}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full" style={{ width: `${modelMetrics.recall}%` }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">F1 Score</span>
                      <span className="text-green-400">{modelMetrics.f1Score}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" style={{ width: `${modelMetrics.f1Score}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pipeline Status */}
              <div className="bg-gradient-to-br from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
                <h3 className="text-xl font-bold text-white mb-4">CI/CD Pipeline</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Data Ingestion</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 text-sm">Active</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Model Training</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                      <span className="text-yellow-400 text-sm">In Progress</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Deployment</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-green-400 text-sm">Ready</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Monitoring</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 text-sm">Active</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Export Data</span>
                  </button>
                  
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                    <LineChart className="h-4 w-4" />
                    <span>View Analytics</span>
                  </button>
                  
                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Schedule Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Data Pipeline Info */}
          <div className="mt-12 bg-gradient-to-br from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-8">
            <div className="text-center">
              <Zap className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">
                Automated <span className="text-cyan-400">Data Pipeline</span>
              </h3>
              <p className="text-gray-300 max-w-3xl mx-auto">
                This dashboard displays real-time results from our machine learning model trained on SWIS-ASPEX data. 
                The CI/CD pipeline automatically processes new data, retrains the model, and updates predictions for 
                Halo CME event detection. Data is continuously ingested from ISSDC and validated against CACTUS CME database.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;