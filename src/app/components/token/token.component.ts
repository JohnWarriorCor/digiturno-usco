import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css'],
})
export class TokenComponent implements OnInit {
  today = new Date();
  cargando: boolean = false;
  formToken!: FormGroup;
  correo: string = 'stephania.zambrano@usco.edu.co';

  constructor(
    public auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.crearFormularioToken();
  }

  private crearFormularioToken(): void {
    this.formToken = this.formBuilder.group({
      token: new FormControl('', Validators.required),
    });
  }

  validarToken() {
    this.cargando = true;
    swal.fire({
      icon: 'success',
      title: 'Inicio de sesión ',
      text: 'Codigo de verificación correcto.',
      confirmButtonText: 'Listo',
      confirmButtonColor: '#8f141b',
    });
    this.router.navigate(['/inicio']);
  }
}
