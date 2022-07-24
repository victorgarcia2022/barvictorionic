import React, {useState, useRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillEnter, IonItem, IonLabel, IonInput, IonButton, IonModal
, IonButtons } from '@ionic/react';
import {
  useHistory
} from "react-router-dom";
import { useParams } from 'react-router';
import { OverlayEventDetail } from '@ionic/core/components';

const PedidoFormulario: React.FC = () => {

  const params = useParams<{ id: string }>();

  var [pedido, setPedido] = useState({
    id: 0,
    mesa:  0,
    descripcion: [],
    total:  0,
    usuario_id: 1,
    sede_id: 1,
  });

  var [ productos, setProductos ] = useState([]);

  var [title, setTitle] = useState('')

  useIonViewWillEnter(async() => {
    if( params.id ){
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
      const result = await fetch('http://localhost:5000/api/pedidos/'+parseInt(params.id), requestOptions)
      const data = await result.json()
      setPedido({
        id: data.id,
        mesa:  data.mesa,
        descripcion: data.descripcion,
        total:  data.total,
        usuario_id: data.usuario_id,
        sede_id: data.sede_id,
      })
      setTitle('Editar')
    }else{
      setPedido({
        id: 0,
        mesa:  0,
        descripcion: [],
        total:  0,
        usuario_id: 1,
        sede_id: 1,
      })
      setTitle('Crear')
    }
  })

  let history = useHistory();

  const handleChange = (name:string, value:any) => setPedido({...pedido, [name]: value })

  const guardarPedido = async () => {
    const datos = {
      mesa:  pedido.mesa,
      descripcion: pedido.descripcion,
      total:  pedido.total,
      usuario_id: pedido.usuario_id,
      sede_id: pedido.sede_id
    }
    try {
      if( pedido.id > 0 ){
        const requestOptions = {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
        };
        const result = await fetch('http://localhost:5000/api/pedidos/'+params.id, requestOptions)
        const data = await result.json()
        if( data.mensaje ){
          alert(data.mensaje)
        }else{
          alert(data.error)
        }
      }else{
        try {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
          };
          const result = await fetch('http://localhost:5000/api/pedidos', requestOptions)
          const data = await result.json()
          if( data.mensaje ){
            alert(data.mensaje)
          }else{
            alert(data.error)
          }
        } catch (error) {
          console.log(error)
        }
      }
      volver()
    } catch (error) {
    	console.log(error)
    }
	}

  const volver = ()=>{
    history.replace('/pedidos');
  }

  const eliminarPedido = async () => {
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      };
      const result = await fetch('http://localhost:5000/api/pedidos/'+pedido.id, requestOptions)
      const data = await result.json()
      if( data.mensaje ){
        alert(data.mensaje)
      }else{
        alert(data.error)
      }
    } catch (error) {
      console.log(error)
    }
    volver()
  }

  //modal CODE 
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const input2 = useRef<HTMLIonInputElement>(null);

  const [message, setMessage] = useState(
    'This modal example uses triggers to automatically open a modal when the button is clicked.'
  );

  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
      console.log(ev.detail)
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title} Pedido</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel position="floating">Mesa:</IonLabel>
          <IonInput value={pedido.mesa} onIonChange={e => handleChange('mesa', e.detail.value||'')}></IonInput>
        </IonItem>
        <IonButton id="open-modal" expand="block">
          Agregar Productos
        </IonButton>
        <p>{message}</p>
        <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Welcome</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="stacked">Enter your name</IonLabel>
              <IonInput ref={input} type="text" placeholder="Your name" />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Enter your other</IonLabel>
              <IonInput ref={input2} type="text" placeholder="Your other" />
            </IonItem>
          </IonContent>
        </IonModal>
        <IonItem>
          {productos}
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Total:</IonLabel>
          <IonInput value={pedido.total} onIonChange={e => handleChange('stock', e.detail.value||'')} type="number"></IonInput>
        </IonItem>
        <IonButton color="success" expand="full" onClick={ () => guardarPedido() }>{title}</IonButton>
        { pedido.id ? (
          <IonButton color="danger" expand="full" onClick={ () => eliminarPedido() }>Eliminar</IonButton>
        ) :
          <></>
        }
        <IonButton color="medium" expand="full" onClick={ () => volver()}>Volver</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PedidoFormulario;
