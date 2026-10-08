import Armani from '../../assets/brands/armani.svg'
import Chanel from '../../assets/brands/chanel.svg'
import DolceGabbana from '../../assets/brands/dolce-gabbana.svg'
import GiorgioArmani from '../../assets/brands/giorgio-armani.svg'
import Gucci from '../../assets/brands/gucci.svg'
import Prada from '../../assets/brands/prada.svg'

const BRANDS = [
  { name: 'Prada', logo: Prada },
  { name: 'Gucci', logo: Gucci },
  { name: 'Chanel', logo: Chanel },
  { name: 'Armani', logo: Armani },
  { name: 'Dolce & Gabbana', logo: DolceGabbana },
  { name: 'Giorgio Armani', logo: GiorgioArmani }
]

const BrandMarquee = () => {
  return (
    <section aria-label='Featured brands' className='py-10 md:py-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]'>
      <ul className='flex w-max animate-scroll hover:[animation-play-state:paused]'>
        {[...BRANDS, ...BRANDS].map((brand, index) => (
          <li key={index} className='flex w-36 md:w-52 shrink-0 items-center justify-center px-6' aria-hidden={index >= BRANDS.length}>
            <img src={brand.logo} alt={brand.name} className='h-10 md:h-14 w-full object-contain opacity-60 grayscale transition hover:opacity-100' loading='lazy' />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default BrandMarquee
