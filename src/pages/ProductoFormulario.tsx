import React, { Mixin, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillEnter, IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/react';
import {
  useHistory
} from "react-router-dom";
import { useParams } from 'react-router';

const ProductoFormulario: React.FC = () => {

  const params = useParams<{ id: string }>();

  var [producto, setProducto] = useState({
    id: 0,
    nombre:  '',
    valor: '',
    imagen:  '',
    stock: 0,
    sede_id: 1
  });

  var [title, setTitle] = useState('')

  useIonViewWillEnter(async() => {
    if( params.id ){
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
      const result = await fetch('http://localhost:5000/api/productos/'+parseInt(params.id), requestOptions)
      const data = await result.json()
      setProducto({
        id: data.id,
        nombre: data.nombre,
        valor: data.valor,
        imagen: data.imagen,
        stock: data.stock,
        sede_id: data.sede_id,
      })
      setTitle('Editar')
    }else{
      setProducto({
        id: 0,
        nombre:  '',
        valor: '',
        imagen:  '',
        stock: 0,
        sede_id: 1
      })
      setTitle('Crear')
    }
  })

  let history = useHistory();

  const handleChange = (name:string, value:any) => setProducto({...producto, [name]: value })

  const guardarProducto = async () => {
    try {
      if( producto.id > 0 ){
        const requestOptions = {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            nombre: producto.nombre,
            valor: producto.valor,
            imagen: producto.imagen,
            stock: producto.stock,
            sede_id: producto.sede_id,
          })
        };
        const result = await fetch('http://localhost:5000/api/productos/'+params.id, requestOptions)
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
            body: JSON.stringify({
              nombre: producto.nombre,
              valor: producto.valor,
              imagen: producto.imagen,
              stock: producto.stock,
              sede_id: producto.sede_id,
            })
          };
          const result = await fetch('http://localhost:5000/api/productos', requestOptions)
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
    history.replace('/productos');
  }

  const eliminarProducto = async () => {
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      };
      const result = await fetch('http://localhost:5000/api/productos/'+producto.id, requestOptions)
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title} Producto</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel position="floating">Nombre:</IonLabel>
          <IonInput value={producto.nombre} onIonChange={e => handleChange('nombre', e.detail.value||'')}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Valor:</IonLabel>
          <IonInput value={producto.valor} onIonChange={e => handleChange('valor', e.detail.value||'')} type="number"></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Imagen:</IonLabel>
          <IonInput value={producto.imagen} onIonChange={e => handleChange('imagen', e.detail.value||'')}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Stock:</IonLabel>
          <IonInput value={producto.stock} onIonChange={e => handleChange('stock', e.detail.value||'')} type="number"></IonInput>
        </IonItem>
        <IonButton color="success" expand="full" onClick={ () => guardarProducto() }>{title}</IonButton>
        { producto.id ? (
          <IonButton color="danger" expand="full" onClick={ () => eliminarProducto() }>Eliminar</IonButton>
        ) :
          <></>
        }
        <IonButton color="medium" expand="full" onClick={ () => volver()}>Volver</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ProductoFormulario;
