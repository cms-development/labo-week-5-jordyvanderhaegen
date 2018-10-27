import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { Article } from '../models/article';
import { DrupalJson } from '../models/drupalJson';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  drupalJson : DrupalJson;
  articles: Article[];
  constructor(private articleService: ArticlesService, private _router: Router) { }

  ngOnInit() {
    this.getArticles();
  }
  getArticles(): void  {
    this.articleService.getArticles().subscribe(drupalJson => {
      this.articles = drupalJson.data;
      console.log(this.articles);
    });
  }
  
}
