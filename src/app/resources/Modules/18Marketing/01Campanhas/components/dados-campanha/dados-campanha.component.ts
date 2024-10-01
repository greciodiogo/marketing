import { Component, Input, OnInit } from '@angular/core';
import { FnService } from '@app/shared/services/fn.helper.service';

@Component({
  selector: 'app-dados-campanha',
  templateUrl: './dados-campanha.component.html',
  styleUrls: ['./dados-campanha.component.css']
})
export class DadosCampanhaComponent implements OnInit {
  @Input() campanha: any;

  constructor(public configService: FnService,) { }

  ngOnInit(): void {
  }

}
