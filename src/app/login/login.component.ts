import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  constructor(private elementRef: ElementRef, private fb: FormBuilder, private router: Router, private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      mail: ["", Validators.required],
      pass: ["", Validators.required]
    })
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body
      .style.backgroundColor = 'black';
  }

  submitForm() {
    if (this.loginForm.get("mail")?.value === "challenge@alkemy.org" && this.loginForm.get("pass")?.value === "angular") {
      let token = "sdasjdaskdkalsdjklasjdklasjdklasjdklasjdkasjdlsk"
      localStorage.setItem("token", token)
      this.router.navigate(['/home']);
    } else {
      this.toastr.toastrConfig.preventDuplicates = true;
      this.toastr.error('Mail o contraseña incorrectos', 'Error', { timeOut: 2000 })

    }
  }

  ngOnInit(): void {
  }
}
