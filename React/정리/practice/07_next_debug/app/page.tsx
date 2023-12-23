import type {GetServerSidePropsContext,} from 'next'

const access_users = [];

function Home({currentDateTime}: {currentDateTime: number}){
  return <>{currentDateTime}</>
}

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const currentDateTime = new Date().getTime();
  
  access_users.push({
    user: `user-${Math.round(Math.random()*100000)}`,
    currentDateTime,
  })
  
  return {
    props: {
      currentDateTime
    }
  }
  
}

export default Home;