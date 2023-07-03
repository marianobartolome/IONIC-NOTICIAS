import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Article, ArticlesbyCategoryAndPage, NewsResponse } from '../interfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'

const apiKey=environment.apiKey;
const apiUrl=environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  
  private articlesByCategoryAndPage:ArticlesbyCategoryAndPage={}

  constructor(
    private http: HttpClient
  ) { }

  private executeQuery<T>(endpoint:string){
    console.log('petición realizada')
    return this.http.get<T>(`${apiUrl}${endpoint}`,
    {
      params:{ 
        apiKey,
        country:'us'
     }
    })
  }
  
  
  getTopHeadLines():Observable<Article[]>{
    return this.getArticlesByCategory('business')
  //  return this.executeQuery<NewsResponse>(`/top-headlines?category=business`)
  //   .pipe(
  //     //map(resp=>resp.articles)  //esto o desestructurar
  //     map(({articles})=>articles) //desestructuro articles 
  //   )
  }

  getTopHeadLinesByCategory(category:string, loadMore:boolean=false):Observable<Article[]>{

    if(loadMore){
      return  this.getArticlesByCategory(category);
    }

    if( this.articlesByCategoryAndPage[category]){
      return of (this.articlesByCategoryAndPage[category].articles); //of convierte lo que sea aun observable
    }

    return this.getArticlesByCategory(category)
  }

  private getArticlesByCategory(category:string):Observable<Article[]>{
    if(Object.keys(this.articlesByCategoryAndPage).includes(category) ){
      //ya existe
      //this.articlesByCategoryAndPage[category].page += 1;
    } else{
      // no existe
      this.articlesByCategoryAndPage[category]={
        page:0,
        articles:[]
      }
    }
    const page = this.articlesByCategoryAndPage[category].page+1;

    return this.executeQuery<NewsResponse>(`/top-headlines?category=${category}&page=${page}`)
    .pipe(
      map(({articles}) => {
        if(articles.length===0) return this.articlesByCategoryAndPage[category].articles;
        this.articlesByCategoryAndPage[category]={
          page:page,
          articles:[...this.articlesByCategoryAndPage[category].articles,...articles]
        }
        return this.articlesByCategoryAndPage[category].articles
      
      })
    );
  }
}
