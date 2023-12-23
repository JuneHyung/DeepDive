const Snapshot = () =>{
  const DUMMY_LIST = [];
  function handleClick(){
    Array.from({length: 10_000_000}).forEach((_, idx)=>
			DUMMY_LIST.push(Math.random()*idx)
		)
    alert('complete!')
  }
  return (
    <button onClick={handleClick}>BUG</button>
  )
}
export default Snapshot;