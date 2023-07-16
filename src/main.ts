import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

const firebaseConfig = {
  apiKey: 'AIzaSyCBdnMEVMKLDLpB885uwllFCiv4aeriQqM',
  authDomain: 'digiturno-usco.firebaseapp.com',
  projectId: 'digiturno-usco',
  storageBucket: 'digiturno-usco.appspot.com',
  messagingSenderId: '636697429259',
  appId: '1:636697429259:web:030f55b76113768a7b4e0e',
  measurementId: 'G-Y3XWLBVQGX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
