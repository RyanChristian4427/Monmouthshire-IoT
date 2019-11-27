import React from 'react';

import {HeroHeader} from 'components/HeroHeader';
import './App.scss';

const App: React.FC = () => {
    let isLoading = true;

    return (
      <div className="home-page">
        <HeroHeader title="Home"/>
        <section className="card">
          <div className={"container " + (isLoading ? "is-loading" : "")} id="layered-background">
            <h3>Lorem Ipsum</h3>
          </div>
        </section>
      </div>
    );
};

export default App;
