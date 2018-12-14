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
  public page = 1;
  public InfiniteScroll;

  public nome_usuario: string = "Neberson Andrade do Codigo";

  constructor(public navCtrl: NavController, public navParams: NavParams, private movieProvider: MoovieProvider, public loadingCtrl: LoadingController) {
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando Filmes..."
    });
    this.loader.present();
  }

  fechaCarregando() {
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

  abrirDetalhes(filme) {
    this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.InfiniteScroll = infiniteScroll;
    this.carregarFilmes(true);
  }

  carregarFilmes(newpage: boolean = false) {
    this.abreCarregando();
    this.movieProvider.getLatestMovies(this.page).subscribe(data => {
      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);
      if (newpage) {
        this.lista_filmes = this.lista_filmes.concat(objeto_retorno.results);
        this.InfiniteScroll.complete();
      } else {
        this.lista_filmes = objeto_retorno.results;
      }

      this.fechaCarregando();
      if (this.isRefreshing) {
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
