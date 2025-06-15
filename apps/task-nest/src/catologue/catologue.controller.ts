// profiles.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { CatologueService } from './catologue.service';

@Controller('catologue')
export class CatologueController {
  constructor(private readonly catalogueService: CatologueService) {}
  @Get()
  getCatologueList() {
    return this.catalogueService.getCatologueList();
  }

  @Get(':catalogueId/items')
  getCatalogueItems(@Param('catalogueId') id: string) {
    return this.catalogueService.getCatalogueHierarchy(id);
  }
}
