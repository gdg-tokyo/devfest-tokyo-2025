import dynamic from 'next/dynamic'

const Overview = dynamic(() =>
  import('./components/Overview').then((mod) => mod.Overview)
)

export default Overview
