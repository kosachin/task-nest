import { DataSource } from 'typeorm';

import { AppDataSource } from '../config/data-source';
import { CatalogueEntity } from '../catologue/entities/catologue.entity';
import { MainCategoryEntity } from '../catologue/entities/main-category.entity';
import { SubCategoryEntity } from '../catologue/entities/sub-category.entity';
import { ServiceTypeEntity } from '../catologue/entities/service-type.entity';
import { ServiceItemEntity } from '../catologue/entities/service-item.entity';

const ELECTRICIAN_DATA = [
  {
    title: 'Home appliances',
    items: [
      {
        title: 'AC',
        categories: {
          Service: [
            {
              name: 'AC General Check-up',
              price: 299,
              description: 'Comprehensive AC inspection.',
            },
          ],
          Packages: [
            {
              name: 'AC Maintenance Plan',
              price: 1499,
              description: 'Annual plan for AC maintenance.',
            },
          ],
          Repair: [
            {
              name: 'AC Gas Leakage Repair',
              price: 899,
              description: 'Leak fix and refill.',
            },
          ],
          Installation: [
            {
              name: 'Split AC Installation',
              price: 1599,
              description: 'Mounting and pipe fitting.',
            },
          ],
        },
      },
      // Add more categories like Washing Machine, TV, etc.
    ],
  },
  {
    title: 'Kitchen appliances',
    items: [
      {
        title: 'Water Purifier',
        categories: {
          Service: [
            {
              name: 'Filter Cleaning',
              price: 299,
              description: 'Cleaning and flushing.',
            },
          ],
          Packages: [],
          Repair: [],
          Installation: [],
        },
      },
    ],
  },
];

export async function seedElectricianCatalogue(dataSource: DataSource) {
  const catalogueRepo = dataSource.getRepository(CatalogueEntity);

  const exists = await catalogueRepo.findOne({
    where: { name: 'Electrician' },
  });
  if (exists) {
    console.log('⚠️ Electrician already seeded. Skipping.');
    return;
  }
  const mainCategoryRepo = AppDataSource.getRepository(MainCategoryEntity);
  const subCategoryRepo = AppDataSource.getRepository(SubCategoryEntity);
  const serviceTypeRepo = AppDataSource.getRepository(ServiceTypeEntity);
  const serviceItemRepo = AppDataSource.getRepository(ServiceItemEntity);

  const catalogue = catalogueRepo.create({ name: 'Electrician' });
  await catalogueRepo.save(catalogue);

  const serviceTypeMap: Record<string, ServiceTypeEntity> = {};

  for (const name of ['Service', 'Packages', 'Repair', 'Installation']) {
    const type = serviceTypeRepo.create({ name });
    await serviceTypeRepo.save(type);
    serviceTypeMap[name] = type;
  }

  for (const main of ELECTRICIAN_DATA) {
    const mainCategory = mainCategoryRepo.create({
      name: main.title,
      catalogue,
    });
    await mainCategoryRepo.save(mainCategory);

    for (const sub of main.items) {
      const subCategory = subCategoryRepo.create({
        name: sub.title,
        mainCategory,
      });
      await subCategoryRepo.save(subCategory);

      for (const [typeName, services] of Object.entries(sub.categories)) {
        for (const service of services) {
          const item = serviceItemRepo.create({
            name: service.name,
            description: service.description,
            price: service.price,
            subCategory,
            serviceType: serviceTypeMap[typeName],
            isActive: true,
          });
          await serviceItemRepo.save(item);
        }
      }
    }
  }

  console.log('✅ Seeded electrician catalogue');
}
