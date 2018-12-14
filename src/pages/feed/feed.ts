import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MoovieProvider
  ]
})

export class FeedPage {

  public loader;
  public refresher;
  public isRefreshing: boolean = false; 

  public objeto_feed = {
    titulo: "Neberson Andrade",
    data: "November 5, 1995",
    descricao: "Estou criando um app incrivel...",
    qtd_likes: 12,
    qtd_comments: 4,
    time_comment: "11h ago"
  };

  public lista_filmes = new Array<any>();

  public nome_usuario: string = "Neberson Andrade do Codigo";

  constructor(public navCtrl: NavController, public navParams: NavParams, private movieProvider: MoovieProvider, public loadingCtrl: LoadingController) {
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

  public somaDoisNumeros(num1: number, num2: number): void {
    alert(num1 + num2);
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes();

  }

  ionViewDidEnter() {
   this.carregarFilmes();
  }

  abrirDetalhes(filme){
    this.navCtrl.push(FilmeDetalhesPage,{ id: filme.id });
  }

  carregarFilmes(){
    this.abreCarregando();
    this.movieProvider.getLatestMovies().subscribe(data => {
      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);
      this.lista_filmes = objeto_retorno.results;
      console.log(objeto_retorno);
      this.fechaCarregando();
      if(this.isRefreshing){
        this.refresher.complete();
        this.isRefreshing = false;
      }
    }, error => {
      console.log(error);
      this.fechaCarregando();
    }

    )
  }

}
