import React, { useState } from 'react';
import { IonContent, IonItem, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, IonButton, IonList, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add, documentTextSharp } from 'ionicons/icons';
import {
  useHistory
} from "react-router-dom";

import { Producto } from '../models/producto.model';
import ProductoItem from './../components/ProductoItem';

const Productos: React.FC = () => {

  let history = useHistory();

  const [productos, setProductos] = useState<Producto[]>([]);

  useIonViewDidEnter(async() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    const result = await fetch('http://localhost:5000/api/productos', requestOptions)
    const data = await result.json()
    setProductos(data.productos)
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Productos</IonTitle>
          <IonButton slot="end" onClick={() => history.replace('/productos/crear') }>
            <IonIcon slot="icon-only" icon={add} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => history.replace('/pedidos')}>
          <IonIcon icon={documentTextSharp} />
        </IonFabButton>
      </IonFab>
      <IonContent fullscreen>
        <IonList>
          {productos.map((producto, i) => <ProductoItem key={i} producto={producto}></ProductoItem> )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Productos;
