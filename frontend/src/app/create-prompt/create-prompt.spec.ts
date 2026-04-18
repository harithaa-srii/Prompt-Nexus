import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrompt } from './create-prompt';

describe('CreatePrompt', () => {
  let component: CreatePrompt;
  let fixture: ComponentFixture<CreatePrompt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePrompt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePrompt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
