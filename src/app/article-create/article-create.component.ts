import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { Article, Attributes, Body } from '../models/article';
import { DrupalJson } from '../models/drupalJson';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {
  articleForm: FormGroup;
  drupalJson: DrupalJson;
  article: Article;

  constructor(private articleService: ArticlesService, private _router: Router) {
    this.articleForm = this.articleService.createArticleFormGroup('REEEEEE','Dit is een nieuwe post in angular.');
  }

  ngOnInit() {
  }

  get title() { return this.articleForm.get('title'); }
  get body() { return this.articleForm.get('body'); }

  onSubmit(): void {
    this.drupalJson = new DrupalJson();
    this.article = new Article();
    this.drupalJson.data = this.article;
    this.article.attributes = new Attributes();
    this.article.attributes.title = this.articleForm.value.title
    this.article.attributes.body = new Body();
    this.article.attributes.body.value = this.articleForm.value.body;
    this.articleService.postArticle(this.drupalJson).subscribe(drupalJson => {
      this._router.navigate([`article/${drupalJson.data.id}`])
    })
  }
}
