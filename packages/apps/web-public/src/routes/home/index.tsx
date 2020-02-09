import preact, { h } from 'preact';

import Footer from 'components/Footer';
import Navbar from 'components/Navbar';

import './style.scss';

const Home: preact.FunctionalComponent = () => {
    return (
        <div class="home-page">
            <section class="hero is-fullheight is-default is-bold">
                <div class="hero-head">
                    <Navbar />
                </div>
                <div class="hero-body">
                    <div class="container has-text-centered">
                        <div class="columns is-vcentered">
                            <div class="column is-5">
                                <figure class="image">
                                    <img src="https://picsum.photos/800/600/?random" alt="Description" />
                                </figure>
                            </div>
                            <div class="column is-6 is-offset-1">
                                <h1 class="title is-2">Superhero Scaffolding</h1>
                                <h2 class="subtitle is-4">Let this cover page describe a product or service.</h2>
                                <br />
                                <p class="has-text-centered">
                                    <a class="button is-medium is-info is-outlined">Learn more</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        </div>
    );
};

export default Home;
