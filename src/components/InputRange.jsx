import { Range } from 'react-range'

export const PRICE_MIN = 0
export const PRICE_MAX = 1000
const THUMB_LABELS = ['Minimum price', 'Maximum price']

const InputRange = ({ values, onChange, onFinalChange }) => {
  return (
    <Range
      step={1}
      min={PRICE_MIN}
      max={PRICE_MAX}
      values={values}
      onChange={onChange}
      onFinalChange={onFinalChange}
      renderTrack={({ props, children }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          className='flex h-6 w-full items-center'
          style={props.style}
        >
          <div ref={props.ref} className='relative h-1 w-full rounded-full bg-surface-sunken'>
            <div
              className='absolute h-1 rounded-full bg-ink'
              style={{
                left: `${((values[0] - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
                width: `${((values[1] - values[0]) / (PRICE_MAX - PRICE_MIN)) * 100}%`
              }}
            />
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props, index }) => {
        const { key, ...restProps } = props
        return (
          <div
            key={key}
            {...restProps}
            aria-label={THUMB_LABELS[index]}
            data-testid={`price-thumb-${index}`}
            className='h-5 w-5 rounded-full border-2 border-ink bg-white shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500'
            style={restProps.style}
          />
        )
      }}
    />
  )
}

export default InputRange
