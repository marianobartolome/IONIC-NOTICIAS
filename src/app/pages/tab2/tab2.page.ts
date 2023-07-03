import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  categories:string[]=[
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'];
  
  selectedCategory:string = this.categories[0];
  articles:Article[]=[]

  @ViewChild(IonInfiniteScroll, {static:true}) infiniteScroll:IonInfiniteScroll;  // {static:true} es para que el objeto este disponible en el Oninit

  constructor(
    private newsService:NewsService
  ) {}

  ngOnInit(): void {
    
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory,false)
      .subscribe(articles=>{
        console.log(articles)
         this.articles=[...articles]
      });
    
  }
  segmentChanged(event:Event){
    //this.articles=[];

    this.selectedCategory=(event as CustomEvent).detail.value
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory,false)
      .subscribe(articles=>{
        console.log(articles)
         this.articles=[...articles]
      });
  }

 

  loadData(){
    console.log('LOAD DATA')
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory,true)
      .subscribe(articles=>{
        
        if(articles.length===this.articles.length){
          this.infiniteScroll.disabled=true;
          return;
        }
        
        this.articles=articles;
        this.infiniteScroll.complete();
      });
    
  }
}
