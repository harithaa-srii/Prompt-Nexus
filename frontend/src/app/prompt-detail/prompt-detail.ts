import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PromptService, Prompt } from '../prompt.service';
import { CommonModule } from '@angular/common';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-prompt-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prompt-detail.html',
  styleUrl: './prompt-detail.css',
})
export class PromptDetail {

  prompt$: Observable<Prompt>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private promptService: PromptService
  ) {
    this.prompt$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id')!;
        return this.promptService.getPromptById(id);
      })
    );
  }

  getComplexityColor(complexity?: number) {
    if (!complexity) return '';
    if (complexity <= 3) return 'green';
    if (complexity <= 7) return 'yellow';
    return 'red';
  }

  getComplexityLabel(complexity?: number) {
    if (!complexity) return '';
    if (complexity <= 3) return 'Easy';
    if (complexity <= 7) return 'Medium';
    return 'Hard';
  }

  goBack() {
    this.router.navigate(['/']);
  }
}