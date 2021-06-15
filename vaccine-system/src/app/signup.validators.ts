import { HttpClient } from "@angular/common/http";
import { AbstractControl, ValidationErrors } from "@angular/forms";

export class SignupValidators {

  // constructor(private http:HttpClient){}

  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true }
    }
    return null
  }

}

// return new Promise((resolve,reject)=>{
    //   setTimeout(()=>{
    //     let producers:any 
    //     this.producerService.get('http://localhost:3000/producer')
    //     .subscribe(res=>{
    //       producers = res
    //     })

    //     let names:string[] = []
    //     for(let i of producers){
    //       names.push(i['producer_name'])
    //     }

    //     if(names.includes(control.value)){
    //       resolve({isUniqueName:true})
    //     }
    //     else{
    //       resolve(null)
    //     }

    //   },2000)
    // })