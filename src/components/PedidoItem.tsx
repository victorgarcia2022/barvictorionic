import React from 'react';
import { IonItem, IonAvatar, IonLabel, IonImg, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './PedidoItem.css';
import { Pedido } from '../models/pedido.model';

const PedidoItem: React.FC<{pedido: Pedido}> = ({pedido}) => {

  let items = [], myjson;
  myjson = JSON.stringify(pedido.descripcion)
  myjson = JSON.parse(myjson)
  for ( let i=0; i < myjson.length; i++ ){
    items.push(<span key={i}>&nbsp;&nbsp;- {myjson[i].nombre} Valor: {myjson[i].valor}<br/></span>);
  }

  return (
    <IonItem routerLink={`/pedidos/editar/${pedido.id}`} detail={false}>
      <IonAvatar>
        <IonImg src="https://media.istockphoto.com/vectors/business-meeting-discussion-teamwork-activity-people-around-the-table-vector-id1145493140?k=20&m=1145493140&s=612x612&w=0&h=8JZRhsrOO4QtMSRyOKAosWXlKnHHJRrq2HtBVgCN_Ho=" />
      </IonAvatar>
      <IonLabel>
        <h2>&nbsp;&nbsp;Mesa N° : {pedido.mesa}</h2>
        <h5>&nbsp;&nbsp;Descripción: <br/>
        
        </h5>
        <h6>&nbsp;&nbsp;Total: <span>$ {pedido.total}</span></h6>
      </IonLabel>
    </IonItem>
  );
};

export default PedidoItem;

