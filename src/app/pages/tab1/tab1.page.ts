import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  articles:Article[]=[];
  @ViewChild(IonInfiniteScroll, {static:true}) infiniteScroll:IonInfiniteScroll;  // {static:true} es para que el objeto este disponible en el Oninit

  constructor(
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.newsService.getTopHeadLines()
      .subscribe(articles=>
        this.articles.push(...articles)
      );
    
  }

  loadData(){
    console.log('LOAD DATA')
    this.newsService.getTopHeadLinesByCategory('business',true)
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
