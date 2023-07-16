import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  ver = true;
  today = new Date();
  cargando: boolean = false;
  formLogin!: FormGroup;

  constructor(
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.crearFormularioLogin();
  }

  private crearFormularioLogin(): void {
    this.formLogin = this.formBuilder.group({
      correo: new FormControl('', [Validators.required, Validators.email]),
      contrasenia: new FormControl('', Validators.required),
    });
  }

  login(): void {
    this.cargando = true;
    const auth = getAuth();
    signInWithEmailAndPassword(
      auth,
      this.formLogin.get('correo')!.value,
      this.formLogin.get('contrasenia')!.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        swal.fire({
          icon: 'success',
          title: 'Inicio de sesión ',
          confirmButtonText: 'Listo',
          confirmButtonColor: '#8f141b',
        });

        this.router.navigate(['/inicio']);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const Toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', swal.stopTimer);
            toast.addEventListener('mouseleave', swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'error',
          title: errorMessage,
        });
      });
  }
}
