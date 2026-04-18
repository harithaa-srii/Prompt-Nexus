import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PromptService } from '../prompt.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-prompt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-prompt.html',
  styleUrl: './create-prompt.css',
})
export class CreatePrompt {
  title = '';
  content = '';
  complexity = 5;
  // No longer needed, options are now inline in the template for better UX

  constructor(private router: Router, private promptService: PromptService) {}

  createPrompt() {
    if (!this.title || !this.content || !this.complexity) return;
    this.promptService.createPrompt({
      title: this.title,
      content: this.content,
      complexity: this.complexity
    }).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
