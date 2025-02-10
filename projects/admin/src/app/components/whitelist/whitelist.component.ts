import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { IWhitelist, WhitelistService } from '../../services/whitelist/whitelist.service';
import { NotificationsService } from '@shared';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-whitelist',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSortModule,
  ],
  templateUrl: './whitelist.component.html',
  styleUrl: './whitelist.component.scss'
})
export class WhitelistComponent {
  whiteListService = inject(WhitelistService);
  notif = inject(NotificationsService);
  fb = inject(FormBuilder);

  displayedColumns: string[] = ['email'];
  dataSource = new MatTableDataSource<IWhitelist | undefined>(undefined);

  addForm = this.fb.group({
    name: ['', [Validators.required, Validators.email]],
  });

  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor() {
    this.whiteListService.getWhitelist().subscribe();
    this.whiteListService.whitelist.subscribe(whitelist => {
      this.dataSource.data = whitelist || [];
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSubmit() {
    if (this.addForm.invalid) return;
    const { name } = this.addForm.value as { name: string };
    this.whiteListService.addEmail(name).subscribe({
      next: () => {
        this.notif.callNotify({
          icon: 'check_circle',
          message: 'Email ajouté à la whitelist',
        });
        this.addForm.reset();
        this.dataSource.filter = '';
      },
      error: (err) => {
        this.notif.callNotify({
          icon: 'error',
          message: err.error ?? 'Erreur lors de l\'ajout de l\'email',
        });
      }
    })
  }

  remove(id: number){
    const confirm = window.confirm('Voulez-vous vraiment supprimer cet email ?');
    if (!confirm) return;
    this.whiteListService.removeEmail(id).subscribe(() => {
      this.notif.callNotify({
        icon: 'check_circle',
        message: 'Email supprimé de la whitelist',
      });
    });
  }
}
