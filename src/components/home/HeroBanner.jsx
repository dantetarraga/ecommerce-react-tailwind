import { HiArrowRight } from 'react-icons/hi2'
import Button from '../ui/Button'

const HeroBanner = () => {
  return (
    <section className='container pt-4 md:pt-6'>
      <div className='relative flex flex-col overflow-hidden rounded-3xl bg-accent-400'>
        <picture>
          <source media='(min-width: 768px)' srcSet='/banner.webp' />
          <img
            src='/banner-mobile.webp'
            alt='Two smiling people wearing casual summer outfits'
            className='h-72 sm:h-96 md:h-[560px] w-full object-cover object-top md:object-right'
            fetchpriority='high'
          />
        </picture>

        <div className='absolute inset-0 hidden md:block bg-gradient-to-r from-accent-500/95 via-accent-400/50 to-transparent' />

        <div className='relative md:absolute md:inset-y-0 md:left-0 flex flex-col justify-center gap-5 p-6 pt-8 md:p-14 lg:p-20 md:max-w-xl text-ink'>
          <p className='text-xs font-semibold uppercase tracking-[0.25em]'>New season collection</p>
          <h1 className='font-display text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight'>
            Style that moves with you
          </h1>
          <p className='text-base md:text-lg'>
            Clothing, jewelry and electronics with up to <strong>40% off</strong> this month.
          </p>
          <div className='flex flex-wrap gap-3 pt-2'>
            <Button to='/shop' size='lg' data-testid='hero-shop-now'>
              Shop now
              <HiArrowRight />
            </Button>
            <Button to='/register' size='lg' variant='light' className='bg-white/70'>
              Create account
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
