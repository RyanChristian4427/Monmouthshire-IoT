import preact, { h } from 'preact';
import * as style from './style.scss';

const Home: preact.FunctionalComponent = () => (
    <div class={style.home}>
        <h1>Home</h1>
        <p>This is the Home component.</p>
    </div>
);

export default Home;
