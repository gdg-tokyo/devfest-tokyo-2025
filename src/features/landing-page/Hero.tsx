import dynamic from 'next/dynamic'

const Hero = dynamic(
  () => import('./components/Hero').then((mod) => mod.Hero),
  { ssr: false }
)

export default Hero
