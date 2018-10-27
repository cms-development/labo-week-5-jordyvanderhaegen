import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../models/article';
import { DrupalJson } from '../models/drupalJson';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {
  article: Article;
  id: string;
  constructor(private articleService: ArticlesService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id');
    this.getArticle();
  }

  getArticle(): void {
    this.articleService.getArticle(this.id).subscribe(drupalJson => {
      this.article = drupalJson.data;
      console.log(this.article);
    })
  }

  patchArticle(): void {
    console.log(this.article);
    const drupalJsonObjec = new DrupalJson();
    drupalJsonObjec.data = this.article;
    this.articleService.patchArticle(this.id, drupalJsonObjec).subscribe(
      drupalJson => this._router.navigate([`article/${this.article.id}`]), 
      err => console.log(err));
  }

  

}
