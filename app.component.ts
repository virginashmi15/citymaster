  
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { cityService } from './city.service';
import { HttpClient } from '@angular/common/http';


export class city
{
  id?:number;
  name: string;
  population: number;
  area: number;

}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public clientsData : string;
  enableEdit: boolean;
  enableEditIndex: any;
  ngOnInit() {
    this.title='Submit';
    this.getPostList();
   
}
  private servUrl = "http://localhost:3000/cities";
  title;
  activeindex=-1;
  constructor(private http: HttpClient) { }
  ItemsArray= [];
  c:city=new city();
  
  onSubmit(form:NgForm):void
  {
if (this.title=='Submit')
{
    console.log(form.value);
    console.log(this.c.name);
    this.http.post<any>('http://localhost:3000/cities', {
      name: this.c.name,
      population:Number( this.c.population),
      area: Number(this.c.area)
        })
    .subscribe(data => {
     console.log(data.id);
      this.getPostList();
    })
  }
  else
  {
    this.update();
  }
    
  }
  update()
  {
    console.log(this.activeindex);
    this.http.patch('http://localhost:3000/cities/'+this.activeindex, {
      id:this.activeindex,
      name: this.c.name,
      population: this.c.population,
      area: this.c.area
    })
    .subscribe(data => {
     
      this.getPostList();
    })
    this.cacheclean();
  }
  delete(id)
  {
    
    return this.http.delete<any>('http://localhost:3000/cities/'+id)
    .subscribe((res: any[])=>{
      
      this.getPostList();
    } )
  }
  edit(obj) {
   
    console.log(obj);
    this.title='Update';
    this.c.name=obj.name;
    this.c.population=obj.population;
    this.c.area=obj.area;
    this.activeindex=obj.id;
  }
  getPostList(){
    
    return this.http.get<any>(this.servUrl)
    .subscribe((res: any[])=>{
      this.ItemsArray= res;
      console.log(res);
    } )
     
  }
  cacheclean(){
    this.c.name='';
    this.c.population=Number('');
    this.c.area=Number('');
    this.title='submit';
  }
 
}