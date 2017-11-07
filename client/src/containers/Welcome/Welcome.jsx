import React from 'react';
import Header from '../../components/Header/Header.jsx';

class Welcome extends React.Component {
    testMethod () {
        return 1;
    }

    render () {
        return(
            <div>
                <Header />
            </div>
        );
    }
}

export default Welcome;
