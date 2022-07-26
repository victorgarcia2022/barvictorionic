import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';
import Productos from './pages/Productos';
import ProductoFormulario from './pages/ProductoFormulario';
import Pedidos from './pages/Pedidos';
import PedidoFormulario from './pages/PedidoFormulario';

setupIonicReact();

const App: React.FC = () => {  
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact={true}>
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/productos">
            <Productos />
          </Route>
          <Route exact path="/productos/crear">
            <ProductoFormulario />
          </Route>
          <Route exact path="/productos/editar/:id">
            <ProductoFormulario />
          </Route>
          <Route exact path="/pedidos">
            <Pedidos />
          </Route>
          <Route exact path="/pedidos/crear">
            <PedidoFormulario />
          </Route>
          <Route exact path="/pedidos/editar/:id">
            <PedidoFormulario />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
    )
  };

export default App;
