import { Component } from '@angular/core';
import { mockData } from './mock/mock';
import { options } from './models/constants';
import { IProduct } from './models/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  products: IProduct[] = []
  productsCount = mockData.length

  count = 5
  page = 1
  
  productsPages = Math.ceil(this.productsCount/this.count)

  isOptions = false
  options = options

  constructor() {
    this.getProducts(1, 5)
  }

  getProducts(page: number, count: number) {
    this.count = count
    this.productsPages = Math.ceil(this.productsCount/this.count)
    
    this.products = []
    for(let i = (count*(page-1)); i < (count*page); i++) {
      if(mockData[i]) {
        this.products.push(mockData[i])
      }
    }
    return this.products
  }

  nextPage() {
    if(this.page < this.productsPages) {
      this.page++
      this.getProducts(this.page, this.count)
    }
  }
  prevPage() {
    if(this.page != 1) {
      this.page--
      this.getProducts(this.page, this.count)
    }
  }

  filterRating(sort: string) {
    let products = mockData
    products.sort((a:any, b:any) => {
      return b[sort] - a[sort]
    })
    this.products = products
    this.page = 1
    this.getProducts(this.page, this.count)
    this.isOptions = false
  }

  openOptions() {
    this.isOptions = !this.isOptions
  }
  closeOptions() {
    this.isOptions = false
  }
}