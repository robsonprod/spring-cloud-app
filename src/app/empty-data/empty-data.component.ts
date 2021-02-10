import { Component, Input, OnInit } from '@angular/core';
import { Paginate } from '../models/paginate.model';

@Component({
  selector: 'app-empty-data',
  templateUrl: './empty-data.component.html',
  styleUrls: ['./empty-data.component.css']
})
export class EmptyDataComponent implements OnInit {

  @Input() visible: Paginate<any> | boolean | any[] | any = false;
  @Input() emptyImage: boolean = false;
  @Input() image: string;
  @Input() message: string;

  @Input() brief: boolean = false;
  @Input() new: boolean = false;

  constructor() { }

  ngOnInit() {
    if (this.brief) {
      this.image = this.image || 'undraw_Landing_page_re_6xev.svg';
      this.message = this.message || 'Aguarde, em breve estará disponível.';
    } else if (this.new) {
      this.image = this.image || 'undraw_Portfolio_update_re_jqnp.svg';
      this.message = this.message || 'Novo recurso disponível.';
    } else {
      this.image = this.image || 'undraw_no_data_qbuo.svg';
      this.message = this.message || 'Nenhum registro encontrado...'
    }

    if (!this.image.startsWith("assets/img/")) {
      this.image = `assets/img/${this.image}`;
    }
  }

  get isVisible(): boolean {
    if (!this.visible) return false

    if (typeof this.visible === 'boolean') return this.visible
    else if (typeof this.visible === 'number') return this.visible <= 0
    else if (typeof this.visible === 'string' && this.visible <= 'true') return true
    else if (Array.isArray(this.visible)) return this.visible.length <= 0
    else if (this.isPaginate(this.visible)) {
      return (this.visible as Paginate<any>).total <= 0
    }

    return true;
  }

  protected isPaginate(object: any): object is Paginate<any> {
    return 'data' in object
  }
}

