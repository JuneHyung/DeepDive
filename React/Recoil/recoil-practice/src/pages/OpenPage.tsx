import { Link } from "react-router-dom";

const OpenPage = () => {
  return (
    <div className="open-page">
      <h1>Let's See Layout</h1>
      <ul>
        <li>
          <Link to="/page01">Layout01</Link>
        </li>
      </ul>
    </div>
  );
};

export default OpenPage;
