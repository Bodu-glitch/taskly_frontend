import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe, DatePipe, NgIf, NgStyle } from '@angular/common';
import { forkJoin, of, Subscription } from 'rxjs';
import { MatIconButton } from '@angular/material/button';
import { CardModel } from '../../../../../../../../../../models/card.model';
import { BoardState } from '../../../../../../../../../../ngrx/board/board.state';
import { Store } from '@ngrx/store';
import { ListState } from '../../../../../../../../../../ngrx/list/list.state';
import * as listActions from '../../../../../../../../../../ngrx/list/list.actions';
import { MatDialog } from '@angular/material/dialog';
import { TaskDescriptionComponent } from '../../../../../../../../../../components/task-description/task-description.component';
import { LabelPipe } from '../../../../../../../../../../shared/pipes/label.pipe';
import { UserPipe } from '../../../../../../../../../../shared/pipes/user.pipe';
import { MatTooltip } from '@angular/material/tooltip';
import { ListCard } from '../../../../../../../../../../models/list.model';
import * as cardActions from '../../../../../../../../../../ngrx/card/card.actions';
import { CardState } from '../../../../../../../../../../ngrx/card/card.state';
import { LabelService } from '../../../../../../../../../../services/label/label.service';
import { LabelModel } from '../../../../../../../../../../models/label.model';

interface Task {
  id: string;
  title: string;
  description: string;
  assignees: string[];
  date: Date;
  progress: number;
  totalSubtasks: number;
  completedSubtasks: number;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  standalone: true,
  imports: [
    MatIcon,
    DatePipe,
    MatIconButton,
    LabelPipe,
    AsyncPipe,
    UserPipe,
    NgStyle,
    MatTooltip,
  ],
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
  @Input() task!: ListCard;
  readonly dialog = inject(MatDialog);
  subscription: Subscription[] = [];

  // labels: LabelModel[] = [];

  constructor(
    private store: Store<{
      board: BoardState;
      list: ListState;
      card: CardState;
    }>,
    private labelService: LabelService,
  ) {}

  ngOnInit() {
    // const labelIdsRequest = this.task.labels?.map((label) =>
    //   this.labelService.getLabel(label.boardLabelId),
    // );

    this.subscription
      .push
      // forkJoin(labelIdsRequest!).subscribe((labels) => {
      //   if (labels) {
      //     this.labels = labels.map((label) => label!);
      //     console.log('Labels:', this.labels);
      //   }
      // })
      ();
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.subscription = [];
  }

  closeTask() {
    // Implement logic to remove/archive task
    console.log('Closing task:', this.task.id);
    this.store.dispatch(listActions.deleteCard({ cardId: this.task.id! }));
  }

  // getProgressColor() {
  //   if (this.task.progress < 34) {
  //     return '#FFA726'; // Orange for low progress
  //   } else if (this.task.progress < 67) {
  //     return '#26A69A'; // Teal for medium progress
  //   } else {
  //     return '#66BB6A'; // Green for high progress
  //   }
  // }

  protected readonly of = of;

  openDialog() {
    this.dialog.open(TaskDescriptionComponent, {
      data: this.task.id,
    });
  }

  showMoreOptions() {}

  protected readonly Array = Array;
}
