import React, { useState } from 'react';
import { IonContent, IonItem, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, IonButton, IonList, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add, fastFoodSharp } from 'ionicons/icons';
import {
  useHistory
} from "react-router-dom";

import { Pedido } from '../models/pedido.model';
import PedidoItem from './../components/PedidoItem';

const Pedidos: React.FC = () => {

  let history = useHistory();

  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useIonViewDidEnter(async() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    const result = await fetch('http://localhost:5000/api/pedidos', requestOptions)
    const data = await result.json()
    setPedidos(data.pedidos)
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pedidos</IonTitle>
          <IonButton slot="end" onClick={() => history.replace('/pedidos/crear') }>
            <IonIcon slot="icon-only" icon={add} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => history.replace('/productos')}>
          <IonIcon icon={fastFoodSharp} />
        </IonFabButton>
      </IonFab>
      <IonContent fullscreen>
        <IonList>
          {pedidos.map((pedido, i) => <PedidoItem key={i} pedido={pedido}></PedidoItem> )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Pedidos;
