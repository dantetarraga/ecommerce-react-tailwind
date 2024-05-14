import Armani from '../../assets/brands/armani.svg'
import Chanel from '../../assets/brands/chanel.svg'
import DolceGabbana from '../../assets/brands/dolce-gabbana.svg'
import GiorgioArmani from '../../assets/brands/giorgio-armani.svg'
import Gucci from '../../assets/brands/gucci.svg'
import Prada from '../../assets/brands/prada.svg'

const BRANDS = [
  { id: 1, name: 'Prada', brand: Prada },
  { id: 2, name: 'Gucci', brand: Gucci },
  { id: 3, name: 'Chanel', brand: Chanel },
  { id: 4, name: 'Armani', brand: Armani },
  { id: 5, name: 'Dolce Gabbana', brand: DolceGabbana },
  { id: 6, name: 'Giorgio Armani', brand: GiorgioArmani }
]

const BrandCarousel = () => {
  const brands = [...BRANDS, ...BRANDS]

  return (
    <div className='overflow-hidden'>
      <div className='grid grid-flow-col auto-cols-[15rem] items-center animate-scroll'>
        {
          brands.map((brand, index) => (
            <div key={index} className='w-4/5'>
              <img src={brand.brand} alt={brand.name} className='w-full' />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default BrandCarousel
