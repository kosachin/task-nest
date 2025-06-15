import { Injectable, NotFoundException } from '@nestjs/common';
import { CatologueRepository } from './repositories';

@Injectable()
export class CatologueService {
  constructor(private readonly catalogueRepository: CatologueRepository) {}

  async getCatologueList() {
    return await this.catalogueRepository.findAll();
  }

  async getCatalogueHierarchy(catalogueId: string) {
    const catalogue = await this.catalogueRepository.findByCondition({
      where: { id: catalogueId },
      relations: {
        mainCategories: {
          subCategories: {
            serviceItems: {
              serviceType: true,
            },
          },
        },
      },
    });

    if (!catalogue) throw new NotFoundException('Catalogue not found');

    return catalogue.mainCategories.map((mainCategory) => ({
      title: mainCategory.name,
      items: mainCategory.subCategories.map((subCategory) => {
        const categorizedItems: Record<string, any[]> = {};

        for (const item of subCategory.serviceItems) {
          const type = item.serviceType?.name || 'Unknown';

          if (!categorizedItems[type]) categorizedItems[type] = [];

          categorizedItems[type].push({
            name: item.name,
            price: Number(item.price),
            description: item.description,
          });
        }

        return {
          title: subCategory.name,
          categories: categorizedItems,
        };
      }),
    }));
  }
}
