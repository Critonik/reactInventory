import React from 'react';
import './App.scss';
import Layout from './components/Layout/Layout';
import { StoreProvider } from './store/InventoryContext';
import x from '../src/img/x.svg';

const App: React.FC = () => {
    return (
        <StoreProvider>
            <section className="App">
                <Layout/>
                <button className="close-button">
                    <img src={x} className="cross" alt={'close'}/>
                    <span className="close-button-text">
                        Закрыть
                    </span>
                </button>
            </section>
        </StoreProvider>
    );
}

export default App;
