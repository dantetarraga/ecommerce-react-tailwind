import { HiMinus, HiPlus } from 'react-icons/hi2'

const SIZES = {
  sm: { wrapper: 'h-9', button: 'w-9', value: 'w-8 text-sm' },
  md: { wrapper: 'h-12', button: 'w-11', value: 'w-10' }
}

const QuantityStepper = ({ value, onDecrement, onIncrement, disableDecrement, disabled, size = 'md', testIds }) => {
  const styles = SIZES[size]
  const buttonClass = `${styles.button} h-full flex items-center justify-center text-ink hover:bg-surface-muted disabled:text-gray-300 disabled:hover:bg-transparent`

  return (
    <div className={`inline-flex items-center rounded-full border border-line bg-white overflow-hidden ${styles.wrapper}`}>
      <button
        type='button'
        aria-label='Decrease quantity'
        data-testid={testIds.decrement}
        onClick={onDecrement}
        disabled={disabled || disableDecrement}
        className={buttonClass}
      >
        <HiMinus />
      </button>
      <span className={`${styles.value} text-center font-semibold tabular-nums`} data-testid={testIds.value} aria-live='polite'>
        {value}
      </span>
      <button
        type='button'
        aria-label='Increase quantity'
        data-testid={testIds.increment}
        onClick={onIncrement}
        disabled={disabled}
        className={buttonClass}
      >
        <HiPlus />
      </button>
    </div>
  )
}

export default QuantityStepper
