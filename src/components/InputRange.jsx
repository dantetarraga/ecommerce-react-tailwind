import React, { useState } from 'react'
import { Range } from 'react-range'

const InputRange = ({ values, setValues }) => {
  const [isDragged, setIsDragged] = useState(false)

  // console.log(isDragged)

  return (
    <Range
      step={1}
      min={5}
      max={1000}
      values={values}
      onChange={(newValues) => setValues(newValues)}
      renderTrack={({ props, children, isDragged }) => (
        <div
          {...props}
          onTouchStart={() => console.log(isDragged)}
          onTouchEnd={() => console.log(isDragged)}
          style={{
            ...props.style,
            height: '4px',
            width: '100%',
            backgroundColor: '#000',
            position: 'relative'
          }}
        >
          <div
            style={{
              position: 'absolute',
              height: '6px',
              background: '#000',
              borderRadius: '4px',
              left: `${((values[0] - props.min) / (props.max - props.min)) * 100}%`,
              width: `${((values[1] - values[0]) / (props.max - props.min)) * 100}%`
            }}
          />
          {children}
        </div>
      )}
      renderThumb={({ props }) => {
        const { key, ...restProps } = props
        return (
          <div
            key={key}
            {...restProps}
            style={{
              ...restProps.style,
              height: '15px',
              width: '15px',
              backgroundColor: '#000',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 'none'
            }}
          />
        )
      }}
    />
  )
}

export default InputRange
