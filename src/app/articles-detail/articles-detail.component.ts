import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../models/article';
import { Location } from '@angular/common';

@Component({
  selector: 'app-articles-detail',
  templateUrl: './articles-detail.component.html',
  styleUrls: ['./articles-detail.component.css']
})
export class ArticlesDetailComponent implements OnInit {

  constructor(private articleService: ArticlesService, private route: ActivatedRoute, private location: Location, private _router: Router) { }
  article: Article;
  id: string;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getArticle();
  }
  getArticle(): void {

    this.articleService.getArticle(this.id).subscribe(
      drupalJson => {
        this.article = drupalJson.data;
        console.log(this.article);
      })
  }
  goBack(): void {
    this.location.back();
  }
  editArticle(): void {
    this._router.navigate([`article/edit/${this.id}`])
  }

  deleteArticle(): void {
    this.articleService.deleteArticle(this.id).subscribe(
      drupalJson => { console.log(drupalJson) }
    )
  }

}
