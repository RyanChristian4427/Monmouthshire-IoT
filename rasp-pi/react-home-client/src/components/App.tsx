import React from 'react';

import {HeroHeader} from 'components/HeroHeader';
import './App.scss';

const App: React.FC = () => {
  return (
      <div className="home-page">
        <HeroHeader title="Home" withSettingsMenu={true}/>
        <section className="card">
          <div className="container" id="layered-background">
            <h3>Lorem Ipsum</h3>
          </div>
        </section>
      </div>
  );
};

export default App;
