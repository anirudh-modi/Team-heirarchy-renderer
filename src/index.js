import React from 'react';
import {render} from 'react-dom';
import {config} from './config/config';
import AppHeader from './components/AppHeader';
import AppBody from './components/AppBody';

const rootElement = document.getElementById('app');

class App extends React.Component
{
   render()
   {
       return (
           <div className="appContainer">
               <AppHeader title={config.title} />
               <AppBody rootNode={config.rootNode} />
           </div>
       );
   }
}

render(<App />,rootElement);
