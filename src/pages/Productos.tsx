import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, IonList } from '@ionic/react';
import './Productos.css';

import { Producto } from '../models/producto.model';
import ProductoItem from './../components/ProductoItem';

const Productos: React.FC = () => {

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
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {productos.map((producto, i) => <ProductoItem key={i} producto={producto}></ProductoItem> )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Productos;
