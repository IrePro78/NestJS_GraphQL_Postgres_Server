import { Injectable } from '@nestjs/common';
import { CollectionsService } from '../collections/collections.service';

@Injectable()
export class ProductsService {
  // constructor(private readonly collectionService: CollectionsService) {}
  async findOneById(id: string) {
    return `This action returns a #${id} product`;
  }

  async findAll() {
    return `This action returns all products`;
  }
}
