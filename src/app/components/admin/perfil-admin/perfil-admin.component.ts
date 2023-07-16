import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FirebaseFileService } from 'src/app/services/firebase-file.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.css'],
})
export class PerfilAdminComponent implements OnInit {
  uid: string = '';
  nameFile = '...';
  file!: FileList;
  fotoCarnet: any = {
    url: 'assets/carnet-f.png',
  };
  foto: any = {
    url: 'assets/carnet-f.png',
  };
  formPerfil!: FormGroup;

  //FILE FIREBASE
  // CARGA DE ARCHIVOS A FIRESTORE
  public mensajeArchivo = 'No hay un archivo';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public finalizado = false;
  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });
  //FILW FIREBASE

  constructor(private formBuilder: FormBuilder) {
    const sesion = getAuth();
    onAuthStateChanged(sesion, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user}
        // The user object has basic properties such as display name, email, etc.
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
        this.uid = user.uid;
        console.log(this.uid, displayName, email, photoURL, emailVerified);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }

  ngOnInit() {
    this.crearFormularioPerfil();
  }

  private crearFormularioPerfil(): void {
    this.formPerfil = this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      validado: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      url: new FormControl('', Validators.required),
    });
  }

  change(file: any): void {
    //this.getBase64(file);
    this.nameFile = file.target.files[0].name.replace(/\s/g, '');
    const foto: any = (event?.target as HTMLInputElement)?.files?.[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.fotoCarnet.url = reader.result as string;
    };
    reader.readAsDataURL(foto);
    if (file.target.files[0].size > 8100000) {
      Swal.fire({
        title: 'El archivo supera el limite de tamaño que es de 8mb',
        confirmButtonText: 'Entiendo',
        confirmButtonColor: '#8f141b',
        showConfirmButton: true,
      });
    } else {
      this.file = file.target.files[0];
      Swal.fire({
        icon: 'success',
        title: 'Foto cargada, recuerde guardar los cambios realizados.',
        showConfirmButton: true,
        confirmButtonColor: '#8f141b',
        confirmButtonText: 'Listo',
      });
    }
  }

  // Función para subir el archivo a Cloud Storage referenciado con la ruta de acceso
  /*  subirArchivo() {
    this.nombreArchivo = 'FOTOS/' + this.nombreArchivo;
    const archivo = this.datosFormulario.get('archivo');
    const referencia = this.firebaseFileServie.referenciaCloudStorage(
      this.nombreArchivo
    );
    const cargar = this.firebaseFileServie.cargarCloudStorage(
      this.nombreArchivo,
      archivo
    );
    cargar.percentageChanges().subscribe((porcentaje) => {
      referencia.getDownloadURL().subscribe((URL) => {
        this.URLPublica = URL;
        this.finalizado = true;
        this.foto.url = this.URLPublica;
        return [this.URLPublica, this.finalizado];
      });
    });
  } */
  // Evento que gatilla cuando el input de tipo archivo cambia
  //https://firebasestorage.googleapis.com/v0/b/doctoradocienciasdelasaludusco.appspot.com/o/CARNETIZACION%2FFIRMADIGITALunnamed.png?alt=media&token=2837ef64-53be-43ee-9486-98dfe1527776
  /*  public cambioArchivo(event: any) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append(
          'archivo',
          event.target.files[i],
          event.target.files[i].name
        );
      }
      this.subirArchivo();
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  } */
}
