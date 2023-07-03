import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { ActionSheetController, Platform } from '@ionic/angular';

//plugins
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  @Input() article:Article;
  @Input() index:number;

  constructor( 
    private iab:InAppBrowser,
    private platform:Platform,
    private actionsheetCtrl:ActionSheetController
  ) { }

  ngOnInit() {}

  openArticle(){
    if(this.platform.is('ios') || this.platform.is('android')){

      const borwser=this.iab.create(this.article.url);
      borwser.show();
      return;
    }

    window.open(this.article.url,'_blank');
  }

  async onOpenMenu(){
    const actionSheet = await this.actionsheetCtrl.create({
      header:'',
      buttons:[
        {
          text:'Compartir',
          icon:'share-outline',
          handler:() => this.onShareArticle()
        },
        {
          text:'Favorito',
          icon:'heart-outline',
          handler:() => this.onToogleFavorite()
        },
        {
          text:'Cancelar',
          icon:'close-outline',
          role:'cancel',
          // cssClass:'secondary' 
        }
      ]
    });

    await actionSheet.present();
  }

  onShareArticle(){
    console.log('share article')
  }

  onToogleFavorite(){
    console.log('toogle favorites')
  }
}
