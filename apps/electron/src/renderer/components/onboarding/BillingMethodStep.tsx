import { cn } from "@/lib/utils"
import { Check, CreditCard, Key } from "lucide-react"
import { StepFormLayout, BackButton, ContinueButton } from "./primitives"

// OpenRouter icon component
function OpenRouterIcon({ className }: { className?: string }) {
  return (
    <svg
      fill="currentColor"
      fillRule="evenodd"
      height="1em"
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M16.804 1.957l7.22 4.105v.087L16.73 10.21l.017-2.117-.821-.03c-1.059-.028-1.611.002-2.268.11-1.064.175-2.038.577-3.147 1.352L8.345 11.03c-.284.195-.495.336-.68.455l-.515.322-.397.234.385.23.53.338c.476.314 1.17.796 2.701 1.866 1.11.775 2.083 1.177 3.147 1.352l.3.045c.694.091 1.375.094 2.825.033l.022-2.159 7.22 4.105v.087L16.589 22l.014-1.862-.635.022c-1.386.042-2.137.002-3.138-.162-1.694-.28-3.26-.926-4.881-2.059l-2.158-1.5a21.997 21.997 0 00-.755-.498l-.467-.28a55.927 55.927 0 00-.76-.43C2.908 14.73.563 14.116 0 14.116V9.888l.14.004c.564-.007 2.91-.622 3.809-1.124l1.016-.58.438-.274c.428-.28 1.072-.726 2.686-1.853 1.621-1.133 3.186-1.78 4.881-2.059 1.152-.19 1.974-.213 3.814-.138l.02-1.907z" />
    </svg>
  )
}

export type BillingMethod = 'api_key' | 'claude_oauth' | 'openrouter'

interface BillingOption {
  id: BillingMethod
  name: string
  description: string
  icon: React.ReactNode
  recommended?: boolean
}

const BILLING_OPTIONS: BillingOption[] = [
  {
    id: 'claude_oauth',
    name: 'Claude Pro/Max',
    description: 'Use your Claude subscription for unlimited access.',
    icon: <CreditCard className="size-4" />,
    recommended: true,
  },
  {
    id: 'api_key',
    name: 'Anthropic API Key',
    description: 'Pay-as-you-go with your own API key.',
    icon: <Key className="size-4" />,
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    description: 'Access multiple AI models through OpenRouter.',
    icon: <OpenRouterIcon className="size-4" />,
  },
]

interface BillingMethodStepProps {
  selectedMethod: BillingMethod | null
  onSelect: (method: BillingMethod) => void
  onContinue: () => void
  onBack: () => void
}

/**
 * BillingMethodStep - Choose how to pay for AI usage
 *
 * Three options:
 * - Claude Pro/Max (recommended) - Uses Claude subscription
 * - API Key - Pay-as-you-go via Anthropic
 * - OpenRouter - Access multiple AI models through OpenRouter
 */
export function BillingMethodStep({
  selectedMethod,
  onSelect,
  onContinue,
  onBack
}: BillingMethodStepProps) {
  return (
    <StepFormLayout
      title="Choose Billing Method"
      description="Select how you'd like to power your AI agents."
      actions={
        <>
          <BackButton onClick={onBack} />
          <ContinueButton onClick={onContinue} disabled={!selectedMethod} />
        </>
      }
    >
      {/* Options */}
      <div className="space-y-3">
        {BILLING_OPTIONS.map((option) => {
          const isSelected = option.id === selectedMethod

          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={cn(
                "flex w-full items-start gap-4 rounded-xl p-4 text-left transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "hover:bg-foreground/[0.02] shadow-minimal",
                isSelected
                  ? "bg-background"
                  : "bg-foreground-2"
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-lg",
                  isSelected ? "bg-foreground/10 text-foreground" : "bg-muted text-muted-foreground"
                )}
              >
                {option.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{option.name}</span>
                  {option.recommended && (
                    <span className="bg-foreground/5 px-2 py-0.5 text-[11px] font-medium text-foreground/70">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {option.description}
                </p>
              </div>

              {/* Check */}
              <div
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  isSelected
                    ? "border-foreground bg-foreground text-background"
                    : "border-muted-foreground/20"
                )}
              >
                {isSelected && <Check className="size-3" strokeWidth={3} />}
              </div>
            </button>
          )
        })}
      </div>
    </StepFormLayout>
  )
}
