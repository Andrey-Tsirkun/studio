import dynamic from 'next/dynamic';

const Beams = dynamic(() => import('./BeamsComponent'), { 
  ssr: false,
  loading: () => <div style={{ width: '100%', height: '100%', background: '#000' }} />
});

export default Beams;
