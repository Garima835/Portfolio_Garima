import { Outlet } from 'react-router-dom';

function PortfolioDisplay() {
  return (
    <div>
      <h1>My Portfolio</h1>
      <Outlet /> 
    </div>
  );
}
export default PortfolioDisplay;

