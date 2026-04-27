import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StepTimeSelection from '../components/booking/StepTimeSelection';
import StepReviewData from '../components/booking/StepReviewData';
import StepPayment from '../components/booking/StepPayment';
import StepConfirmation from '../components/booking/StepConfirmation';

const STEPS = [
  { id: 1, label: 'Pilih Waktu', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )},
  { id: 2, label: 'Data Pemesan', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )},
  { id: 3, label: 'Pembayaran', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  )},
  { id: 4, label: 'Konfirmasi', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22,4 12,14.01 9,11.01" />
    </svg>
  )},
];

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: null,
    slots: [],
    customer: {},
    paymentMethod: 'bank_transfer',
  });

  const goNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#060d1f] font-sans antialiased text-gray-300 flex flex-col min-h-screen">
      <Navbar className="bg-[#060d1f] border-b border-white/10 sticky top-0 z-50" />

      {/* Stepper */}
      <div className="bg-[#060d1f] border-b border-white/10 pt-24 pb-8">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <React.Fragment key={step.id}>
                {/* Step circle + label */}
                <div className="flex flex-col items-center relative">
                  <div
                    className={`
                      w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 
                      ${currentStep > step.id
                        ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
                        : currentStep === step.id
                          ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30 ring-4 ring-brand-600/20'
                          : 'bg-white/5 text-gray-600 border border-white/10'
                      }
                    `}
                  >
                    {currentStep > step.id ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span className={`text-xs font-semibold mt-2.5 whitespace-nowrap transition-colors ${
                    currentStep >= step.id ? 'text-white' : 'text-gray-600'
                  }`}>
                    {step.label}
                  </span>
                </div>

                {/* Connector line */}
                {index < STEPS.length - 1 && (
                  <div className="flex-1 mx-4 h-0.5 rounded-full relative -mt-6">
                    <div className="absolute inset-0 bg-white/10 rounded-full" />
                    <div
                      className="absolute inset-y-0 left-0 bg-brand-600 rounded-full transition-all duration-500"
                      style={{ width: currentStep > step.id ? '100%' : '0%' }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-8 py-8 md:py-12">
        {currentStep === 1 && (
          <StepTimeSelection
            bookingData={bookingData}
            setBookingData={setBookingData}
            onNext={goNext}
          />
        )}
        {currentStep === 2 && (
          <StepReviewData
            bookingData={bookingData}
            setBookingData={setBookingData}
            onNext={goNext}
            onBack={goBack}
          />
        )}
        {currentStep === 3 && (
          <StepPayment
            bookingData={bookingData}
            setBookingData={setBookingData}
            onNext={goNext}
            onBack={goBack}
          />
        )}
        {currentStep === 4 && (
          <StepConfirmation bookingData={bookingData} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
