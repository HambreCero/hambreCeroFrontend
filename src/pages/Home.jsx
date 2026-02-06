import manossujetandotomate from '../utils/manossujetandotomate.jpg';
export default function Home() {
  
  return (
    <>
    <div>
      <h1>Hambre Cero</h1>
      <p>Frontend running OK</p>
    </div>

    <div style={{
      position: 'relative',
      backgroundImage: `url(${manossujetandotomate})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden'
    }}> </div>
    </>
  );
}