import dynamic from 'next/dynamic'

const Welcome = dynamic(() =>
  import('./components/Welcome').then((mod) => mod.Welcome)
)

export default Welcome
