import React from 'react';
import { IonItem, IonAvatar, IonLabel, IonImg, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './ProductoItem.css';
import { Producto } from '../models/producto.model';

const ProductoItem: React.FC<{producto: Producto}> = ({producto}) => {
  return (
    <IonItem routerLink={`/productos/editar/${producto.id}`} detail={false}>
      <IonAvatar>
        <IonImg src={producto.imagen} />
      </IonAvatar>
      <IonLabel>
        <h2>&nbsp;&nbsp;{producto.nombre}</h2>
        <h6>&nbsp;&nbsp;Valor: <span>$ {producto.valor}</span></h6>
      </IonLabel>
    </IonItem>
  );
};

export default ProductoItem;
