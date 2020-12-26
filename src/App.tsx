import React, { useEffect } from 'react';
import './App.scss';
import Layout from './components/Layout/Layout';
import { StoreProvider } from './store/InventoryContext';
import x from '../src/img/x.svg';

const App: React.FC = () => {

    const closeInv = () => {
        // @ts-ignore
        invokeEvent('closeInventory');
    }
    const escapeDetect = (e: KeyboardEvent) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            // @ts-ignore
            invokeEvent('closeInventory');
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', escapeDetect);
        return () => document.removeEventListener('keydown', escapeDetect);
    }, [])

    return (
        <StoreProvider>
            <section className="App">
                <Layout/>
                <button className="close-button" onClick={closeInv}>
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
