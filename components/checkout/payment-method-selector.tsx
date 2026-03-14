'use client'

import { paymentMethods } from '@/lib/data'
import { QrCode, Wallet, Building, CreditCard, ChevronRight } from 'lucide-react'
import type { PaymentMethod, EwalletType, BankCode } from '@/types'

const methodIcons: Record<PaymentMethod, React.ElementType> = {
  qris: QrCode,
  ewallet: Wallet,
  bank_transfer: Building,
  credit_card: CreditCard,
}

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod | null
  onSelectMethod: (method: PaymentMethod) => void
  selectedEwallet: EwalletType | null
  onSelectEwallet: (ewallet: EwalletType) => void
  selectedBank: BankCode | null
  onSelectBank: (bank: BankCode) => void
}

export function PaymentMethodSelector({
  selectedMethod,
  onSelectMethod,
  selectedEwallet,
  onSelectEwallet,
  selectedBank,
  onSelectBank,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Payment Method
      </h3>
      
      {/* Main payment methods */}
      <div className="space-y-3">
        {(Object.entries(paymentMethods) as [PaymentMethod, typeof paymentMethods[keyof typeof paymentMethods]][]).map(([key, method]) => {
          const Icon = methodIcons[key]
          const isSelected = selectedMethod === key
          
          return (
            <div key={key}>
              <button
                type="button"
                onClick={() => onSelectMethod(key)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? 'bg-primary/10 border-primary'
                    : 'bg-card border-border hover:border-primary/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isSelected ? 'bg-primary/20' : 'bg-secondary'
                }`}>
                  <Icon className={`h-5 w-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div className="flex-1 text-left">
                  <p className={`font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                    {method.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {method.description}
                  </p>
                </div>
                <ChevronRight className={`h-5 w-5 transition-transform ${
                  isSelected ? 'rotate-90 text-primary' : 'text-muted-foreground'
                }`} />
              </button>
              
              {/* E-wallet options */}
              {isSelected && key === 'ewallet' && 'options' in method && (
                <div className="mt-3 ml-4 pl-4 border-l-2 border-primary/30 space-y-2">
                  {method.options.map((ewallet) => (
                    <button
                      key={ewallet}
                      type="button"
                      onClick={() => onSelectEwallet(ewallet as EwalletType)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                        selectedEwallet === ewallet
                          ? 'bg-primary/10 border-primary'
                          : 'bg-card border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">
                        {ewallet.charAt(0)}
                      </div>
                      <span className={selectedEwallet === ewallet ? 'text-primary' : 'text-foreground'}>
                        {ewallet}
                      </span>
                    </button>
                  ))}
                </div>
              )}
              
              {/* Bank transfer options */}
              {isSelected && key === 'bank_transfer' && 'options' in method && (
                <div className="mt-3 ml-4 pl-4 border-l-2 border-primary/30 space-y-2">
                  {method.options.map((bank) => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => onSelectBank(bank as BankCode)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                        selectedBank === bank
                          ? 'bg-primary/10 border-primary'
                          : 'bg-card border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">
                        {bank.slice(0, 3)}
                      </div>
                      <span className={selectedBank === bank ? 'text-primary' : 'text-foreground'}>
                        Bank {bank}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
