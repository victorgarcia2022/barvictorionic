import React from 'react';
//import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import { IonItem, IonAvatar, IonLabel, IonImg, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './ProductoItem.css';
import { Producto } from '../models/producto.model';

const ProductoItem: React.FC<{producto: Producto}> = ({producto}) => {
  return (
    <IonItem>
      <IonAvatar>
        <IonImg src={producto.imagen} />
      </IonAvatar>
      <IonLabel>
        <h2> <b>Nombre:</b> {producto.nombre}</h2>
      </IonLabel>
      <IonLabel>Valor: {producto.valor}</IonLabel>
      <IonLabel>Stock: {producto.stock}</IonLabel>
    </IonItem>
  );
};

export default ProductoItem;
