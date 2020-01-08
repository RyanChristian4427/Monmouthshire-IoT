import React from 'react';
import {Link} from 'react-router-dom';
import {HeroHeader} from 'components/HeroHeader';

import './Errors.scss';

export const PageNotFound: React.FC = () => {
    return (
        <div className="error-page">
           <HeroHeader title="Sorry" subtitle="This page does not yet exist" withSettingsMenu={false}/>
            <section className="card">
                <div className="level" id="layered-background">
                    <Link className="button is-whitesmoke-light level-item" to="/login">Back to Safety</Link>
                </div>
            </section>
        </div>
    );
};
