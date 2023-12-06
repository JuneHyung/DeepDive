export default function Hello(){
  console.log(typeof window === 'undefined' ? 'server' : 'client')
  return (
    <>
      hello
    </>
  )
}

export const getServerSideProps = () =>{
  return {
    props: {},
  }
}
