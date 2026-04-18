import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Prompt {
  id: string;
  title: string;
  content: string;
  complexity: number;
  created_at: string;
  view_count?: number;
}

@Injectable({ providedIn: 'root' })
export class PromptService {
  private apiUrl = 'http://127.0.0.1:8000/prompts/';

  constructor(private http: HttpClient) {}

  getPrompts(): Observable<Prompt[]> {
    return this.http.get<Prompt[]>(this.apiUrl);
  }

  getPromptById(id: string): Observable<Prompt> {
    return this.http.get<Prompt>(`${this.apiUrl}${id}/`);
  }

  createPrompt(data: Omit<Prompt, 'id' | 'created_at' | 'view_count'>): Observable<Prompt> {
    return this.http.post<Prompt>(this.apiUrl, data);
  }
}
