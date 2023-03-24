const General = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='title'>Time Settings</div>
        <ul>
          <li>Time Format 12h or 24h</li>
          <li>Date Setting MM-DD-YY or DD-MM-YY</li>
          <li>Week starts on Sat - Sun - Mon </li>
        </ul>
      </div>
      <div className='row'>
        <div className='title'>Language Settings</div>
        <ul>
          <li>Eng</li>
          <li>Esp</li>
          <li>etc...</li>
        </ul>
      </div>
      <style jsx>
        {`
          .container {
            text-align: left;
          }
        `}
      </style>
    </div>
  );
};

export default General;
