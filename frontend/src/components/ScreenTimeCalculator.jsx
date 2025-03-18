import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Calendar, AlertCircle, Send, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const ScreenTimeCalculator = () => {
  const [screenTime, setScreenTime] = useState(5);
  const [age, setAge] = useState(25);
  const [calculatedResults, setCalculatedResults] = useState(null);
  const [email, setEmail] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Set animation for entrance
    setTimeout(() => {
      setVisible(true);
    }, 100);
  }, []);

  const handleCalculate = () => {
    setIsCalculating(true);
    
    // Simulate API call
    setTimeout(() => {
      // Calculations
      const hoursPerYear = screenTime * 365;
      // Using Indian average life expectancy (around 70 years)
      const yearsLeft = 70 - age;
      const screenTimeYears = (screenTime * yearsLeft * 365) / (24 * 365);
      const roundedYears = Math.round(screenTimeYears * 100) / 100;
      
      const hoursWeekly = screenTime * 7;
      const daysWeekly = hoursWeekly / 24;
      
      const hoursMonthly = screenTime * 30;
      const daysMonthly = hoursMonthly / 24;
      
      const daysYearly = hoursPerYear / 24;
      
      const hoursLifetime = screenTime * 365 * yearsLeft;
      const daysLifetime = hoursLifetime / 24;
      
      const timeReduction = roundedYears / 5; // If reduced by 1 hour
      
      setCalculatedResults({
        years: roundedYears,
        hoursPerYear,
        weekly: {
          hours: hoursWeekly,
          days: daysWeekly.toFixed(1)
        },
        monthly: {
          hours: hoursMonthly,
          days: daysMonthly.toFixed(1)
        },
        yearly: {
          hours: hoursPerYear,
          days: daysYearly.toFixed(1)
        },
        lifetime: {
          hours: hoursLifetime,
          days: daysLifetime.toFixed(1)
        },
        savedYears: timeReduction.toFixed(2)
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const handleSliderChange = (e) => {
    setScreenTime(Number(e.target.value));
  };

  const handleAgeChange = (e) => {
    setAge(Number(e.target.value));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    // Here you would normally submit the email to your backend
    alert(`Thank you! Tips will be sent to ${email}`);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-black text-white py-32 px-4" style={{ fontFamily: "'Bayon', sans-serif" }}>
      <div className="container mx-auto max-w-4xl">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-300 hover:text-purple-400 mb-8 transition-colors duration-300 group"
          style={{ fontWeight: 300, letterSpacing: '0.3px' }}
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        
        <div className={`transition-all duration-700 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="text-center mb-12">
            <div className="relative pulse-bg mb-4 inline-block">
              <h1 
                className="text-4xl md:text-5xl text-white uppercase animate-glow"
                style={{ fontWeight: 500, letterSpacing: '0.5px' }}
              >
                Your lifetime in screen time
              </h1>
            </div>
            <p 
              className="text-gray-400 max-w-2xl mx-auto text-center"
              style={{ fontWeight: 300, letterSpacing: '0.3px' }}
            >
              How many years of your life does your daily average screen time equate to? The average screen time in India is approximately 5 hours a day, which is about a quarter of our waking hours.
            </p>
          </div>
          
          {!calculatedResults ? (
            <div className="bg-[#12121e] rounded-xl shadow-lg border border-gray-800 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-700 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              </div>
              
              <div className="relative z-10 p-8">
                <div className="mb-12">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center flex-shrink-0 float-icon mr-4">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <h2 
                      className="text-xl text-white animate-glow" 
                      style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                    >
                      YOUR AVERAGE DAILY SCREEN TIME
                    </h2>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <span 
                        className="text-3xl text-white" 
                        style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                      >
                        {screenTime} HOURS
                      </span>
                      <div className="bg-purple-900/30 rounded-full px-3 py-1 border border-purple-800/30">
                        <span 
                          className="text-sm text-purple-300"
                          style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                        >
                          Indian Average: 5 hours
                        </span>
                      </div>
                    </div>
                    <div className="relative mb-6">
                      <input
                        type="range"
                        min="0"
                        max="16"
                        step="0.5"
                        value={screenTime}
                        onChange={handleSliderChange}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <div 
                        className="absolute -bottom-6 left-0 text-sm text-gray-400"
                        style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                      >
                        0
                      </div>
                      <div 
                        className="absolute -bottom-6 right-0 text-sm text-gray-400"
                        style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                      >
                        16
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-12">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center flex-shrink-0 float-icon mr-4">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <h2 
                      className="text-xl text-white animate-glow"
                      style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                    >
                      YOUR AGE <span className="text-purple-400">*</span>
                    </h2>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={age}
                      onChange={handleAgeChange}
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors text-white text-xl"
                      style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                    />
                    <span 
                      className="text-gray-300 text-xl whitespace-nowrap" 
                      style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                    >
                      YEARS OLD
                    </span>
                  </div>
                </div>
                
                <div className="text-center">
                  <button
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-12 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 pulse-button"
                    style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                  >
                    {isCalculating ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        CALCULATING...
                      </span>
                    ) : (
                      'CALCULATE'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#12121e] rounded-xl shadow-lg border border-gray-800 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-700 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              </div>
              
              <div className="relative z-10">
                <div className="p-6 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-b border-gray-800 text-center">
                  <h2 
                    className="text-2xl text-white animate-glow"
                    style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                  >
                    YOUR LIFETIME IN SCREEN TIME RESULTS
                  </h2>
                </div>
                
                <div className="p-8 text-center">
                  <h2 
                    className="text-4xl text-white mb-1 animate-glow"
                    style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                  >
                    {calculatedResults.years} YEARS
                  </h2>
                  <p 
                    className="text-gray-400"
                    style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                  >
                    of the rest of your life, if you continue at your current screen time
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 text-center border-t border-b border-gray-800">
                  <p 
                    className="text-gray-300"
                    style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                  >
                    That's
                  </p>
                  <p 
                    className="text-2xl text-white"
                    style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                  >
                    {calculatedResults.hoursPerYear.toLocaleString()} HOURS PER YEAR
                  </p>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center flex-shrink-0 float-icon mr-4">
                      <Activity className="h-5 w-5 text-white" />
                    </div>
                    <h2 
                      className="text-xl text-white animate-glow"
                      style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                    >
                      BREAKDOWN
                    </h2>
                  </div>
                  
                  <div className="divide-y divide-gray-800">
                    <div className="grid grid-cols-3 py-3">
                      <div 
                        className="font-medium text-purple-400"
                        style={{ fontWeight: 500, letterSpacing: '0.4px' }}
                      >
                        WEEKLY
                      </div>
                      <div 
                        className="text-right text-gray-300"
                        style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                      >
                        {calculatedResults.weekly.hours} hours
                      </div>
                      <div 
                        className="text-right text-gray-300"
                        style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                      >
                        {calculatedResults.weekly.days} days
                      </div>
                    </div>
                    <div className="grid grid-cols-3 py-3">
                      <div 
                        className="font-medium text-purple-400"
                        style={{ fontWeight: 500, letterSpacing: '0.4px' }}
                      >
                        MONTHLY
                      </div>
                      <div 
                        className="text-right text-gray-300"
                        style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                      >
                        {calculatedResults.monthly.hours} hours
                      </div>
                      <div 
                        className="text-right text-gray-300"
                        style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                      >
                        {calculatedResults.monthly.days} days
                      </div>
                    </div>
                    <div className="grid grid-cols-3 py-3">
                      <div 
                        className="font-medium text-purple-400"
                        style={{ fontWeight: 500, letterSpacing: '0.4px' }}
                      >
                        YEARLY
                      </div>
                      <div 
                        className="text-right text-gray-300"
                        style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                      >
                        {calculatedResults.yearly.hours.toLocaleString()} hours
                      </div>
                      <div 
                        className="text-right text-gray-300"
                        style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                      >
                        {calculatedResults.yearly.days} days
                      </div>
                    </div>
                    <div className="grid grid-cols-3 py-3">
                      <div 
                        className="font-medium text-purple-400"
                        style={{ fontWeight: 500, letterSpacing: '0.4px' }}
                      >
                        YOUR LIFETIME
                      </div>
                      <div 
                        className="text-right text-gray-300"
                        style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                      >
                        {calculatedResults.lifetime.hours.toLocaleString()} hours
                      </div>
                      <div 
                        className="text-right text-gray-300"
                        style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                      >
                        {calculatedResults.lifetime.days} days
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 text-center border-t border-b border-gray-800">
                  <p 
                    className="text-gray-300 mb-1"
                    style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                  >
                    Reduce your screen time by 1 hour a day, you'll save
                  </p>
                  <p 
                    className="text-3xl text-white animate-glow"
                    style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                  >
                    {calculatedResults.savedYears} YEARS
                  </p>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center flex-shrink-0 float-icon mr-4">
                      <AlertCircle className="h-5 w-5 text-white" />
                    </div>
                    <h2 
                      className="text-xl text-white animate-glow"
                      style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                    >
                      WANNA CLAIM BACK YOUR TIME?
                    </h2>
                  </div>
                  
                  <form onSubmit={handleSubmitEmail} className="max-w-md mx-auto">
                    <div className="mb-6">
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={handleEmailChange}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                          required
                          style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                        />
                        <Send className="absolute right-3 top-3 h-5 w-5 text-gray-500" />
                      </div>
                      <p 
                        className="text-xs text-gray-500 mt-2"
                        style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                      >
                        We send weekly tips on how to reduce your screen time, every Tuesday
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
                      style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                    >
                      HELP ME REDUCE MY SCREEN TIME
                    </button>
                  </form>
                </div>
                
                <div className="p-4 bg-black/20 text-center border-t border-gray-800">
                  <button
                    onClick={() => setCalculatedResults(null)}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                    style={{ fontWeight: 400, letterSpacing: '0.4px' }}
                  >
                    BACK
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScreenTimeCalculator;