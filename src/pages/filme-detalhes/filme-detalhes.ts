import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

/**
 * Generated class for the FilmeDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filme-detalhes',
  templateUrl: 'filme-detalhes.html',
  providers: [MoovieProvider]
})
export class FilmeDetalhesPage {
   public loader;
   public refresher;
   public isRefreshing: boolean = false; 
   public filme;
   public filmeid;
  constructor(public navCtrl: NavController, public navParams: NavParams,public movieProvider: MoovieProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidEnter() {
  this.carregaFilme();
  }
  

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Aguarde por favor..."
    });
    this.loader.present();
  }

  fechaCarregando(){
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregaFilme();

  }

  carregaFilme(){
    this.abreCarregando();
    this.filmeid = this.navParams.get("id");
    this.movieProvider.getMovieDetails(this.filmeid).subscribe(data=>{
    let retorno = (data as any)._body;
    this.filme = JSON.parse(retorno);
    this.fechaCarregando();
      if(this.isRefreshing){
        this.refresher.complete();
        this.isRefreshing = false;
      }
    }, error=>{
        console.log(error);
    })
  }
  

}
