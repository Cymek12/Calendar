import React, { useEffect, useState } from 'react';
import Scheduler from 'devextreme-react/scheduler';
import { locale, loadMessages } from 'devextreme/localization';
import plMessages from 'devextreme/localization/messages/pl.json';
import { db } from './firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import './App.css';

loadMessages(plMessages);
locale('pl');

const App = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const querySnapshot = await getDocs(collection(db, 'appointments'));
    const appointmentsData = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id, 
      startDate: doc.data().startDate.toDate(),
      endDate: doc.data().endDate.toDate(),
      description: doc.data().description || '',
      recurrenceRule: doc.data().recurrenceRule || ''
    }));
    setAppointments(appointmentsData);
  };

  const onAppointmentAdded = async (e) => {
    const newAppointment = {
      text: e.appointmentData.text || '',
      startDate: e.appointmentData.startDate,
      endDate: e.appointmentData.endDate,
      description: e.appointmentData.description || '',
      recurrenceRule: e.appointmentData.recurrenceRule || ''
    };
    await addDoc(collection(db, 'appointments'), newAppointment);
    fetchAppointments();
  };
  

  const onAppointmentUpdated = async (e) => {
    const appointmentDoc = doc(db, 'appointments', e.appointmentData.id);
    await updateDoc(appointmentDoc, {
      text: e.appointmentData.text || '',
      startDate: e.appointmentData.startDate,
      endDate: e.appointmentData.endDate,
      description: e.appointmentData.description || '',
      recurrenceRule: e.appointmentData.recurrenceRule || ''
    });
    fetchAppointments();
  };

  const onAppointmentDeleted = async (e) => {
    const appointmentDoc = doc(db, 'appointments', e.appointmentData.id);
    await deleteDoc(appointmentDoc);
    fetchAppointments();
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="App">
      <h1><b>Kalendarz</b></h1>
      <Scheduler
        dataSource={appointments}
        defaultCurrentDate={new Date()}
        adaptivityEnabled={true}
        views={[
          { type: 'day', name: 'Dzień' },
          { type: 'week', name: 'Tydzień' },
          { type: 'month', name: 'Miesiąc' }
        ]}
        defaultCurrentView="week"
        editing={{
          allowAdding: true,
          allowDeleting: true,
          allowUpdating: true
        }}
        onAppointmentAdded={onAppointmentAdded}
        onAppointmentUpdated={onAppointmentUpdated}
        onAppointmentDeleted={onAppointmentDeleted}
        timeZone="Europe/Warsaw"
        height={600}
      />
    </div>
  );
}

export default App;
