import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItemDivider, IonItem, IonInput, IonLabel, IonButton } from '@ionic/react';
import React, { useState } from 'react';
import {
  useHistory
} from "react-router-dom";

const Login: React.FC = () => {
  //const [text, setText] = useState<string>();
  let history = useHistory();

  const [logUsuario, setLogUsuario] = useState({
		email: 'admin@correo.com',
		password: 'Qaws12pj-22',
	})
	const handleChangeUsuario = (name:string, value:string) => setLogUsuario({...logUsuario, [name]: value })
    
  const authenticateUser = async  (email: string, password: string) : Promise<boolean> => {
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    };
    const result = await fetch('http://localhost:5000/api/usuarios/login', requestOptions)
    const data = await result.json()

    if(data.token){
      history.replace('/productos');
      return true
    }else{
      alert('Usuario o contraseña incorrecta')
      return false
    }

  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonLabel position="floating">Correo</IonLabel>
            <IonInput value={logUsuario.email} onIonChange={e => handleChangeUsuario('email', e.detail.value||'')} ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput value={logUsuario.password} type='password' onIonChange={e => handleChangeUsuario('password', e.detail.value||'')} ></IonInput>
          </IonItem>
          <IonButton color="primary" expand="full" onClick={ () => authenticateUser(logUsuario.email, logUsuario.password) }>Iniciar Session</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Login;
