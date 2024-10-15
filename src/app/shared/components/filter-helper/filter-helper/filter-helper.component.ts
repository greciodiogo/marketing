import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Filter } from '@app/shared/models/Filters/Filter';
import { Pagination } from '@app/shared/models/pagination';

export class _Filter extends Filter{
  startDate: Date = null;
  endDate: Date = null;
  estado: number = null;
  serieId: number = null;
  createdAt: Date = null;
}

@Component({
  selector: 'app-filter-helper',
  templateUrl: './filter-helper.component.html',
  styleUrls: ['./filter-helper.component.css']
})
export class FilterHelperComponent implements OnInit {

  public isFilterActived: boolean = false
  public pagination = new Pagination();
  @Output() loadList: EventEmitter<any> = new EventEmitter<any>()

  public filter = new _Filter();
  
  public anos: any = [];
  estados = [
    { estado: 0, nome: 'Em Processamento' },
    { estado: 1, nome: 'Finalizado' },
    { estado: 2, nome: 'Falhado' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  public handleFilterClick(){
    this.isFilterActived = true;
  }

  public onCloseFilterHelper(){
    this.isFilterActived = false;
  }

  public getPageFilterData() {
    this.loadList.emit(this.pagination.perPage);
    this.onCloseFilterHelper()

  }

}
