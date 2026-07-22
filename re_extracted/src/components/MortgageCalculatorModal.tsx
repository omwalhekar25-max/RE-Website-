import React, { useState } from 'react';
import { X, Calculator, DollarSign, Percent, Calendar, CheckCircle } from 'lucide-react';

interface MortgageCalculatorModalProps {
  initialPrice?: number;
  onClose: () => void;
}

export const MortgageCalculatorModal: React.FC<MortgageCalculatorModalProps> = ({
  initialPrice = 5000000,
  onClose,
}) => {
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);

  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;

  // Monthly Interest Rate
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;

  // Monthly Payment Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
  const monthlyPayment =
    monthlyRate > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1)
      : loanAmount / totalPayments;

  const estimatedTax = (propertyPrice * 0.012) / 12;
  const estimatedInsurance = (propertyPrice * 0.003) / 12;
  const totalMonthly = monthlyPayment + estimatedTax + estimatedInsurance;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-[#121212] text-[#f4f4f4] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#222222]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#222222]">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-[#c5a059]/15 text-[#c5a059] border border-[#c5a059]/30 rounded-xl">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#f4f4f4]">Luxury Mortgage Calculator</h3>
              <p className="text-xs text-stone-400">Estimate your monthly payment for luxury real estate</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#1e1e1e] hover:bg-[#282828] text-stone-300 border border-[#2a2a2a] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Inputs & Result Display */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-4">
            {/* Price Slider */}
            <div>
              <label className="flex items-center justify-between text-xs font-semibold uppercase text-stone-400 mb-1">
                <span>Property Price</span>
                <span className="text-[#c5a059] font-bold">${propertyPrice.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min={1000000}
                max={30000000}
                step={250000}
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full accent-[#c5a059] cursor-pointer"
              />
            </div>

            {/* Down Payment % */}
            <div>
              <label className="flex items-center justify-between text-xs font-semibold uppercase text-stone-400 mb-1">
                <span>Down Payment ({downPaymentPercent}%)</span>
                <span className="text-[#f4f4f4] font-bold">${downPaymentAmount.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min={10}
                max={50}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-[#c5a059] cursor-pointer"
              />
            </div>

            {/* Interest Rate */}
            <div>
              <label className="flex items-center justify-between text-xs font-semibold uppercase text-stone-400 mb-1">
                <span>Interest Rate</span>
                <span className="text-[#f4f4f4] font-bold">{interestRate}%</span>
              </label>
              <input
                type="range"
                min={3.5}
                max={10.0}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-[#c5a059] cursor-pointer"
              />
            </div>

            {/* Loan Term */}
            <div>
              <label className="block text-xs font-semibold uppercase text-stone-400 mb-1">
                Loan Term (Years)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[15, 20, 30].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setLoanTermYears(term)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      loanTermYears === term
                        ? 'bg-[#c5a059] text-black border-[#c5a059]'
                        : 'bg-[#181818] text-stone-300 border-[#2a2a2a] hover:bg-[#222222]'
                    }`}
                  >
                    {term} Years
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="bg-[#181818] text-white p-6 rounded-2xl border border-[#2a2a2a] flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059]">Estimated Monthly Payment</p>
              <p className="font-serif text-3xl sm:text-4xl font-bold text-[#f4f4f4] mt-1">
                ${Math.round(totalMonthly).toLocaleString()}
                <span className="text-xs font-sans text-stone-400 font-normal"> / mo</span>
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-stone-300">
                <div className="flex justify-between py-1.5 border-b border-[#2a2a2a]">
                  <span>Principal & Interest</span>
                  <span className="font-bold text-[#f4f4f4]">${Math.round(monthlyPayment).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#2a2a2a]">
                  <span>Property Tax (Est.)</span>
                  <span className="font-bold text-[#f4f4f4]">${Math.round(estimatedTax).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#2a2a2a]">
                  <span>Homeowner Insurance</span>
                  <span className="font-bold text-[#f4f4f4]">${Math.round(estimatedInsurance).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full py-3 bg-[#c5a059] hover:bg-[#b08d46] text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
            >
              Apply Calculation & Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
