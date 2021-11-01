import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  constructor(private elementRef: ElementRef, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      mail: ["", Validators.required],
      pass: ["", Validators.required]
    })
    //this.grabarLocalStorage()
    //this.obtenerLocalStorage()
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body
      .style.backgroundColor = 'black';
  }

  submitForm() {
    if (this.loginForm.get("mail")?.value === "challenge@alkemy.org" && this.loginForm.get("pass")?.value === "angular") {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.grabarLocalStorage()
  }

  grabarLocalStorage() {
    let Email: string = "challenge@alkemy.org"
    let Password: string = "angular"
    localStorage.setItem("Email", Email)
    localStorage.setItem("Password", Password)
  }


  /*
    obtenerLocalStorage() {
      let Email = localStorage.getItem("Email")
      let Password = localStorage.getItem("Password")
   
    }
    */

}
