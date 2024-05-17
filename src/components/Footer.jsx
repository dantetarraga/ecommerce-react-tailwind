import Logo from '../assets/logo.png'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <section className='border-t-2 border-gray-200 py-5'>
      <div className='mb-5'>
        <img src={Logo} className='w-28' />
      </div>
      <p className='text-center'>&copy; {year} - Dante Tárraga.</p>
    </section>
  )
}

export default Footer
