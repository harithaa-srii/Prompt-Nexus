import { Routes } from '@angular/router';
import { PromptList } from './prompt-list/prompt-list';
import { CreatePrompt } from './create-prompt/create-prompt';
import { PromptDetail } from './prompt-detail/prompt-detail';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
    {path:'', component:PromptList},
    {path:'create', component: CreatePrompt},
    {path:'prompts/:id', component:PromptDetail},
    { path: '**', component: NotFound },
];

