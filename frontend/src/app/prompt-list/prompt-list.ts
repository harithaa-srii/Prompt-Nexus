import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PromptService, Prompt } from '../prompt.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-prompt-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prompt-list.html',
  styleUrl: './prompt-list.css',
})
export class PromptList {
  prompts$: Observable<Prompt[]>;

  constructor(
    private promptService: PromptService,
    private router: Router
  ) {
    this.prompts$ = this.promptService.getPrompts();
  }

  getComplexityColor(complexity: number) {
    if (complexity <= 3) return 'green';
    if (complexity <= 7) return 'yellow';
    return 'red';
  }

  viewPrompt(id: string) {
    this.router.navigate(['/prompts', id]);
  }

  goToCreate() {
    this.router.navigate(['/create']);
  }
}