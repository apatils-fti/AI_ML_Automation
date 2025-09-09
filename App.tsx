import React, { useState } from 'react';
import { Send, User, Wifi, FileText, CreditCard, TrendingUp, TrendingDown } from 'lucide-react';

interface FormData {
  gender: string;
  SeniorCitizen: number;
  Partner: string;
  Dependents: string;
  tenure: number;
  PhoneService: string;
  MultipleLines: string;
  InternetService: string;
  OnlineSecurity: string;
  OnlineBackup: string;
  DeviceProtection: string;
  TechSupport: string;
  StreamingTV: string;
  StreamingMovies: string;
  Contract: string;
  PaperlessBilling: string;
  PaymentMethod: string;
  MonthlyCharges: number;
  TotalCharges: number;
}

interface PredictionResult {
  prediction: string;
  probability: number;
}

const defaultFormData: FormData = {
  gender: 'Female',
  SeniorCitizen: 0,
  Partner: 'Yes',
  Dependents: 'No',
  tenure: 12,
  PhoneService: 'Yes',
  MultipleLines: 'No',
  InternetService: 'DSL',
  OnlineSecurity: 'No',
  OnlineBackup: 'Yes',
  DeviceProtection: 'No',
  TechSupport: 'No',
  StreamingTV: 'No',
  StreamingMovies: 'No',
  Contract: 'Month-to-month',
  PaperlessBilling: 'Yes',
  PaymentMethod: 'Electronic check',
  MonthlyCharges: 65.5,
  TotalCharges: 786.0
};

function App() {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features: formData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setPrediction(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Telco Churn Prediction
            </h1>
            <p className="text-lg text-gray-600">
              Predict customer churn likelihood using machine learning
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Demographics Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <User className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Demographics</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Gender
                        </label>
                        <select
                          value={formData.gender}
                          onChange={(e) => handleInputChange('gender', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Senior Citizen
                        </label>
                        <select
                          value={formData.SeniorCitizen}
                          onChange={(e) => handleInputChange('SeniorCitizen', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value={0}>No</option>
                          <option value={1}>Yes</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Partner
                        </label>
                        <select
                          value={formData.Partner}
                          onChange={(e) => handleInputChange('Partner', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Dependents
                        </label>
                        <select
                          value={formData.Dependents}
                          onChange={(e) => handleInputChange('Dependents', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tenure (months)
                        </label>
                        <input
                          type="number"
                          value={formData.tenure}
                          onChange={(e) => handleInputChange('tenure', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Services Section */}
                  <div className="space-y-4 border-t pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Wifi className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Services</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Service
                        </label>
                        <select
                          value={formData.PhoneService}
                          onChange={(e) => handleInputChange('PhoneService', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Multiple Lines
                        </label>
                        <select
                          value={formData.MultipleLines}
                          onChange={(e) => handleInputChange('MultipleLines', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="No phone service">No phone service</option>
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Internet Service
                        </label>
                        <select
                          value={formData.InternetService}
                          onChange={(e) => handleInputChange('InternetService', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="DSL">DSL</option>
                          <option value="Fiber optic">Fiber optic</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Online Security
                        </label>
                        <select
                          value={formData.OnlineSecurity}
                          onChange={(e) => handleInputChange('OnlineSecurity', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                          <option value="No internet service">No internet service</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Online Backup
                        </label>
                        <select
                          value={formData.OnlineBackup}
                          onChange={(e) => handleInputChange('OnlineBackup', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                          <option value="No internet service">No internet service</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Device Protection
                        </label>
                        <select
                          value={formData.DeviceProtection}
                          onChange={(e) => handleInputChange('DeviceProtection', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                          <option value="No internet service">No internet service</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tech Support
                        </label>
                        <select
                          value={formData.TechSupport}
                          onChange={(e) => handleInputChange('TechSupport', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                          <option value="No internet service">No internet service</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Streaming TV
                        </label>
                        <select
                          value={formData.StreamingTV}
                          onChange={(e) => handleInputChange('StreamingTV', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                          <option value="No internet service">No internet service</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Streaming Movies
                        </label>
                        <select
                          value={formData.StreamingMovies}
                          onChange={(e) => handleInputChange('StreamingMovies', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                          <option value="No internet service">No internet service</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Contract & Billing Section */}
                  <div className="space-y-4 border-t pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-5 h-5 text-purple-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Contract & Billing</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contract
                        </label>
                        <select
                          value={formData.Contract}
                          onChange={(e) => handleInputChange('Contract', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Month-to-month">Month-to-month</option>
                          <option value="One year">One year</option>
                          <option value="Two year">Two year</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Paperless Billing
                        </label>
                        <select
                          value={formData.PaperlessBilling}
                          onChange={(e) => handleInputChange('PaperlessBilling', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Payment Method
                        </label>
                        <select
                          value={formData.PaymentMethod}
                          onChange={(e) => handleInputChange('PaymentMethod', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Electronic check">Electronic check</option>
                          <option value="Mailed check">Mailed check</option>
                          <option value="Bank transfer (automatic)">Bank transfer (automatic)</option>
                          <option value="Credit card (automatic)">Credit card (automatic)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Monthly Charges ($)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.MonthlyCharges}
                          onChange={(e) => handleInputChange('MonthlyCharges', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Total Charges ($)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.TotalCharges}
                          onChange={(e) => handleInputChange('TotalCharges', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold 
                               hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                               disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200
                               flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                      {loading ? 'Predicting...' : 'Predict Churn'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Prediction Result</h3>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}

                {prediction ? (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg border-2 ${
                      prediction.prediction === 'Yes' 
                        ? 'bg-red-50 border-red-200' 
                        : 'bg-green-50 border-green-200'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        {prediction.prediction === 'Yes' ? (
                          <TrendingDown className="w-5 h-5 text-red-600" />
                        ) : (
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        )}
                        <span className="font-semibold text-gray-900">Churn Prediction</span>
                      </div>
                      <p className={`text-2xl font-bold ${
                        prediction.prediction === 'Yes' ? 'text-red-700' : 'text-green-700'
                      }`}>
                        {prediction.prediction === 'Yes' ? 'Will Churn' : 'Will Stay'}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Churn Probability</p>
                      <p className="text-xl font-bold text-gray-900">
                        {(prediction.probability * 100).toFixed(1)}%
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            prediction.probability > 0.5 ? 'bg-red-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${prediction.probability * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 text-center">
                      Raw Probability: {prediction.probability.toFixed(4)}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">
                      Submit the form to get a churn prediction
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;