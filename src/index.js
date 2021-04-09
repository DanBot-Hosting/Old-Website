import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';
import "./styles/main.css";

const App = lazy(() => {
    return import('./App');
});

ReactDOM.render(
    <Suspense fallback={<div/>}>
        <App/>
    </Suspense>,
    document.getElementById('root')
);