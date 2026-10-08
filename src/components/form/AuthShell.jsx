const AuthShell = ({ title, subtitle, image, children }) => (
  <section className='container py-8 md:py-14'>
    <div className='grid overflow-hidden rounded-3xl border border-line bg-white lg:grid-cols-2'>
      <div className='relative hidden lg:block'>
        <img src={image} alt='' className='absolute inset-0 h-full w-full object-cover' />
        <div className='absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent' />
        <p className='absolute bottom-10 left-10 right-10 font-display text-3xl font-semibold text-white leading-tight'>
          New season, new looks. Up to 40% off this month.
        </p>
      </div>

      <div className='flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-16'>
        <div className='mx-auto w-full max-w-md'>
          <h1 className='font-display text-3xl md:text-4xl font-semibold tracking-tight'>{title}</h1>
          {subtitle && <p className='mt-2 text-gray-500'>{subtitle}</p>}
          <div className='mt-8'>{children}</div>
        </div>
      </div>
    </div>
  </section>
)

export default AuthShell
