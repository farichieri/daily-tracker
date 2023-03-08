import { selectSidebarState } from 'store/slices/layoutSlice';
import { useSelector } from 'react-redux';

const PremiumSidebar = () => {
  const sidebarState = useSelector(selectSidebarState);

  return (
    <div className={`sidebar ${sidebarState ? 'open' : ''}`}>
      <p>Myself</p>
      <p>Project</p>
      <p>Or team</p>
      <style jsx>{`
        .sidebar {
          height: 100%;
          min-height: 100vh;
          background: var(--gray-color);
          width: 200px;
          position: absolute;
          left: -200px;
          transition: all 0.3s;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          z-index: 999;
          border-right: 1px solid var(--box-shadow-light);
        }
        .sidebar.open {
          left: 0;
          transition: all 0.3s;
        }
      `}</style>
    </div>
  );
};

export default PremiumSidebar;
